import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default function PremiumCheckout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const plan = state?.plan;

  const [step, setStep] = useState(1);

  const [orderNumber] = useState(() => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SUB-${Date.now()}-${random}`;
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+380",
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!plan) {
    return <div className="text-white p-10">No plan selected</div>;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = async () => {
    try {
      const message = `
🔥 NEW SUBSCRIPTION

Order: ${orderNumber}

Plan: ${plan.name}
Price: ${plan.price}₴

User:
${user?.email}
${formData.fullName}
${formData.phone}
`;

      // EMAIL
      await emailjs.send(
        "service_hllb7p1",
        "template_gdn6fcv",
        { message },
        "v13Oo-YtABqCO9JLF"
      );

      // FIREBASE
      await addDoc(collection(db, "subscriptions"), {
        userId: user.uid,
        email: user.email,
        plan: plan.name,
        price: plan.price,

        status: "pending",
        createdAt: serverTimestamp(),
        activatedAt: null,
        expiresAt: null,
      });

      setStep(3);
      toast.success("Subscription sent!");
    } catch (e) {
      console.error(e);
      toast.error("Error");
    }
  };

    useEffect(() => {
  if (!user) {
    toast.error("Login required");
    // navigate("/");
  }
}, [user]);

if (!plan) {
  return <div className="text-white p-10">Invalid access</div>;
}

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16">
      <div className="max-w-3xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 && "Subscription Details"}
          {step === 2 && "Payment"}
          {step === 3 && "Success"}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="text-center mb-4">
              <p className="text-gray-400">{plan.name}</p>
              <p className="text-2xl font-bold">₴ {plan.price}</p>
            </div>

            <input
              name="fullName"
              placeholder="Full Name"
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

            <button className="py-3 bg-[#586ba4] rounded">
              Continue
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">

            <div className="flex justify-between">
              <span>Order:</span>
              <div className="flex gap-2">
                {orderNumber}
                <FaRegCopy onClick={() => {
                  navigator.clipboard.writeText(orderNumber);
                  toast.success("Copied");
                }} />
              </div>
            </div>

            <div>
              <b>Total:</b> ₴ {plan.price}
            </div>

            <div className="bg-black p-3 rounded flex justify-between">
              <span>4790 7299 2893 6954</span>
              <FaRegCopy onClick={() => {
                navigator.clipboard.writeText("4790729928936954");
                toast.success("Copied");
              }} />
            </div>

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
          <div className="text-center">
            <h3 className="text-xl">Request sent</h3>
            <p>Wait for activation</p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 py-2 px-3 bg-zinc-700 rounded"
            >
              Back Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}