'use server';

import { revalidatePath } from 'next/cache';
import {
  fetchPlayers,
  registerPlayer,
  updatePlayer,
  updatePlayerActiveStatus,
} from '@/lib/players';
import type {
  PlayerListData,
  PlayerRegistrationPayload,
  PlayerUpdatePayload,
} from '@/lib/types/players';

function revalidatePlayers() {
  revalidatePath('/admin/players');
}

export async function getPlayersAction(
  pageNumber: number,
  pageSize: number,
): Promise<{ data?: PlayerListData; error?: string }> {
  try {
    const data = await fetchPlayers(pageNumber, pageSize);
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to load players.',
    };
  }
}

export async function createPlayerAction(
  payload: PlayerRegistrationPayload,
): Promise<{ success?: string; error?: string; id?: string }> {
  try {
    const result = await registerPlayer(payload);
    revalidatePlayers();
    return { success: result.message, id: result.data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to register player.',
    };
  }
}

export async function updatePlayerAction(
  userId: string,
  payload: PlayerUpdatePayload,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updatePlayer(userId, payload);
    revalidatePlayers();
    return { success: result.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update player.',
    };
  }
}

export async function togglePlayerActiveAction(
  userId: string,
  isActive: boolean,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updatePlayerActiveStatus(userId, isActive);
    revalidatePlayers();
    return { success: result.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update status.',
    };
  }
}
