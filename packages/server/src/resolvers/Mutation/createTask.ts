import { ForbiddenError, UserInputError } from 'apollo-server-errors'
import z from 'zod'

import { MutationResolvers } from '../../generated/graphql'

const schema = z.object({
  languageId: z.number().int().min(1),
  description: z.string().min(1).max(60_000),
  examples: z
    .array(
      z.object({
        input: z.string().min(1).max(10_000),
        output: z.string().min(1).max(10_000),
      }),
    )
    .min(1),
  inputs: z.array(z.string().min(1).max(60_000)).min(1),
  memoryLimit: z.number().int().min(1),
  solutionSource: z.string().min(1).max(60_000),
  tags: z.array(z.string().min(1).max(30)).min(1),
  timeLimit: z.number().int().min(1),
  title: z.string().min(1).max(100),
})

export const createTask: MutationResolvers['createTask'] = async (parent, { input }, { prisma, user }) => {
  if (!user) {
    throw new ForbiddenError('Not authenticated')
  }

  if (!user.canCreateTasks) {
    throw new ForbiddenError('No access')
  }

  const parsed = schema.safeParse(input)

  if (!parsed.success) {
    throw new UserInputError('Invalid input')
  }

  const { languageId, description, examples, inputs, memoryLimit, solutionSource, tags, timeLimit, title } = parsed.data

  const task = await prisma.task.create({
    data: {
      title,
      description,
      timeLimit,
      memoryLimit,
      authorId: user.id,
      examples: {
        create: examples.map(({ input, output }) => ({
          input,
          output,
        })),
      },
      tags: {
        create: tags.map(name => ({
          tag: {
            connectOrCreate: {
              where: {
                name,
              },
              create: {
                name,
              },
            },
          },
        })),
      },
      tests: {
        create: inputs.map(input => ({
          input,
        })),
      },
    },
  })

  await prisma.attempt.create({
    data: {
      userId: user.id,
      taskId: task.id,
      languageId,
      code: solutionSource,
      isSolution: true,
    },
  })

  return task
}
