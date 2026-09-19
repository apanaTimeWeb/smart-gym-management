/**
 * Feature-local binary download transport for report exports. The isolated frontend package does not expose a reusable binary API helper, so this keeps binary-only transport inside Reports rather than widening global infrastructure.
 */
export async function downloadManagerReportsBinary(url: string): Promise<Blob> {
  const response = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'text/csv, application/octet-stream' },
  });

  if (!response.ok) {
    let message = 'Unable to export the report. Please try again.';
    try {
      const payload: unknown = await response.clone().json();
      if (typeof payload === 'object' && payload !== null && 'message' in payload) {
        const candidate = (payload as { message?: unknown }).message;
        if (typeof candidate === 'string' && candidate.trim()) message = candidate;
      }
    } catch {
      // Preserve the safe fallback when the error body is not JSON.
    }
    throw new Error(message);
  }

  return response.blob();
}
