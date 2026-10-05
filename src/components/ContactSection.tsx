import ScrollReveal from "./ScrollReveal";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { content as t } from "@/content";
import { SITE } from "@/config/site";

/** Contact details plus a form that POSTs JSON to `VITE_CONTACT_BASE_URL`. Labels are tied to their fields for accessibility. */
const ContactSection = () => {
  const { contact } = t;
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const isValid =
    form.name.length > 2 && /\S+@\S+\.\S+/.test(form.email) && form.message.length > 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || loading) return;

    setLoading(true);
    setFailed(false);

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_BASE_URL;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const fields = [
    { key: "name" as const, label: contact.fields.name, type: "text" },
    { key: "email" as const, label: contact.fields.email, type: "email" },
  ];

  return (
    <section
      id={t.ids.contact}
      aria-labelledby="contact-title"
      className="bg-black py-20 sm:py-40 relative"
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          <div>
            <ScrollReveal>
              <h2
                id="contact-title"
                className="font-display font-black text-[clamp(3.5rem,10vw,6rem)] md:text-7xl metallic-text mt-3 mb-6 sm:mb-10 leading-[0.9] tracking-tight"
              >
                {contact.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-mono-accent text-sm text-white/50 font-light leading-relaxed mb-10 max-w-sm">
                {contact.intro}
              </p>
              <div className="space-y-4 font-mono-accent">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition"
                >
                  <span className="material-symbols-outlined font-extralight">alternate_email</span>
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition"
                >
                  <span className="material-symbols-outlined font-extralight">phone</span>
                  {SITE.phone}
                </a>
                <p className="flex items-center gap-3 text-sm text-white/40">
                  <span className="material-symbols-outlined font-extralight">schedule</span>
                  <span>
                    <span className="sr-only">{contact.hoursLabel}: </span>
                    {contact.hours}
                  </span>
                </p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {fields.map((field) => (
                <div key={field.key} className="relative">
                  <motion.label
                    htmlFor={`contact-${field.key}`}
                    className="absolute left-0 pointer-events-none font-mono-accent text-[14px] tracking-widest uppercase text-white/40"
                    animate={{ top: focused === field.key || form[field.key] ? -10 : 14 }}
                    transition={{ duration: 0.25 }}
                  >
                    {field.label}
                  </motion.label>
                  <input
                    id={`contact-${field.key}`}
                    name={field.key}
                    type={field.type}
                    placeholder=" "
                    autoComplete="off"
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    className="font-mono-accent w-full bg-transparent border-b border-white/10 focus:border-white/40 py-3 text-sm text-white font-light outline-none transition-all duration-300"
                    required
                  />
                </div>
              ))}
              <div className="relative">
                <motion.label
                  htmlFor="contact-message"
                  className="absolute left-0 pointer-events-none font-mono-accent text-[14px] tracking-widest uppercase text-white/40"
                  animate={{ top: focused === "message" || form.message ? -10 : 14 }}
                  transition={{ duration: 0.25 }}
                >
                  {contact.fields.message}
                </motion.label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="font-mono-accent w-full bg-transparent border-b border-white/10 focus:border-white/40 py-3 text-sm text-white font-light outline-none resize-none min-h-[120px] transition-all duration-300"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={!isValid || loading}
                whileTap={{ scale: 0.96 }}
                className="font-mono-accent font-medium group flex items-center gap-3 text-md tracking-[0.25em] uppercase text-white hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 pt-4"
              >
                {loading ? (
                  <span>{contact.sending}</span>
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{contact.sent}</span>
                  </>
                ) : (
                  <>
                    <span>{contact.send}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
              {submitted && (
                <p className="text-green-400 mt-2 font-mono-accent font-medium text-md tracking-[0.25em] uppercase">
                  {contact.success}
                </p>
              )}
              {failed && (
                <p role="alert" className="text-red-400 mt-2 font-mono-accent text-sm">
                  {contact.error}
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
