import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
    className?: string;
}

export default function VerifiedBadge({ className }: VerifiedBadgeProps) {
    return (
        <span className={`inline-flex items-center text-teal-600 ${className}`} title="Xaqiijiyay">
            <BadgeCheck className="w-4 h-4" />
        </span>
    );
}
