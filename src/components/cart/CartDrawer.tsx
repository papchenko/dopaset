import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import {
  increment,
  decrement,
  removeFromCart,
  clearCart,
} from "../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);

  const navigate = useNavigate();
  const { user } = useAuth();

  const total = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  // useEffect(() => {
  //   document.body.style.overflow = open ? "hidden" : "auto";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[9998]"
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 h-full w-[360px] bg-zinc-900 z-[9999] flex flex-col">
        
        {/* HEADER */}
        <div className="p-5 flex justify-between border-b border-zinc-800">
          <h2 className="text-white">Cart</h2>
          <button onClick={onClose} className="text-white">✕</button>
        </div>

        {/* ITEMS */}
        <div className="p-5 flex-1 overflow-y-auto">
          {items.length === 0 && (
            <p className="text-zinc-400">Cart is empty</p>
          )}

          {items.map(item => (
            <div key={item.id} className="flex gap-3 mb-4">
              <img src={item.image} className="w-14 h-14" />

              <div className="flex-1">
                <p className="text-white">{item.title}</p>

                <div className="flex gap-2 text-white items-center">
                  <button onClick={() => dispatch(decrement(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increment(item.id))}>+</button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 text-sm"
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-zinc-800 text-white">
          <div>Total: ₴ {total}</div>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-3 text-red-400"
          >
            Clear cart
          </button>

          <button
      onClick={() => {
        if (!user) {
          alert("Sign in first");
          return;
        }

        onClose();
        navigate("/shop-orders");
      }}
  className="mt-3 w-full py-2 bg-orange-500 text-white rounded"
>
  Proceed Checkout
</button>
        </div>
      </div>
    </>,
    document.getElementById("cart-root")!
  );
}