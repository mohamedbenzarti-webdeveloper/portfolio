"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CircleAlert, CircleCheck, LoaderCircle, RotateCcw } from "lucide-react";
import {
  contactTopics,
  MESSAGE_MAX,
  MESSAGE_MIN,
  validateContact,
  validateField,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { format } from "@/lib/rich";
import { EASE_OUT_EXPO } from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactInput = { name: "", email: "", topic: "", message: "", website: "" };
const FIELD_ORDER: ContactField[] = ["name", "email", "topic", "message"];

const inputClass =
  "w-full rounded-lg border bg-ink/60 px-4 py-3.5 text-base text-fg placeholder:text-dim transition-colors outline-none focus-visible:outline-none focus:border-contrast/50 focus:bg-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

type ContactFormProps = {
  t: Dictionary["contact"]["form"];
  errors: Dictionary["contact"]["errors"];
};

export function ContactForm({ t, errors: messages }: ContactFormProps) {
  const errorText = (code?: ContactErrorCode) =>
    code ? format(messages[code], { min: MESSAGE_MIN, max: MESSAGE_MAX }) : undefined;

  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof ContactInput, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "website" && touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const blur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (!first || !formRef.current) return;
    const target = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    target?.focus();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    setTouched({ name: true, email: true, topic: true, message: true });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        code?: string;
        errors?: ContactErrors;
      };

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        const code = data.code as keyof typeof messages | undefined;
        throw new Error(code && code in messages ? messages[code] : messages.generic);
      }

      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error && error.message
          ? error.message
          : messages.generic,
      );
    }
  };

  const describedBy = (field: ContactField, extra?: string) =>
    [errors[field] ? `${field}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const submitting = status === "submitting";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="flex min-h-112 flex-col items-start justify-center outline-none"
          >
            <span className="bg-signal grid size-14 place-items-center rounded-full">
              <CircleCheck className="size-6 text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              {t.successTitle}
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">
              {t.successText}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-contrast/40 hover:bg-contrast/4"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              {t.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-describedby="contact-form-note"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="flex flex-col gap-6"
          >
            <p id="contact-form-note" className="text-sm text-dim">
              {t.required}
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                  {t.name}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                  className={cn(inputClass, errors.name ? "border-danger/70" : "border-line-strong")}
                  placeholder={t.namePlaceholder}
                />
                <FieldError id="name-error" message={errorText(errors.name)} />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                  {t.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy("email")}
                  className={cn(inputClass, errors.email ? "border-danger/70" : "border-line-strong")}
                  placeholder={t.emailPlaceholder}
                />
                <FieldError id="email-error" message={errorText(errors.email)} />
              </div>
            </div>

            <fieldset aria-describedby={describedBy("topic")}>
              <legend className="mb-3 text-sm font-medium">{t.topic}</legend>
              <div className="flex flex-wrap gap-2">
                {contactTopics.map((topic) => {
                  const checked = values.topic === topic;
                  return (
                    <label
                      key={topic}
                      className={cn(
                        "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-pink",
                        checked
                          ? "border-transparent bg-fg text-ink"
                          : "border-line-strong text-muted hover:border-contrast/40 hover:text-fg",
                      )}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={topic}
                        checked={checked}
                        onChange={() => {
                          update("topic", topic);
                          setTouched((prev) => ({ ...prev, topic: true }));
                          setErrors((prev) => ({ ...prev, topic: undefined }));
                        }}
                        className="sr-only"
                      />
                      {t.topics[topic]}
                    </label>
                  );
                })}
              </div>
              <FieldError id="topic-error" message={errorText(errors.topic)} />
            </fieldset>

            <div>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <label htmlFor="contact-message" className="block text-sm font-medium">
                  {t.message}
                </label>
                <span id="message-count" className="font-mono text-xs text-dim">
                  {values.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                maxLength={MESSAGE_MAX}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                onBlur={() => blur("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy("message", "message-count")}
                className={cn(
                  inputClass,
                  "min-h-40 resize-y",
                  errors.message ? "border-danger/70" : "border-line-strong",
                )}
                placeholder={t.messagePlaceholder}
              />
              <FieldError id="message-error" message={errorText(errors.message)} />
            </div>

            {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
            <div aria-hidden="true" className="absolute inset-s-[-9999px] size-px overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            <div>
              {status === "error" ? (
                <div role="alert" className="flex items-start gap-3 rounded-lg border border-danger/40 bg-danger/7 p-4 text-sm">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                  <p>
                    <span className="font-medium text-fg">{t.errorTitle}</span>{" "}
                    <span className="text-muted">{serverMessage}</span>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="group/button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-fg py-1.5 ps-6 pe-1.5 text-[0.9375rem] font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:justify-start"
              >
                <span>{submitting ? t.sending : t.send}</span>
                <span aria-hidden="true" className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-ink text-fg">
                  <span className="bg-signal absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-out-expo group-hover/button:scale-100" />
                  {submitting ? (
                    <LoaderCircle className="relative size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="relative size-4 transition-transform duration-500 ease-out-expo group-hover/button:text-white rtl:-scale-x-100 ltr:group-hover/button:rotate-45 rtl:group-hover/button:-rotate-45" />
                  )}
                </span>
              </button>
              <p role="status" className="sr-only">
                {submitting ? t.sendingStatus : ""}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
