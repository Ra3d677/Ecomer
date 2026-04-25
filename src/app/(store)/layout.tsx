import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getActiveTemplate, getStoreSettings } from "@/lib/data";
import { getLang } from "@/lib/i18n";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeTemplate = getActiveTemplate();
  const storeSettings = getStoreSettings();
  const lang = await getLang();
  
  return (
    <div 
      className={`theme-${activeTemplate}`} 
      style={{ '--dynamic-primary': storeSettings.primaryColor } as React.CSSProperties}
    >
      <Navbar activeTemplate={activeTemplate} storeSettings={storeSettings} lang={lang} />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer activeTemplate={activeTemplate} lang={lang} />
    </div>
  );
}
