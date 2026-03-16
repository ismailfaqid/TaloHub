"use client";

import { AskBox } from "@/components/main/AskBox";
import { FilterBar } from "@/components/main/FilterBar";
import { QuestionCard } from "@/components/main/QuestionCard";
import { getQuestions } from "@/app/actions/questions";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TopicPage() {
    const { t: translations } = useLanguage();
    const t = translations.feed;
    const tc = translations.common;
    const ts = translations.sidebar;
    const params = useParams();
    const category = params.category as string;

    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Map category slug to display name
    const categoryName = ts[category as keyof typeof ts] || category;

    useEffect(() => {
        async function loadQuestions() {
            try {
                setLoading(true);
                // We pass the category as the second argument to filter by it
                const data = await getQuestions(undefined, category);
                setQuestions(data || []);
            } catch (error) {
                console.error("Failed to load questions:", error);
            } finally {
                setLoading(false);
            }
        }
        loadQuestions();
    }, [category]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        {translations.questionDetail.back}
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-lg uppercase tracking-wider">
                            {categoryName}
                        </span>
                    </h1>
                </div>
            </div>

            <AskBox />

            <FilterBar />

            <div className="space-y-4">
                {loading ? (
                    <div className="py-12 text-center text-muted-foreground">{tc.loading}</div>
                ) : questions.length === 0 ? (
                    <div className="text-center py-20 bg-card border border-dashed rounded-3xl flex flex-col items-center">
                        <p className="text-muted-foreground font-medium text-lg mb-2">
                            {t.empty}
                        </p>
                        <p className="text-sm text-muted-foreground opacity-70">
                            Be the first to ask a question in {categoryName}!
                        </p>
                    </div>
                ) : (
                    questions.map((q: any) => (
                        <QuestionCard
                            key={q.id}
                            id={q.id}
                            author={q.isAnonymous ? tc.anonymous : (q.author.name || tc.user)}
                            authorId={q.author.id}
                            authorImage={q.isAnonymous ? null : q.author.image}
                            isExpert={q.author.isExpert}
                            time={new Date(q.createdAt).toLocaleDateString()}
                            category={q.category}
                            type={q.type}
                            title={q.title}
                            content={q.content}
                            likes={q._count.likes}
                            dislikes={q._count.dislikes}
                            views={q.views}
                            answers={q._count.answers}
                            hasLiked={q.hasLiked}
                            hasDisliked={q.hasDisliked}
                            isFollowing={q.isFollowing}
                            topAnswer={q.topAnswer}
                        />
                    ))
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <button className="w-full rounded-2xl border border-dashed border-border py-6 text-sm font-bold text-muted-foreground hover:bg-muted/50 hover:border-primary/30 hover:text-primary transition-all group">
                    {t.more}
                </button>
            </div>
        </div>
    );
}
