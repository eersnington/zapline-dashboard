import * as z from "zod";

export const profileSchema = z.object({
  brandname: z
    .string()
    .min(3, { message: "Brand Name must be at least 3 character" }),
  website: z.string().refine(
    (value) => {
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
      return urlRegex.test(value);
    },
    { message: "Invalid website link - https://clothing.store" },
  ),
  email: z
    .string()
    .email({ message: "Invalid email address - support@clothing.store" }),
  type: z.string().min(1, { message: "Please select a category" }),
});

export const configSchema = z.object({
  transferNumber: z
    .string()
    .min(10, {
      message: "Please enter a valid phone number - eg: +12642525299",
    })
    .nullable()
    .optional(),
  fallbackMode: z.enum(["enabled", "disabled"]),
  fallbackEmail: z
    .string()
    .email({ message: "Invalid email address - eg: support@clothing.store" }),
});

export const integrationSchema = z.object({
  myshopify: z.string().refine(
    (value) => {
      const shopifyRegex = /^[a-zA-Z0-9-]+\.myshopify\.com$/;
      return shopifyRegex.test(value);
    },
    {
      message:
        "Please provide your correct myshopify link - [your_store_name].myshopify.com",
    },
  ),
  app_token: z.string().min(20, { message: "Please enter a valid API key" }),
  refund_accept: z.enum(["enabled", "disabled"]),
  refund_window: z.string().min(1, { message: "Please enter as Integer (in days)" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ConfigFormValues = z.infer<typeof configSchema>;
export type IntegrationFormValues = z.infer<typeof integrationSchema>;
