import { Button } from "@/components/ui/button";
import {
    HelpCircle,
    MessageSquare,
    ThumbsUp,
    Award,
    CheckCircle2,
    TrendingUp,
    Lock
} from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">My Activity</h1>
                    <p className="text-muted-foreground">
                        Welcome to your personal dashboard. Track your progress, impact, and rewards.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Questions</span>
                            <HelpCircle className="h-4 w-4 text-sky-500" />
                        </div>
                        <div className="text-3xl font-bold">12</div>
                    </div>

                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Answers</span>
                            <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-3xl font-bold">45</div>
                    </div>

                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Upvotes</span>
                            <ThumbsUp className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold">128</div>
                    </div>

                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</span>
                            <Award className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="text-3xl font-bold">850</div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-8 border-b mb-6">
                        <button className="text-sm font-semibold text-primary border-b-2 border-primary pb-3 px-1">Recent Activity</button>
                        <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 px-1">Drafts (3)</button>
                        <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 px-1">Saved</button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-card border rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                <span>You answered <span className="font-semibold text-foreground">2 hours ago</span></span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Sida ugu fiican ee loo bilaabo barashada Python luqadda Soomaaliga?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                This is a very important question. First, I would recommend you start by learning the basics...
                            </p>
                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> 14 Upvotes</span>
                                <span className="flex items-center gap-1">240 Aragtiyo</span>
                            </div>
                        </div>

                        <div className="bg-card border rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                                <HelpCircle className="h-3 w-3 text-sky-500" />
                                <span>You asked a question <span className="font-semibold text-foreground">Yesterday</span></span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">What are the biggest business opportunities in Mogadishu this year?</h3>
                            <div className="flex items-center gap-4 text-xs font-medium mt-4">
                                <span className="flex items-center gap-1 text-foreground"><MessageSquare className="h-3 w-3" /> 8 Answers</span>
                                <span className="flex items-center gap-1 text-primary">2 New answers</span>
                            </div>
                        </div>

                        <div className="bg-card border rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                                <Award className="h-3 w-3 text-amber-500" />
                                <span>You earned a new badge <span className="font-semibold text-foreground">3 days ago</span></span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">&quot;Community Helper&quot;</h3>
                            <p className="text-sm text-muted-foreground">
                                You reached 50 answers that people voted as helpful.
                            </p>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full mt-6 border-dashed">
                        View past activity
                    </Button>
                </div>
            </div>

            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-card border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Expertise Level</h3>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Level 3</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                        <span className="text-muted-foreground">Close to Level 4 (Senior)</span>
                        <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-blue-500 w-[85%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        You need <span className="font-bold text-foreground">150 points</span> more to reach Senior Expert level.
                    </p>
                    <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="text-xs font-bold">How to earn points?</p>
                            <p className="text-[10px] text-muted-foreground hover:underline cursor-pointer">View tips</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <h3 className="font-bold mb-4">Badges (12)</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="aspect-square bg-amber-100 rounded-lg flex items-center justify-center text-amber-500"><Award className="h-5 w-5" /></div>
                        <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center text-blue-500"><Award className="h-5 w-5" /></div>
                        <div className="aspect-square bg-green-100 rounded-lg flex items-center justify-center text-green-600"><CheckCircle2 className="h-5 w-5" /></div>
                        <div className="aspect-square bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><TrendingUp className="h-5 w-5" /></div>
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground/50 border-2 border-dashed"><Lock className="h-4 w-4" /></div>
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground/50 border-2 border-dashed"><Lock className="h-4 w-4" /></div>
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground/50 border-2 border-dashed"><Lock className="h-4 w-4" /></div>
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground/50 border-2 border-dashed"><Lock className="h-4 w-4" /></div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 text-xs h-8">
                        View all badges
                    </Button>
                </div>

                <div className="bg-card border rounded-xl p-6">
                    <h3 className="font-bold mb-4">Friends</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">IH</div>
                                <div>
                                    <p className="text-sm font-bold">Idil Hassan</p>
                                    <p className="text-[10px] text-green-600 font-medium">Online now</p>
                                </div>
                            </div>
                            <MessageSquare className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">AA</div>
                                <div>
                                    <p className="text-sm font-bold">Ahmed Ali</p>
                                    <p className="text-[10px] text-muted-foreground">2h ago</p>
                                </div>
                            </div>
                            <MessageSquare className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
