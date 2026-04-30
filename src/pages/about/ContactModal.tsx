import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!recaptchaValue) {
      setError("Confirm you are not a robot");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_hllb7p1",
        "template_gdn6fcv",
        formData,
        "v13Oo-YtABqCO9JLF"
      );

      toast.success("Message sent");
      setFormData({ name: "", email: "", message: "" });
      setRecaptchaValue(null);
      onClose();
    } catch (err) {
      toast.error("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">

      {/* glow background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-200px] left-1/2 w-[500px] h-[500px] -translate-x-1/2 bg-[#586ba4] blur-[160px] rounded-full" />
      </div>

      {/* modal */}
      <div className="relative w-full max-w-lg bg-[#0B0F19] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-400 mb-6">
          Send a message and we’ll get back to you.
        </p>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
          />

          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-purple-500 transition"
          />

          <ReCAPTCHA
            sitekey="6Lch3X8sAAAAAL9PhEivUvThrZpwD9iHCprZgyUG"
            onChange={setRecaptchaValue}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#586ba4] hover:opacity-90 transition font-medium"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;