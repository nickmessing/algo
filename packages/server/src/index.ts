import 'dotenv/config'

import { createApollo } from './apollo/createApollo'
import { createPrisma } from './prisma/createPrisma'

const main = async () => {
  const prisma = createPrisma()

  await createApollo(prisma)
}

void main()
