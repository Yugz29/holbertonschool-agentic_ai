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
    <section id="contact-section" className="py-24">
      <div className="mx-auto max-w-6xl px-6 text-white">
        <div className="text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            • Start your AI journey •
          </span>

          <h2 className="mt-6 text-4xl leading-none font-black tracking-tight text-white md:text-5xl">
            Ready to Explore
            <br />
            <span className="text-violet-400">Agentic AI?</span>
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.holbertonschool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600"
            >
              Enroll at Holberton School <ArrowRight size={16} />
            </a>
            <a
              href="https://www.holbertonschool.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900"
            >
              Need more information?
            </a>
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

          <button
            type="submit"
            disabled={!isFormValid || isSending}
            className="mt-6 w-full rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-violet-500"
          >
            {isSending ? "Sending..." : "Send message"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-400">{feedback}</p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
