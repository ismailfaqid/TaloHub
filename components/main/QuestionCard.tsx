"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toggleLike, toggleDislike, toggleFollow } from "@/app/actions/questions";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useRouter } from "next/navigation";

interface QuestionCardProps {
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    category: string;
    type?: string;
    isExpert?: boolean;
    authorImage?: string | null;
    answers: number;
    likes: number;
    views: number;
    time: string;
    hasLiked?: boolean;
    hasDisliked?: boolean;
    isFollowing?: boolean;
    dislikes?: number;
    topAnswer?: string | null;
}

export function QuestionCard({
    id,
    title,
    content,
    author,
    authorId,
    category,
    type = "QUESTION",
    isExpert,
    authorImage,
    answers,
    likes: initialLikes,
    views,
    time,
    hasLiked: initialHasLiked = false,
    hasDisliked: initialHasDisliked = false,
    isFollowing: initialIsFollowing = false,
    dislikes: initialDislikes = 0,
    topAnswer,
}: QuestionCardProps) {
    const { t: translations } = useLanguage();
    const t = translations.feed;
    const tc = translations.common;
    const [liked, setLiked] = useState(initialHasLiked);
    const [disliked, setDisliked] = useState(initialHasDisliked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [dislikesCount, setDislikesCount] = useState(initialDislikes);
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followLoading, setFollowLoading] = useState(false);
    const router = useRouter();

    const isPost = type === "POST";

    const handleFollow = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (followLoading) return;

        const prevFollowing = isFollowing;
        setIsFollowing(!prevFollowing);
        setFollowLoading(true);

        try {
            await toggleFollow(authorId);
        } catch (err) {
            setIsFollowing(prevFollowing);
        } finally {
            setFollowLoading(false);
        }
    };

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const prevLiked = liked;
        const prevDisliked = disliked;

        // Optimistic update
        setLiked(!prevLiked);
        setLikesCount(prev => prevLiked ? prev - 1 : prev + 1);

        if (prevDisliked) {
            setDisliked(false);
            setDislikesCount(prev => prev - 1);
        }

        const result = await toggleLike(id);
        if (result.error) {
            // Revert on error
            setLiked(prevLiked);
            setLikesCount(initialLikes);
            setDisliked(prevDisliked);
            setDislikesCount(initialDislikes);
        }
    };

    const handleDislike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const prevLiked = liked;
        const prevDisliked = disliked;

        // Optimistic update
        setDisliked(!prevDisliked);
        setDislikesCount(prev => prevDisliked ? prev - 1 : prev + 1);

        if (prevLiked) {
            setLiked(false);
            setLikesCount(prev => prev - 1);
        }

        const result = await toggleDislike(id);
        if (result.error) {
            // Revert on error
            setLiked(prevLiked);
            setLikesCount(initialLikes);
            setDisliked(prevDisliked);
            setDislikesCount(initialDislikes);
        }
    };

    return (
        <div
            onClick={() => router.push(`/question/${id}`)}
            className="bg-white dark:bg-card border border-border p-5 rounded-2xl hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-md group block"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Link
                        href={`/profile/${authorId}`}
                        className="relative group/avatar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm group-hover/avatar:bg-primary/10 group-hover/avatar:text-primary transition-colors overflow-hidden">
                            {authorImage ? (
                                <img src={authorImage} alt={author} className="h-full w-full object-cover" />
                            ) : (
                                author.charAt(0)
                            )}
                        </div>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/profile/${authorId}`}
                                className="font-bold text-sm hover:text-primary hover:underline transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {author}
                            </Link>
                            {isExpert && (
                                <div className="bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                                    EXPERT
                                </div>
                            )}
                            <div className="h-1 w-1 rounded-full bg-slate-300 mx-1"></div>
                            <button
                                onClick={handleFollow}
                                disabled={followLoading}
                                className={cn(
                                    "text-[10px] font-bold transition-all hover:scale-105 active:scale-95",
                                    isFollowing
                                        ? "text-muted-foreground hover:text-red-500"
                                        : "text-primary hover:text-primary/80"
                                )}
                            >
                                {isFollowing ? tc.unfollow : tc.follow}
                            </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            {isPost ? "Post" : "Question"} • {time}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-100 dark:bg-muted text-muted-foreground px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                        {category}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight flex items-start gap-2">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {content}
                </p>
            </div>

            {topAnswer && !isPost && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                    <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">
                        <Star className="h-3 w-3 fill-blue-600" />
                        {t.topAnswer}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {topAnswer}
                    </p>
                </div>
            )}

            {topAnswer && isPost && (
                <div className="mb-4 p-3 bg-slate-50 dark:bg-muted/50 rounded-xl border border-slate-100 dark:border-border/50">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-bold mb-1">
                        <MessageSquare className="h-3 w-3" />
                        Top Comment
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {topAnswer}
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-border/50">
                <div className="flex items-center gap-1 sm:gap-4">
                    <div className="flex items-center bg-slate-50 dark:bg-muted/50 rounded-full p-1 border border-slate-100 dark:border-border/50">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={cn(
                                "h-8 px-3 rounded-full gap-2 transition-all",
                                liked ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20" : "text-muted-foreground hover:text-blue-600"
                            )}
                        >
                            <ThumbsUp className={cn("h-4 w-4", liked && "fill-blue-600")} />
                            <span className="text-xs font-bold">{likesCount}</span>
                        </Button>
                        <div className="w-[1px] h-4 bg-slate-200 dark:bg-border mx-1"></div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDislike}
                            className={cn(
                                "h-8 px-3 rounded-full transition-all",
                                disliked ? "text-red-600 bg-red-50 dark:bg-red-900/20" : "text-muted-foreground hover:text-red-600"
                            )}
                        >
                            <ThumbsDown className={cn("h-4 w-4", disliked && "fill-red-600")} />
                            <span className="text-xs font-bold ml-2">{dislikesCount}</span>
                        </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="h-9 gap-2 text-muted-foreground hover:text-primary rounded-full px-4">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-bold">{answers}</span>
                        <span className="hidden md:inline-block font-normal ml-1">
                            {isPost ? (answers === 1 ? "Comment" : "Comments") : (answers === 1 ? "Answer" : "Answers")}
                        </span>
                    </Button>

                    <div className="hidden sm:flex items-center gap-2 text-muted-foreground px-2">
                        <Eye className="h-4 w-4" />
                        <span className="text-xs font-bold">{views}</span>
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

const Star = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
