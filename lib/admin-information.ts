import "server-only"

import { getRequest, putRequest } from "@/lib/fetch"
import type { AuthUser } from "@/lib/types/auth"
import type {
  AdminInformation,
  AdminInformationUpdatePayload,
  ApiDataResponse,
} from "@/lib/types/admin-information"
import { initialsFromName } from "@/lib/utils"

export async function fetchAdminInformation(): Promise<AdminInformation | null> {
  const response = await getRequest<ApiDataResponse<AdminInformation>>(
    "/admin-information",
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) return null
  return response.data
}

export async function saveAdminInformation(
  payload: AdminInformationUpdatePayload
): Promise<AdminInformation> {
  const response = await putRequest<ApiDataResponse<AdminInformation>>(
    "/admin-information",
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to update profile.")
  }

  return response.data
}

export function mergeAdminProfile(user: AuthUser, profile: AdminInformation): AuthUser {
  return {
    ...user,
    name: profile.name,
    email: profile.email,
    userPhone: profile.phoneNumber || user.userPhone,
    profileImage: profile.profileImage,
    initials: profile.name ? initialsFromName(profile.name) : user.initials,
  }
}
