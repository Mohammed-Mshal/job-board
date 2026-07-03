export class HttpError extends Error {
  status: number;
  body: Record<string, unknown>;

  constructor(status: number, body: Record<string, unknown>) {
    super(HttpError.extractMessage(body));
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }

  static extractMessage(body: Record<string, unknown>): string {
    if (typeof body.error === "string") {
      return body.error;
    }

    if (typeof body.message === "string") {
      return body.message;
    }

    if (body.errors && typeof body.errors === "object") {
      if (Array.isArray(body.errors)) {
        const first = body.errors[0] as { message?: string } | undefined;
        if (first?.message) {
          return first.message;
        }
      } else {
        const record = body.errors as Record<string, string[]>;
        const firstKey = Object.keys(record)[0];
        if (firstKey && record[firstKey]?.[0]) {
          return record[firstKey][0];
        }
      }
    }

    return "Request failed";
  }
}
