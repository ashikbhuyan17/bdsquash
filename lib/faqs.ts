import "server-only"

import { getRequest, patchRequest, postRequest } from "@/lib/fetch"
import type {
  ApiDataResponse,
  FaqListData,
  FaqPayload,
} from "@/lib/types/faqs"

export async function fetchFaqs(
  pageNumber: number,
  pageSize: number
): Promise<FaqListData> {
  const response = await getRequest<ApiDataResponse<FaqListData>>(
    `/faqs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to load FAQs.")
  }

  return response.data
}

export async function createFaq(payload: FaqPayload): Promise<number> {
  const response = await postRequest<ApiDataResponse<number>>("/faqs", payload, {
    cache: "no-store",
  })

  if (!response.isValid) {
    throw new Error(response.message || "Failed to create FAQ.")
  }

  return response.data
}

export async function updateFaq(faqId: number, payload: FaqPayload): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/faqs/${faqId}`,
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update FAQ.")
  }
}

export async function updateFaqActiveStatus(
  faqId: number,
  isActive: boolean
): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/faqs/${faqId}/active-status`,
    { isActive },
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update FAQ status.")
  }
}
