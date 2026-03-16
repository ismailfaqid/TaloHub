"use client";

import Link from "next/link";
import { Search, Bell, Menu, X, User, HeartPulse, Briefcase, GraduationCap, Scale, Cpu, BookOpen, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getMe } from "@/app/actions/auth";
import { getUnreadCount } from "@/app/actions/notifications";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/main/Logo";

export function Navbar() {
    const { t: translations } = useLanguage();
    const t = translations.navbar;
    const ts = translations.sidebar;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const mobileNavItems = [
        { name: ts.home, href: "/", icon: Home },
        { name: ts.health, href: "/topics", icon: HeartPulse },
        { name: ts.business, href: "/topics", icon: Briefcase },
        { name: ts.education, href: "/topics", icon: GraduationCap },
        { name: ts.law, href: "/topics", icon: Scale },
        { name: ts.religion, href: "/help", icon: BookOpen },
        { name: ts.tech, href: "/topics", icon: Cpu },
        { name: t.notifications, href: "/notifications", icon: Bell },
    ];

    useEffect(() => {
        async function loadData() {
            const userData = await getMe();
            setUser(userData);
            if (userData) {
                const count = await getUnreadCount();
                setUnreadCount(count);
            }
            setIsLoading(false);
        }
        loadData();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/");
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 hover:bg-muted rounded-md"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center px-4 md:px-8 max-w-2xl">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchPlaceholder}
                            className="w-full rounded-full bg-muted/50 pl-9 pr-4 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/50 transition-all"
                        />
                    </form>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">{t.home}</Link>
                        <Link href="/top-experts" className="hover:text-primary transition-colors">{t.experts}</Link>
                        <Link href="/topics" className="hover:text-primary transition-colors">{t.topics}</Link>
                    </div>

                    {!isLoading && (
                        <>
                            {user ? (
                                <>
                                    <Link href="/notifications">
                                        <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
                                            <Bell className="h-5 w-5 text-muted-foreground" />
                                            {unreadCount > 0 && (
                                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                                            )}
                                        </button>
                                    </Link>

                                    <Link href="/settings">
                                        <button className="overflow-hidden rounded-full border border-border">
                                            <div className="h-8 w-8 bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                                                {user?.image ? (
                                                    <img src={user.image} alt={user?.name || "User"} className="h-full w-full object-cover" />
                                                ) : (
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm">{t.login}</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button size="sm" className="bg-primary text-primary-foreground">{t.signup}</Button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-border bg-background p-4 absolute w-full left-0 shadow-lg">
                    <div className="mb-4">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full rounded-full bg-muted/50 pl-9 pr-4 py-2 text-sm outline-none"
                            />
                        </form>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {mobileNavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                            >
                                <item.icon className="h-4 w-4 text-primary" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                        {user ? (
                            <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <User className="h-4 w-4" /> {t.account}
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full">{t.login}</Button>
                            </Link>
                        )}
                        <Link href="/help" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <BookOpen className="h-4 w-4" /> {t.help}
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
