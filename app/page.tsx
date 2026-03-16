"use client";

import { AskBox } from "@/components/main/AskBox";
import { FilterBar } from "@/components/main/FilterBar";
import { QuestionCard } from "@/components/main/QuestionCard";
import { TrendingTopics } from "@/components/main/TrendingTopics";
import { TopExperts } from "@/components/main/TopExperts";
import { getQuestions } from "@/app/actions/questions";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useState, useEffect, use } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { t: translations } = useLanguage();
  const t = translations.feed;
  const tc = translations.common;
  const { q: query } = use(searchParams);

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        const data = await getQuestions(query);
        setQuestions(data || []);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto">
      <AskBox />

      <FilterBar />

      <div className="xl:hidden space-y-6 mb-8">
        <TrendingTopics />
        <TopExperts />
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">{tc.loading}</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 bg-card border rounded-xl">
            <p className="text-muted-foreground">
              {query
                ? `${t.noResults} "${query}"`
                : t.empty}
            </p>
          </div>
        ) : (
          questions.map((q: any) => (
            <QuestionCard
              key={q.id}
              id={q.id}
              author={q.isAnonymous ? tc.anonymous : (q.author.name || tc.user)}
              authorImage={q.isAnonymous ? null : q.author.image}
              isExpert={q.author.isExpert}
              time={new Date(q.createdAt).toLocaleDateString()}
              category={q.category}
              title={q.title}
              content={q.content}
              type={q.type}
              likes={q._count.likes}
              dislikes={q._count.dislikes}
              views={q.views}
              answers={q._count.answers}
              hasLiked={q.hasLiked}
              hasDisliked={q.hasDisliked}
              isFollowing={q.isFollowing}
              authorId={q.author.id}
              topAnswer={q.topAnswer}
            />
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="w-full rounded-lg border border-dashed border-border py-4 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
          {t.more}
        </button>
      </div>
    </div>
  );
}
