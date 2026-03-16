"use client";

import { Button } from "@/components/ui/button";
import {
    HeartPulse,
    Briefcase,
    GraduationCap,
    Cpu,
    Scale,
    Sprout,
    CheckCircle2,
    ArrowRight,
    Plus,
    Compass
} from "lucide-react";
import Image from "next/image";

const experts = [
    { name: "Dr. Ahmed Mohamed", role: "Takhasuska Caafimaadka", image: "AM", color: "bg-teal-100 text-teal-700" },
    { name: "Eng. Fadumo Cali", role: "Tiknoolajiyada", image: "FC", color: "bg-blue-100 text-blue-700" },
    { name: "Sheikh Omar", role: "Wacyigalinta & Diinta", image: "SO", color: "bg-amber-100 text-amber-700" },
    { name: "Sahra Yusuf", role: "Ganacsiga & Maalgashiga", image: "SY", color: "bg-rose-100 text-rose-700" },
];

const topics = [
    { name: "Caafimaadka", count: "12.5k xubnood", icon: HeartPulse, color: "bg-rose-50 text-rose-500" },
    { name: "Ganacsiga", count: "8.2k xubnood", icon: Briefcase, color: "bg-blue-50 text-blue-500" },
    { name: "Tiknoolajiyada", count: "15.1k xubnood", icon: Cpu, color: "bg-teal-50 text-teal-500" },
    { name: "Waxbarashada", count: "9.7k xubnood", icon: GraduationCap, color: "bg-amber-50 text-amber-500" },
    { name: "Beeraha", count: "4.3k xubnood", icon: Sprout, color: "bg-green-50 text-green-500" },
    { name: "Sharciga", count: "3.8k xubnood", icon: Scale, color: "bg-purple-50 text-purple-500" },
];

export default function EmptyFeedPage() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 space-y-12">
            {/* Welcome Hero */}
            <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                <div className="flex-1 space-y-6 relative z-10">
                    <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                        Welcome to <span className="text-teal-600">TaloHub!</span>
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                        Your feed is empty. Start by following experts and topics you're interested in to see verified and helpful advice.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-8 h-12 gap-2 font-medium shadow-teal-200 shadow-lg">
                            <Compass className="h-5 w-5" />
                            Explore Experts
                        </Button>
                        <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full px-8 h-12 font-medium">
                            Learn How it Works
                        </Button>
                    </div>
                </div>
                <div className="flex-1 w-full max-w-md bg-stone-100 rounded-2xl aspect-[4/3] flex items-center justify-center relative">
                    <div className="absolute inset-4 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center text-stone-400">
                        <div className="w-16 h-16 rounded-full bg-stone-200 mb-2"></div>
                        <span className="text-xs font-medium uppercase tracking-widest">Image Placeholder</span>
                    </div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-50 rounded-full blur-2xl opacity-60"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-50 rounded-full blur-2xl opacity-60"></div>
                </div>
            </div>

            {/* Recommended Experts */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-teal-600 fill-teal-100" />
                        <h2 className="text-2xl font-bold text-slate-800">Experts you can follow</h2>
                    </div>
                    <button className="text-sm font-bold text-teal-600 hover:underline">View all</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experts.map((expert) => (
                        <div key={expert.name} className="bg-white border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative mb-4">
                                <div className={`h-24 w-24 rounded-full flex items-center justify-center text-2xl font-bold ${expert.color}`}>
                                    {expert.image}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full border-2 border-white">
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{expert.name}</h3>
                            <p className="text-xs font-semibold text-teal-600 mb-6 bg-teal-50 px-3 py-1 rounded-full">
                                {expert.role}
                            </p>
                            <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl h-10">
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Topics */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topics.map((topic) => (
                        <div key={topic.name} className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-teal-200 hover:bg-teal-50/30 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${topic.color}`}>
                                    <topic.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{topic.name}</h3>
                                    <p className="text-xs text-slate-500">{topic.count}</p>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                <Plus className="h-5 w-5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center space-y-6">
                <h3 className="text-slate-500 font-medium">Do you have a specific question for an expert?</h3>
                <Button className="bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold px-8 h-12 rounded-full shadow-sm text-base">
                    Ask a Question Now
                </Button>
            </div>

            <footer className="pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                <div className="flex items-center gap-2 opacity-50">
                    <div className="h-6 w-6 bg-slate-300 rounded-md"></div>
                    <span className="font-bold text-slate-600">TaloHub</span>
                </div>
                <div className="flex gap-6 font-medium">
                    <a href="#" className="hover:text-slate-600">Terms of Service</a>
                    <a href="#" className="hover:text-slate-600">Privacy</a>
                    <a href="#" className="hover:text-slate-600">Contact Us</a>
                </div>
                <p>© 2026 TaloHub. All rights reserved.</p>
            </footer>
        </div>
    );
}

