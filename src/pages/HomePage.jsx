import { useMemo } from "react";

import QUOTES from "@/constants/quotes";

export default function HomePage() {

    const quote = useMemo(() => {
        return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

                <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-70 blur-3xl" />

            </div>

            {/* Content */}

            <div className="relative z-10 max-w-4xl px-8 text-center">

                <div className="mb-10 text-7xl text-slate-300">
                    “
                </div>

                <p className="text-3xl font-light leading-relaxed text-slate-700 md:text-5xl">
                    {quote.quote}
                </p>

                <div className="mx-auto mt-10 h-px w-20 bg-slate-300" />

                <p className="mt-8 text-xl tracking-wide text-slate-500">
                    {quote.author}
                </p>

            </div>

        </div>
    );
}
