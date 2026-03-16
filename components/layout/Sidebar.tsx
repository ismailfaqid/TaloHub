"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    HeartPulse,
    Briefcase,
    GraduationCap,
    Scale,
    Cpu,
    BookOpen,
    Home,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const { t: translations } = useLanguage();
    const t = translations.sidebar;
    const pathname = usePathname();

    const navigation = [
        { name: t.home, href: "/", icon: Home, current: pathname === "/" },
        { name: t.health, href: "/topic/health", icon: HeartPulse, current: pathname === "/topic/health" },
        { name: t.business, href: "/topic/business", icon: Briefcase, current: pathname === "/topic/business" },
        { name: t.education, href: "/topic/education", icon: GraduationCap, current: pathname === "/topic/education" },
        { name: t.religion, href: "/topic/religion", icon: BookOpen, current: pathname === "/topic/religion" },
        { name: t.tech, href: "/topic/tech", icon: Cpu, current: pathname === "/topic/tech" },
        { name: t.law, href: "/topic/law", icon: Scale, current: pathname === "/topic/law" },
    ];

    return (
        <div className="hidden lg:block w-64 shrink-0 border-r border-border bg-card pb-12">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                        {t.categories}
                    </h2>
                    <div className="space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                                    item.current ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                        {t.about}
                    </h2>
                    <div className="rounded-lg bg-muted/50 p-4 mx-2">
                        <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.welcome }}>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
