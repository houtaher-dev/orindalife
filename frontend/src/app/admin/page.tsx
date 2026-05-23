"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  isAuthenticated,
  clearToken,
  getDashboard,
  getDailyStats,
  getTopProducts,
  getOrders,
  getOrder,
  updateOrderStatus,
  updateOrderNotes,
  type DashboardMetrics,
  type DailyStats,
  type TopProduct,
  type OrderDetail,
  type OrdersListResponse,
} from "@/lib/adminApi";

// ────────────────────────────────────────────────
// STATUS CONFIG
// ────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: "Confirmed", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  pending: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  delivered: { label: "Delivered", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  returned: { label: "Returned", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] || { label: status, color: "text-gray-400", bg: "bg-gray-400/10 border-gray-400/20" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
}

// ────────────────────────────────────────────────
// METRIC CARD
// ────────────────────────────────────────────────
function MetricCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-amber-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SIMPLE BAR CHART
// ────────────────────────────────────────────────
function MiniChart({ data, dataKey, color }: { data: DailyStats[]; dataKey: "clicks" | "orders" | "revenue"; color: string }) {
  if (!data.length) return <div className="text-gray-600 text-sm">No data</div>;
  const values = data.map((d) => d[dataKey]);
  const max = Math.max(...values, 1);

  return (
    <div className="flex items-end gap-[2px] h-24">
      {data.slice(-30).map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center group relative">
          <div
            className={`w-full rounded-t-sm ${color} transition-all group-hover:opacity-80`}
            style={{ height: `${(d[dataKey] / max) * 100}%`, minHeight: d[dataKey] > 0 ? "2px" : "0" }}
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
            {d.date.slice(5)}: {dataKey === "revenue" ? `${d[dataKey].toFixed(0)} QAR` : d[dataKey]}
          </div>
        </div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────
// ORDER PREVIEW MODAL
// ────────────────────────────────────────────────
function OrderPreview({
  order,
  onClose,
  onStatusChange,
  onNotesChange,
}: {
  order: OrderDetail;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
  onNotesChange: (id: number, notes: string) => void;
}) {
  const [notes, setNotes] = useState(order.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  async function handleSaveNotes() {
    setSavingNotes(true);
    try {
      await onNotesChange(order.id, notes);
    } finally {
      setSavingNotes(false);
    }
  }

  const createdAt = order.created_at ? new Date(order.created_at) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-white">{order.order_number}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {createdAt ? createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "—"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Customer</p>
              <p className="text-white font-medium">{order.customer_name}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-white font-medium direction-ltr">{order.phone}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IP Address</p>
              <p className="text-white font-medium font-mono text-sm">{order.ip_address || "—"}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Upsell</p>
              <p className={`font-medium ${order.upsell_accepted ? "text-emerald-400" : "text-gray-500"}`}>
                {order.upsell_accepted ? `Accepted (+${order.upsell_amount} QAR)` : "Declined"}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Order Items</h3>
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-500 font-medium px-4 py-2.5">Product</th>
                    <th className="text-center text-gray-500 font-medium px-4 py-2.5">Qty</th>
                    <th className="text-right text-gray-500 font-medium px-4 py-2.5">Price</th>
                    <th className="text-right text-gray-500 font-medium px-4 py-2.5">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800/50">
                      <td className="px-4 py-3 text-white">{item.product_name_ar}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{item.unit_price} QAR</td>
                      <td className="px-4 py-3 text-right text-white font-medium">{item.line_total} QAR</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-700">
                    <td colSpan={3} className="px-4 py-2.5 text-right text-gray-400">Subtotal</td>
                    <td className="px-4 py-2.5 text-right text-white">{order.subtotal} QAR</td>
                  </tr>
                  {order.upsell_accepted && (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-right text-gray-400">Upsell</td>
                      <td className="px-4 py-2 text-right text-emerald-400">+{order.upsell_amount} QAR</td>
                    </tr>
                  )}
                  <tr className="border-t border-gray-700">
                    <td colSpan={3} className="px-4 py-3 text-right text-white font-semibold">Total</td>
                    <td className="px-4 py-3 text-right text-amber-400 font-bold text-lg">{order.total} QAR</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Webhook Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Integrations</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Google Sheets", ok: order.sheets_sent },
                { label: "Meta CAPI", ok: order.meta_capi_sent },
                { label: "TikTok CAPI", ok: order.tiktok_capi_sent },
                { label: "Snapchat CAPI", ok: order.snap_capi_sent },
              ].map(({ label, ok }) => (
                <span key={label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${ok ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400" : "bg-gray-800 border-gray-700 text-gray-500"}`}>
                  {ok ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Status Change */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Change Status</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_MAP).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => onStatusChange(order.id, key)}
                  disabled={order.status === key}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${order.status === key ? "bg-amber-500/20 border-amber-500/40 text-amber-400 cursor-default" : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm"
              placeholder="Add notes about this order..."
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="mt-2 px-4 py-1.5 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg hover:border-gray-600 hover:text-white disabled:opacity-50 transition"
            >
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// MAIN PAGE
// ────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"dashboard" | "orders">("dashboard");
  const [loading, setLoading] = useState(true);

  // Date range
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Dashboard data
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  // Orders data
  const [ordersData, setOrdersData] = useState<OrdersListResponse | null>(null);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersSearch, setOrdersSearch] = useState("");
  const [ordersStatus, setOrdersStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);

  // Auth check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      const [m, ds, tp] = await Promise.all([
        getDashboard(dateFrom || undefined, dateTo || undefined),
        getDailyStats(dateFrom || undefined, dateTo || undefined),
        getTopProducts(dateFrom || undefined, dateTo || undefined),
      ]);
      setMetrics(m);
      setDailyStats(ds);
      setTopProducts(tp);
    } catch {
      /* ignore */
    }
  }, [dateFrom, dateTo]);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getOrders({
        page: ordersPage,
        per_page: 20,
        status: ordersStatus || undefined,
        search: ordersSearch || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      setOrdersData(data);
    } catch {
      /* ignore */
    }
  }, [ordersPage, ordersSearch, ordersStatus, dateFrom, dateTo]);

  useEffect(() => {
    if (!loading && tab === "dashboard") fetchDashboard();
  }, [loading, tab, fetchDashboard]);

  useEffect(() => {
    if (!loading && tab === "orders") fetchOrders();
  }, [loading, tab, fetchOrders]);

  async function handleStatusChange(orderId: number, status: string) {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setSelectedOrder(updated);
      fetchOrders();
      if (tab === "dashboard") fetchDashboard();
    } catch {
      /* ignore */
    }
  }

  async function handleNotesChange(orderId: number, newNotes: string) {
    try {
      const updated = await updateOrderNotes(orderId, newNotes);
      setSelectedOrder(updated);
    } catch {
      /* ignore */
    }
  }

  async function handleOrderClick(orderId: number) {
    try {
      const order = await getOrder(orderId);
      setSelectedOrder(order);
    } catch {
      /* ignore */
    }
  }

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">O</span>
              </div>
              <span className="text-white font-semibold hidden sm:block">Orendalife Admin</span>
            </div>
            <nav className="flex gap-1">
              <button
                onClick={() => setTab("dashboard")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "dashboard" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setTab("orders")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "orders" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
              >
                Orders
              </button>
            </nav>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition">
            Logout
          </button>
        </div>
      </header>

      {/* Date Range Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          {(dateFrom || dateTo) && (
            <button
              onClick={() => { setDateFrom(""); setDateTo(""); }}
              className="text-xs text-gray-500 hover:text-white transition"
            >
              Clear dates
            </button>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {tab === "dashboard" && metrics && <DashboardTab metrics={metrics} dailyStats={dailyStats} topProducts={topProducts} />}
        {tab === "orders" && (
          <OrdersTab
            data={ordersData}
            search={ordersSearch}
            onSearchChange={setOrdersSearch}
            statusFilter={ordersStatus}
            onStatusFilterChange={setOrdersStatus}
            page={ordersPage}
            onPageChange={setOrdersPage}
            onOrderClick={handleOrderClick}
          />
        )}
      </main>

      {selectedOrder && (
        <OrderPreview
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          onNotesChange={handleNotesChange}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// DASHBOARD TAB
// ────────────────────────────────────────────────
function DashboardTab({ metrics, dailyStats, topProducts }: { metrics: DashboardMetrics; dailyStats: DailyStats[]; topProducts: TopProduct[] }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Clicks"
          value={metrics.total_clicks.toLocaleString()}
          subtitle={`${metrics.clicks_today} today`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>}
        />
        <MetricCard
          title="Total Orders"
          value={metrics.total_orders.toLocaleString()}
          subtitle={`${metrics.orders_today} today`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversion_rate}%`}
          subtitle={`${metrics.unique_visitors.toLocaleString()} unique visitors`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <MetricCard
          title="Total Revenue"
          value={`${metrics.total_revenue.toLocaleString()} QAR`}
          subtitle={`${metrics.revenue_today.toLocaleString()} QAR today`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Avg Order Value"
          value={`${metrics.average_order_value.toFixed(0)} QAR`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
        />
        <MetricCard
          title="Confirmed"
          value={metrics.confirmed_orders.toLocaleString()}
          subtitle={`${metrics.cancelled_orders} cancelled`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <MetricCard
          title="Unique Visitors"
          value={metrics.unique_visitors.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Daily Clicks</h3>
          <MiniChart data={dailyStats} dataKey="clicks" color="bg-amber-400" />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Daily Orders</h3>
          <MiniChart data={dailyStats} dataKey="orders" color="bg-emerald-400" />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Daily Revenue (QAR)</h3>
          <MiniChart data={dailyStats} dataKey="revenue" color="bg-blue-400" />
        </div>
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Top Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-500 font-medium px-4 py-2.5">Product</th>
                  <th className="text-center text-gray-500 font-medium px-4 py-2.5">Sold</th>
                  <th className="text-right text-gray-500 font-medium px-4 py-2.5">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-white">{p.product_name}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{p.quantity_sold}</td>
                    <td className="px-4 py-3 text-right text-amber-400 font-medium">{p.revenue.toLocaleString()} QAR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// ORDERS TAB
// ────────────────────────────────────────────────
function OrdersTab({
  data,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  page,
  onPageChange,
  onOrderClick,
}: {
  data: OrdersListResponse | null;
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  page: number;
  onPageChange: (v: number) => void;
  onOrderClick: (id: number) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => { onSearchChange(e.target.value); onPageChange(1); }}
          placeholder="Search orders..."
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => { onStatusFilterChange(e.target.value); onPageChange(1); }}
          className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="">All statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="returned">Returned</option>
        </select>
        {data && (
          <span className="text-sm text-gray-500">
            {data.total} order{data.total !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="text-left text-gray-500 font-medium px-4 py-3">Order #</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">Customer</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">Phone</th>
                <th className="text-right text-gray-500 font-medium px-4 py-3">Total</th>
                <th className="text-center text-gray-500 font-medium px-4 py-3">Status</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders.map((order) => {
                const created = order.created_at ? new Date(order.created_at) : null;
                return (
                  <tr
                    key={order.id}
                    onClick={() => onOrderClick(order.id)}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition"
                  >
                    <td className="px-4 py-3 text-amber-400 font-mono text-xs">{order.order_number}</td>
                    <td className="px-4 py-3 text-white">{order.customer_name}</td>
                    <td className="px-4 py-3 text-gray-300 font-mono text-xs">{order.phone}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">{order.total} QAR</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {created ? created.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                );
              })}
              {data && data.orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-600">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {data.page} of {data.total_pages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-gray-700 disabled:opacity-40 transition"
            >
              Previous
            </button>
            <button
              disabled={page >= data.total_pages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-gray-700 disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
