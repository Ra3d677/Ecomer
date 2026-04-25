import { getActiveTemplate } from "@/lib/queries";
import TemplatesManager from "./TemplatesManager";

export const dynamic = 'force-dynamic';

export default async function AdminTemplatesPage() {
  const currentTemplate = await getActiveTemplate();
  return <TemplatesManager initialTemplate={currentTemplate} />;
}
