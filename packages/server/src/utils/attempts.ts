import { Attempt, PrismaClient, Run, RunStatus } from '@prisma/client'

import { createSubmission, getSubmission } from './judge'

const timers: Record<string, NodeJS.Timeout | undefined> = {}
const POLLING_INTERVAL = 5000
const isRunStatusFinal = (status: RunStatus) =>
  status !== RunStatus.Pending && status !== RunStatus.InQueue && status !== RunStatus.Processing

const failedSubmissionCreateAttempts: Partial<Record<string, number>> = {}

export function statusIdToRunStatus(statusId: number): RunStatus {
  switch (statusId) {
    case 0:
      return RunStatus.Pending
    case 1:
      return RunStatus.InQueue
    case 2:
      return RunStatus.Processing
    case 3:
      return RunStatus.Accepted
    case 4:
      return RunStatus.WrongAnswer
    case 5:
      return RunStatus.TimeLimitExceeded
    case 6:
      return RunStatus.CompilationError
    case 7:
      return RunStatus.RuntimeErrorSigsegv
    case 8:
      return RunStatus.RuntimeErrorSigxfsz
    case 9:
      return RunStatus.RuntimeErrorSigfpe
    case 10:
      return RunStatus.RuntimeErrorSigabrt
    case 11:
      return RunStatus.RuntimeErrorNzec
    case 12:
      return RunStatus.RuntimeErrorOther
    case 13:
      return RunStatus.InternalError
    case 14:
      return RunStatus.ExecFormatError
    default:
      throw new Error('Unknown status id')
  }
}

export async function createAttemptRuns(prisma: PrismaClient, attempt: Attempt) {
  const tests = await prisma.test.findMany({
    where: {
      taskId: attempt.taskId,
    },
  })

  await Promise.all(
    tests.map(test =>
      prisma.run.create({
        data: {
          attemptId: attempt.id,
          testId: test.id,
        },
      }),
    ),
  )
}

export async function createRunSubmission(prisma: PrismaClient, run: Run) {
  if (run.submissionToken != null) {
    delete failedSubmissionCreateAttempts[run.id]
    return
  }

  const attempt = await prisma.attempt.findUniqueOrThrow({
    where: { id: run.attemptId },
    include: {
      task: true,
    },
  })
  const test = await prisma.test.findUniqueOrThrow({
    where: { id: run.testId },
  })

  try {
    const { token } = await createSubmission({
      source_code: attempt.code,
      language_id: attempt.languageId,
      stdin: test.input,
      expected_output: test.output,
      cpu_time_limit: attempt.task.timeLimit / 1000,
      memory_limit: Math.round(attempt.task.memoryLimit / 1024),
      stack_limit: Math.round(attempt.task.stackMemoryLimit / 1024),
      callback_url: `${process.env.URL_PREFIX}/runs/${run.id}/callback`,
    })

    await prisma.run.update({
      where: { id: run.id },
      data: { submissionToken: token },
    })
  } catch (e) {
    failedSubmissionCreateAttempts[run.id] = (failedSubmissionCreateAttempts[run.id] ?? 0) + 1
    console.error(e)
  }

  if ((failedSubmissionCreateAttempts[run.id] ?? 0) < 10) {
    timers[run.id] = setTimeout(() => {
      refreshRunSubmission(prisma, run.id).catch(e => console.error(e))
    }, POLLING_INTERVAL)
  }
}

export async function refreshRunSubmission(prisma: PrismaClient, runId: string) {
  if (timers[runId] != null) {
    clearTimeout(timers[runId])
  }

  const run = await prisma.run.findUniqueOrThrow({
    where: { id: runId },
    include: {
      attempt: true,
      test: true,
    },
  })

  if (run.submissionToken == null) {
    return createRunSubmission(prisma, run)
  }

  const data = await getSubmission(run.submissionToken, [
    'status_id',
    'stdout',
    'stderr',
    'compile_output',
    'time',
    'memory',
  ])

  const status = statusIdToRunStatus(data.status_id)
  const isFinal = isRunStatusFinal(status)
  await prisma.run.update({
    where: { id: run.id },
    data: {
      status,
      stdout: data.stdout,
      stderr: data.stderr,
      compile_output: data.compile_output,
      time: data.time ? Math.round(Number(data.time) * 1000) : null,
      memory: data.memory ? Math.round(Number(data.memory) * 1024) : null,
    },
  })

  if (run.attempt.isSolution && isFinal) {
    await prisma.test.update({
      where: { id: run.testId },
      data: {
        output: data.stdout,
      },
    })

    const allTests = await prisma.test.findMany({
      where: {
        taskId: run.attempt.taskId,
      },
    })

    if (allTests.every(test => test.output != null)) {
      await prisma.task.update({
        where: { id: run.attempt.taskId },
        data: {
          isActive: true,
        },
      })
    }
  } else if (!isFinal) {
    timers[runId] = setTimeout(() => {
      refreshRunSubmission(prisma, runId).catch(e => console.error(e))
    }, POLLING_INTERVAL)
  }
}
