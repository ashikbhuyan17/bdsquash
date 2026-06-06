'use server';

import { revalidatePath } from 'next/cache';
import {
  createFaq,
  fetchFaqs,
  updateFaq,
  updateFaqActiveStatus,
} from '@/lib/faqs';
import type { FaqListData, FaqPayload } from '@/lib/types/faqs';

function revalidateFaqs() {
  revalidatePath('/admin/faqs');
}

export async function getFaqsAction(
  pageNumber: number,
  pageSize: number,
): Promise<{ data?: FaqListData; error?: string }> {
  try {
    const data = await fetchFaqs(pageNumber, pageSize);
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to load FAQs.',
    };
  }
}

export async function createFaqAction(
  payload: FaqPayload,
): Promise<{ success?: string; error?: string; id?: number }> {
  try {
    const result = await createFaq(payload);
    revalidateFaqs();
    return { success: result.message, id: result.data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to create FAQ.',
    };
  }
}

export async function updateFaqAction(
  faqId: number,
  payload: FaqPayload,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updateFaq(faqId, payload);
    revalidateFaqs();
    return { success: result.message };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to update FAQ.',
    };
  }
}

export async function toggleFaqActiveAction(
  faqId: number,
  isActive: boolean,
): Promise<{ success?: string; error?: string }> {
  try {
    const result = await updateFaqActiveStatus(faqId, isActive);
    revalidateFaqs();
    return { success: result.message };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update status.',
    };
  }
}
