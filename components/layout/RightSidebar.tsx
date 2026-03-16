import { TrendingTopics } from "@/components/main/TrendingTopics";
import { TopExperts } from "@/components/main/TopExperts";
import Link from "next/link";

export function RightSidebar() {
    return (
        <div className="hidden xl:block w-80 shrink-0 space-y-6 pt-6">
            <TrendingTopics />
            <TopExperts />

            <div className="flex flex-wrap gap-x-4 gap-y-2 px-2 text-xs text-muted-foreground">
                <Link href="/privacy" className="hover:underline hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:underline hover:text-primary transition-colors">Terms</Link>
                <Link href="/help" className="hover:underline hover:text-primary transition-colors">Help</Link>
                <Link href="/about" className="hover:underline hover:text-primary transition-colors">About</Link>
                <span>© 2026 Somali Q&A</span>
            </div>
        </div>
    );
}
