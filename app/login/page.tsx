"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/main/Logo";

export default function LoginPage() {
    const { t: translations } = useLanguage();
    const t = translations.login;
    const tc = translations.common;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await loginAction(formData);
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (err) {
            setError(tc.error);
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            {/* Custom Header */}
            <header className="w-full py-4 px-4 md:px-12 flex items-center justify-between bg-white border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
                        <Link href="/top-experts" className="hover:text-teal-600 transition-colors">Experts</Link>
                        <Link href="/topics" className="hover:text-teal-600 transition-colors">Topics</Link>
                        <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
                    </nav>
                    <Link href="/signup">
                        <Button variant="outline" className="text-teal-600 border-teal-200 hover:bg-teal-50 font-medium px-6 rounded-md">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.title}</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            {t.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        <Button type="button" variant="outline" className="w-full h-11 justify-center gap-3 bg-white text-slate-700 border-slate-200 hover:bg-slate-50">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
                                <path d="M12 22C14.664 22 17.084 20.948 18.8505 19.244L15.9315 16.634C14.881 17.4725 13.535 18 12 18C9.362 18 7.1265 16.3025 6.2975 13.93L3.06104 16.3985C4.73054 19.742 8.11304 22 12 22Z" fill="#4CAF50" />
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.257 15.108 16.643 16.0965 15.9315 16.634L18.8506 19.244C20.6696 17.562 21.8055 15.0215 21.8055 12C21.8055 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                            </svg>
                            {t.google}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">{t.or}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t.email}</Label>
                                <Input id="email" name="email" type="email" placeholder="magaca@email.com" className="h-11" required />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">{t.password}</Label>
                                    <Link href="/forgot-password" className="text-xs font-medium text-teal-600 hover:underline">
                                        {t.forgot}
                                    </Link>
                                </div>
                                <Input id="password" name="password" type="password" className="h-11" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-semibold" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            {isLoading ? tc.loading : t.submit}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-slate-600">
                        {t.noAccount} <Link href="/signup" className="text-teal-600 font-bold hover:underline">{t.signup}</Link>
                    </p>

                    <Link href="/" className="flex items-center justify-center text-sm text-slate-500 hover:text-slate-900 mt-6">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
