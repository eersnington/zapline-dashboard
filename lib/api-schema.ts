import * as z from "zod";

const apiRequestValidator = z.object({
  id: z.string(),
  name: z.string(),
});

export type ApiRequest = z.infer<typeof apiRequestValidator>;
