import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ITestimonial } from "@/types/testimonial.types";

export interface SubmitTestimonialPayload {
  name: string;
  jobTitle: string;
  testimonial: string;
  rating: number;
}

export interface SubmitTestimonialResponse {
  message: string;
  testimonial: ITestimonial;
}

export const testimonialService = {
  getApproved: async (): Promise<ITestimonial[]> => {
    return api.get<ITestimonial[]>(ENDPOINTS.TESTIMONIALS.LIST);
  },

  submit: async (
    payload: SubmitTestimonialPayload
  ): Promise<SubmitTestimonialResponse> => {
    return api.post<SubmitTestimonialResponse>(
      ENDPOINTS.TESTIMONIALS.SUBMIT,
      payload
    );
  },
};
