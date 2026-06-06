import "server-only"

import { getApiErrorMessage } from "@/lib/api-response"
import { getAccessToken } from "@/lib/auth"
import { publicEnv } from "@/lib/env"

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

export type ApiRequestOptions = Omit<RequestInit, "method" | "body"> & {
  /** Public endpoints skip the Bearer token. Default: false (token required). */
  anonymous?: boolean
  body?: unknown
}

const defaultRequestOptions: Pick<ApiRequestOptions, "anonymous"> = {
  anonymous: false,
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${publicEnv.apiUrl}${normalizedPath}`
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null

  const contentType = response.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    return JSON.parse(text) as unknown
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

async function request<T>(
  method: string,
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    anonymous = defaultRequestOptions.anonymous,
    body,
    headers: customHeaders,
    cache,
    next,
    ...rest
  } = options

  const headers = new Headers(customHeaders)
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json")
  }

  const hasJsonBody = body !== undefined && !(body instanceof FormData)
  if (hasJsonBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (!anonymous) {
    const token = await getAccessToken()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
    cache: anonymous ? cache : cache ?? "no-store",
    next,
    ...rest,
  })

  const responseBody = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError(
      getApiErrorMessage(
        responseBody,
        `API ${method} ${path} failed with status ${response.status}`
      ),
      response.status,
      responseBody
    )
  }

  return responseBody as T
}

export function getRequest<T>(
  path: string,
  options?: ApiRequestOptions
): Promise<T> {
  return request<T>("GET", path, options)
}

export function postRequest<T>(
  path: string,
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return request<T>("POST", path, { ...options, body })
}

export function putRequest<T>(
  path: string,
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return request<T>("PUT", path, { ...options, body })
}

export function patchRequest<T>(
  path: string,
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> {
  return request<T>("PATCH", path, { ...options, body })
}

export function deleteRequest<T>(
  path: string,
  options?: ApiRequestOptions
): Promise<T> {
  return request<T>("DELETE", path, options)
}

export const api = {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
}
