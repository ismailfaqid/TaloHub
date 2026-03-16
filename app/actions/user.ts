"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/session";

export async function getUserProfileById(id: string) {
    const session = await getSession();
    const currentUserId = session?.user?.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                bio: true,
                isExpert: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        questions: true,
                        answers: true,
                    }
                },
                followers: currentUserId ? {
                    where: { followerId: currentUserId },
                    select: { followerId: true }
                } : false,
                questions: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        _count: {
                            select: {
                                answers: true,
                                likes: true,
                            }
                        }
                    }
                },
                answers: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        question: {
                            select: {
                                id: true,
                                title: true,
                            }
                        },
                        _count: {
                            select: {
                                likes: true,
                            }
                        }
                    }
                }
            }
        });

        if (!user) return null;

        const questionsList = user.questions.filter(q => q.type === "QUESTION" || !q.type);
        const postsList = user.questions.filter(q => q.type === "POST");

        return {
            ...user,
            questions: questionsList,
            posts: postsList,
            _count: {
                ...user._count,
                questions: questionsList.length,
                posts: postsList.length,
            },
            isFollowing: currentUserId ? (user.followers as any[])?.length > 0 : false
        };
    } catch (err) {
        console.error("Failed to fetch user profile:", err);
        return null;
    }
}
