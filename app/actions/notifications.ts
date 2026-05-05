"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
    try {
        const session = await getSession();
        if (!session || !session.user) return [];

        return await prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });
    } catch (err) {
        console.error("getNotifications error:", err);
        return [];
    }
}

export async function markAsRead(id: string) {
    try {
        await prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
        revalidatePath("/notifications");
        return { success: true };
    } catch (err) {
        return { error: "Could not mark as read" };
    }
}

export async function getUnreadCount() {
    try {
        const session = await getSession();
        if (!session || !session.user) return 0;

        return await prisma.notification.count({
            where: {
                userId: session.user.id,
                isRead: false,
            },
        });
    } catch (err) {
        console.error("getUnreadCount error:", err);
        return 0;
    }
}
