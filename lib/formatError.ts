import { ZodIssue } from "zod";

export type FieldError = {
  field: string;
  message: string;
};

export function formatZodErrorToRecord(
  error: unknown
): Record<string, string[]> {
  return formatZodError(error).reduce<Record<string, string[]>>(
    (acc, { field, message }) => {
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(message);
      return acc;
    },
    {}
  );
}

export function formatZodError(error: unknown): FieldError[] {
  if (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as { issues: ZodIssue[] }).issues)
  ) {
    const issues = (error as { issues: ZodIssue[] }).issues;
    return issues.map((issue: ZodIssue) => {
      const key =
        Array.isArray(issue.path) && issue.path.length > 0
          ? issue.path.join(".")
          : "general";
      return {
        field: key,
        message: issue.message || "Invalid value",
      };
    });
  }

  if (error instanceof Error) {
    return [{ field: "general", message: error.message }];
  }

  if (typeof error === "string") {
    return [{ field: "general", message: error }];
  }

  return [{ field: "general", message: "Invalid input" }];
}
