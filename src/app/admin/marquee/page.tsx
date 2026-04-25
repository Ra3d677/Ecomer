import { getStoreSettings } from "@/lib/queries";
import MarqueeManager from "./MarqueeManager";

export const dynamic = 'force-dynamic';

export default async function AdminMarqueePage() {
  const settings = await getStoreSettings();
  
  return <MarqueeManager initialSettings={settings as any} />;
}
