export const STATUSES = ['ready', 'translating', 'issues', 'soon'] as const;

export type ModStatus = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<ModStatus, string> = {
  ready: 'พร้อมโหลด',
  translating: 'กำลังแปล',
  issues: 'มีปัญหา',
  soon: 'เร็ว ๆ นี้',
};

/** ลำดับความสำคัญบนหน้าแรก: พร้อมโหลด → กำลังแปล → มีปัญหา → เร็ว ๆ นี้ */
export const STATUS_PRIORITY: Record<ModStatus, number> = {
  ready: 0,
  translating: 1,
  issues: 2,
  soon: 3,
};

/** คำอธิบายสั้น ใช้บนหน้ารายละเอียด */
export const STATUS_HINTS: Record<ModStatus, string> = {
  ready: 'ดาวน์โหลดและติดตั้งได้แล้ว',
  translating: 'กำลังแปลอยู่ อาจมีบางส่วนยังไม่เสร็จ',
  issues: 'พบปัญหาบางอย่าง กำลังแก้ไข',
  soon: 'กำลังจะเปิดให้ดาวน์โหลด',
};
