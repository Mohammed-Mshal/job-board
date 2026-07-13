export interface ApiErrorBody extends Record<string, unknown> {
  code?: string;
  error?: string;
  params?: Record<string, string | number>;
  errors?:
    | Record<string, string[]>
    | Array<{ field: string; message: string }>;
}

export class HttpError extends Error {
  status: number;
  body: ApiErrorBody;

  constructor(status: number, body: ApiErrorBody) {
    super(HttpError.extractMessage(body));
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }

  static extractMessage(body: ApiErrorBody): string {
    if (typeof body.code === "string") {
      return body.code;
    }

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
