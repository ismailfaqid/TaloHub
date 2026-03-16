"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TermsPage() {
    const { language } = useLanguage();

    const content = language === "so" ? (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Shuruudaha Isticmaalka (Terms of Service)</h1>
            <p>Waad ku mahadsan tahay isticmaalka TaloHub. Isticmaalkaaga adeeggayaga waxaad ku aqbaleysaa shuruudahan.</p>
            <section>
                <h2 className="text-xl font-bold mb-3">1. Adeegsiga iyo Nidaamka</h2>
                <p>Kaliya waxaad isticmaali doontaa qaybahan si nabad ah, iyadoo la raacayo qaanuunka, lamana oggola hadalo nacayb ah (hate speech) ama marin habaabin.</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">2. La Lahaanshaha Aqoonta (IP)</h2>
                <p>Qoraallada iyo jawaabaha aad bixiso adigaa iska leh, laakiin waxaad TaloHub siineysaa ruqsad (license) aan dhacayn si aan ugu soo bandhigno bogga.</p>
            </section>
        </div>
    ) : (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <p>Thank you for using TaloHub. By accessing our services, you agree to comply with these terms.</p>
            <section>
                <h2 className="text-xl font-bold mb-3">1. Acceptable Use</h2>
                <p>You agree to use our platform responsibly. Hate speech, harassment, and distributing misleading information are strictly prohibited.</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">2. Intellectual Property</h2>
                <p>You retain ownership of the content you post, but you grant TaloHub a non-exclusive, perpetual license to display and distribute that content on the platform.</p>
            </section>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-12 px-8 leading-relaxed bg-card rounded-2xl border shadow-sm my-8">
            {content}
        </div>
    );
}
