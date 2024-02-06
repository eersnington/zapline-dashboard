import * as z from "zod";

export const UserProfile = z
  .object({
    id: z.number(),
    userId: z.string(),
    brandname: z.string(),
    website: z.string(),
    email: z.string(),
    type: z.string(),
  })
  .nullable();

export const UserConfig = z
  .object({
    id: z.number(),
    userId: z.string(),
    transferNumber: z.string().nullable(),
    fallbackMode: z.string(),
    fallbackEmail: z.string().nullable(),
  })
  .nullable();

export const UserBot = z
  .object({
    myshopify: z.string(),
    app_token: z.string(),
    refund_accept: z.string(),
    refund_window: z.string().nullable(),
  })
  .nullable();

export type UserProfileSchema = z.infer<typeof UserProfile>;
export type UserConfigSchema = z.infer<typeof UserConfig>;
export type UserBotSchema = z.infer<typeof UserBot>;
