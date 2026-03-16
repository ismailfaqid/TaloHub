"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PrivacyPage() {
    const { language } = useLanguage();

    const content = language === "so" ? (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Xeerarka Asturka (Privacy Policy)</h1>
            <p>Taariikhda ugu dambeysay ee la cusbooneysiiyay: March 2026</p>
            <section>
                <h2 className="text-xl font-bold mb-3">1. Hordhac</h2>
                <p>TaloHub (&quot;anaga&quot;, &quot;ee&quot;, &quot;na&quot;) waxay dhowreysaa asturnaantaada. Xeerarkaan waxay sharraxayaan sida aan u ururino, u isticmaalno, una dhowrno xogtaada markaad booqato website-keena.</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">2. Xogta aan Ururino</h2>
                <p>Waxaan ururinaa macluumaadka aad na siiso markaad is diiwaangeliso, sida magacaaga, email-kaaga, iyo sawirkaaga. Waxaan sidoo kale si toos ah u ururinaa xogta ku saabsan sida aad u isticmaasho boggayaga (tusaale, cinwaanka IP, nooca biraawsarkaaga).</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">3. Isticmaalka Cookies (Qaybta AdSense)</h2>
                <p>Waxaan isticmaalnaa &quot;Cookies&quot; iyo tignoolajiyada la midka ah si aan u wanaajino khibradaada, u falanqeyno shaqada website-ka, iyo inaan bixino xayeysiisyo ku habboon.</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Iibiyeyaasha dhinac saddexaad (Third-party vendors), sida Google, waxay isticmaalaan cookies si ay ugu bixiyaan xayeysiisyo ku saleysan booqashooyinkaaga hore ee website-kan iyo website-yada kale ee internetka.</li>
                    <li>Isticmaalka Google ee cookies-ka xayeysiinta waxay u ogolaataa isaga iyo bahwadaagtiisa inay xayeysiis ugu fidiyaan adiga iyagoo ku saleynaya booqashada aad ku timid boggeena iyo/ama boggaga kale.</li>
                    <li>Isticmaalayaashu waxay dooran karaan inaysan isticmaalin xayeysiis gaar loo leeyahay (personalized advertising) iyagoo booqanaya goobaha <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noreferrer">Google Ads Settings</a>.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us via our Help page.</p>
            </section>
        </div>
    ) : (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p>Last Updated: March 2026</p>
            <section>
                <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
                <p>TaloHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
                <p>We collect information that you provide to us directly, such as your name, email, and profile picture when you register. We also automatically collect information about how you interact with our site (e.g., IP address, browser type).</p>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">3. Use of Cookies and Google AdSense</h2>
                <p>We use cookies and similar tracking technologies to track the activity on our site and hold certain information to improve your experience and serve personalized ads.</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Third party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
                    <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to your sites and/or other sites on the Internet.</li>
                    <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noreferrer">Ads Settings</a>.</li>
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us via our Help page.</p>
            </section>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-12 px-8 leading-relaxed bg-card rounded-2xl border shadow-sm my-8">
            {content}
        </div>
    );
}
