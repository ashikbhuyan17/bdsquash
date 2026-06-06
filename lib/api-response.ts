function collectErrorMessages(value: unknown): string[] {
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  if (Array.isArray(value)) return value.flatMap(collectErrorMessages);
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(
      collectErrorMessages,
    );
  }
  return [];
}

/** Extract user-facing text from BDSquash API error envelopes and validation payloads. */
export function getApiErrorMessage(body: unknown, fallback: string): string {
  let parsed = body;

  if (typeof body === 'string') {
    const trimmed = body.trim();
    if (!trimmed) return fallback;
    try {
      parsed = JSON.parse(trimmed) as unknown;
    } catch {
      return trimmed;
    }
  }

  if (!parsed || typeof parsed !== 'object') return fallback;

  const record = parsed as Record<string, unknown>;

  for (const key of [
    'message',
    'Message',
    'error',
    'Error',
    'detail',
    'Detail',
  ]) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (Array.isArray(value)) {
      const messages = collectErrorMessages(value);
      if (messages.length) return messages.join(' ');
    }
  }

  if (record.errors) {
    const messages = collectErrorMessages(record.errors);
    if (messages.length) return messages.join(' ');
  }

  if (typeof record.title === 'string' && record.title.trim()) {
    return record.title.trim();
  }

  return fallback;
}

export type ApiEnvelope<T> = {
  isValid: boolean;
  data: T;
  message: string;
};

export function assertApiValid<T>(
  response: ApiEnvelope<T>,
  fallback: string,
): T {
  if (!response.isValid) {
    throw new Error(response.message || fallback);
  }
  return response.data;
}

export type ApiMutationResult<T = unknown> = {
  data: T;
  message: string;
};

export function toApiMutationResult<T>(
  response: ApiEnvelope<T>,
  fallback: string,
): ApiMutationResult<T> {
  if (!response.isValid) {
    throw new Error(response.message || fallback);
  }
  return {
    data: response.data,
    message: response.message,
  };
}
