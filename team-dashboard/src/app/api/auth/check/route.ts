import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/lib/cookies';

export async function GET() {
    try {
        // Get the token from cookies
        const token = (await cookies()).get(COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.json({ error: 'No token found' }, { status: 401 });
        }

        // Verify the token by fetching team data
        const teamResponse = await fetch(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/teams/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!teamResponse.ok) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const teamData = await teamResponse.json();

        return NextResponse.json({
            token,
            user: teamData
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Authentication check failed' }, { status: 500 });
    }
}