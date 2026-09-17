export async function postJson(url, body, customHeaders = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorDetail = `Request failed: ${res.status} ${res.statusText}`;
      try {
        const errorJson = await res.json();
        if (errorJson?.error?.message) {
          errorDetail = errorJson.error.message;
        }
      } catch (e) {
        // Fallback to status text
      }
      throw new Error(errorDetail);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 35 seconds.');
    }
    throw error;
  }
}
