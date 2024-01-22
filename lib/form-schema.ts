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

export const botConfigSchema = z.object({
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

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type BotConfigFormValues = z.infer<typeof botConfigSchema>;
