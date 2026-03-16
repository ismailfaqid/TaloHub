"use client";

import { Logo } from "@/components/main/Logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;

        try {
            const result = await requestPasswordReset(email);
            if (result.success) {
                // Success: redirect to verify code page
                router.push(`/verify-code?email=${encodeURIComponent(email)}`);
            } else {
                setError("Ma dhici karto in la soo diro koodhka hadda.");
            }
        } catch (err) {
            setError("Waxbaa khaldamay, fadlan isku day markale.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
            <header className="w-full py-4 px-4 md:px-12 flex items-center justify-between bg-white border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>
                <Link href="/login">
                    <Button variant="ghost" className="text-teal-600 font-medium">
                        Log in
                    </Button>
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 max-w-sm mx-auto text-center">
                <div className="bg-primary/5 p-4 rounded-full mb-6">
                    <div className="bg-transparent h-12 w-12 rounded-full flex items-center justify-center text-primary">
                        <RefreshCw className="h-8 w-8" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Miyaad ilaawday lambarka sirta ah?
                </h1>
                <p className="text-muted-foreground mb-8 text-sm">
                    Geli email-kaaga si aan kuugu soo dirno xiriirka dib-u-dejinta.
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email-kaaga</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="email" name="email" type="email" placeholder="magaca@email.com" className="pl-9" required />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-teal-700 hover:bg-teal-800"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {isLoading ? "Waa la dirayaa..." : "Soo dir Koodka"} <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                </form>

                <Link href="/login" className="mt-8 flex items-center text-sm font-medium text-teal-600 hover:underline">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Ku laabo soo gelitaanka
                </Link>
            </main>
        </div>
    );
}
