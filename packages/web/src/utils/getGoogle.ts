let googlePromise: Promise<typeof import('google-one-tap')> | null = null

declare global {
  const google: typeof import('google-one-tap')
}

export const getGoogle = async () => {
  if (typeof google !== 'undefined') {
    return google
  }

  if (googlePromise) {
    return googlePromise
  }

  const scriptTagRef = document.createElement('script')
  scriptTagRef.src = 'https://accounts.google.com/gsi/client'
  scriptTagRef.async = true
  scriptTagRef.defer = true
  document.body.appendChild(scriptTagRef)

  googlePromise = new Promise(resolve => {
    scriptTagRef.onload = () => {
      resolve(google)
    }
  })

  return googlePromise
}
