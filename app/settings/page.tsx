"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, Globe, LogOut, Lock, CheckCircle2, Loader2, Save, Camera, UserCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";
import { getMe, updateAccount, logoutAction } from "@/app/actions/auth";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SwitchComponent = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitive.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            )}
        />
    </SwitchPrimitive.Root>
))
SwitchComponent.displayName = SwitchPrimitive.Root.displayName

export default function SettingsPage() {
    const { language, setLanguage, t: translations } = useLanguage();
    const t = translations.settings;
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<"account" | "privacy" | "notifications" | "language">("account");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            const userData = await getMe();
            if (!userData) {
                router.push("/login");
                return;
            }
            setUser(userData);
            setProfileImage(userData.image);
            setIsLoading(false);
        }
        loadUser();
    }, [router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSaving(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData(event.currentTarget);
        if (profileImage) {
            formData.append("image", profileImage);
        }

        try {
            const result = await updateAccount(formData);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(t.success);
                // Refresh user data
                const userData = await getMe();
                setUser(userData);
            }
        } catch (err) {
            setError(t.error);
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
        );
    }

    const sections = [
        { id: "account", label: t.account, icon: User },
        { id: "privacy", label: t.privacy, icon: Shield },
        { id: "notifications", label: t.notifications, icon: Bell },
        { id: "language", label: t.language, icon: Globe },
    ];

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-72 shrink-0 space-y-1">
                <div className="mb-6 px-4">
                    <h1 className="text-xl font-bold">{t.title}</h1>
                    <p className="text-xs text-muted-foreground">{t.subtitle}</p>
                </div>

                {sections.map((section) => (
                    <Button
                        key={section.id}
                        variant={activeSection === section.id ? "secondary" : "ghost"}
                        className={cn(
                            "w-full justify-start gap-3 mb-1 transition-all",
                            activeSection !== section.id && "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                        onClick={() => setActiveSection(section.id as any)}
                    >
                        <section.icon className="h-4 w-4" /> {section.label}
                    </Button>
                ))}

                <div className="pt-6 mt-6 border-t font-medium text-red-500">
                    <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-red-50 hover:text-red-600" onClick={() => logoutAction()}>
                        <LogOut className="h-4 w-4" /> {t.logout}
                    </Button>
                </div>
            </div>

            <div className="flex-1 space-y-8 min-h-[500px]">
                {activeSection === "account" && (
                    <form onSubmit={handleSave} className="bg-card border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold">{t.accountInfo}</h2>
                            <p className="text-sm text-muted-foreground">{t.accountSubtitle}</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-3">
                                <Shield className="h-4 w-4" /> {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 p-4 bg-teal-50 text-teal-600 text-sm rounded-xl border border-teal-100 flex items-center gap-3">
                                <CheckCircle2 className="h-4 w-4" /> {success}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-10 border-b">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-full bg-teal-600 flex items-center justify-center text-white text-3xl font-black shadow-xl ring-4 ring-background overflow-hidden">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <UserCircle className="h-16 w-16 text-white/80" />
                                    )}
                                </div>
                                <label className="absolute -bottom-1 -right-1 bg-white border shadow-md p-1.5 rounded-full cursor-pointer hover:bg-slate-50 transition-colors group-hover:scale-110">
                                    <Camera className="h-3.5 w-3.5 text-slate-600" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                            <div className="flex flex-1 items-center gap-8 p-4 bg-slate-50 dark:bg-muted/30 rounded-2xl border border-slate-100 dark:border-border/50 w-full">
                                <div className="text-center flex-1">
                                    <p className="text-2xl font-black text-primary">{user?._count?.followers || 0}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{translations.common.followers}</p>
                                </div>
                                <div className="w-[1px] h-8 bg-slate-200 dark:bg-border"></div>
                                <div className="text-center flex-1">
                                    <p className="text-2xl font-black text-primary">{user?._count?.following || 0}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{translations.common.following}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{t.fullName}</Label>
                                <Input id="name" name="name" defaultValue={user?.name || ""} className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{t.email}</Label>
                                <Input id="email" name="email" defaultValue={user?.email || ""} className="rounded-xl" />
                            </div>
                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <Label htmlFor="bio" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{t.bio || "Bio"}</Label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={user?.bio || ""}
                                    placeholder="Tell us a little about yourself"
                                    className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t">
                            <div className="flex items-center gap-2 mb-4">
                                <Lock className="h-4 w-4 text-primary" />
                                <h3 className="font-bold text-sm">{t.changePassword}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-pass" className="text-xs font-medium text-muted-foreground">{t.newPassword}</Label>
                                    <Input id="new-pass" name="new-pass" type="password" placeholder={t.passwordPlaceholder} className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-pass" className="text-xs font-medium text-muted-foreground">{t.confirmPassword}</Label>
                                    <Input id="confirm-pass" name="confirm-pass" type="password" placeholder={t.confirmPlaceholder} className="rounded-xl" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-medium text-xs text-muted-foreground">{t.forgotPassword}</h3>
                                <Link href="/forgot-password">
                                    <Button type="button" variant="link" className="text-teal-600 h-auto p-0 font-bold text-xs underline decoration-teal-600/30">
                                        {t.useForgot}
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white min-w-[140px] rounded-xl h-11 font-bold" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                    {isSaving ? t.saving : t.save}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}

                {activeSection === "privacy" && (
                    <div className="bg-card border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px] animate-in slide-in-from-right-4 duration-300">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <Shield className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold">{t.privacy}</h2>
                        <p className="text-muted-foreground max-w-sm">Maamul xogtaada gaarka ah iyo sida ay dadka kale u arkaan profile-kaaga.</p>
                        <Button variant="outline" className="rounded-xl px-8">{t.save}</Button>
                    </div>
                )}

                {activeSection === "notifications" && (
                    <div className="bg-card border rounded-xl p-6 shadow-sm animate-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold">{t.notificationsTitle}</h2>
                            <p className="text-sm text-muted-foreground">Kala dooro sida iyo goorta aad rabto inaad hesho ogeysiisyada.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
                                <div>
                                    <h3 className="font-bold text-sm">{t.emailNotifications}</h3>
                                    <p className="text-xs text-muted-foreground">{t.emailNotificationsDesc}</p>
                                </div>
                                <SwitchComponent defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
                                <div>
                                    <h3 className="font-bold text-sm">{t.communityUpdates}</h3>
                                    <p className="text-xs text-muted-foreground">{t.communityUpdatesDesc}</p>
                                </div>
                                <SwitchComponent />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
                                <div>
                                    <h3 className="font-bold text-sm">{t.darkMode}</h3>
                                    <p className="text-xs text-muted-foreground">{t.darkModeDesc}</p>
                                </div>
                                <SwitchComponent />
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <Button className="bg-[#1AA1F5] hover:bg-[#1AA1F5]/90 rounded-xl px-8 font-bold h-11">
                                <Save className="h-4 w-4 mr-2" />
                                {t.save}
                            </Button>
                        </div>
                    </div>
                )}

                {activeSection === "language" && (
                    <div className="bg-card border rounded-xl p-6 shadow-sm animate-in slide-in-from-right-4 duration-300">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold">{t.interfaceLanguage}</h2>
                            <p className="text-sm text-muted-foreground">{t.chooseLanguage}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                onClick={() => setLanguage("so")}
                                className={cn(
                                    "border-2 p-6 rounded-2xl flex flex-col gap-4 cursor-pointer transition-all",
                                    language === "so" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50 hover:bg-muted/30"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                                        language === "so" ? "border-primary" : "border-muted-foreground/30"
                                    )}>
                                        {language === "so" && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <CheckCircle2 className={cn("h-6 w-6", language === "so" ? "text-primary opacity-100" : "opacity-0")} />
                                </div>
                                <div>
                                    <p className="font-black text-lg">{t.somali}</p>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{t.somaliDesc}</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setLanguage("en")}
                                className={cn(
                                    "border-2 p-6 rounded-2xl flex flex-col gap-4 cursor-pointer transition-all",
                                    language === "en" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50 hover:bg-muted/30"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                                        language === "en" ? "border-primary" : "border-muted-foreground/30"
                                    )}>
                                        {language === "en" && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <CheckCircle2 className={cn("h-6 w-6", language === "en" ? "text-primary opacity-100" : "opacity-0")} />
                                </div>
                                <div>
                                    <p className="font-black text-lg">{t.english}</p>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{t.englishDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
