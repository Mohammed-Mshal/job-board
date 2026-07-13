import { formatZodErrorToRecord } from "@/lib/formatError";
import { HttpError } from "@/lib/httpError";
import { contactValidation, ContactFormData } from "./contact.validation";
import { cmsService } from "../cms/cms.services";

export const contactService = {
  submitContact: async (data: ContactFormData) => {
    const result = contactValidation(data);

    if (!result.success) {
      throw new HttpError(400, { errors: formatZodErrorToRecord(result.error) });
    }

    await cmsService.createSubmission(result.data);

    return {
      message: "Your message has been sent successfully. We'll get back to you soon.",
    };
  },
};
