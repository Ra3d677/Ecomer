import { getStoreSettings, getActiveTemplate } from "@/lib/queries";
import SettingsManager from "./SettingsManager";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const currentSettings = await getStoreSettings() || {};
  const activeTemplate = await getActiveTemplate();
  return <SettingsManager initialSettings={currentSettings} activeTemplate={activeTemplate} />;
}
