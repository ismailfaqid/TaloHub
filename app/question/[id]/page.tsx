"use client";

import { getQuestionById, createAnswer, recordView, toggleLike, toggleDislike, toggleAnswerLike, toggleAnswerDislike, toggleFollow } from "@/app/actions/questions";
import { getMe } from "@/app/actions/auth";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Eye, ArrowLeft, Loader2, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export default function QuestionDetailPage() {
    const { t: translations } = useLanguage();
    const t = translations.questionDetail;
    const { id } = useParams();
    const router = useRouter();
    const [question, setQuestion] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);

    const [user, setUser] = useState<any>(null);

    const loadQuestion = async () => {
        const userData = await getMe();
        setUser(userData);

        const data = await getQuestionById(id as string);
        if (!data) {
            router.push("/");
            return;
        }
        setQuestion(data);
        setLiked(data.hasLiked);
        setDisliked(data.hasDisliked || false);
        setLikesCount(data._count.likes);
        setDislikesCount(data._count.dislikes || 0);
        setIsLoading(false);
        recordView(id as string);
    };

    useEffect(() => {
        loadQuestion();
    }, [id]);

    const handleLike = async () => {
        const prevLiked = liked;
        const prevDisliked = disliked;

        setLiked(!prevLiked);
        setLikesCount(prev => prevLiked ? prev - 1 : prev + 1);

        if (prevDisliked) {
            setDisliked(false);
            setDislikesCount(prev => prev - 1);
        }

        const result = await toggleLike(id as string);
        if (result.error) {
            setLiked(prevLiked);
            setLikesCount(question._count.likes);
            setDisliked(prevDisliked);
            setDislikesCount(question._count.dislikes || 0);
        }
    };

    const handleDislike = async () => {
        const prevLiked = liked;
        const prevDisliked = disliked;

        setDisliked(!prevDisliked);
        setDislikesCount(prev => prevDisliked ? prev - 1 : prev + 1);

        if (prevLiked) {
            setLiked(false);
            setLikesCount(prev => prev - 1);
        }

        const result = await toggleDislike(id as string);
        if (result.error) {
            setLiked(prevLiked);
            setLikesCount(question._count.likes);
            setDisliked(prevDisliked);
            setDislikesCount(question._count.dislikes || 0);
        }
    };

    const handleAnswerLike = async (answerId: string) => {
        const answerIndex = question.answers.findIndex((a: any) => a.id === answerId);
        if (answerIndex === -1) return;

        const answer = question.answers[answerIndex];
        const prevLiked = answer.hasLiked;
        const prevDisliked = answer.hasDisliked;

        const updatedAnswers = [...question.answers];
        updatedAnswers[answerIndex] = {
            ...answer,
            hasLiked: !prevLiked,
            hasDisliked: false,
            _count: {
                likes: prevLiked ? (answer._count?.likes || 0) - 1 : (answer._count?.likes || 0) + 1,
                dislikes: prevDisliked ? (answer._count?.dislikes || 0) - 1 : (answer._count?.dislikes || 0)
            }
        };

        setQuestion({ ...question, answers: updatedAnswers });

        const result = await toggleAnswerLike(answerId);
        if (result.error) {
            loadQuestion();
        }
    };

    const handleAnswerDislike = async (answerId: string) => {
        const answerIndex = question.answers.findIndex((a: any) => a.id === answerId);
        if (answerIndex === -1) return;

        const answer = question.answers[answerIndex];
        const prevLiked = answer.hasLiked;
        const prevDisliked = answer.hasDisliked;

        const updatedAnswers = [...question.answers];
        updatedAnswers[answerIndex] = {
            ...answer,
            hasDisliked: !prevDisliked,
            hasLiked: false,
            _count: {
                dislikes: prevDisliked ? (answer._count?.dislikes || 0) - 1 : (answer._count?.dislikes || 0) + 1,
                likes: prevLiked ? (answer._count?.likes || 0) - 1 : (answer._count?.likes || 0)
            }
        };

        setQuestion({ ...question, answers: updatedAnswers });

        const result = await toggleAnswerDislike(answerId);
        if (result.error) {
            loadQuestion();
        }
    };

    const [followLoading, setFollowLoading] = useState<string | null>(null);

    const handleFollow = async (followingId: string, isQuestionAuthor: boolean, answerId?: string) => {
        if (followLoading) return;

        setFollowLoading(isQuestionAuthor ? "question" : answerId!);

        // Optimistic update
        if (isQuestionAuthor) {
            setQuestion({
                ...question,
                isFollowing: !question.isFollowing
            });
        } else {
            const updatedAnswers = question.answers.map((a: any) =>
                a.id === answerId ? { ...a, isFollowing: !a.isFollowing } : a
            );
            setQuestion({ ...question, answers: updatedAnswers });
        }

        try {
            await toggleFollow(followingId);
        } catch (err) {
            // Revert
            loadQuestion();
        } finally {
            setFollowLoading(null);
        }
    };

    async function handleSubmitAnswer(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        formData.append("questionId", id as string);

        const result = await createAnswer(formData);
        if (result.success) {
            loadQuestion();
            (event.target as HTMLFormElement).reset();
        }
        setIsSubmitting(false);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                {t.back}
            </Link>

            <div className="bg-card border border-border rounded-3xl p-8 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <Link href={`/profile/${question.author.id}`} className="transition-transform hover:scale-105">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-md overflow-hidden ring-2 ring-background">
                            {question.author.image ? (
                                <img src={question.author.image} alt={question.author.name} className="h-full w-full object-cover" />
                            ) : (
                                question.author.name.charAt(0).toUpperCase()
                            )}
                        </div>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={`/profile/${question.author.id}`} className="font-bold hover:text-primary transition-colors">
                                {question.author.name}
                            </Link>
                            {question.author.isExpert && (
                                <span className="bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">EXPERT</span>
                            )}
                            <div className="h-1 w-1 rounded-full bg-slate-300 mx-1"></div>
                            <button
                                onClick={() => handleFollow(question.author.id, true)}
                                disabled={followLoading === "question"}
                                className={cn(
                                    "text-[10px] font-bold transition-all hover:scale-105 active:scale-95",
                                    question.isFollowing
                                        ? "text-muted-foreground hover:text-red-500"
                                        : "text-primary hover:text-primary/80"
                                )}
                            >
                                {question.isFollowing ? translations.common.unfollow : translations.common.follow}
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {new Date(question.createdAt).toLocaleDateString()} • {question.category}
                        </p>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 leading-tight">{question.title}</h1>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{question.content}</p>

                <div className="flex items-center justify-between pt-6 border-t">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-muted/50 rounded-full p-1 border">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLike}
                                className={cn(
                                    "h-10 px-4 rounded-full gap-2",
                                    liked ? "text-primary bg-primary/10" : "text-muted-foreground"
                                )}
                            >
                                <ThumbsUp className={cn("h-5 w-5", liked && "fill-primary")} />
                                <span className="font-bold">{likesCount}</span>
                            </Button>
                            <div className="w-[1px] h-6 bg-border mx-1"></div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDislike}
                                className={cn(
                                    "h-10 px-4 rounded-full",
                                    disliked ? "text-red-500 bg-red-500/10" : "text-muted-foreground"
                                )}
                            >
                                <ThumbsDown className={cn("h-5 w-5", disliked && "fill-red-500")} />
                                <span className="font-bold ml-2">{dislikesCount}</span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 px-4 h-10 bg-muted/30 rounded-full text-muted-foreground">
                            <Eye className="h-5 w-5" />
                            <span className="font-bold">{question.views} {t.views}</span>
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {question.answers.length}{" "}
                    {question.type === "POST" ? (question.answers.length === 1 ? "Comment" : "Comments") : (question.answers.length === 1 ? t.answers : t.answersPlural)}
                </h2>

                <div className="space-y-6">
                    {question.answers.map((answer: any) => (
                        <div key={answer.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Link href={`/profile/${answer.author.id}`} className="transition-transform hover:scale-105">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white text-sm shadow-sm overflow-hidden ring-2 ring-background">
                                        {answer.author.image ? (
                                            <img src={answer.author.image} alt={answer.author.name} className="h-full w-full object-cover" />
                                        ) : (
                                            answer.author.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                </Link>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/profile/${answer.author.id}`} className="font-bold text-sm hover:text-primary transition-colors">
                                            {answer.author.name}
                                        </Link>
                                        {answer.author.isExpert && (
                                            <span className="bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">EXPERT</span>
                                        )}
                                        <div className="h-1 w-1 rounded-full bg-slate-300 mx-1"></div>
                                        <button
                                            onClick={() => handleFollow(answer.author.id, false, answer.id)}
                                            disabled={followLoading === answer.id}
                                            className={cn(
                                                "text-[10px] font-bold transition-all hover:scale-105 active:scale-95",
                                                answer.isFollowing
                                                    ? "text-muted-foreground hover:text-red-500"
                                                    : "text-primary hover:text-primary/80"
                                            )}
                                        >
                                            {answer.isFollowing ? translations.common.unfollow : translations.common.follow}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        {new Date(answer.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed mb-4">{answer.content}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-muted/30">
                                <div className="flex items-center bg-muted/30 rounded-full p-0.5 border">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAnswerLike(answer.id)}
                                        className={cn(
                                            "h-8 px-3 rounded-full gap-2",
                                            answer.hasLiked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        <ThumbsUp className={cn("h-4 w-4", answer.hasLiked && "fill-primary")} />
                                        <span className="text-xs font-bold">{answer._count?.likes ?? 0}</span>
                                    </Button>
                                    <div className="w-[1px] h-4 bg-border/50 mx-1"></div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleAnswerDislike(answer.id)}
                                        className={cn(
                                            "h-8 px-3 rounded-full gap-2",
                                            answer.hasDisliked ? "text-red-500 bg-red-500/10" : "text-muted-foreground hover:text-red-500"
                                        )}
                                    >
                                        <ThumbsDown className={cn("h-4 w-4", answer.hasDisliked && "fill-red-500")} />
                                        <span className="text-xs font-bold">{answer._count?.dislikes ?? 0}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <h3 className="font-bold text-lg mb-4">{question.type === "POST" ? "Your Comment" : t.yourResponse || "Your Answer"}</h3>
                {user ? (
                    <form onSubmit={handleSubmitAnswer} className="space-y-4">
                        <Textarea
                            name="content"
                            placeholder={t.placeholder}
                            className="min-h-[150px] rounded-2xl p-4 bg-muted/20 border-border focus:ring-primary"
                            required
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        {t.sending}
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        {t.submit}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed border-border flex flex-col items-center">
                        <MessageSquare className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
                        <h4 className="text-xl font-bold mb-2">{question.type === "POST" ? "Login to comment" : "Login to answer"}</h4>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            {question.type === "POST"
                                ? "To comment on this post or participate in the community discussion, please log in to your account or sign up."
                                : "To answer this question or participate in the community discussion, please log in to your account or sign up."}
                        </p>
                        <div className="flex gap-4">
                            <Link href="/login">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-11 shadow-md">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="outline" className="font-bold px-8 h-11 border-primary/20 text-primary hover:bg-primary/5">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
