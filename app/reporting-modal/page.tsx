import { ReportingModal } from "@/components/modals/ReportingModal";

export default function ReportingModalPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Tijaabi Warbixinta</h1>
                <p className="text-muted-foreground">
                    Riix badhanka hoose si aad u aragto qaabka warbixinta.
                </p>
                <ReportingModal />
            </div>
        </div>
    );
}
