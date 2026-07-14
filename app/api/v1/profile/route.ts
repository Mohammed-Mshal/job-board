import { asyncWrapper } from "@/lib/asyncWrapper";
import { getProfileResponse } from "@/features/profile/get-profile.handler";

export const GET = asyncWrapper(async () => getProfileResponse());
