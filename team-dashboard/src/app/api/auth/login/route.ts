import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/lib/cookies';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    try {
        // First authenticate with email/password
        const authResponse = await fetch(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/team/emailpass`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!authResponse.ok) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const authData = await authResponse.json();

        // Then get the team data using the token
        const teamResponse = await fetch(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/teams/me`,
            {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                },
            }
        );

        if (!teamResponse.ok) {
            return NextResponse.json({ error: 'Failed to get team data' }, { status: 500 });
        }

        const teamData = await teamResponse.json();

        // Set the auth cookie
        (await cookies()).set(COOKIE_NAME, authData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return NextResponse.json({
            token: authData.token,
            user: teamData
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}