"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, ShieldCheck, Zap, Users, Loader2 } from "lucide-react";
import { signup } from "@/app/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/main/Logo";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        formData.append("name", `${firstName} ${lastName}`.trim());

        try {
            const result = await signup(formData);
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result?.success) {
                router.push("/");
            }
        } catch (err) {
            console.error("Signup submission error:", err);
            setError("Waxbaa khaldamay, fadlan isku day markale.");
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-800 font-sans">
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
                    <Link href="/login">
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 rounded-md">
                            Log in
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 px-4 w-full">
                {/* Hero Icon */}
                <div className="mb-4 p-4 bg-teal-50 rounded-full">
                    <div className="h-8 w-8 md:h-10 md:w-10 text-teal-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><circle cx="19" cy="5" r="2"></circle><circle cx="5" cy="19" r="2"></circle><path d="M12 12 19 5"></path><path d="M12 12 5 19"></path><circle cx="5" cy="5" r="2"></circle><path d="M12 12 5 5"></path><circle cx="19" cy="19" r="2"></circle><path d="M12 12 19 19"></path></svg>
                    </div>
                </div>

                <div className="mb-8 text-center px-4">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        Create a new account
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 mt-2">
                        Fill in the information below to join.
                    </p>
                </div>

                {/* Auth Card */}
                <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" name="first-name" placeholder="John" className="h-11 bg-slate-50 border-slate-200" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" name="last-name" placeholder="Doe" className="h-11 bg-slate-50 border-slate-200" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="name@email.com" className="h-11 bg-slate-50 border-slate-200" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="******" className="h-11 bg-slate-50 border-slate-200" required />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-medium justify-center gap-2 bg-[#00A99D] hover:bg-[#008f85] transition-colors shadow-sm mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Mail className="h-5 w-5" />
                            )}
                            {isLoading ? "Processing..." : "Create Account"}
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="bg-white px-3 text-slate-400 font-medium">OR</span>
                            </div>
                        </div>

                        <Button type="button" variant="outline" className="w-full h-12 text-sm sm:text-base font-medium text-slate-700 border-slate-200 justify-center gap-3 relative hover:bg-slate-50 transition-colors">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
                                <path d="M12 22C14.664 22 17.084 20.948 18.8505 19.244L15.9315 16.634C14.881 17.4725 13.535 18 12 18C9.362 18 7.1265 16.3025 6.2975 13.93L3.06104 16.3985C4.73054 19.742 8.11304 22 12 22Z" fill="#4CAF50" />
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.257 15.108 16.643 16.0965 15.9315 16.634L18.8506 19.244C20.6696 17.562 21.8055 15.0215 21.8055 12C21.8055 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                            </svg>
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm text-slate-500 mt-6 pt-2">
                            Already have an account? <Link href="/login" className="text-[#00A99D] font-bold hover:underline cursor-pointer">Log in</Link>
                        </p>
                    </form>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 grid grid-cols-3 gap-8 md:gap-20 text-center">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-4 w-4 text-teal-500 mb-1">
                            <ShieldCheck className="w-full h-full" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase group-hover:text-teal-500 transition-colors">Secure</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-4 w-4 text-teal-500 mb-1">
                            <Zap className="w-full h-full fill-current" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase group-hover:text-teal-500 transition-colors">Fast</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 group">
                        <div className="h-4 w-4 text-teal-500 mb-1">
                            <Users className="w-full h-full" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase group-hover:text-teal-500 transition-colors">Community</span>
                    </div>
                </div>

                <div className="mt-12 text-center max-w-sm mx-auto px-4">
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        By joining TaloHub, you agree to our <Link href="/terms"><span className="underline decoration-slate-300 cursor-pointer">Terms of Service</span></Link> and <Link href="/privacy"><span className="underline decoration-slate-300 cursor-pointer">Privacy Policy</span></Link>.
                    </p>
                </div>
            </main>

            <footer className="py-8 text-center text-xs text-slate-400 border-t border-gray-100 mt-auto bg-white">
                © 2026 TaloHub. Built with love for the community.
            </footer>
        </div>
    );
}
