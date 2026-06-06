'use server';

import { revalidatePath } from 'next/cache';

import {
  createMediaGalleryItem,
  fetchMediaGallery,
  fetchMediaGalleryItem,
  updateMediaGalleryActiveStatus,
  updateMediaGalleryItem,
} from '@/lib/media-gallery';

import type {
  MediaGalleryCreatePayload,
  MediaGalleryFilters,
  MediaGalleryItem,
  MediaGalleryListData,
  MediaGalleryUpdatePayload,
} from '@/lib/types/media-gallery';

function revalidateGallery() {
  revalidatePath('/admin/gallery');
}

export async function getMediaGalleryAction(
  filters: MediaGalleryFilters,
): Promise<{ data?: MediaGalleryListData; error?: string }> {
  try {
    const data = await fetchMediaGallery(filters);

    return { data };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to load media gallery.',
    };
  }
}

export async function getMediaGalleryItemAction(
  id: number,
): Promise<{ data?: MediaGalleryItem; error?: string }> {
  try {
    const data = await fetchMediaGalleryItem(id);

    return { data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to load gallery item.',
    };
  }
}

export async function createMediaGalleryItemAction(
  payload: MediaGalleryCreatePayload,
): Promise<{ success?: string; error?: string; id?: number }> {
  try {
    const result = await createMediaGalleryItem(payload);

    revalidateGallery();

    return { success: result.message, id: result.data };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create gallery item.',
    };
  }
}

export async function updateMediaGalleryItemAction(
  id: number,

  payload: MediaGalleryUpdatePayload,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updateMediaGalleryItem(id, payload);

    revalidateGallery();

    return { success: result.message };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update gallery item.',
    };
  }
}

export async function toggleMediaGalleryActiveAction(
  id: number,

  isActive: boolean,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updateMediaGalleryActiveStatus(id, isActive);

    revalidateGallery();

    return { success: result.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update status.',
    };
  }
}
