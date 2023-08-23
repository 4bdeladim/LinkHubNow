import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, password, confirmationPassword } = await req.json();
    try {
        const checkForExistingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (checkForExistingUser)
            return NextResponse.json(
                { error: 'Email is already used' },
                { status: 400 },
            );
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Email is not valid' },
                {
                    status: 400,
                },
            );
        }
        if (name.length <= 3) {
            return NextResponse.json(
                { error: 'Name must be more than 3 characters' },
                {
                    status: 400,
                },
            );
        }
        if (confirmationPassword !== password) {
            return NextResponse.json(
                { error: 'Password and confirmation password do not match' },
                {
                    status: 400,
                },
            );
        }
        if (password.length <= 8) {
            return NextResponse.json(
                { error: 'Password must be longer than 8 characters' },
                {
                    status: 400,
                },
            );
        }
        const hashedPassword = await argon2.hash(password);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return NextResponse.json({ message: 'User created' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 },
        );
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
