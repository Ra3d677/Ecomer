import { getStoreSettings, getActiveTemplate } from "@/lib/queries";
import SettingsManager from "./SettingsManager";

export const dynamic = 'force-dynamic';

import { StoreSettings } from "@/lib/types";

export default async function AdminSettingsPage() {
  const currentSettings = await getStoreSettings() || {
    storeName: "",
    templateColors: {},
    categoriesLayout: "grid",
    productsLayout: "static"
  } as StoreSettings;
  const activeTemplate = await getActiveTemplate();
  return <SettingsManager initialSettings={currentSettings} activeTemplate={activeTemplate} />;
}
