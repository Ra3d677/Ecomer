import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your store's performance.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <span className="text-sm font-medium text-success flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +12.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-primary">$24,500.00</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-success flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +8.2%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-primary">342</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-success flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> +24.1%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Customers</p>
            <h3 className="text-3xl font-bold text-primary">1,205</h3>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Products in Stock</p>
            <h3 className="text-3xl font-bold text-primary">85</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50 text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-4 font-medium">#ORD-948{i}2</td>
                    <td className="py-4">Jane Doe</td>
                    <td className="py-4 text-muted-foreground">Today, 10:42 AM</td>
                    <td className="py-4 font-semibold">$120.00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-success/10 text-success rounded-md text-xs font-medium">Confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Top Products</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 bg-muted rounded-lg flex-shrink-0"></div>
                <div className="flex-grow">
                  <p className="font-medium text-sm">Minimalist Linen Shirt</p>
                  <p className="text-xs text-muted-foreground">42 sales</p>
                </div>
                <div className="font-semibold text-sm">$4,200</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
