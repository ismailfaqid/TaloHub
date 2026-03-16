"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import { verifyCode } from "@/app/actions/auth";

function VerifyCodeForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if value is entered
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    async function handleVerify() {
        const fullCode = code.join("");
        if (fullCode.length < 4) {
            setError("Fadlan gali dhammaan 4-ta nambar.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await verifyCode(email, fullCode);
            if (result.success) {
                router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(fullCode)}`);
            } else {
                setError(result.error || "Koodhka waa khaldan yahay.");
            }
        } catch (err) {
            setError("Waxbaa khaldamay, fadlan isku day markale.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <p className="text-muted-foreground mb-8 text-sm">
                Waxaan koodka hubinta u dirnay <span className="font-semibold text-slate-900">{email}</span>. Fadlan gali koodka hoose.
            </p>

            <div className="w-full space-y-6 text-left">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="code" className="text-center block text-xs uppercase tracking-wider text-muted-foreground">Koodka Hubinta (OTP)</Label>
                    <div className="flex justify-center gap-2">
                        {code.map((digit, idx) => (
                            <Input
                                key={idx}
                                ref={inputRefs[idx]}
                                className="w-12 h-12 text-center text-xl font-bold"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    className="w-full h-11 bg-teal-700 hover:bg-teal-800"
                    onClick={handleVerify}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {isLoading ? "Waa la hubinayaa..." : "Xaqiiji Koodka"}
                </Button>
            </div>
        </>
    );
}

export default function VerifyCodePage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 max-w-sm mx-auto text-center">
            <div className="bg-teal-50 p-4 rounded-full mb-6">
                <div className="bg-transparent h-12 w-12 rounded-full flex items-center justify-center text-teal-600">
                    <Mail className="h-8 w-8" />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">
                Hubi Email-kaaga
            </h1>

            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin my-8" />}>
                <VerifyCodeForm />
            </Suspense>

            <div className="mt-8 text-sm text-slate-500">
                Ma aadan helin koodka? <button className="text-teal-600 font-bold hover:underline">Dib u dir</button>
            </div>

            <Link href="/login" className="mt-8 flex items-center text-sm font-medium text-teal-600 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Ku laabo soo gelitaanka
            </Link>
        </div>
    );
}
