import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { toast } from "react-toastify";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [lastSubmit, setLastSubmit] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const now = Date.now();

    // 🔐 беремо останню відправку з localStorage
    const lastSubmit = localStorage.getItem("subscribe_last_submit");

    if (lastSubmit) {
      const diff = now - Number(lastSubmit);

      const ONE_HOUR = 60 * 60 * 1000;

      if (diff < ONE_HOUR) {
        const minutesLeft = Math.ceil((ONE_HOUR - diff) / 60000);

        toast.error(
          `You can subscribe again in ${minutesLeft} min`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const emailTrimmed = email.trim().toLowerCase();

      // 🔍 перевірка чи вже є email
      const q = query(
        collection(db, "subscribes"),
        where("email", "==", emailTrimmed)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast.error("You are already subscribed.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "subscribes"), {
        email: emailTrimmed,
        createdAt: serverTimestamp(),
      });

      // ✅ зберігаємо час
      localStorage.setItem("subscribe_last_submit", String(now));

      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-10">
        {/* Left Block */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <img src={logoImg} className="h-10" />
            <span className="text-white font-semibold text-lg">
              Dopaset
            </span>
          </div>

          <p>
            Our platform helps you understand and manage your digital habits.
            Track usage, reduce distractions, and create space for what truly
            matters.
          </p>

          <p className="mb-2 mt-4 text-gray-400">
            Subscribe to get updates about our services
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#586ba4] text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/info" className="hover:text-white">
                Info
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <p className="hover:text-white">
                support@dopaset.space
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Dopaset. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;