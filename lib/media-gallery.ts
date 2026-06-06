import 'server-only';

import {
  toApiMutationResult,
  type ApiMutationResult,
} from '@/lib/api-response';
import { getRequest, patchRequest, postRequest } from '@/lib/fetch';
import type {
  ApiDataResponse,
  MediaGalleryCreatePayload,
  MediaGalleryFilters,
  MediaGalleryItem,
  MediaGalleryListData,
  MediaGalleryUpdatePayload,
  PublicMediaGalleryFilters,
} from '@/lib/types/media-gallery';

function buildMediaGalleryQuery(filters: MediaGalleryFilters): string {
  const params = new URLSearchParams();
  params.set('pageNumber', String(filters.pageNumber));
  params.set('pageSize', String(filters.pageSize));

  if (filters.galleryType) {
    params.set('galleryType', filters.galleryType);
  }
  if (filters.category) {
    params.set('category', filters.category);
  }
  if (filters.isActive !== undefined) {
    params.set('isActive', String(filters.isActive));
  }

  return `/media-gallery?${params.toString()}`;
}

function buildPublicMediaGalleryQuery(
  filters: PublicMediaGalleryFilters,
): string {
  const params = new URLSearchParams();
  params.set('pageNumber', String(filters.pageNumber));
  params.set('pageSize', String(filters.pageSize));

  if (filters.galleryType) {
    params.set('galleryType', filters.galleryType);
  }
  if (filters.category) {
    params.set('category', filters.category);
  }

  return `/media-gallery/users?${params.toString()}`;
}

export async function fetchPublicMediaGallery(
  filters: PublicMediaGalleryFilters,
): Promise<MediaGalleryListData> {
  const response = await getRequest<ApiDataResponse<MediaGalleryListData>>(
    buildPublicMediaGalleryQuery(filters),
    { anonymous: true, next: { revalidate: 60 } },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load media gallery.');
  }

  return response.data;
}

export async function fetchMediaGallery(
  filters: MediaGalleryFilters,
): Promise<MediaGalleryListData> {
  const response = await getRequest<ApiDataResponse<MediaGalleryListData>>(
    buildMediaGalleryQuery(filters),
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load media gallery.');
  }

  return response.data;
}

export async function fetchMediaGalleryItem(
  id: number,
): Promise<MediaGalleryItem> {
  const response = await getRequest<ApiDataResponse<MediaGalleryItem>>(
    `/media-gallery/${id}`,
    { cache: 'no-store' },
  );

  if (!response.isValid || !response.data) {
    throw new Error(response.message || 'Failed to load gallery item.');
  }

  return response.data;
}

export async function createMediaGalleryItem(
  payload: MediaGalleryCreatePayload,
): Promise<ApiMutationResult<number>> {
  const response = await postRequest<ApiDataResponse<number>>(
    '/media-gallery',
    payload,
    {
      cache: 'no-store',
    },
  );

  return toApiMutationResult(response, 'Failed to create gallery item.');
}

export async function updateMediaGalleryItem(
  id: number,
  payload: MediaGalleryUpdatePayload,
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/media-gallery/${id}`,
    payload,
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update gallery item.');
}

export async function updateMediaGalleryActiveStatus(
  id: number,
  isActive: boolean,
): Promise<ApiMutationResult> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/media-gallery/${id}/active-status`,
    { isActive },
    { cache: 'no-store' },
  );

  return toApiMutationResult(response, 'Failed to update gallery item status.');
}
