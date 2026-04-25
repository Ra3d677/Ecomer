import { getStoreSettings } from "@/lib/data";
import MarqueeManager from "./MarqueeManager";

export const dynamic = 'force-dynamic';

export default function AdminMarqueePage() {
  const settings = getStoreSettings();
  
  return <MarqueeManager initialSettings={settings} />;
}
