/**
 * ข้อมูลแบรนด์และช่องทางติดต่อ — แก้ไฟล์นี้ไฟล์เดียวก็เปลี่ยนทั้งเว็บ
 */
export const SITE = {
  /** ชื่อที่ใช้บนหัวเว็บ / title */
  name: 'ดอกตีนเป็ดหอมแฮง',
  /** ชื่อสั้น ใช้ตอนจอแคบ */
  shortName: 'เป็ดหอม',
  tagline: 'แปลนาน แปลอยู่ แปลต่อ',
  description:
    'รวมมอดแปลไทยโดยดอกตีนเป็ดหอมแฮง — ซับไตเติลและ UI ภาษาไทย พร้อมวิธีติดตั้งและลิงก์ดาวน์โหลดต้นทาง',

  bio: 'ทำมอดแปลไทยเกมอินดี้เป็นหลัก เน้นซับไตเติลและเมนูให้อ่านลื่นเหมือนเกมที่แปลไทยอย่างเป็นทางการ และถอนการติดตั้งได้โดยไม่ทิ้งไฟล์ขยะ',

  socials: [
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'ดอกตีนเป็ดหอมแฮง',
      href: 'https://www.facebook.com/profile.php?id=61595864932486',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@nuttogata',
      href: 'https://www.tiktok.com/@nuttogata',
    },
    {
      id: 'discord',
      label: 'Discord',
      handle: 'เร็ว ๆ นี้',
      href: '',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      handle: 'NutTo La',
      href: 'https://www.youtube.com/@nuttola1452',
    },
  ],

  donate: {
    /** วางรูป QR ที่ public/img/donate/ แล้วใส่ชื่อไฟล์ที่นี่ เช่น '/img/donate/qr.png' */
    qrImage: '',
    /** ข้อความขอบคุณบนหน้าโดเนท */
    message: 'ทุกการสนับสนุนช่วยให้มีกำลังใจแปลมอดต่อไป ขอบคุณจากใจครับ',
    /** ข้อมูลบัญชี (เว้นว่างได้) */
    bank: 'กสิกรไทย',
    accountName: 'นายพัชรพล ทองภู (เท่านั้น)',
    accountNumber: '',
  },

  startedYear: 2026,
} as const;

/** base path ของ GitHub Pages — '/' ตอนรันในเครื่อง, '/repo' ตอน deploy */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** เติม base path ให้ลิงก์ภายใน เช่น withBase('/mods/') */
export const withBase = (path: string) => `${BASE}${path}`;
