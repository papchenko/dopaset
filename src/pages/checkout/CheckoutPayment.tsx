import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { clearCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPayment() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const { user } = useAuth();

  const items = useAppSelector(state => state.cart.items);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [step, setStep] = useState(1);

  const [orderNumber] = useState(() => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${Date.now()}-${random}`;
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+380",
    city: "",
    postalService: "novaPoshta",
    postalOffice: ""
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setStep(2);
  };
const handleConfirm = async () => {
  try {
    const message = `
🧾 NEW ORDER

Order: ${orderNumber}

Items:
${items.map(i => `${i.title} x${i.quantity} = ${i.price * i.quantity}₴`).join("\n")}

TOTAL: ${totalAmount}₴

Customer:
${formData.fullName}
${formData.phone}
${formData.city}
${formData.postalOffice}
`;

    // 🔥 EMAIL
    await emailjs.send(
      "service_hllb7p1",   // твій service
      "template_gdn6fcv",  // твій template
      { message },
      "v13Oo-YtABqCO9JLF"  // твій public key
    );

    // 🔥 FIREBASE
    await addDoc(collection(db, "orders"), {
      orderNumber,
      items,
      total: totalAmount,
      createdAt: serverTimestamp(),
      status: "pending",
      userId: user.uid
    });

    dispatch(clearCart());
    setStep(3);

    toast.success("Order sent!");
  } catch (e) {
    console.error(e);
    toast.error("Error");
  }
};

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16">
      <div className="max-w-3xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 && "Shipping Details"}
          {step === 2 && "Payment"}
          {step === 3 && "Receipt"}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-2 rounded bg-zinc-800"
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-2 rounded bg-zinc-800"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 rounded bg-zinc-800"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="p-2 rounded bg-zinc-800"
              required
            />

            <input
              name="postalOffice"
              placeholder="Post Office"
              onChange={handleChange}
              className="p-2 rounded bg-zinc-800"
              required
            />

            <button className="py-3 bg-[#586ba4] rounded">
              Continue
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">

            <div className="flex justify-between items-center">
              <span>Order:</span>
              <div className="flex items-center gap-2">
                {orderNumber}
                <FaRegCopy
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(orderNumber);
                    toast.success("Copied");
                  }}
                />
              </div>
            </div>

            <div>
              <b>Total:</b> ₴ {totalAmount}
            </div>

            <div className="bg-black p-3 rounded flex justify-between">
              <span>4790 7299 2893 6954</span>
              <FaRegCopy
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("4790729928936954");
                  toast.success("Card copied");
                }}
              />
            </div>

            <p className="text-red-600 text-sm">
              Put order number in payment comment
            </p>

            <button
              onClick={handleConfirm}
              className="py-3 bg-[#586ba4] rounded"
            >
              I Paid
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center flex flex-col gap-3">
            <h3 className="text-xl">Thank you!</h3>

            <p>Order: {orderNumber}</p>
            <p>Total: ₴ {totalAmount}</p>

            <button
              onClick={() => navigate("/")}
              className="py-2 bg-zinc-700 rounded"
            >
              Back Home
            </button>
          </div>
        )}

        {/* ITEMS PREVIEW */}
        {items.length > 0 && (
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <p className="mb-2 text-zinc-400">Items:</p>

            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x{item.quantity}</span>
                <span>₴ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}