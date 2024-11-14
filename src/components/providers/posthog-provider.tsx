'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
    useEffect(() => {
      console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY)
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "/ingest",
        ui_host: 'https://eu.posthog.com'
      })
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}