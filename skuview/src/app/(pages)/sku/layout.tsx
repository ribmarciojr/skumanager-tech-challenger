import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Container, Typography } from '@mui/material'; // Importando componentes MUI
import React from 'react';
import Header from "@/components/Header/Header";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/queryClient";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Boticário",
    description: "Gerenciador de sku",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            <html lang="pt-BR">
                <body style={{ margin: 0, padding: 0 }} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <div className="flex flex-col gap-5 items-start justify-start min-h-screen bg-white p-6">
                        <div style={{ marginBottom: '20px' }}>
                            <Header />
                        </div>
                        <Container
                            maxWidth="lg"
                            className="flex-grow flex items-center justify-center"
                            style={{ minHeight: 'calc(100vh - 64px)' }}
                        >
                            {children}
                        </Container>
                    </div>
                </body>
            </html>
        </QueryClientProvider>
    );
}