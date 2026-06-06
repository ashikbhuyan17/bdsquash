import 'server-only';

import {
  toApiMutationResult,
  type ApiMutationResult,
} from '@/lib/api-response';
import { getRequest, postRequest, putRequest } from '@/lib/fetch';
import type {
  ApiDataResponse,
  OfficialFilters,
  OfficialListData,
  OfficialRegistrationPayload,
  OfficialUpdatePayload,
} from '@/lib/types/officials';

function buildOfficialsQuery(filters: OfficialFilters): string {
  const params = new URLSearchParams();
  params.set('pageNumber', String(filters.pageNumber));
  params.set('pageSize', String(filters.pageSize));

  if (filters.officialType) {
    params.set('officialType', filters.officialType);
  }

  return `/officials?${params.toString()}`;
}

export async function fetchOfficials(
  filters: OfficialFilters,
): Promise<OfficialListData> {
  const response = await getRequest<ApiDataResponse<OfficialListData>>(
    buildOfficialsQuery(filters),
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load officials.');
  }

  return response.data;
}

export async function registerOfficial(
  payload: OfficialRegistrationPayload,
): Promise<ApiMutationResult<number>> {
  const response = await postRequest<ApiDataResponse<number>>(
    '/official-registration',
    payload,
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to register official.');
}

export async function updateOfficial(
  officialId: number,
  payload: OfficialUpdatePayload,
): Promise<ApiMutationResult> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/official/${officialId}`,
    payload,
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update official.');
}

export async function updateOfficialActiveStatus(
  officialId: number,
  isActive: boolean,
): Promise<ApiMutationResult> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/official/${officialId}/active-status`,
    { isActive },
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update official status.');
}
