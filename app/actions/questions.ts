"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createQuestion(formData: FormData) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad su'aal u weydiiso." };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const type = (formData.get("type") as string) || "QUESTION";
    const isAnonymous = formData.get("isAnonymous") === "on";

    if (!title || !category) {
        return { error: "Fadlan buuxi dhammaan meelaha muhiimka ah." };
    }

    try {
        const question = await prisma.question.create({
            data: {
                title,
                content,
                category,
                type,
                isAnonymous,
                authorId: session.user.id,
            },
        });

        revalidatePath("/");
        revalidatePath("/empty-feed");
        return { success: true, id: question.id };
    } catch (err) {
        return { error: "Waxbaa khaldamay markii la dirayay su'aasha." };
    }
}

export async function toggleLike(questionId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad u 'like'-garayso." };
    }

    const userId = session.user.id;

    try {
        // Remove dislike if it exists
        await prisma.dislike.deleteMany({
            where: {
                userId,
                questionId,
            },
        });

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    questionId,
                },
            });

            // Create notification for question author
            const question = await prisma.question.findUnique({
                where: { id: questionId },
                select: { authorId: true, title: true },
            });

            if (question && question.authorId !== userId) {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { name: true },
                });
                const actorName = user?.name || "Qof";

                await prisma.notification.create({
                    data: {
                        userId: question.authorId,
                        type: "LIKE",
                        message: `${actorName} ayaa ka helay su'aashaada: "${question.title.substring(0, 30)}..."`,
                        link: `/question/${questionId}`,
                    },
                });
            }
        }

        revalidatePath("/");
        revalidatePath(`/question/${questionId}`);
        return { success: true };
    } catch (err) {
        console.error("Like toggle error:", err);
        return { error: "Waxbaa khaldamay." };
    }
}

export async function toggleDislike(questionId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad u 'dislike'-garayso." };
    }

    const userId = session.user.id;

    try {
        // Remove like if it exists
        await prisma.like.deleteMany({
            where: {
                userId,
                questionId,
            },
        });

        const existingDislike = await prisma.dislike.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId,
                },
            },
        });

        if (existingDislike) {
            await prisma.dislike.delete({
                where: { id: existingDislike.id },
            });
        } else {
            await prisma.dislike.create({
                data: {
                    userId,
                    questionId,
                },
            });
        }

        revalidatePath("/");
        revalidatePath(`/question/${questionId}`);
        return { success: true };
    } catch (err) {
        console.error("Dislike toggle error:", err);
        return { error: "Waxbaa khaldamay." };
    }
}

export async function recordView(questionId: string) {
    try {
        await prisma.question.update({
            where: { id: questionId },
            data: {
                views: { increment: 1 },
            },
        });
        return { success: true };
    } catch (err) {
        return { error: "Could not record view" };
    }
}

export async function getQuestions(searchQuery?: string, category?: string) {
    const session = await getSession();
    const userId = session?.user?.id;

    const whereClause: any = {};

    if (searchQuery) {
        whereClause.OR = [
            { title: { contains: searchQuery } },
            { content: { contains: searchQuery } },
        ];
    }

    if (category) {
        whereClause.category = category;
    }

    const questions = await prisma.question.findMany({
        where: whereClause,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    isExpert: true,
                    image: true,
                    followers: userId ? {
                        where: { followerId: userId },
                        select: { followerId: true }
                    } : false
                }
            },
            _count: {
                select: {
                    answers: true,
                    likes: true,
                    dislikes: true,
                },
            },
            likes: userId ? {
                where: { userId },
                select: { id: true }
            } : false,
            dislikes: userId ? {
                where: { userId },
                select: { id: true }
            } : false,
            answers: {
                orderBy: [
                    { likes: { _count: "desc" } },
                    { createdAt: "asc" },
                ],
                take: 1,
                select: {
                    content: true,
                },
            },
        },
    });

    return questions.map(q => ({
        ...q,
        hasLiked: userId ? (q.likes as any[]).length > 0 : false,
        hasDisliked: userId ? (q.dislikes as any[]).length > 0 : false,
        isFollowing: userId ? (q.author as any).followers?.length > 0 : false,
        topAnswer: (q.answers as any[])[0]?.content || null,
        _count: q._count || { answers: 0, likes: 0, dislikes: 0 },
    }));
}

export async function getQuestionById(id: string) {
    const session = await getSession();
    const userId = session?.user?.id;

    const question = await prisma.question.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    isExpert: true,
                    bio: true,
                    image: true,
                    followers: userId ? {
                        where: { followerId: userId },
                        select: { followerId: true }
                    } : false
                }
            },
            answers: {
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            isExpert: true,
                            image: true,
                            followers: userId ? {
                                where: { followerId: userId },
                                select: { followerId: true }
                            } : false
                        },
                    },
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true,
                        },
                    },
                    likes: userId ? {
                        where: { userId },
                        select: { id: true }
                    } : false,
                    dislikes: userId ? {
                        where: { userId },
                        select: { id: true }
                    } : false,
                },
                orderBy: [
                    { likes: { _count: "desc" } },
                    { createdAt: "asc" },
                ],
            },
            _count: {
                select: {
                    likes: true,
                    dislikes: true,
                    answers: true,
                },
            },
            likes: userId ? {
                where: { userId },
                select: { id: true }
            } : false,
            dislikes: userId ? {
                where: { userId },
                select: { id: true }
            } : false,
        },
    });

    if (!question) return null;

    return {
        ...question,
        hasLiked: userId ? (question.likes as any[]).length > 0 : false,
        hasDisliked: userId ? (question.dislikes as any[]).length > 0 : false,
        isFollowing: userId ? (question.author as any).followers?.length > 0 : false,
        answers: question.answers.map((a: any) => ({
            ...a,
            hasLiked: (userId && a.likes) ? (a.likes as any[]).length > 0 : false,
            hasDisliked: (userId && a.dislikes) ? (a.dislikes as any[]).length > 0 : false,
            isFollowing: userId ? (a.author as any).followers?.length > 0 : false,
            _count: a._count || { likes: 0, dislikes: 0 },
        })),
    };
}

export async function createAnswer(formData: FormData) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad uga jawaabto su'aasha." };
    }

    const content = formData.get("content") as string;
    const questionId = formData.get("questionId") as string;

    if (!content || !questionId) {
        return { error: "Fadlan buuxi jawaabta." };
    }

    try {
        await prisma.answer.create({
            data: {
                content,
                questionId,
                authorId: session.user.id,
            },
        });

        // Create notification for question author
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            select: { authorId: true, title: true },
        });

        if (question && question.authorId !== session.user.id) {
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { name: true },
            });
            const actorName = user?.name || "Qof";

            await prisma.notification.create({
                data: {
                    userId: question.authorId,
                    type: "ANSWER",
                    message: `${actorName} ayaa ka jawaabay su'aashaada: "${question.title.substring(0, 30)}..."`,
                    link: `/question/${questionId}`,
                },
            });
        }

        revalidatePath(`/question/${questionId}`);
        revalidatePath("/");
        return { success: true };
    } catch (err) {
        return { error: "Waxbaa khaldamay markii la dirayay jawaabta." };
    }
}

export async function toggleAnswerLike(answerId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad u 'like'-garayso." };
    }

    const userId = session.user.id;

    try {
        // Remove dislike if it exists
        await prisma.answerDislike.deleteMany({
            where: {
                userId,
                answerId,
            },
        });

        const existingLike = await prisma.answerLike.findUnique({
            where: {
                userId_answerId: {
                    userId,
                    answerId,
                },
            },
        });

        if (existingLike) {
            await prisma.answerLike.delete({
                where: { id: existingLike.id },
            });
        } else {
            await prisma.answerLike.create({
                data: {
                    userId,
                    answerId,
                },
            });
        }

        const answer = await prisma.answer.findUnique({
            where: { id: answerId },
            select: { questionId: true },
        });

        if (answer) {
            revalidatePath(`/question/${answer.questionId}`);
        }
        return { success: true };
    } catch (err) {
        return { error: "Waxbaa khaldamay." };
    }
}

export async function toggleAnswerDislike(answerId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        return { error: "Fadlan soo gal si aad u 'dislike'-garayso." };
    }

    const userId = session.user.id;

    try {
        // Remove like if it exists
        await prisma.answerLike.deleteMany({
            where: {
                userId,
                answerId,
            },
        });

        const existingDislike = await prisma.answerDislike.findUnique({
            where: {
                userId_answerId: {
                    userId,
                    answerId,
                },
            },
        });

        if (existingDislike) {
            await prisma.answerDislike.delete({
                where: { id: existingDislike.id },
            });
        } else {
            await prisma.answerDislike.create({
                data: {
                    userId,
                    answerId,
                },
            });
        }

        const answer = await prisma.answer.findUnique({
            where: { id: answerId },
            select: { questionId: true },
        });

        if (answer) {
            revalidatePath(`/question/${answer.questionId}`);
        }
        return { success: true };
    } catch (err) {
        return { error: "Waxbaa khaldamay." };
    }
}

export async function getTrendingTopics() {
    try {
        const topics = await prisma.question.groupBy({
            by: ["category"],
            _count: {
                _all: true,
            },
            orderBy: {
                _count: {
                    category: "desc",
                },
            },
            take: 5,
        });

        return topics.map((t: any) => ({
            name: t.category,
            count: t._count._all,
        }));
    } catch (err) {
        console.error("Failed to get trending topics:", err);
        return [];
    }
}

export async function getTopExperts() {
    const session = await getSession();
    const userId = session?.user?.id;

    try {
        // First try to get designated experts
        let experts = await prisma.user.findMany({
            where: {
                isExpert: true,
            },
            include: {
                _count: {
                    select: {
                        answers: true,
                    },
                },
                followers: userId ? {
                    where: { followerId: userId },
                    select: { followerId: true }
                } : false
            },
            orderBy: {
                answers: {
                    _count: "desc",
                },
            },
            take: 5,
        });

        // If no designated experts, get top answerers
        if (experts.length === 0) {
            experts = await prisma.user.findMany({
                where: {
                    answers: {
                        some: {}
                    }
                },
                include: {
                    _count: {
                        select: {
                            answers: true,
                        },
                    },
                    followers: userId ? {
                        where: { followerId: userId },
                        select: { followerId: true }
                    } : false
                },
                orderBy: {
                    answers: {
                        _count: "desc",
                    },
                },
                take: 5,
            });
        }

        // If still no experts/contributors found, just get recent users
        if (experts.length === 0) {
            experts = await prisma.user.findMany({
                where: {
                    name: { not: null }
                },
                include: {
                    _count: {
                        select: {
                            answers: true,
                        },
                    },
                    followers: userId ? {
                        where: { followerId: userId },
                        select: { followerId: true }
                    } : false
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            });
        }

        return experts.map((e: any) => ({
            id: e.id,
            name: e.name || "User",
            role: e.bio || (e.isExpert ? "Khubaro" : "Contributor"),
            answers: e._count.answers,
            avatar: e.name ? e.name.charAt(0).toUpperCase() : "U",
            image: e.image || null,
            isFollowing: userId ? (e.followers as any[])?.length > 0 : false
        }));
    } catch (err) {
        console.error("Failed to get top experts:", err);
        return [];
    }
}

export async function toggleFollow(followingId: string) {
    const session = await getSession();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const followerId = session.user.id;

    if (followerId === followingId) throw new Error("You cannot follow yourself");

    const existingFollow = await (prisma as any).follow.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId
            }
        }
    });

    if (existingFollow) {
        await (prisma as any).follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });
    } else {
        await (prisma as any).follow.create({
            data: {
                followerId,
                followingId
            }
        });

        // Create notification
        await (prisma as any).notification.create({
            data: {
                userId: followingId,
                type: "FOLLOW",
                message: `${session.user.name || "Someone"} started following you`,
                link: `/profile/${followerId}`
            }
        });
    }

    revalidatePath("/");
    revalidatePath("/question/[id]", "page");
    return { success: true };
}
