'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

interface PHProviderProps {
    children: React.ReactNode
}

if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''; // Set a default value if the key is undefined
    posthog.init(posthogKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
    })
}

export function PHProvider({ children }: PHProviderProps) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}