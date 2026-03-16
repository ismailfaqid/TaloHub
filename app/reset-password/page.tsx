"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, Eye, CheckSquare, Square, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { resetPassword } from "@/app/actions/auth";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const code = searchParams.get("code") || "";
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const newPassword = formData.get("new-pass") as string;
        const confirmPassword = formData.get("confirm-pass") as string;

        if (newPassword !== confirmPassword) {
            setError("Erayada sirta ah isma laha.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await resetPassword(email, code, newPassword);
            if (result.success) {
                router.push("/reset-success");
            } else {
                setError(result.error || "Ma dhici karto in la beddelo erayga sirta ah.");
            }
        } catch (err) {
            setError("Waxbaa khaldamay, fadlan isku day markale.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}
            <div className="space-y-2">
                <Label htmlFor="new-pass">Lambarka sirta ah ee cusub</Label>
                <div className="relative">
                    <Input id="new-pass" name="new-pass" type="password" placeholder="Gali lambarka sirta ah" className="pr-9" required />
                    <Eye className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckSquare className="h-3 w-3 text-teal-600" />
                    <span>Ugu yaraan 8 xaraf</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Square className="h-3 w-3" />
                    <span>Waa inuu ku jiraa calaamad (tusaale: @, #, $)</span>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirm-pass">Xaqiiji lambarka cusub</Label>
                <div className="relative">
                    <Input id="confirm-pass" name="confirm-pass" type="password" placeholder="Ku celi lambarka sirta ah" className="pr-9" required />
                    <Eye className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full h-11 bg-teal-700 hover:bg-teal-800 gap-2 mt-4"
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                {isLoading ? "Waa lagu guda jiraa..." : "Beddel Lambarka Sirta"}
            </Button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 max-w-sm mx-auto">
            <div className="w-full bg-teal-600 rounded-t-xl h-24 flex items-center justify-center -mb-8 relative z-0">
                <RefreshCw className="h-10 w-10 text-white/80" />
            </div>

            <div className="w-full bg-white dark:bg-card border rounded-xl shadow-lg p-8 relative z-10">
                <h1 className="text-xl font-bold mb-2 text-center">
                    Dib u habaynta Lambarka Sirta
                </h1>
                <p className="text-muted-foreground mb-6 text-xs text-center">
                    Fadlan dooro lambar sir ah oo xooggan si aad u sugto amniga koontadaada TaloHub.
                </p>

                <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <ResetPasswordForm />
                </Suspense>

                <Link href="/login" className="mt-6 flex justify-center items-center text-xs font-medium text-teal-600 hover:underline">
                    <ArrowLeft className="h-3 w-3 mr-1" /> Ku laabo soo gelitaanka
                </Link>

                <div className="mt-8 pt-4 border-t flex items-center justify-center gap-2">
                    <div className="h-4 w-4 bg-teal-600 rounded-full flex items-center justify-center text-[8px] text-white">✔</div>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                        TaloHub waxay isticmaashaa sir-qarin dhamaadka-ilaa-dhamaadka ah si loo ilaaliyo xogtaada gaarka ah.
                    </p>
                </div>
            </div>
        </div>
    );
}
