import fs from "fs";
import path from "path";

const replacements = [
  [/\{ error: "Job not found" \}/g, "API_ERROR_CODES.JOB_NOT_FOUND"],
  [/\{ error: "Only job seekers can apply for jobs" \}/g, "API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_APPLY"],
  [/\{ error: "Account suspended" \}/g, "API_ERROR_CODES.ACCOUNT_SUSPENDED"],
  [/\{ error: "You have already applied for this job" \}/g, "API_ERROR_CODES.ALREADY_APPLIED"],
  [/\{ error: "Application not found" \}/g, "API_ERROR_CODES.APPLICATION_NOT_FOUND"],
  [/\{ error: "Unauthorized" \}/g, "API_ERROR_CODES.UNAUTHORIZED"],
  [/\{ error: "Failed to update application" \}/g, "API_ERROR_CODES.FAILED_TO_UPDATE_APPLICATION"],
  [/\{ error: "Failed to delete application" \}/g, "API_ERROR_CODES.FAILED_TO_DELETE_APPLICATION"],
  [/\{ error: "Invalid application status" \}/g, "API_ERROR_CODES.INVALID_APPLICATION_STATUS"],
  [/\{ error: "Failed to update application status" \}/g, "API_ERROR_CODES.FAILED_TO_UPDATE_APPLICATION_STATUS"],
  [/\{ error: "Failed to delete job" \}/g, "API_ERROR_CODES.FAILED_TO_DELETE_JOB"],
  [/\{\s*error: "Only job seekers can save jobs",\s*\}/g, "API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_SAVE"],
  [/\{\s*error: "Only job seekers can view saved jobs",\s*\}/g, "API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_VIEW_SAVED"],
  [/\{ error: "Company not found" \}/g, "API_ERROR_CODES.COMPANY_NOT_FOUND"],
  [/\{ error: "Testimonial not found" \}/g, "API_ERROR_CODES.TESTIMONIAL_NOT_FOUND"],
  [/\{ error: "User not found" \}/g, "API_ERROR_CODES.USER_NOT_FOUND"],
  [/\{ error: "Message not found" \}/g, "API_ERROR_CODES.MESSAGE_NOT_FOUND"],
  [/\{ error: "You cannot change your own admin role" \}/g, "API_ERROR_CODES.CANNOT_CHANGE_OWN_ADMIN_ROLE"],
  [/\{ error: "You cannot suspend your own account" \}/g, "API_ERROR_CODES.CANNOT_SUSPEND_OWN_ACCOUNT"],
  [/\{ error: "Cannot remove the last admin" \}/g, "API_ERROR_CODES.CANNOT_REMOVE_LAST_ADMIN"],
  [/\{ error: "Cannot suspend the last admin" \}/g, "API_ERROR_CODES.CANNOT_SUSPEND_LAST_ADMIN"],
  [/\{\s*error: "Minimum team size cannot exceed maximum",\s*\}/g, "API_ERROR_CODES.TEAM_SIZE_MIN_EXCEEDS_MAX"],
  [/\{ error: "Profile image not found" \}/g, "API_ERROR_CODES.PROFILE_IMAGE_NOT_FOUND"],
  [/\{ error: "Submission not found" \}/g, "API_ERROR_CODES.SUBMISSION_NOT_FOUND"],
  [/\{ error: "Invalid password" \}/g, "API_ERROR_CODES.INVALID_PASSWORD"],
  [/\{ error: "Job ID is required" \}/g, "API_ERROR_CODES.JOB_ID_REQUIRED"],
  [/\{ error: "Application ID is required" \}/g, "API_ERROR_CODES.APPLICATION_ID_REQUIRED"],
  [/\{ error: "Company ID is required" \}/g, "API_ERROR_CODES.COMPANY_ID_REQUIRED"],
  [/\{ error: "Testimonial ID is required" \}/g, "API_ERROR_CODES.TESTIMONIAL_ID_REQUIRED"],
  [/\{ error: "Message ID is required" \}/g, "API_ERROR_CODES.MESSAGE_ID_REQUIRED"],
  [/\{ error: "Submission ID is required" \}/g, "API_ERROR_CODES.SUBMISSION_ID_REQUIRED"],
  [/\{ error: "User ID is required" \}/g, "API_ERROR_CODES.USER_ID_REQUIRED"],
];

function ensureImports(content) {
  if (!content.includes("API_ERROR_CODES.")) {
    return content;
  }

  let next = content;
  if (!next.includes('from "@/lib/apiError"')) {
    next = 'import { apiError, API_ERROR_CODES } from "@/lib/apiError";\n' + next;
  }
  if (next.includes("new HttpError(") && !next.includes('from "@/lib/httpError"')) {
    next = next.replace(
      'import { apiError, API_ERROR_CODES } from "@/lib/apiError";\n',
      'import { apiError, API_ERROR_CODES } from "@/lib/apiError";\nimport { HttpError } from "@/lib/httpError";\n'
    );
  }
  return next;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", ".git", ".next"].includes(entry.name)) {
        walk(full);
      }
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) continue;

    const original = fs.readFileSync(full, "utf8");
    let content = original;

    for (const [pattern, code] of replacements) {
      content = content.replace(pattern, code);
    }

    content = content.replace(
      /throw new HttpError\((\d+), (API_ERROR_CODES\.[A-Z_]+)\)/g,
      "throw apiError($1, $2)"
    );

    content = ensureImports(content);

    if (content !== original) {
      fs.writeFileSync(full, content);
      console.log("updated", full);
    }
  }
}

walk("features");
walk("app/api");
