"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getUserProfileById } from "@/app/actions/user";
import { toggleFollow } from "@/app/actions/questions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MessageSquare,
    HelpCircle,
    Users,
    UserCheck,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const { id } = useParams();
    const { t: translations } = useLanguage();
    const t = translations.profile;
    const tc = translations.common;
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"questions" | "posts" | "answers">("questions");

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getUserProfileById(id as string);
                if (!data) {
                    router.push("/");
                    return;
                }
                setUser(data);
            } catch (error) {
                console.error("Profile load error:", error);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, [id, router]);

    const handleFollow = async () => {
        if (followLoading) return;
        setFollowLoading(true);

        const prevFollowing = user.isFollowing;
        const prevFollowers = user._count.followers;

        // Optimistic update
        setUser({
            ...user,
            isFollowing: !prevFollowing,
            _count: {
                ...user._count,
                followers: prevFollowing ? prevFollowers - 1 : prevFollowers + 1
            }
        });

        try {
            await toggleFollow(user.id);
        } catch (error) {
            // Revert on error
            setUser({
                ...user,
                isFollowing: prevFollowing,
                _count: {
                    ...user._count,
                    followers: prevFollowers
                }
            });
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const avatarChar = user.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Button
                variant="ghost"
                size="sm"
                className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4" />
                {tc.backToHome}
            </Button>

            {/* Profile Header */}
            <div className="relative mb-12">
                <div className="h-32 w-full bg-gradient-to-r from-primary/20 via-sky-500/10 to-transparent rounded-3xl absolute -z-10 blur-xl opacity-50" />
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="relative group">
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary flex items-center justify-center text-white text-3xl md:text-5xl font-black shadow-xl ring-4 ring-background group-hover:scale-105 transition-transform overflow-hidden">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    avatarChar
                                )}
                            </div>
                            {user.isExpert && (
                                <div className="absolute -bottom-2 -right-2 bg-sky-500 text-white p-1.5 rounded-full shadow-lg border-2 border-background">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight mb-1">{user.name}</h1>
                                {user.isExpert && (
                                    <div className="inline-flex items-center gap-1.5 bg-sky-500/10 text-sky-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                        <Briefcase className="h-3.5 w-3.5" />
                                        EXPERT
                                    </div>
                                )}
                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                    {user.bio || "No bio yet."}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {t.memberSince} {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 font-bold">
                                        <Users className="h-4 w-4 text-primary" />
                                        {user._count.followers} <span className="font-normal text-muted-foreground">{tc.followers}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-bold">
                                        <UserCheck className="h-4 w-4 text-emerald-500" />
                                        {user._count.following} <span className="font-normal text-muted-foreground">{tc.following}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:pt-4">
                            <Button
                                onClick={handleFollow}
                                disabled={followLoading}
                                variant={user.isFollowing ? "outline" : "default"}
                                className={cn(
                                    "rounded-xl px-8 font-bold transition-all h-11",
                                    !user.isFollowing && "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20",
                                    user.isFollowing && "hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                                )}
                            >
                                {followLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : user.isFollowing ? (
                                    tc.unfollow
                                ) : (
                                    tc.follow
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="space-y-8">
                <div className="flex items-center gap-8 border-b border-border transition-all">
                    <button
                        onClick={() => setActiveTab("questions")}
                        className={cn(
                            "pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all",
                            activeTab === "questions" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <HelpCircle className="h-4 w-4" />
                        {t.questions}
                        <span className="bg-muted px-2 py-0.5 rounded-full text-[10px]">{user._count.questions}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={cn(
                            "pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all",
                            activeTab === "posts" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Briefcase className="h-4 w-4" />
                        {t.posts}
                        <span className="bg-muted px-2 py-0.5 rounded-full text-[10px]">{user._count.posts}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("answers")}
                        className={cn(
                            "pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all",
                            activeTab === "answers" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <MessageSquare className="h-4 w-4" />
                        {t.answers}
                        <span className="bg-muted px-2 py-0.5 rounded-full text-[10px]">{user._count.answers}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {activeTab === "questions" && (
                        user.questions.length === 0 ? (
                            <div className="text-center py-20 bg-muted/20 border border-dashed rounded-3xl">
                                <HelpCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground italic">{t.noQuestions}</p>
                            </div>
                        ) : (
                            user.questions.map((q: any) => (
                                <Link
                                    key={q.id}
                                    href={`/question/${q.id}`}
                                    className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            {q.category}
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-slate-300 mx-1" />
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(q.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2">{q.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{q.content}</p>
                                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                            {q._count.answers}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            {q._count.likes}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    )}

                    {activeTab === "posts" && (
                        user.posts.length === 0 ? (
                            <div className="text-center py-20 bg-muted/20 border border-dashed rounded-3xl">
                                <Briefcase className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground italic">{t.noPosts}</p>
                            </div>
                        ) : (
                            user.posts.map((p: any) => (
                                <Link
                                    key={p.id}
                                    href={`/question/${p.id}`}
                                    className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            {p.category}
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-slate-300 mx-1" />
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(p.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{p.content}</p>
                                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                            {p._count.answers}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            {p._count.likes}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    )}

                    {activeTab === "answers" && (
                        user.answers.length === 0 ? (
                            <div className="text-center py-20 bg-muted/20 border border-dashed rounded-3xl">
                                <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground italic">{t.noAnswers}</p>
                            </div>
                        ) : (
                            user.answers.map((a: any) => (
                                <Link
                                    key={a.id}
                                    href={`/question/${a.question.id}`}
                                    className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3 font-bold uppercase tracking-wider">
                                        <MessageSquare className="h-3 w-3 text-emerald-500" />
                                        Answer to:
                                    </div>
                                    <h3 className="font-bold text-base mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {a.question.title}
                                    </h3>
                                    <div className="bg-muted/30 p-4 rounded-xl border-l-4 border-primary/30 mb-4 italic text-sm text-muted-foreground line-clamp-3">
                                        {a.content}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(a.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            {a._count.likes} likes
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
