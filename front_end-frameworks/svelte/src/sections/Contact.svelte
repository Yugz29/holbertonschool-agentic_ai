<script>
  import {
    FolderKanban,
    Users,
    Sparkles,
    User,
    Mail,
    MessageSquare,
    ArrowRight,
  } from "@lucide/svelte";
  import Button from "../components/ui/Button.svelte";
  import SectionBadge from "../components/ui/SectionBadge.svelte";
  import SectionTitle from "../components/ui/SectionTitle.svelte";

  let formData = $state({
    fullName: "",
    email: "",
    message: "",
  });

  let focusedField = $state(null);
  let isSending = $state(false);
  let feedback = $state("Please fill all required fields");

  const isNameValid = $derived(formData.fullName.trim().length >= 2);
  const isEmailValid = $derived(
    formData.email.includes("@") && formData.email.includes("."),
  );
  const isMessageValid = $derived(formData.message.trim().length >= 10);
  const isFormValid = $derived(isNameValid && isEmailValid && isMessageValid);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid || isSending) return;

    isSending = true;
    feedback = "Sending your message...";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    isSending = false;
    feedback = "Message sent successfully!";
    formData = { fullName: "", email: "", message: "" };

    setTimeout(() => {
      feedback = "Please fill all required fields";
    }, 3000);
  }

  function borderClass(fieldName, isValid) {
    if (focusedField !== fieldName) return "border-slate-800";
    return isValid ? "border-violet-500" : "border-red-500";
  }
</script>

<section
  id="contact-section"
  class="relative overflow-hidden border-b border-slate-900 py-24"
>
  <!-- Base gradient with violet (top-left) and blue (bottom-right) glows -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]"
  ></div>

  <!-- Grid overlay -->
  <div
    class="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"
  ></div>

  <!-- Fade to black at the bottom -->
  <div
    class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"
  ></div>

  <!-- Radial vignette to darken the edges -->
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]"
  ></div>

  <div class="relative mx-auto max-w-6xl px-6 text-white">
    <div class="text-center">
      <SectionBadge>• Start your AI journey •</SectionBadge>

      <SectionTitle line1="Ready to Explore" line2="Agentic AI?" />

      <div
        class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
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

      <ul
        class="mt-8 flex flex-col items-center justify-center gap-6 text-sm text-slate-300 sm:flex-row"
      >
        <li class="flex items-center gap-2">
          <FolderKanban size={16} class="text-violet-400" />
          Project-based learning
        </li>
        <li class="flex items-center gap-2">
          <Users size={16} class="text-violet-400" />
          Peer learning environment
        </li>
        <li class="flex items-center gap-2">
          <Sparkles size={16} class="text-violet-400" />
          AI-powered workflows
        </li>
      </ul>
    </div>

    <form
      onsubmit={handleSubmit}
      autocomplete="off"
      class="mx-auto mt-12 max-w-xl rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
    >
      <div>
        <label
          for="fullName"
          class="flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <User size={16} /> Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          bind:value={formData.fullName}
          onfocus={() => (focusedField = "fullName")}
          onblur={() => (focusedField = null)}
          autocomplete="off"
          placeholder="Your full name..."
          class={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
            "fullName",
            isNameValid,
          )}`}
        />
      </div>

      <div class="mt-6">
        <label
          for="email"
          class="flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <Mail size={16} /> Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          bind:value={formData.email}
          onfocus={() => (focusedField = "email")}
          onblur={() => (focusedField = null)}
          autocomplete="off"
          placeholder="you@example.com"
          class={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
            "email",
            isEmailValid,
          )}`}
        />
      </div>

      <div class="mt-6">
        <label
          for="message"
          class="flex items-center gap-2 text-sm font-medium text-slate-300"
        >
          <MessageSquare size={16} /> Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          bind:value={formData.message}
          onfocus={() => (focusedField = "message")}
          onblur={() => (focusedField = null)}
          autocomplete="off"
          placeholder="Tell us about your project or learning goals!"
          class={`mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none ${borderClass(
            "message",
            isMessageValid,
          )}`}
        ></textarea>
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={!isFormValid || isSending}
        class="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-violet-600"
      >
        {isSending ? "Sending..." : "Send message"}
      </Button>

      <p class="mt-4 text-center text-sm text-slate-400">{feedback}</p>
    </form>
  </div>
</section>
