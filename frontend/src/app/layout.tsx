import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/lib/ThemeProvider";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "VaidyaMitra — Clinical Intelligence for Bharat",
    description: "Privacy-first, AI-powered clinical intelligence and affordable medicine optimization. Powered by Generative AI.",
    keywords: ["health", "AI", "India", "generic medicine", "Jan Aushadhi", "clinical intelligence"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Inline script to set theme before render to prevent flash */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var t = localStorage.getItem('vaidyamitra-theme');
                                    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                                    document.documentElement.setAttribute('data-theme', t);
                                } catch(e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${outfit.variable} font-sans`}>
                <ThemeProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
