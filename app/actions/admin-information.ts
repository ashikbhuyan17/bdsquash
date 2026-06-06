"use server"

import { revalidatePath } from "next/cache"
import { saveAdminInformation } from "@/lib/admin-information"
import { BD_PHONE_REGEX } from "@/lib/admin/schemas"
import type { AdminInformationUpdatePayload } from "@/lib/types/admin-information"

export type UpdateProfileState = {
  error?: string
  success?: string
}

export async function updateAdminProfileAction(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const payload: AdminInformationUpdatePayload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
  }

  if (!payload.name) {
    return { error: "Name is required." }
  }

  if (!payload.phoneNumber) {
    return { error: "Phone number is required." }
  }

  if (!BD_PHONE_REGEX.test(payload.phoneNumber)) {
    return { error: "Phone number must be 11 digits and start with 01." }
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { error: "Enter a valid email address." }
  }

  try {
    const result = await saveAdminInformation(payload)
    revalidatePath("/", "layout")
    revalidatePath("/admin/profile")
    return { success: result.message }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update profile.",
    }
  }
}
