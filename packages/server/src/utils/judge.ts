import fetch from 'node-fetch'

export type SubmissionStatus = {
  id: number
  description: string
}

export type SubmissionLanguage = {
  id: number
  name: string
}

export type Submission = {
  source_code: string
  language_id: number
  stdin: string | null
  expected_output: string | null
  status_id: number
  created_at: string
  token: string
  number_of_runs: number
  cpu_time_limit: string | number
  cpu_extra_time: string | number
  wall_time_limit: string | number
  memory_limit: string | number
  stack_limit: number
  max_processes_and_or_threads: number
  enable_per_process_and_thread_time_limit: boolean
  enable_per_process_and_thread_memory_limit: boolean
  max_file_size: number
  redirect_stderr_to_stdout: boolean
  callback_url: string | null
  enable_network: boolean
  status: SubmissionStatus
  language: SubmissionLanguage
  // After execution
  memory?: number | string | null
  wall_time?: number | string | null
  time?: number | string | null
  finished_at?: string | null
  exit_code?: number | null
  exit_signal?: number | null
  message?: string | null
  compile_output?: string | null
  stderr?: string | null
  stdout?: string | null
}

export type CreateSubmissionPayload = Pick<Submission, 'source_code' | 'language_id'> &
  Partial<Omit<Submission, 'source_code' | 'language_id'>>
export type CreateSubmissionResponse = Pick<Submission, 'token'>
export const createSubmission = async (payload: CreateSubmissionPayload): Promise<CreateSubmissionResponse> => {
  const response = await fetch(`https://${process.env.JUDGE_HOST}/submissions?fields=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE_KEY,
      'X-RapidAPI-Host': process.env.JUDGE_HOST,
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`Failed to create submission: ${response.statusText} (${await response.text()})`)
  }
  return response.json() as Promise<CreateSubmissionResponse>
}

export const getSubmission = async <T extends keyof Submission>(
  token: string,
  fields: T[],
): Promise<Pick<Submission, T>> => {
  const response = await fetch(`https://${process.env.JUDGE_HOST}/submissions/${token}?fields=${fields.join(',')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE_KEY,
      'X-RapidAPI-Host': process.env.JUDGE_HOST,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed to get submission: ${response.statusText} (${await response.text()})`)
  }
  return response.json() as Promise<Pick<Submission, T>>
}
