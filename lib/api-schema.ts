import * as z from "zod";

export const apiRequestValidator = z.object({
  user_id: z.string(),
});

export type ApiRequest = z.infer<typeof apiRequestValidator>;
