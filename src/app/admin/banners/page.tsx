import { getBanners } from "@/lib/queries";
import BannersManager from "./BannersManager";

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
  const currentBanners = await getBanners();
  return <BannersManager initialBanners={currentBanners} />;
}
