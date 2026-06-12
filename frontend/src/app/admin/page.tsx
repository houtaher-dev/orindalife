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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type DashboardMetrics,
  type DailyStats,
  type TopProduct,
  type OrderDetail,
  type OrdersListResponse,
  type Product,
} from "@/lib/adminApi";

// ────────────────────────────────────────────────
// STATUS CONFIG
// ────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: "مؤكد", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  pending: { label: "قيد الانتظار", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  delivered: { label: "تم التوصيل", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  cancelled: { label: "ملغى", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  returned: { label: "مسترجع", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
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
            {d.date.slice(5)}: {dataKey === "revenue" ? `${d[dataKey].toFixed(0)} SAR` : d[dataKey]}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose} dir="rtl">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-white" dir="ltr">{order.order_number}</h2>
            <p className="text-sm text-gray-500 mt-0.5" dir="ltr">
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
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">الزبون</p>
              <p className="text-white font-medium">{order.customer_name}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">الهاتف</p>
              <p className="text-white font-medium direction-ltr" dir="ltr">{order.phone}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">عنوان IP</p>
              <p className="text-white font-medium font-mono text-sm" dir="ltr">{order.ip_address || "—"}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">البيع الإضافي (Upsell)</p>
              <p className={`font-medium ${order.upsell_accepted ? "text-emerald-400" : "text-gray-500"}`}>
                {order.upsell_accepted ? `مقبول (+${order.upsell_amount} SAR)` : "مرفوض"}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">عناصر الطلب</h3>
            <div className="bg-gray-800/30 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-gray-500 font-medium px-4 py-2.5">المنتج</th>
                    <th className="text-center text-gray-500 font-medium px-4 py-2.5">الكمية</th>
                    <th className="text-left text-gray-500 font-medium px-4 py-2.5">السعر</th>
                    <th className="text-left text-gray-500 font-medium px-4 py-2.5">المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800/50">
                      <td className="px-4 py-3 text-white">{item.product_name_ar}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{item.quantity}</td>
                      <td className="px-4 py-3 text-left text-gray-300">{item.unit_price} SAR</td>
                      <td className="px-4 py-3 text-left text-white font-medium">{item.line_total} SAR</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-700">
                    <td colSpan={3} className="px-4 py-2.5 text-left text-gray-400">المجموع الفرعي</td>
                    <td className="px-4 py-2.5 text-left text-white">{order.subtotal} SAR</td>
                  </tr>
                  {order.upsell_accepted && (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-left text-gray-400">البيع الإضافي</td>
                      <td className="px-4 py-2 text-left text-emerald-400">+{order.upsell_amount} SAR</td>
                    </tr>
                  )}
                  <tr className="border-t border-gray-700">
                    <td colSpan={3} className="px-4 py-3 text-left text-white font-semibold">الإجمالي</td>
                    <td className="px-4 py-3 text-left text-amber-400 font-bold text-lg">{order.total} SAR</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Webhook Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">حالة الربط (Integrations)</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Google Sheets", ok: order.sheets_sent },
                { label: "Meta CAPI", ok: order.meta_capi_sent },
                { label: "TikTok CAPI", ok: order.tiktok_capi_sent },
                { label: "Snapchat CAPI", ok: order.snap_capi_sent },
              ].map(({ label, ok }) => (
                <span key={label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${ok ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400" : "bg-gray-800 border-gray-700 text-gray-500"}`} dir="ltr">
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
            <h3 className="text-sm font-semibold text-gray-300 mb-3">تغيير الحالة</h3>
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
            <h3 className="text-sm font-semibold text-gray-300 mb-3">ملاحظات</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm"
              placeholder="أضف ملاحظات حول هذا الطلب..."
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="mt-2 px-4 py-1.5 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg hover:border-gray-600 hover:text-white disabled:opacity-50 transition"
            >
              {savingNotes ? "جاري الحفظ..." : "حفظ الملاحظات"}
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
  const [tab, setTab] = useState<"dashboard" | "orders" | "products">("dashboard");
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

  // Products data
  const [productsData, setProductsData] = useState<Product[]>([]);

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

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProductsData(data);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!loading && tab === "dashboard") fetchDashboard();
  }, [loading, tab, fetchDashboard]);

  useEffect(() => {
    if (!loading && tab === "orders") fetchOrders();
  }, [loading, tab, fetchOrders]);

  useEffect(() => {
    if (!loading && tab === "products") fetchProducts();
  }, [loading, tab, fetchProducts]);

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
              <span className="text-white font-semibold hidden sm:block">لوحة تحكم أوريندا</span>
            </div>
            <nav className="flex gap-1">
              <button
                onClick={() => setTab("dashboard")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "dashboard" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
              >
                الإحصائيات
              </button>
              <button
                onClick={() => setTab("orders")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "orders" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
              >
                الطلبيات
              </button>
              <button
                onClick={() => setTab("products")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === "products" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
              >
                المنتجات
              </button>
            </nav>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition">
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Date Range Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" dir="rtl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">من</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">إلى</label>
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
              مسح التواريخ
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
        {tab === "products" && (
          <ProductsTab
            products={productsData}
            onRefresh={fetchProducts}
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
    <div className="space-y-6" dir="rtl">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="إجمالي النقرات"
          value={metrics.total_clicks.toLocaleString()}
          subtitle={`${metrics.clicks_today} اليوم`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>}
        />
        <MetricCard
          title="إجمالي الطلبيات"
          value={metrics.total_orders.toLocaleString()}
          subtitle={`${metrics.orders_today} اليوم`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
        />
        <MetricCard
          title="معدل التحويل"
          value={`${metrics.conversion_rate}%`}
          subtitle={`${metrics.unique_visitors.toLocaleString()} زائر فريد`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <MetricCard
          title="إجمالي المبيعات"
          value={`${metrics.total_revenue.toLocaleString()} SAR`}
          subtitle={`${metrics.revenue_today.toLocaleString()} SAR اليوم`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="متوسط قيمة الطلب"
          value={`${metrics.average_order_value.toFixed(0)} SAR`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
        />
        <MetricCard
          title="الطلبات المؤكدة"
          value={metrics.confirmed_orders.toLocaleString()}
          subtitle={`${metrics.cancelled_orders} ملغاة`}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <MetricCard
          title="الزوار الفريدين"
          value={metrics.unique_visitors.toLocaleString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">النقرات اليومية</h3>
          <MiniChart data={dailyStats} dataKey="clicks" color="bg-amber-400" />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">الطلبيات اليومية</h3>
          <MiniChart data={dailyStats} dataKey="orders" color="bg-emerald-400" />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">المبيعات اليومية (SAR)</h3>
          <MiniChart data={dailyStats} dataKey="revenue" color="bg-blue-400" />
        </div>
      </div>

      {/* Top Products */}
      {topProducts.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">أفضل المنتجات مبيعاً</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-gray-500 font-medium px-4 py-2.5">المنتج</th>
                  <th className="text-center text-gray-500 font-medium px-4 py-2.5">الكمية المباعة</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-2.5">المبيعات</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-gray-800/50">
                    <td className="px-4 py-3 text-white">{p.product_name}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{p.quantity_sold}</td>
                    <td className="px-4 py-3 text-left text-amber-400 font-medium">{p.revenue.toLocaleString()} SAR</td>
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
// PRODUCTS TAB
// ────────────────────────────────────────────────
function ProductsTab({ products, onRefresh }: { products: Product[]; onRefresh: () => void }) {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      if (editingProduct.id) {
        await updateProduct(editingProduct.id, editingProduct);
      } else {
        await createProduct(editingProduct);
      }
      setEditingProduct(null);
      onRefresh();
    } catch (err) {
      alert("Failed to save product. Check console for details.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      onRefresh();
    } catch (err) {
      alert("Failed to delete product.");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Manage Products</h2>
        <button
          onClick={() => setEditingProduct({
            slug: "", name_ar: "", name_en: "", price_1: 0, price_2: 0, price_3: 0, is_upsell: false, is_active: true, sort_order: 0
          })}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="text-left text-gray-500 font-medium px-4 py-3">Image</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">Name (AR)</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">Slug</th>
                <th className="text-right text-gray-500 font-medium px-4 py-3">Price 1</th>
                <th className="text-center text-gray-500 font-medium px-4 py-3">Status</th>
                <th className="text-right text-gray-500 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-4 py-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name_en} className="w-10 h-10 object-contain rounded bg-white" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-gray-500 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{p.name_ar}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3 text-right text-amber-400">{p.price_1} SAR</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.is_active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                      {p.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditingProduct(p)} className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">{editingProduct.id ? "Edit Product" : "Add New Product"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-amber-400 font-semibold border-b border-gray-800 pb-2">Basic Info</h4>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Slug (URL identifier)</label>
                  <input type="text" value={editingProduct.slug || ""} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name (Arabic)</label>
                  <input type="text" value={editingProduct.name_ar || ""} onChange={e => setEditingProduct({...editingProduct, name_ar: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-right" dir="rtl" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name (English)</label>
                  <input type="text" value={editingProduct.name_en || ""} onChange={e => setEditingProduct({...editingProduct, name_en: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tagline (Arabic)</label>
                  <input type="text" value={editingProduct.tagline_ar || ""} onChange={e => setEditingProduct({...editingProduct, tagline_ar: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-right" dir="rtl" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description (Arabic)</label>
                  <textarea value={editingProduct.description_ar || ""} onChange={e => setEditingProduct({...editingProduct, description_ar: e.target.value})} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-right" dir="rtl" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                  <input type="text" value={editingProduct.image_url || ""} onChange={e => setEditingProduct({...editingProduct, image_url: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" placeholder="/images/product.jpg" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Badge (Arabic)</label>
                  <input type="text" value={editingProduct.badge_ar || ""} onChange={e => setEditingProduct({...editingProduct, badge_ar: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-right" dir="rtl" />
                </div>
              </div>

              {/* Pricing & Settings */}
              <div className="space-y-4">
                <h4 className="text-amber-400 font-semibold border-b border-gray-800 pb-2">Pricing & Settings</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price 1 (SAR)</label>
                    <input type="number" value={editingProduct.price_1 || 0} onChange={e => setEditingProduct({...editingProduct, price_1: parseFloat(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price 2 (SAR)</label>
                    <input type="number" value={editingProduct.price_2 || 0} onChange={e => setEditingProduct({...editingProduct, price_2: parseFloat(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price 3 (SAR)</label>
                    <input type="number" value={editingProduct.price_3 || 0} onChange={e => setEditingProduct({...editingProduct, price_3: parseFloat(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input type="checkbox" checked={editingProduct.is_upsell || false} onChange={e => setEditingProduct({...editingProduct, is_upsell: e.target.checked})} className="rounded bg-gray-800 border-gray-700 text-amber-500 focus:ring-amber-500" />
                    Is Upsell?
                  </label>
                  {editingProduct.is_upsell && (
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Upsell Price (SAR)</label>
                      <input type="number" value={editingProduct.upsell_price || 0} onChange={e => setEditingProduct({...editingProduct, upsell_price: parseFloat(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white text-sm" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input type="checkbox" checked={editingProduct.is_active ?? true} onChange={e => setEditingProduct({...editingProduct, is_active: e.target.checked})} className="rounded bg-gray-800 border-gray-700 text-amber-500 focus:ring-amber-500" />
                    Is Active?
                  </label>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Sort Order</label>
                    <input type="number" value={editingProduct.sort_order || 0} onChange={e => setEditingProduct({...editingProduct, sort_order: parseInt(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white text-sm" />
                  </div>
                </div>

                <h4 className="text-amber-400 font-semibold border-b border-gray-800 pb-2 mt-6">Advanced JSON Data</h4>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Ingredients (JSON Array)</label>
                  <textarea 
                    value={typeof editingProduct.ingredients === 'string' ? editingProduct.ingredients : JSON.stringify(editingProduct.ingredients || [], null, 2)} 
                    onChange={e => {
                      try {
                        const val = JSON.parse(e.target.value);
                        setEditingProduct({...editingProduct, ingredients: val});
                      } catch {
                        setEditingProduct({...editingProduct, ingredients: e.target.value as any});
                      }
                    }} 
                    rows={4} 
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Problems & Solutions (JSON Array)</label>
                  <textarea 
                    value={typeof editingProduct.problems_solutions === 'string' ? editingProduct.problems_solutions : JSON.stringify(editingProduct.problems_solutions || [], null, 2)} 
                    onChange={e => {
                      try {
                        const val = JSON.parse(e.target.value);
                        setEditingProduct({...editingProduct, problems_solutions: val});
                      } catch {
                        setEditingProduct({...editingProduct, problems_solutions: e.target.value as any});
                      }
                    }} 
                    rows={4} 
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white font-mono text-xs" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-gray-800 pt-4">
              <button onClick={() => setEditingProduct(null)} className="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
              <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition disabled:opacity-50">
                {isSaving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
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
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => { onSearchChange(e.target.value); onPageChange(1); }}
          placeholder="ابحث في الطلبيات..."
          className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => { onStatusFilterChange(e.target.value); onPageChange(1); }}
          className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="">جميع الحالات</option>
          <option value="confirmed">مؤكد</option>
          <option value="pending">قيد الانتظار</option>
          <option value="delivered">تم التوصيل</option>
          <option value="cancelled">ملغى</option>
          <option value="returned">مسترجع</option>
        </select>
        {data && (
          <span className="text-sm text-gray-500">
            تم العثور على {data.total} طلب
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="text-gray-500 font-medium px-4 py-3">رقم الطلب</th>
                <th className="text-gray-500 font-medium px-4 py-3">الزبون</th>
                <th className="text-gray-500 font-medium px-4 py-3">رقم الهاتف</th>
                <th className="text-left text-gray-500 font-medium px-4 py-3">المجموع</th>
                <th className="text-center text-gray-500 font-medium px-4 py-3">الحالة</th>
                <th className="text-gray-500 font-medium px-4 py-3">التاريخ</th>
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
                    <td className="px-4 py-3 text-gray-300 font-mono text-xs" dir="ltr">{order.phone}</td>
                    <td className="px-4 py-3 text-left text-white font-medium">{order.total} SAR</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {created ? created.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                );
              })}
              {data && data.orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-600">لا توجد طلبيات</td>
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
            صفحة {data.page} من {data.total_pages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-gray-700 disabled:opacity-40 transition"
            >
              السابق
            </button>
            <button
              disabled={page >= data.total_pages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-gray-700 disabled:opacity-40 transition"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
