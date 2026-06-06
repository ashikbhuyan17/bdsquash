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

export const BD_PHONE_REGEX = /^01\d{9}$/

export const bdPhoneNumberSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .regex(BD_PHONE_REGEX, "Phone number must be 11 digits and start with 01")

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
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: bdPhoneNumberSchema,
  password: z.string(),
  profileImage: z.string(),
  formetType: z.enum(["Single", "Team", "Both"], {
    message: "Format is required",
  }),
  gender: z.enum(["Male", "Female"], {
    message: "Gender is required",
  }),
  worldRanking: z.string().trim().min(1, "World ranking is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(4000, "Description must not exceed 4000 characters"),
  profileLink: z
    .string()
    .trim()
    .url("Please enter a valid profile link")
    .or(z.literal("")),
  club: z
    .string()
    .trim()
    .min(1, "Club is required")
    .max(200, "Club must not exceed 200 characters"),
  points: z.string().trim().min(1, "Points are required"),
  isActive: z.boolean(),
})

export type PlayerFormValues = z.infer<typeof playerFormSchema>

export const mediaGalleryFormSchema = z.object({
  galleryType: z.string().min(1, "Gallery type is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string(),
  newsLink: z
    .string()
    .trim()
    .url("Please enter a valid link")
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(4000, "Description must not exceed 4000 characters"),
  isActive: z.boolean(),
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
export type MediaGalleryFormValues = z.infer<typeof mediaGalleryFormSchema>
export type AboutFormValues = z.infer<typeof aboutFormSchema>

export const profileFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  phoneNumber: bdPhoneNumberSchema,
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const eventTypeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),
  image: z.string(),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description must not exceed 2000 characters"),
  isActive: z.boolean(),
})

export type EventTypeFormValues = z.infer<typeof eventTypeFormSchema>

export const eventFormSchema = z.object({
  eventTypeId: z.string().min(1, "Event type is required"),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name must not exceed 200 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(4000, "Description must not exceed 4000 characters"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(500, "Address must not exceed 500 characters"),
  latitude: z.string().trim().min(1, "Latitude is required"),
  longitude: z.string().trim().min(1, "Longitude is required"),
  image: z.string(),
  isActive: z.boolean(),
})

export type EventFormSchemaValues = z.infer<typeof eventFormSchema>

export const faqFormSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required")
    .max(500, "Question must not exceed 500 characters"),
  answer: z
    .string()
    .trim()
    .min(1, "Answer is required")
    .max(4000, "Answer must not exceed 4000 characters"),
  isActive: z.boolean(),
})

export type FaqFormValues = z.infer<typeof faqFormSchema>

export const officialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: bdPhoneNumberSchema,
  officialType: z.string().min(1, "Official type is required"),
  designation: z
    .string()
    .trim()
    .min(1, "Designation is required")
    .max(200, "Designation must not exceed 200 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(4000, "Description must not exceed 4000 characters"),
  profileLink: z
    .string()
    .trim()
    .url("Please enter a valid profile link")
    .or(z.literal("")),
  profileImage: z.string(),
  isActive: z.boolean(),
})

export type OfficialFormValues = z.infer<typeof officialFormSchema>
