"use server"

import { revalidatePath } from "next/cache"
import {
  createEventType,
  fetchEventTypes,
  updateEventType,
  updateEventTypeActiveStatus,
} from "@/lib/event-types"
import type { EventTypeListData, EventTypePayload } from "@/lib/types/event-types"

function revalidateEventTypes() {
  revalidatePath("/admin/event-types")
}

export async function getEventTypesAction(
  pageNumber: number,
  pageSize: number
): Promise<{ data?: EventTypeListData; error?: string }> {
  try {
    const data = await fetchEventTypes(pageNumber, pageSize)
    return { data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to load event types.",
    }
  }
}

export async function createEventTypeAction(
  payload: EventTypePayload
): Promise<{ success?: string; error?: string }> {
  try {
    await createEventType(payload)
    revalidateEventTypes()
    return { success: "Event type created." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create event type.",
    }
  }
}

export async function updateEventTypeAction(
  eventTypeId: number,
  payload: EventTypePayload
): Promise<{ success?: string; error?: string }> {
  try {
    await updateEventType(eventTypeId, payload)
    revalidateEventTypes()
    return { success: "Event type updated." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update event type.",
    }
  }
}

export async function toggleEventTypeActiveAction(
  eventTypeId: number,
  isActive: boolean
): Promise<{ success?: string; error?: string }> {
  try {
    await updateEventTypeActiveStatus(eventTypeId, isActive)
    revalidateEventTypes()
    return { success: isActive ? "Event type activated." : "Event type deactivated." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update status.",
    }
  }
}
