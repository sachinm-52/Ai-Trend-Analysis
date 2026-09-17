export function stripFences(text) {
  if (!text) return '';
  return text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
}

export function safeJsonParse(text) {
  try {
    const cleaned = stripFences(text);
    return { success: true, data: JSON.parse(cleaned) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
