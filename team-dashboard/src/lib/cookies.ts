import { cookies } from 'next/headers'

export const COOKIE_NAME = 'team_auth'

export async function getAuthCookie() {
    const cookieStore = cookies()
    return (await cookieStore).get(COOKIE_NAME)
}

export async function setAuthCookie(value: string) {
    const cookieStore = cookies();
    (await cookieStore).set(COOKIE_NAME, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    })
}