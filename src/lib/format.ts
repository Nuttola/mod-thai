/** 22 ต.ค. 2026 */
export function formatThaiDate(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(date);
}

/** 2026-10-22 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** แปลงลิงก์ YouTube เป็น video id (คืนค่า '' ถ้าไม่ใช่ลิงก์ที่รู้จัก) */
export function youtubeId(input: string): string {
  if (!input) return '';
  const match = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match?.[1] ?? '';
}
