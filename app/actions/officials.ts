"use server"

import { revalidatePath } from "next/cache"
import {
  fetchOfficials,
  registerOfficial,
  updateOfficial,
  updateOfficialActiveStatus,
} from "@/lib/officials"
import type {
  OfficialFilters,
  OfficialListData,
  OfficialRegistrationPayload,
  OfficialUpdatePayload,
} from "@/lib/types/officials"

function revalidateOfficials() {
  revalidatePath("/admin/officials")
}

export async function getOfficialsAction(
  filters: OfficialFilters
): Promise<{ data?: OfficialListData; error?: string }> {
  try {
    const data = await fetchOfficials(filters)
    return { data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to load officials.",
    }
  }
}

export async function createOfficialAction(
  payload: OfficialRegistrationPayload
): Promise<{ success?: string; error?: string }> {
  try {
    await registerOfficial(payload)
    revalidateOfficials()
    return { success: "Official registered successfully." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to register official.",
    }
  }
}

export async function updateOfficialAction(
  officialId: number,
  payload: OfficialUpdatePayload
): Promise<{ success?: string; error?: string }> {
  try {
    await updateOfficial(officialId, payload)
    revalidateOfficials()
    return { success: "Official updated successfully." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update official.",
    }
  }
}

export async function toggleOfficialActiveAction(
  officialId: number,
  isActive: boolean
): Promise<{ success?: string; error?: string }> {
  try {
    await updateOfficialActiveStatus(officialId, isActive)
    revalidateOfficials()
    return { success: isActive ? "Official activated." : "Official deactivated." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update status.",
    }
  }
}
