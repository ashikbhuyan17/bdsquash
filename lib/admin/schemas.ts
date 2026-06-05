import { z } from "zod"

const imageDataUrl = z
  .string()
  .min(1, "Image is required")
  .refine(
    (v) => v.startsWith("data:image/"),
    "Image must be a base64 data URL (data:image/...)"
  )

const link = z
  .string()
  .min(1, "Link is required")
  .refine(
    (v) => v.startsWith("http://") || v.startsWith("https://") || v.startsWith("/"),
    "Enter a valid URL or path"
  )

const htmlRich = z.string().min(1, "This field is required")

export const bannerFormSchema = z.object({
  image: imageDataUrl,
  title: z.string().min(2, "Title is too short").max(200),
  description: z.string().min(2).max(2000),
  bannerLink: link,
  active: z.boolean(),
})

export const newsFormSchema = z.object({
  newsDate: z.string().min(1, "Date is required"),
  image: imageDataUrl,
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(2000),
  newsLink: link,
  active: z.boolean(),
})

export const playerFormSchema = z.object({
  name: z.string().min(2).max(120),
  profileImage: imageDataUrl,
  ranking: z
    .number()
    .int()
    .min(1, "Must be at least 1")
    .max(9999),
  country: z.string().min(2).max(80),
  bio: z.string().min(2).max(2000),
  active: z.boolean(),
})

export const galleryFormSchema = z.object({
  image: imageDataUrl,
  title: z.string().min(2).max(200),
  galleryLink: link,
  active: z.boolean(),
})

export const aboutFormSchema = z.object({
  history: htmlRich,
  presidentMessage: htmlRich,
  mission: z.string().min(2).max(2000),
  vision: z.string().min(2).max(2000),
  active: z.boolean(),
})

export type BannerFormValues = z.infer<typeof bannerFormSchema>
export type NewsFormValues = z.infer<typeof newsFormSchema>
export type PlayerFormValues = z.infer<typeof playerFormSchema>
export type GalleryFormValues = z.infer<typeof galleryFormSchema>
export type AboutFormValues = z.infer<typeof aboutFormSchema>
