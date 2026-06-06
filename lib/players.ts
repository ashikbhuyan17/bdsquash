import "server-only"

import { getRequest, postRequest, putRequest } from "@/lib/fetch"
import type {
  ApiDataResponse,
  PlayerListData,
  PlayerRegistrationPayload,
  PlayerUpdatePayload,
} from "@/lib/types/players"

export async function fetchPlayers(
  pageNumber: number,
  pageSize: number
): Promise<PlayerListData> {
  const response = await getRequest<ApiDataResponse<PlayerListData>>(
    `/players?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to load players.")
  }

  return response.data
}

export async function registerPlayer(
  payload: PlayerRegistrationPayload
): Promise<string> {
  const response = await postRequest<ApiDataResponse<{ userId: string }>>(
    "/user-registration",
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data?.userId) {
    throw new Error(response.message || "Failed to register player.")
  }

  return response.data.userId
}

export async function updatePlayer(
  userId: string,
  payload: PlayerUpdatePayload
): Promise<void> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/players/${userId}`,
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update player.")
  }
}

export async function updatePlayerActiveStatus(
  userId: string,
  isActive: boolean
): Promise<void> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/players/${userId}/active-status`,
    { isActive },
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update player status.")
  }
}
