import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
    size?: "sm" | "md" | "lg";
}

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
    const sizeClasses = {
        sm: { icon: "h-6 w-6", text: "text-lg" },
        md: { icon: "h-8 w-8", text: "text-xl" },
        lg: { icon: "h-12 w-12", text: "text-3xl" },
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={cn("flex items-center gap-2.5 group", className)}>
            <div className={cn(
                "relative flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300",
                currentSize.icon
            )}>
                {/* Premium SVG Icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2/3 w-2/3"
                >
                    <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M9 10C9 10 9.5 9 12 9C14.5 9 15 10 15 10C15 10 15 11.5 13.5 12.5C12 13.5 12 15 12 15"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx="12" cy="18" r="1.25" fill="currentColor" />
                </svg>
                {/* Decorative elements to match "premium" mockup */}
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-sky-400 rounded-full blur-[2px] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            {!iconOnly && (
                <span className={cn(
                    "font-black tracking-tighter text-primary",
                    currentSize.text
                )}>
                    Talo<span className="text-foreground/80 font-bold">Hub</span>
                </span>
            )}
        </div>
    );
}
