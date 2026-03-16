import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResetSuccessPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 max-w-sm mx-auto text-center">
            <div className="bg-green-50 p-6 rounded-full mb-8 relative">
                <div className="bg-green-500 h-16 w-16 rounded-full flex items-center justify-center text-white shadow-xl">
                    <Check className="h-8 w-8 stroke-[4]" />
                </div>

                {/* Decorative dots */}
                <div className="absolute top-2 right-4 h-1 w-1 bg-green-300 rounded-full"></div>
                <div className="absolute bottom-4 left-4 h-2 w-2 bg-green-400 rounded-full"></div>
                <div className="absolute top-0 left-8 h-1 w-1 bg-green-200 rounded-full"></div>
            </div>

            <h1 className="text-2xl font-bold mb-4">
                Lambarka sirta ah waa la beddelay!
            </h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Xisaabtaadu hadda waa mid ammaan ah. <br />
                Waxaad u isticmaali kartaa lambarkaaga sirta ah ee cusub si aad u gasho bogga TaloHub.
            </p>

            <Link href="/login" className="w-full">
                <Button className="w-full h-12 bg-teal-700 hover:bg-teal-800 gap-2 font-semibold">
                    Hadda soo gal <ArrowRight className="h-4 w-4" />
                </Button>
            </Link>

            <p className="mt-6 text-xs text-muted-foreground text-center">
                Ma u baahan tahay caawimaad dheeraad ah? <span className="text-teal-600 font-bold cursor-pointer hover:underline">La xiriir taageerada</span>
            </p>

            <div className="mt-8 flex gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/30 px-6 py-2 rounded-full">
                <span className="flex items-center gap-1"><div className="h-1.5 w-1.5 bg-muted-foreground rounded-full"></div> Verified Expertise</span>
                <span className="flex items-center gap-1"><div className="h-1.5 w-1.5 bg-muted-foreground rounded-full"></div> Secure Platform</span>
            </div>
        </div>
    );
}
