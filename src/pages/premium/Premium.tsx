import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Plan = {
  name: string;
  price: number;
  tag: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Dopaset Basic",
    price: 99.00,
    tag: "Start control",
    features: [
      "Access to Dopa Challenger",
      "Weekly report",
    ],
  },
  {
    name: "Dopaset Pro",
    price: 170.00,
    tag: "Most popular",
    highlighted: true,
    features: [
      "Daily limits engine",
      "Deep analytics AI",
      "Behavior insights",
    ],
  },
  {
    name: "Dopaset Ultra",
    price: 240.00,
    tag: "Full control",
    features: [
      "Smart addiction detection",
      "Custom rules engine",
    ],
  },
];

export default function Premium() {
  const { user } = useAuth();
  const navigate = useNavigate();

const handleSubscribe = async (plan: Plan) => {
  if (!user) {
    toast.error("Sign in first");
    return;
  }

  try {
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

    toast.success("Subscription request sent");
  } catch (e) {
    toast.error("Error");
  }
};
const handleGo = (plan: Plan) => {
  if (!user) {
    toast.error("You must be logged in");
    return;
  }

  navigate("/premium-checkout", { state: { plan } });
};

  return (
    <section className="relative py-28 bg-[#070A12] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-200px] left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-[#586ba4] blur-[140px] rounded-full" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Choose your control level for 30 days
          </h2>
          <p className="text-gray-400 mt-4">
            Dopaset helps you manage your dopamine exposure, reduce overload
            and regain focus through structured limits and insights.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`
                relative rounded-2xl p-8 border transition duration-300
                ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-[#111827] to-[#0B0F19] border-[#586ba4] scale-[1.03] shadow-xl shadow-blue-500/10"
                    : "bg-[#0B0F19] border-white/10 hover:border-white/20"
                }
              `}
            >
              {plan.highlighted && (
                <div className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-[#586ba4] text-white-300 border border-[#586ba4]">
                  Best Choice
                </div>
              )}
              <div className="mb-6">
                <div className="text-sm text-gray-400">{plan.tag}</div>
                <h3 className="text-2xl font-semibold mt-1">{plan.name}</h3>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold">
                  ₴{plan.price}
                  <span className="text-base text-gray-400 font-normal">
                     / mo
                  </span>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#586ba4]" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGo(plan)}
                className={`
                  w-full py-3 rounded-xl font-medium transition
                  ${
                    plan.highlighted
                      ? "bg-[#586ba4] hover:opacity-90 text-white"
                      : "border border-white/15 hover:bg-white hover:text-black"
                  }
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 text-gray-500 text-sm">
          Cancel first 24 hours • No hidden fees • Built for focus
        </div>
      </div>
    </section>
  );
}