import Link from "next/link";
import { Hammer } from "lucide-react";

export default async function PlaceholderPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pageName = slug.join(' / ').replace(/-/g, ' ');

  return (
    <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-primary/5 p-6 rounded-full mb-8">
        <Hammer className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4 capitalize">{pageName}</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
        هذه الصفحة قيد الإنشاء والتطوير حالياً. سيتم إضافتها في النسخة النهائية قريباً.
      </p>
      <Link href="/shop" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
        العودة للرئيسية
      </Link>
    </div>
  );
}
