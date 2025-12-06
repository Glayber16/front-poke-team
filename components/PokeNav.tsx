import Link from "next/link";

export default function PokeNav(){
    return(
        <nav className="sticky top-0 z-50 w-full justify-center gap-5 flex bg-[#101622] text-white backdrop-blur-md border-b border-white/10 px-6 py-4">
            <Link href="/teams" className="text-xl transition hover:-translate-y-1">Times</Link>
            <Link href="/" className="text-xl transition hover:-translate-y-1">Home</Link>
        </nav>
    )
    
}