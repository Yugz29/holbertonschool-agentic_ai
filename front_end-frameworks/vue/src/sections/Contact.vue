<script setup>
import { reactive, ref, computed } from "vue";
import {
  FolderKanban,
  Users,
  Sparkles,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-vue-next";
import Button from "../components/ui/Button.vue";
import SectionBadge from "../components/ui/SectionBadge.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";

const formData = reactive({
  fullName: "",
  email: "",
  message: "",
});

const focusedField = ref(null);
const isSending = ref(false);
const feedback = ref("Please fill all required fields");

const isNameValid = computed(() => formData.fullName.trim().length >= 2);
const isEmailValid = computed(
  () => formData.email.includes("@") && formData.email.includes("."),
);
const isMessageValid = computed(() => formData.message.trim().length >= 10);
const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isMessageValid.value,
);

function borderClass(fieldName, isValid) {
  if (focusedField.value !== fieldName) return "border-slate-800";
  return isValid ? "border-violet-500" : "border-red-500";
}

async function handleSubmit() {
  if (!isFormValid.value || isSending.value) return;

  isSending.value = true;
  feedback.value = "Sending your message...";

  await new Promise((resolve) => setTimeout(resolve, 1500));

  isSending.value = false;
  feedback.value = "Message sent successfully!";
  formData.fullName = "";
  formData.email = "";
  formData.message = "";

  setTimeout(() => {
    feedback.value = "Please fill all required fields";
  }, 3000);
}
</script>

<template>
  <section
    id="contact-section"
    class="relative overflow-hidden border-b border-slate-900 py-24"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]"
    />
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]"
    />

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
            Enroll at Holberton School <ArrowRight :size="16" />
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
            <FolderKanban :size="16" class="text-violet-400" /> Project-based
            learning
          </li>
          <li class="flex items-center gap-2">
            <Users :size="16" class="text-violet-400" /> Peer learning
            environment
          </li>
          <li class="flex items-center gap-2">
            <Sparkles :size="16" class="text-violet-400" /> AI-powered workflows
          </li>
        </ul>
      </div>

      <form
        @submit.prevent="handleSubmit"
        autocomplete="off"
        class="mx-auto mt-12 max-w-xl rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
      >
        <div>
          <label
            for="fullName"
            class="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <User :size="16" /> Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            v-model="formData.fullName"
            @focus="focusedField = 'fullName'"
            @blur="focusedField = null"
            autocomplete="off"
            placeholder="Your full name..."
            :class="[
              'mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none',
              borderClass('fullName', isNameValid),
            ]"
          />
        </div>

        <div class="mt-6">
          <label
            for="email"
            class="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <Mail :size="16" /> Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="formData.email"
            @focus="focusedField = 'email'"
            @blur="focusedField = null"
            autocomplete="off"
            placeholder="you@example.com"
            :class="[
              'mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none',
              borderClass('email', isEmailValid),
            ]"
          />
        </div>

        <div class="mt-6">
          <label
            for="message"
            class="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <MessageSquare :size="16" /> Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            v-model="formData.message"
            @focus="focusedField = 'message'"
            @blur="focusedField = null"
            autocomplete="off"
            placeholder="Tell us about your project or learning goals!"
            :class="[
              'mt-2 w-full rounded-md border bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none',
              borderClass('message', isMessageValid),
            ]"
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          :disabled="!isFormValid || isSending"
          class="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-violet-600"
        >
          {{ isSending ? "Sending..." : "Send message" }}
        </Button>

        <p class="mt-4 text-center text-sm text-slate-400">{{ feedback }}</p>
      </form>
    </div>
  </section>
</template>
