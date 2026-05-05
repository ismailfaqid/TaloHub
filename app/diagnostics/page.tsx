import { createClient } from "@/lib/supabase/server";

export default async function DiagnosticsPage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const databaseUrl = process.env.DATABASE_URL;

    return (
        <div className="p-8 font-sans max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>
            
            <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-slate-50">
                    <h2 className="font-semibold mb-2">Environment Variables</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                            <span className={supabaseUrl ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {supabaseUrl ? "LOADED ✓" : "MISSING ✗"}
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                            <span className={supabaseAnonKey ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {supabaseAnonKey ? "LOADED ✓" : "MISSING ✗"}
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span>DATABASE_URL:</span>
                            <span className={databaseUrl ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                {databaseUrl ? "LOADED ✓" : "MISSING ✗ (Using Hardcoded Fallback)"}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50 text-blue-800 text-sm">
                    <p><strong>Note:</strong> If Supabase variables are MISSING, the login and signup pages will crash. You must add them in Vercel Settings → Environment Variables.</p>
                </div>
            </div>
        </div>
    );
}
