import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function ProfileOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-2xl mb-6">My Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="border border-zinc-800 p-4 rounded"
          >
            <p>Order: {order.orderNumber}</p>
            <p>Total: ₴ {order.total}</p>
            <p>Status: {order.status}</p>

            <div className="mt-2 text-sm text-zinc-400">
              {order.items.map((i: any) => (
                <div key={i.id}>
                  {i.title} x{i.quantity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}