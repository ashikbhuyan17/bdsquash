"use server"

import { revalidatePath } from "next/cache"
import {
  createEvent,
  fetchEvents,
  updateEvent,
  updateEventActiveStatus,
} from "@/lib/events"
import type {
  EventCreatePayload,
  EventFilters,
  EventListData,
  EventUpdatePayload,
} from "@/lib/types/events"

function revalidateEvents() {
  revalidatePath("/admin/events")
}

export async function getEventsAction(
  filters: EventFilters
): Promise<{ data?: EventListData; error?: string }> {
  try {
    const data = await fetchEvents(filters)
    return { data }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to load events.",
    }
  }
}

export async function createEventAction(
  payload: EventCreatePayload
): Promise<{ success?: string; error?: string }> {
  try {
    await createEvent(payload)
    revalidateEvents()
    return { success: "Event created." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create event.",
    }
  }
}

export async function updateEventAction(
  eventId: number,
  payload: EventUpdatePayload
): Promise<{ success?: string; error?: string }> {
  try {
    await updateEvent(eventId, payload)
    revalidateEvents()
    return { success: "Event updated." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update event.",
    }
  }
}

export async function toggleEventActiveAction(
  eventId: number,
  isActive: boolean
): Promise<{ success?: string; error?: string }> {
  try {
    await updateEventActiveStatus(eventId, isActive)
    revalidateEvents()
    return { success: isActive ? "Event activated." : "Event deactivated." }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update status.",
    }
  }
}
