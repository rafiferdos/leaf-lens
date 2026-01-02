import { LeafScan } from "@/components/leaf-scan/index";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-primary/2 p-4 font-sans rounded-4xl ">
            <LeafScan />
        </div>
    );
}