// import fetch from 'node-fetch'

// export type SphereConfig = {
//   compilers?: {
//     endpoint: string
//     accessToken: string
//   }
// }

// export type CreateCompilerSubmissionPayload = {
//   source: string
//   compilerId: number
//   compilerVersionId?: number
//   input?: string
//   timeLimit?: number
// }

// export type CreateCompilerSubmissionResponse = {
//   id: number
// }

// export type GetCompilerSubmissionResponse = {
//   id: number
//   executing: boolean
//   date: string
//   compiler: {
//     id: number
//     name: string
//     version: {
//       id: number
//       name: string
//     }
//   }
//   result: {
//     status: {
//       code: number
//       name: string
//     }
//     time: number
//     memory: number
//     signal_desc: string
//     streams: {
//       source: {
//         size: number
//         uri: string
//       }
//       input: {
//         size: number
//         uri: string
//       }
//       output: {
//         size: number
//         uri: string
//       }
//       error: {
//         size: number
//         uri: string
//       }
//       cmpinfo: {
//         size: number
//         uri: string
//       }
//     }
//   }
// }

// export class SphereEngine {
//   constructor(private readonly config: SphereConfig) {}

//   async createCompilerSubmission(payload: CreateCompilerSubmissionPayload) {
//     if (!this.config.compilers) {
//       throw new Error('Compilers not configured')
//     }

//     const res = await fetch(
//       `https://${this.config.compilers.endpoint}/api/v4/submissions?access_token=${this.config.compilers.accessToken}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       },
//     )

//     if (!res.ok) {
//       throw new Error(`Failed to create compiler submission: ${res.statusText}`)
//     }

//     return (await res.json()) as CreateCompilerSubmissionResponse
//   }

//   async getCompilerSubmission(id: number) {
//     if (!this.config.compilers) {
//       throw new Error('Compilers not configured')
//     }

//     const res = await fetch(
//       `https://${this.config.compilers.endpoint}/api/v4/submissions/${id}?access_token=${this.config.compilers.accessToken}`,
//     )

//     if (!res.ok) {
//       throw new Error(`Failed to get compiler submission: ${res.statusText}`)
//     }

//     return (await res.json()) as GetCompilerSubmissionResponse
//   }

//   async getStdout(uri: string) {
//     const res = await fetch(uri)

//     if (!res.ok) {
//       throw new Error(`Failed to get stdout: ${res.statusText}`)
//     }

//     return res.text()
//   }
// }

// export const sphere = new SphereEngine({
//   compilers: {
//     endpoint: process.env.SPHERE_COMPILERS_ENDPOINT,
//     accessToken: process.env.SPHERE_COMPILERS_ACCESS_TOKEN,
//   },
// })

export {}
