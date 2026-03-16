"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer } from "@/components/layout/Footer";
import { Suspense } from "react";


export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = ["/welcome", "/login", "/signup", "/forgot-password", "/reset-password", "/reset-success", "/verify-code"].includes(pathname);
    const isAskPage = pathname === "/ask";
    const isExpertsPage = pathname === "/top-experts";
    const isSettingsPage = pathname === "/settings";

    if (isAuthPage) {
        return <main className="min-h-screen bg-[#FAFAFA]">{children}</main>;
    }

    if (isAskPage || isSettingsPage) {
        return (
            <div className="relative flex min-h-screen flex-col bg-[#F9FAFB]">
                <Suspense fallback={<div className="h-16 border-b"></div>}>
                    <Navbar />
                </Suspense>
                <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-8">
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 border-b"></div>}>
                <Navbar />
            </Suspense>
            <div className="flex-1 container max-w-screen-2xl mx-auto flex gap-6 px-4 md:px-8 pt-6">
                <Sidebar />
                <main className="flex-1 min-w-0 pb-10">
                    {children}
                </main>
                {!isExpertsPage && <RightSidebar />}
            </div>
            <Footer />
        </div>
    );
}
