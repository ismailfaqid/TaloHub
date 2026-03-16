"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutPage() {
    const { language } = useLanguage();

    const content = language === "so" ? (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Ku Saabsan TaloHub</h1>
            <p className="text-xl text-muted-foreground mb-8">Goobta ugu weyn ee aqoonta lagu wadaago oo lagugu caawinayo su&apos;aalaha aad qabto iyadoo lala kaashanayo khubaro Soomaaliyeed.</p>

            <section className="bg-muted/30 p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-4">Hadafkayaga</h2>
                <p className="leading-relaxed">
                    TaloHub waxaa loo aas aasay in ay noqoto buundada isku xirta xirfadlayaasha iyo bulshada inteeda kale. Waxaan aaminsanahay in macluumaad sax ah iyo talo wacan ay wax ka beddeli karaan nolosha dad badan. Hadafkayagu waa in aan awoodno af Soomaali hufan, si aan xal u siino su&apos;aalaha nolosha, ganacsiga, caafimaadka, dhacdooyinka iyo waxyaale kale oo badan.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 mt-8">Sidee ayay u shaqeysaa?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Weydii</h3>
                        <p className="text-sm text-muted-foreground">Soo bandhig su&apos;aashaada, xitaa si qarsoodi ah ayaad u sameyn kartaa. </p>
                    </div>
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Ka Jawaab</h3>
                        <p className="text-sm text-muted-foreground">La wadaag aqoontaada oo caawi bulshada Soomaaliyeed. </p>
                    </div>
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Xaqiijinta</h3>
                        <p className="text-sm text-muted-foreground">Waxaan calaamadeynaa xirfadlayaasha la xaqiijiyay si xogtaadu u noqoto mid la isku halayn karo.</p>
                    </div>
                </div>
            </section>
        </div>
    ) : (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-primary mb-2">About TaloHub</h1>
            <p className="text-xl text-muted-foreground mb-8">The largest knowledge-sharing platform helping you with your questions in collaboration with verified Somali experts.</p>

            <section className="bg-muted/30 p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="leading-relaxed">
                    TaloHub was founded to bridge the gap between verifiable professionals and the general community. We believe that accurate information and good advice can profoundly change lives. Our mission is to empower the Somali language by providing solutions to questions regarding life, business, health, and much more.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4 mt-8">How does it work?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Ask</h3>
                        <p className="text-sm text-muted-foreground">Post your question, you can even do it anonymously. </p>
                    </div>
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Answer</h3>
                        <p className="text-sm text-muted-foreground">Share your knowledge and help the community.</p>
                    </div>
                    <div className="p-6 border rounded-xl">
                        <h3 className="font-bold mb-2">Verification</h3>
                        <p className="text-sm text-muted-foreground">We badge verified professionals so you can trust the information provided.</p>
                    </div>
                </div>
            </section>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 my-8">
            {content}
        </div>
    );
}
