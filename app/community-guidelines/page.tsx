import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Shield, Users, Verified } from "lucide-react";

export default function CommunityGuidelinesPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <div className="mb-8">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                        Community Guidance
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        TaloHub Community Guidelines
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        TaloHub is a platform dedicated to sharing accurate knowledge and experience. To guarantee a safe environment, please follow the rules mentioned below.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">1. Mutual Respect</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                All community members must respect each other. Harassment, discrimination, or threats are not tolerated. We encourage transparent discussions to build knowledge while respecting everyone's dignity.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">2. Accurate Information</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Ensure the answers you provide are based on facts and experience. TaloHub prioritizes verified professionals so that the community receives reliable information that can positively impact their lives.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">3. Prohibition of Misinformation</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                It is strictly prohibited to spread misinformation, especially regarding medical or legal data that could mislead people. Anyone engaged in such acts will be suspended from using TaloHub.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20 text-center">
                    <p className="text-sm text-muted-foreground italic">
                        These guidelines serve to protect the general interest of the community. Last updated: January 2026.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-white dark:bg-card border border-border p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-2">Did you see a violation?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        If you see anything that goes against community guidelines, please report it so we can take appropriate action.
                    </p>
                    <Button variant="outline" className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20">
                        <AlertCircle className="h-4 w-4" />
                        Report Violation
                    </Button>
                </div>

                <div className="bg-sky-400 p-6 rounded-xl text-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5" />
                        <h3 className="font-bold">Community Trust</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="text-3xl font-bold">98%</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-90">Verified Answers</div>
                            <div className="h-1 bg-white/30 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-white w-[98%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-[10px] uppercase tracking-wider opacity-90">Safety Monitoring</div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground px-4">
                    Need more help?
                </p>
            </div>
        </div>
    );
}

