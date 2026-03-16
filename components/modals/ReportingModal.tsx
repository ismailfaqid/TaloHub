"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function ReportingModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Warbixi Xadgudub</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Warbixi Su&apos;aashan ama Jawaabtan</DialogTitle>
                    <DialogDescription>
                        Fadlan dooro sababta aad u warbixinayso nuxurkan si aan u dhowrno badbaadada bulshada.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <RadioGroup defaultValue="misinfo" className="space-y-3">
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="misinfo" id="misinfo" />
                            <Label htmlFor="misinfo" className="flex-1 cursor-pointer font-normal">Been-abuur (Misinformation)</Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="abuse" id="abuse" />
                            <Label htmlFor="abuse" className="flex-1 cursor-pointer font-normal">Aflagaaddo (Insult/Abuse)</Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="spam" id="spam" />
                            <Label htmlFor="spam" className="flex-1 cursor-pointer font-normal">Spam</Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="flex-1 cursor-pointer font-normal">Kale (Other)</Label>
                        </div>
                    </RadioGroup>

                    <div className="mt-6 space-y-2">
                        <Label htmlFor="details">Faahfaahin dheeraad ah</Label>
                        <Textarea
                            id="details"
                            placeholder="Maxaa kale oo aad nala wadaagi kartaa?"
                            className="min-h-[100px]"
                        />
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="sm:flex-1">Ka noqo</Button>
                    </DialogClose>
                    <Button className="bg-[#E43152] hover:bg-[#E43152]/90 sm:flex-1">
                        Gudbi Warbixinta
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
