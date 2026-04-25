import Link from "next/link";
import { Store, ShieldCheck } from "lucide-react";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            Welcome to Multo
          </h1>
          <p className="text-xl text-muted-foreground">
            Development Navigation Portal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          <Link 
            href="/shop"
            className="group flex flex-col items-center p-8 bg-card border-2 border-border rounded-3xl hover:border-accent hover:shadow-lg transition-all duration-300"
          >
            <div className="h-16 w-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Store size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Storefront</h2>
            <p className="text-muted-foreground text-center">
              View the shop as a customer, browse products, and checkout.
            </p>
          </Link>

          <Link 
            href="/admin/dashboard"
            className="group flex flex-col items-center p-8 bg-card border-2 border-border rounded-3xl hover:border-primary hover:shadow-lg transition-all duration-300"
          >
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Admin Panel</h2>
            <p className="text-muted-foreground text-center">
              Manage products, view orders, and adjust store settings.
            </p>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
