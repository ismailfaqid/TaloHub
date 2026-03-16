"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle, ThumbsUp, MessageCircle, Settings, BellOff, Loader2 } from "lucide-react";
import { getNotifications, markAsRead } from "@/app/actions/notifications";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotificationsPage() {
    const { t: translations } = useLanguage();
    const t = translations.notifications;
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadNotifications = async () => {
        const data = await getNotifications();
        setNotifications(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const handleMarkAsRead = async (id: string, link: string) => {
        await markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllAsRead = async () => {
        const unread = notifications.filter(n => !n.read);
        await Promise.all(unread.map(n => markAsRead(n.id)));
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                </div>
                {notifications.some(n => !n.read) && (
                    <Button
                        variant="ghost"
                        onClick={handleMarkAllAsRead}
                        className="text-primary font-medium hover:text-primary/90"
                    >
                        {t.markAllRead}
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed flex flex-col items-center">
                        <BellOff className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <p className="text-muted-foreground font-medium">{t.empty}</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <Link
                            key={notification.id}
                            href={notification.link || "#"}
                            onClick={() => !notification.read && handleMarkAsRead(notification.id, notification.link)}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${notification.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
                                }`}
                        >
                            <div className="shrink-0 mt-1">
                                {notification.type === "ANSWER" && (
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                )}
                                {notification.type === "LIKE" && (
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                        <ThumbsUp className="h-5 w-5" />
                                    </div>
                                )}
                                {notification.type === "SYSTEM" && (
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                                        <Settings className="h-5 w-5" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className={`text-sm ${!notification.read ? "font-semibold" : ""}`}>
                                        {notification.message.includes("ayaa ka jawaabay")
                                            ? `${notification.message.split(" ayaa ka jawaabay")[0]} ${t.answer}`
                                            : notification.message.includes("ayaa ka helay")
                                                ? `${notification.message.split(" ayaa ka helay")[0]} ${t.like}`
                                                : notification.message
                                        }
                                    </p>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </span>
                                        {!notification.read && (
                                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
