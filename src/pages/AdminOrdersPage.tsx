import { useEffect, useMemo, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type Order = {
  id: number;
  created_at: string;
  method: string;
  customer_name: string;
  phone_number: string;
  address: string;
  birthday: string;
  is_gift_order: boolean;
  gift_recipient_name: string | null;
  items: OrderItem[];
  total_amount: number;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePageMeta({
    title: 'Admin Orders',
    description: 'View COD orders stored in Neon.',
    keywords: 'admin, orders, neon'
  });

  const totalCount = useMemo(() => orders.length, [orders]);

  const fetchOrders = async (adminToken?: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = adminToken ? `/api/orders?token=${encodeURIComponent(adminToken)}` : '/api/orders';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Unable to load orders');
      }

      const data = (await response.json()) as { orders: Order[] };
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4">
            Admin Orders
          </h1>
          <p className="text-base font-inter text-[#5A1E2B]/80 mb-6">
            Total orders loaded: {totalCount}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Admin token (if required)"
              className="w-full md:w-80 px-4 py-3 border border-[#D6C1A9]/60 rounded-xl font-inter text-[#5A1E2B] placeholder-[#5A1E2B]/40 focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all"
            />
            <button
              type="button"
              onClick={() => fetchOrders(token)}
              className="bg-[#5A1E2B] text-[#D6C1A9] px-6 py-3 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="text-sm font-inter text-[#5A1E2B]/70">Loading orders…</div>
          )}

          {error && (
            <div className="text-sm font-inter text-[#E2725B] mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 border border-[#D6C1A9]/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-lg font-playfair font-semibold text-[#5A1E2B]">
                      Order #{order.id}
                    </p>
                    <p className="text-xs font-inter text-[#5A1E2B]/70">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <p className="text-sm font-inter text-[#E2725B] font-semibold">
                    {order.total_amount} BDT
                  </p>
                </div>

                <div className="grid gap-3 text-sm font-inter text-[#5A1E2B]/80 md:grid-cols-2">
                  <div>Customer: {order.customer_name}</div>
                  <div>Phone: {order.phone_number}</div>
                  <div>Birthday: {order.birthday}</div>
                  <div>Gift: {order.is_gift_order ? 'Yes' : 'No'}</div>
                  {order.is_gift_order && order.gift_recipient_name && (
                    <div>Recipient: {order.gift_recipient_name}</div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                    Items
                  </p>
                  <div className="space-y-1 text-sm font-inter text-[#5A1E2B]/80">
                    {order.items?.map((item, index) => (
                      <div key={`${order.id}-${index}`}>
                        {index + 1}. {item.name} x{item.quantity} = {item.subtotal} BDT
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm font-inter text-[#5A1E2B]/80">
                  Address: {order.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
