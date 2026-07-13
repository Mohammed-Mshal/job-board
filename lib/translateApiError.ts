import arMessages from "@/i18n/messages/ar.json";
import enMessages from "@/i18n/messages/en.json";
import { AppLocale } from "./getRequestLocale";

type MessageNamespace = "ApiErrors" | "ValidationErrors";

const messagesByLocale: Record<AppLocale, typeof enMessages> = {
  en: enMessages,
  ar: arMessages,
};

function getMessage(
  locale: AppLocale,
  namespace: MessageNamespace,
  key: string
): string | undefined {
  const bucket = messagesByLocale[locale]?.[namespace] as
    | Record<string, string>
    | undefined;
  return bucket?.[key];
}

function interpolate(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template;

  return Object.entries(params).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template
  );
}

function translateKey(
  locale: AppLocale,
  namespace: MessageNamespace,
  key: string,
  params?: Record<string, string | number>
): string {
  const message =
    getMessage(locale, namespace, key) ??
    getMessage("en", namespace, key) ??
    key;

  return interpolate(message, params);
}

function translateValidationMessage(locale: AppLocale, message: string): string {
  return translateKey(locale, "ValidationErrors", message);
}

export function translateApiErrorBody(
  body: Record<string, unknown>,
  locale: AppLocale
): Record<string, unknown> {
  const result = { ...body };

  if (typeof body.code === "string") {
    const params = body.params as Record<string, string | number> | undefined;
    result.error = translateKey(locale, "ApiErrors", body.code, params);
    result.code = body.code;
  } else if (typeof body.error === "string") {
    const translated = getMessage(locale, "ApiErrors", body.error);
    if (translated) {
      result.error = translated;
      result.code = body.error;
    }
  }

  if (body.errors) {
    if (Array.isArray(body.errors)) {
      result.errors = (
        body.errors as Array<{ field: string; message: string }>
      ).map((item) => ({
        ...item,
        message: translateValidationMessage(locale, item.message),
      }));
    } else if (typeof body.errors === "object") {
      const record = body.errors as Record<string, string[]>;
      result.errors = Object.fromEntries(
        Object.entries(record).map(([field, messages]) => [
          field,
          messages.map((message) => translateValidationMessage(locale, message)),
        ])
      );
    }
  }

  return result;
}
