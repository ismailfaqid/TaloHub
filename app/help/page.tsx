import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Rocket, ShieldCheck, HelpCircle, Mail, Lock } from "lucide-react";

export default function HelpCenterPage() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Help & Support</h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Have a question? We're here to help.
                </p>
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="How can we help you?"
                        className="pl-10 h-12 rounded-xl bg-white dark:bg-card border-border shadow-sm text-base"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-sky-100 w-10 h-10 rounded-lg flex items-center justify-center text-sky-600 mb-4">
                        <Rocket className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Getting Started</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Learn how to use TaloHub and start contributing to the community.
                    </p>
                    <div className="space-y-2 text-sm text-primary font-medium">
                        <div className="flex items-center gap-2 hover:underline">How do I ask a question?</div>
                        <div className="flex items-center gap-2 hover:underline">How do I customize my profile?</div>
                    </div>
                </div>

                <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 mb-4">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Experts</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Join the verified expert community and help others.
                    </p>
                    <div className="space-y-2 text-sm text-primary font-medium">
                        <div className="flex items-center gap-2 hover:underline">How can I become an expert?</div>
                        <div className="flex items-center gap-2 hover:underline">How is expertise verified?</div>
                    </div>
                </div>

                <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                        <Lock className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Policy & Safety</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Your safety and community standards are our priority.
                    </p>
                    <div className="space-y-2 text-sm text-primary font-medium">
                        <div className="flex items-center gap-2 hover:underline">TaloHub Community Guidelines</div>
                        <div className="flex items-center gap-2 hover:underline">How do I report a violation?</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is TaloHub free to use?</AccordionTrigger>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is TaloHub free?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, participating and basic use of TaloHub is free. We believe that knowledge should be shared freely.
                                </AccordionContent>
                            </AccordionItem>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How can I trust experts' answers?</AccordionTrigger>
                            <AccordionContent>
                                All experts marked as "Verified" have gone through a rigorous verification process. We verify their certificates and professional experience before granting the expert badge.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What should I do if I forget my password?</AccordionTrigger>
                            <AccordionContent>
                                You can go to the login page and click "Forgot Password". We'll send you an email with instructions on how to reset your password.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Can I delete my account?</AccordionTrigger>
                            <AccordionContent>
                                Yes, you can delete your account from the Settings section at any time. Please keep in mind that this action cannot be undone.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="bg-[#0F4C5C] text-white p-8 rounded-2xl flex flex-col justify-center text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4">Need more help?</h3>
                        <p className="text-white/80 text-sm mb-6 leading-relaxed">
                            If you haven't found the answer you're looking for here, please contact our support team.
                        </p>
                        <a href="mailto:support@talohub.com" className="block w-full">
                            <Button className="w-full bg-white text-[#0F4C5C] hover:bg-white/90 font-bold gap-2">
                                <Mail className="h-4 w-4" />
                                Contact Us
                            </Button>
                        </a>
                    </div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}

