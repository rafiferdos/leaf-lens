import { LeafScan } from "@/components/leaf-scan/index";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
            <LeafScan />
        </div>
    );
}