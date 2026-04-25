export default function AdminOrders() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 text-center text-muted-foreground">
        Order tracking system will be implemented here. It will listen to real-time events from Supabase.
      </div>
    </div>
  );
}
