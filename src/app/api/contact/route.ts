import { NextResponse } from "next/server";
import { contactTopics, parseContact, validateContact } from "@/lib/contact";

/**
 * Contact form endpoint, delivered through Formspree (https://formspree.io).
 *
 * The form is validated here first (same rules as the client), then sent to
 * https://formspree.io/f/<FORMSPREE_FORM_ID>. Formspree emails it to you, and
 * `_replyto` lets you answer the visitor directly from your inbox.
 *
 * In development without FORMSPREE_FORM_ID, submissions are printed to the
 * terminal so the flow can be tested.
 *
 * Responses carry a `code` that the form translates into the visitor's language.
 */

const TOPIC_LABELS: Record<(typeof contactTopics)[number], string> = {
  job: "Job opportunity",
  freelance: "Freelance project",
  collaboration: "Collaboration",
  other: "Something else",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "invalid" }, { status: 400 });
  }

  const input = parseContact(body);

  // Honeypot filled: pretend success so bots don't retry.
  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ code: "checkFields", errors }, { status: 422 });
  }

  const { name, email, topic, message } = input;
  const topicLabel = topic ? TOPIC_LABELS[topic] : "";
  const formId = process.env.FORMSPREE_FORM_ID?.trim();

  if (!formId) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] New message (FORMSPREE_FORM_ID not set):", { name, email, topic, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ code: "notConfigured" }, { status: 503 });
  }

  try {
    const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        topic: topicLabel,
        message,
        _replyto: email,
        _subject: `Portfolio · ${topicLabel} · ${name}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Formspree responded with ${response.status} ${detail}`);
    }
  } catch (error) {
    console.error("[contact] Formspree delivery failed:", error);
    return NextResponse.json({ code: "deliveryFailed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
