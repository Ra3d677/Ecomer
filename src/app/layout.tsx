import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getStoreSettings, getActiveTemplate } from "@/lib/queries";
import LanguageProvider from "@/components/providers/LanguageProvider";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

import { getLang } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Store",
  description: "High-end minimal fashion and goods",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getStoreSettings() || { templateColors: {} };
  const activeTemplate = await getActiveTemplate();
  const currentColors = settings.templateColors?.[activeTemplate] || settings.templateColors?.['luxury'] || {};
  const lang = await getLang();

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: ${currentColors.background || '#f8fafc'};
              --foreground: ${currentColors.foreground || '#0f172a'};
              --primary: ${currentColors.primary || '#0f172a'};
              --primary-foreground: ${currentColors.primaryForeground || '#ffffff'};
              --accent: ${currentColors.accent || '#6366f1'};
              --accent-foreground: ${currentColors.accentForeground || '#ffffff'};
              --success: ${currentColors.success || '#22c55e'};
              --success-foreground: ${currentColors.successForeground || '#ffffff'};
              --highlight: ${currentColors.highlight || '#f59e0b'};
              --highlight-foreground: ${currentColors.highlightForeground || '#ffffff'};
              --muted: ${currentColors.muted || '#64748b'};
              --muted-foreground: ${currentColors.mutedForeground || '#f8fafc'};
              --card: ${currentColors.card || '#ffffff'};
              --card-foreground: ${currentColors.cardForeground || '#0f172a'};
              --border: ${currentColors.border || '#e2e8f0'};
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${cairo.variable} antialiased min-h-screen flex flex-col ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {children}
      </body>
    </html>
  );
}
