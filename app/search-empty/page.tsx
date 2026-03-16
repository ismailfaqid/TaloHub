import { Button } from "@/components/ui/button";
import { Search, HeartPulse, Briefcase, GraduationCap, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Caafimaadka", count: "1.2k Su'aalood", icon: HeartPulse, color: "bg-blue-100 text-blue-600" },
    { name: "Ganacsiga", count: "850 Su'aalood", icon: Briefcase, color: "bg-orange-100 text-orange-600" },
    { name: "Waxbarashada", count: "2.1k Su'aalood", icon: GraduationCap, color: "bg-green-100 text-green-600" },
    { name: "Tiknoolajiyadda", count: "1.5k Su'aalood", icon: Cpu, color: "bg-purple-100 text-purple-600" },
];

export default function SearchEmptyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="relative mb-8">
                    <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center">
                        <Search className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-background p-1.5 rounded-full shadow-sm">
                        <div className="h-6 w-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xl leading-none">×</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4">Ma jirto natiijo ku habboon raadintaada</h1>
                <p className="text-muted-foreground max-w-lg mb-8">
                    U muuqata in qofna uusan wali weydiin su&apos;aashan ama mawduucan. Noqo qofka ugu horreeya ee bulshada la wadaaga si aad jawaab sax ah uga hesho khabiirada.
                </p>

                <div className="flex gap-4">
                    <Button size="lg" className="bg-[#26C6DA] hover:bg-[#26C6DA]/90 text-white font-semibold">
                        Weydii Su&apos;aashan Bulshada
                    </Button>
                    <Button variant="outline" size="lg">
                        Dib u raadi
                    </Button>
                </div>
            </div>

            <div className="mt-8 border-t pt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">Mowduucyada inta badan la raadiyo</h2>
                    <Link href="/topics" className="text-sm text-primary flex items-center gap-1 font-medium hover:underline">
                        Eeg dhamaan <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.name} className="border p-4 rounded-xl flex items-start gap-4 hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                                <cat.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">{cat.name}</h3>
                                <p className="text-xs text-muted-foreground">{cat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
