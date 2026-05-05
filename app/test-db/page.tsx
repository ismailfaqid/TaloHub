import prisma from "@/lib/prisma";

export default async function TestDBPage() {
    let status = "Checking...";
    let errorDetails = "";

    try {
        // Try a simple query
        const userCount = await prisma.user.count();
        status = `Success! Connected to database. Found ${userCount} users.`;
    } catch (e: any) {
        status = "Failed to connect to database.";
        errorDetails = e.message || JSON.stringify(e);
        console.error("Database Test Error:", e);
    }

    return (
        <div className="p-8 font-sans max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
            <div className={`p-4 rounded-lg mb-4 ${status.includes("Success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                <p className="font-semibold">{status}</p>
            </div>
            
            {errorDetails && (
                <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 overflow-auto">
                    <p className="text-sm font-mono text-slate-700 whitespace-pre-wrap">
                        {errorDetails}
                    </p>
                </div>
            )}
            
            <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg">
                <h2 className="font-bold mb-2">Troubleshooting Tips:</h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Verify <code className="bg-blue-100 px-1">DATABASE_URL</code> in Vercel ends with <code className="bg-blue-100 px-1">?pgbouncer=true&sslmode=require</code>.</li>
                    <li>Verify <code className="bg-blue-100 px-1">DIRECT_URL</code> is using the Session Pooler or direct connection.</li>
                    <li>Ensure <code className="bg-blue-100 px-1">AUTH_SECRET</code> is set to a long random string.</li>
                </ul>
            </div>
        </div>
    );
}
