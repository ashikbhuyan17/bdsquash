import 'server-only';

import {
  toApiMutationResult,
  type ApiMutationResult,
} from '@/lib/api-response';
import { getRequest, patchRequest, postRequest } from '@/lib/fetch';
import type {
  ApiDataResponse,
  EventTypeListData,
  EventTypePayload,
} from '@/lib/types/event-types';

export async function fetchEventTypes(
  pageNumber: number,
  pageSize: number,
): Promise<EventTypeListData> {
  const response = await getRequest<ApiDataResponse<EventTypeListData>>(
    `/event-types?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load event types.');
  }

  return response.data;
}

export async function createEventType(
  payload: EventTypePayload,
): Promise<ApiMutationResult<number>> {
  const response = await postRequest<ApiDataResponse<number>>(
    '/event-types',
    payload,
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to create event type.');
}

export async function updateEventType(
  eventTypeId: number,
  payload: EventTypePayload,
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/event-types/${eventTypeId}`,
    payload,
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update event type.');
}

export async function updateEventTypeActiveStatus(
  eventTypeId: number,
  isActive: boolean,
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/event-types/${eventTypeId}/active-status`,
    { isActive },
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update status.');
}
