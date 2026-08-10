import { useState } from "react";
import {
  FolderKanban,
  Users,
  Sparkles,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import SectionBadge from "../components/ui/SectionBadge";
import SectionTitle from "../components/ui/SectionTitle";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("Please fill all required fields");

  const isNameValid = formData.fullName.trim().length >= 2;
  const isEmailValid =
    formData.email.includes("@") && formData.email.includes(".");
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid || isSending) return;

    setIsSending(true);
    setFeedback("Sending your message...");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSending(false);
    setFeedback("Message sent successfully!");
    setFormData({ fullName: "", email: "", message: "" });

    setTimeout(() => {
      setFeedback("Please fill all required fields");
    }, 3000);
  }

  function borderClass(fieldName, isValid) {
    if (focusedField !== fieldName) return "border-slate-800";
    return isValid ? "border-violet-500" : "border-red-500";
  }

  return (
    <section
      id="contact-section"
      className="relative overflow-hidden border-b border-slate-900 py-24"
    >
      {/* Base gradient with violet (top-left) and blue (bottom-right) glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      {/* Fade to black at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />

      {/* Radial vignette to darken the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-white">
        <div className="text-center">
          <SectionBadge>• Start your AI journey •</SectionBadge>

          <SectionTitle line1="Ready to Explore" line2="Agentic AI?" />

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="https://www.holbertonschool.com"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enroll at Holberton School <ArrowRight size={16} />
            </Button>
            <Button
              href="https://www.holbertonschool.com/contact"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Need more information?
            </Button>
          </div>

          <ul className="mt-8 flex flex-col items-center justify-center gap-6 text-sm text-slate-300 sm:flex-row">
            <li className="flex items-center gap-2">
              <FolderKanban size={16} className="text-violet-400" />
              Project-based learning
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-violet-400" />
              Peer learning environment
            </li>
            <li className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-400" />
              AI-powered workflows
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mx-auto mt-12 max-w-xl rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
        >
          <div>
            <label
              htmlFor="fullName"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <User size={16} /> Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              autoComplete="off"
              placeholder="Your full name..."
              className={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
                "fullName",
                isNameValid,
              )}`}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <Mail size={16} /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              autoComplete="off"
              placeholder="you@example.com"
              className={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
                "email",
                isEmailValid,
              )}`}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="flex items-center gap-2 text-sm font-medium text-slate-300"
            >
              <MessageSquare size={16} /> Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              autoComplete="off"
              placeholder="Tell us about your project or learning goals!"
              className={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
                "message",
                isMessageValid,
              )}`}
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid || isSending}
            className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-violet-600"
          >
            {isSending ? "Sending..." : "Send message"}
          </Button>

          <p className="mt-4 text-center text-sm text-slate-400">{feedback}</p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
