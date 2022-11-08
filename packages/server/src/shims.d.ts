declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT?: string
      DATABASE_URL: string
      GOOGLE_CLIENT_ID: string
      SPACES_ENDPOINT: string
      SPACES_ACCESS_KEY_ID: string
      SPACES_SECRET_ACCESS_KEY: string
      SPACES_BUCKET_NAME: string
      SPACES_BUCKET_PUBLIC_DOMAIN: string
      JUDGE_HOST: string
      JUDGE_KEY: string
      DOMAIN_NAME: string
    }
  }
}

export {}
