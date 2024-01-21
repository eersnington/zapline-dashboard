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
  brandname2: z
    .string()
    .min(3, { message: "Brand Name pronounced by the bot" }),
  website2: z
    .string()
    .min(3, { message: "Website Link pronounced by the bot" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
