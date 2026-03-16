"use server";

import prisma from "@/lib/db";
import { hash, compare } from "bcryptjs";
import { login, logout, getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getMe() {
    const session = await getSession();
    if (!session || !session.user) return null;

    return await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isExpert: true,
            bio: true,
            image: true,
            _count: {
                select: {
                    followers: true,
                    following: true,
                }
            }
        },
    });
}

export async function signup(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Fadlan buuxi dhammaan meelaha bannaan." };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Iimaylkan mar hore ayaa la isticmaalay." };
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    });

    await login({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    });

    redirect("/");
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Fadlan buuxi dhammaan meelaha bannaan." };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: "Iimaylka ama erayga sirta ah waa khalad." };
    }

    const isValid = await compare(password, user.passwordHash);

    if (!isValid) {
        return { error: "Iimaylka ama erayga sirta ah waa khalad." };
    }

    await login({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    });

    redirect("/");
}

export async function logoutAction() {
    await logout();
    redirect("/");
}

export async function requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        // We returning success even if user not found for security reasons
        return { success: true };
    }

    const token = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.verificationToken.upsert({
        where: {
            identifier_token: {
                identifier: email,
                token: token,
            },
        },
        update: { expires },
        create: {
            identifier: email,
            token,
            expires,
        },
    });

    // In a real app, you would send this via email. For now, we'll just log it.
    console.log(`Password reset code for ${email}: ${token}`);

    return { success: true };
}

export async function verifyCode(email: string, code: string) {
    const tokenRecord = await prisma.verificationToken.findUnique({
        where: {
            identifier_token: {
                identifier: email,
                token: code,
            },
        },
    });

    if (!tokenRecord || tokenRecord.expires < new Date()) {
        return { error: "Koodhka waa khalad ama wuu dhacay." };
    }

    return { success: true };
}

export async function resetPassword(email: string, code: string, newPassword: string) {
    const tokenRecord = await prisma.verificationToken.findUnique({
        where: {
            identifier_token: {
                identifier: email,
                token: code,
            },
        },
    });

    if (!tokenRecord || tokenRecord.expires < new Date()) {
        return { error: "Koodhka waa khalad ama wuu dhacay." };
    }

    const passwordHash = await hash(newPassword, 10);

    await prisma.user.update({
        where: { email },
        data: { passwordHash },
    });

    // Delete the token
    await prisma.verificationToken.delete({
        where: { id: tokenRecord.id },
    });

    return { success: true };
}

export async function updateAccount(formData: FormData) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Lama ogola." };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("new-pass") as string;
    const confirmPassword = formData.get("confirm-pass") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string; // Expecting base64 string

    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (bio !== null) data.bio = bio;
    if (image) data.image = image;

    if (newPassword) {
        if (newPassword !== confirmPassword) {
            return { error: "Password-ka cusub iyo kan xaqiijinta isma laha." };
        }
        data.passwordHash = await hash(newPassword, 10);
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data,
        });

        // Update the session with new info
        await login({
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role,
        });

        return { success: true };
    } catch (err) {
        return { error: "Waxbaa khaldamay markii la kaydinayay xogta." };
    }
}
