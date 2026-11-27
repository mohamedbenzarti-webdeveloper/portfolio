/**
 * Shared contact-form validation used by both the client form and the API route.
 * Errors are returned as codes so each language can render its own message.
 */

export const contactTopics = ["job", "freelance", "collaboration", "other"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export type ContactInput = {
  name: string;
  email: string;
  topic: ContactTopic | "";
  message: string;
  /** Honeypot field: real users never see or fill it. */
  website?: string;
};

export type ContactField = "name" | "email" | "topic" | "message";

export type ContactErrorCode =
  | "nameRequired"
  | "nameShort"
  | "nameLong"
  | "emailRequired"
  | "emailInvalid"
  | "topicRequired"
  | "messageRequired"
  | "messageShort"
  | "messageLong";

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: ContactField, raw: string): ContactErrorCode | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "nameRequired";
      if (value.length < 2) return "nameShort";
      if (value.length > 80) return "nameLong";
      return;
    case "email":
      if (!value) return "emailRequired";
      if (value.length > 254 || !EMAIL_PATTERN.test(value)) return "emailInvalid";
      return;
    case "topic":
      if (!contactTopics.includes(value as ContactTopic)) return "topicRequired";
      return;
    case "message":
      if (!value) return "messageRequired";
      if (value.length < MESSAGE_MIN) return "messageShort";
      if (value.length > MESSAGE_MAX) return "messageLong";
      return;
  }
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  (["name", "email", "topic", "message"] as const).forEach((field) => {
    const error = validateField(field, input[field] ?? "");
    if (error) errors[field] = error;
  });
  return errors;
}

/** Narrow unknown JSON into a ContactInput with string fields. */
export function parseContact(body: unknown): ContactInput {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const str = (key: string) => (typeof source[key] === "string" ? (source[key] as string) : "");
  return {
    name: str("name").trim(),
    email: str("email").trim(),
    topic: str("topic").trim() as ContactInput["topic"],
    message: str("message").trim(),
    website: str("website"),
  };
}
