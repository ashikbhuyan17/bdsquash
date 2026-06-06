import 'server-only';

import { getApiErrorMessage, type ApiMutationResult } from '@/lib/api-response';
import { getRequest, postRequest, putRequest } from '@/lib/fetch';
import type {
  ApiDataResponse,
  PlayerListData,
  PlayerRegistrationPayload,
  PlayerUpdatePayload,
} from '@/lib/types/players';

export async function fetchPublicPlayers(
  pageNumber: number,
  pageSize: number,
): Promise<PlayerListData> {
  const response = await getRequest<ApiDataResponse<PlayerListData>>(
    `/players-for-user?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { anonymous: true, next: { revalidate: 60 } },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load players.');
  }

  return response.data;
}

export async function fetchPlayers(
  pageNumber: number,
  pageSize: number,
): Promise<PlayerListData> {
  const response = await getRequest<ApiDataResponse<PlayerListData>>(
    `/players?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load players.');
  }

  return response.data;
}

export async function registerPlayer(
  payload: PlayerRegistrationPayload,
): Promise<ApiMutationResult<string>> {
  const response = await postRequest<ApiDataResponse<{ userId: string }>>(
    '/user-registration',
    payload,
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data?.userId) {
    throw new Error(
      getApiErrorMessage(
        response,
        response.message || 'Failed to register player.',
      ),
    );
  }

  return {
    data: response.data.userId,
    message: response.message,
  };
}

export async function updatePlayer(
  userId: string,
  payload: PlayerUpdatePayload,
): Promise<ApiMutationResult> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/players/${userId}`,
    payload,
    { cache: 'no-store' },
  );

  if (!response.isValid) {
    throw new Error(
      getApiErrorMessage(
        response,
        response.message || 'Failed to update player.',
      ),
    );
  }

  return {
    data: response.data,
    message: response.message,
  };
}

export async function updatePlayerActiveStatus(
  userId: string,
  isActive: boolean,
): Promise<ApiMutationResult> {
  const response = await putRequest<ApiDataResponse<unknown>>(
    `/players/${userId}/active-status`,
    { isActive },
    { cache: 'no-store' },
  );

  if (!response.isValid) {
    throw new Error(response.message || 'Failed to update player status.');
  }

  return {
    data: response.data,
    message: response.message,
  };
}
