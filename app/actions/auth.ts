"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getMe() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;

    return await prisma.user.findUnique({
        where: { id: user.id },
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

    try {
        const supabase = await createClient();
        // 0. Check if user already exists in Prisma to avoid unique constraint errors
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Iimaylkan mar hore ayaa la isticmaalay." };
        }

        // 1. Sign up with Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (authError) {
            console.error("Supabase signup error:", authError);
            return { error: authError.message };
        }

        if (!authData.user) {
            return { error: "Xogta isticmaalaha lama helin." };
        }

        // 2. Create user in Prisma using Supabase ID
        await prisma.user.create({
            data: {
                id: authData.user.id,
                name,
                email,
            },
        });

        return { success: true };
    } catch (e: any) {
        console.error("Signup exception:", e);
        return { error: e.message || "Xogta lama kaydin karo hadda. Fadlan mar kale isku day." };
    }
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Fadlan buuxi dhammaan meelaha bannaan." };
    }

    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Supabase login error:", error);
            return { error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error("Login exception:", e);
        return { error: e.message || "Waxa dhacay qalad xagga xiriirka ah." };
    }
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}

export async function requestPasswordReset(email: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
        console.error("Password reset request error:", error);
        return { error: error.message };
    }

        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function verifyOtp(email: string, token: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: "recovery",
        });

        if (error) return { error: error.message };
        return { success: true };
    } catch (err) {
        return { error: "Something went wrong" };
    }
}

export async function resetPassword(password: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            console.error("Password reset error:", error);
            return { error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function updateAccount(formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { error: "Lama ogola." };
        }

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const bio = formData.get("bio") as string;
        const image = formData.get("image") as string; // Expecting base64 string

        const data: any = {};
        if (name) data.name = name;
        if (email) data.email = email;
        if (bio !== null) data.bio = bio;
        if (image) data.image = image;

        await prisma.user.update({
            where: { id: user.id },
            data,
        });

        // Also update Supabase metadata if name changed
        if (name) {
            await supabase.auth.updateUser({
                data: { full_name: name }
            });
        }

        return { success: true };
    } catch (err: any) {
        console.error("Update account error:", err);
        return { error: err.message || "Waxbaa khaldamay markii la kaydinayay xogta." };
    }
}
