"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
    const { t: translations } = useLanguage();
    const t = translations.footer;

    return (
        <footer className="bg-white border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block text-2xl font-black tracking-tight text-primary mb-4">
                            TaloHub<span className="text-[#FBA41A]">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm">
                            {t.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t.about}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    {t.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-primary transition-colors">
                                    {t.help}
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:text-primary transition-colors">
                                    {t.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    {t.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    {t.terms}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        {t.copyright}
                    </p>
                    {/* Placeholder for social links or future language switcher */}
                    <div className="flex gap-4">
                        <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                        <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                        <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
