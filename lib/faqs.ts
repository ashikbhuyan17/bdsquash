import "server-only"

import { toApiMutationResult, type ApiMutationResult } from "@/lib/api-response"
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

export async function createFaq(
  payload: FaqPayload
): Promise<ApiMutationResult<number>> {
  const response = await postRequest<ApiDataResponse<number>>("/faqs", payload, {
    cache: "no-store",
  })

  return toApiMutationResult(response, "Failed to create FAQ.")
}

export async function updateFaq(
  faqId: number,
  payload: FaqPayload
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/faqs/${faqId}`,
    payload,
    { cache: "no-store" }
  )

  return toApiMutationResult(response, "Failed to update FAQ.")
}

export async function updateFaqActiveStatus(
  faqId: number,
  isActive: boolean
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/faqs/${faqId}/active-status`,
    { isActive },
    { cache: "no-store" }
  )

  return toApiMutationResult(response, "Failed to update FAQ status.")
}
