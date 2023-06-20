"use client";

import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Flex direction="column">
                        <Navbar />
                        {children}
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}
