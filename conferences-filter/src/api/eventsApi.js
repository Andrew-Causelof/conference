export async function fetchEvents(type = "upcoming") {
  const url = `https://cult.seo-gravity.ru/api/events?type=${type}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка загрузки событий:", error);
    return [];
  }
}
