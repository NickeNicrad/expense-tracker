import bcrypt from 'bcrypt';

import User from "@/models/user";

import { NextResponse } from 'next/server';
import { connectToDB } from "@/utils/database";

const defaultImageUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

export const POST = async (request) => {
    const { username, email, password, confirmPass } = await request.json();

    try {
        if (!email || !username || !password || !confirmPass)
            return new NextResponse(JSON.stringify('Provide credentials before to continue!'), {
                status: 400
            });

        if (password !== confirmPass)
            return new NextResponse(JSON.stringify('Passwords must match!'), {
                status: 400
            });

        await connectToDB();

        const formattedUsername = username?.trim()?.replace(' ', '_')?.toLowerCase();

        const userExist = await User.findOne({
            email,
            username: formattedUsername
        })

        if (userExist)
            return new NextResponse(JSON.stringify('User already exists!'), {
                status: 400
            });

        const hashedPass = await bcrypt.hash(password?.trim(), 12);

        const newUser = new User({
            name: username?.trim(),
            image: defaultImageUrl,
            email: email?.trim(),
            password: hashedPass?.trim(),
            username: formattedUsername,
        });

        await newUser.save();

        return new NextResponse(JSON.stringify(newUser), {
            status: 201
        });
    } catch (error) {
        console.log(error?.message);
        
        return new NextResponse(JSON.stringify(error?.message), {
            status: 500
        });
    }
}