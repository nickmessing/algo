import { PrismaClient, Run, RunStatus, AttemptStatus } from '@prisma/client'

const errorStatuses: RunStatus[] = [
  RunStatus.WrongAnswer,
  RunStatus.TimeLimitExceeded,
  RunStatus.CompilationError,
  RunStatus.RuntimeErrorSigsegv,
  RunStatus.RuntimeErrorSigxfsz,
  RunStatus.RuntimeErrorSigfpe,
  RunStatus.RuntimeErrorSigabrt,
  RunStatus.RuntimeErrorNzec,
  RunStatus.RuntimeErrorOther,
  RunStatus.InternalError,
  RunStatus.ExecFormatError,
]

const updateAttemptStatus = async (prisma: PrismaClient, attemptId: string) => {
  const attempt = await prisma.attempt.findUniqueOrThrow({
    where: { id: attemptId },
    include: {
      runs: true,
    },
  })

  await prisma.attempt.update({
    where: { id: attemptId },
    data: {
      status: attempt.runs.every(run => run.status === RunStatus.Accepted)
        ? AttemptStatus.Accepted
        : attempt.runs.some(run => errorStatuses.includes(run.status))
        ? AttemptStatus.Error
        : AttemptStatus.Processing,
    },
  })
}

export const connectUpdateAttemptStatus = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const result = (await next(params)) as unknown

    if (params.model === 'Run') {
      if (params.action === 'update') {
        const run = result as Run

        await updateAttemptStatus(prisma, run.attemptId)
      }
    }

    return result
  })
}
