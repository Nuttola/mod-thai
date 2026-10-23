import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const mods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mods' }),
  schema: z.object({
    title: z.string().min(1),
    /** คำอธิบายสั้น ใช้บนการ์ดและผลค้นหา */
    summary: z.string().min(1),
    game: z.string().min(1),

    /** ready = พร้อมโหลด · translating = กำลังแปล · issues = มีปัญหา · soon = เร็ว ๆ นี้ */
    status: z.enum(['ready', 'translating', 'issues', 'soon']).default('ready'),

    version: z.string().default('1.0.0'),
    updated: z.coerce.date(),
    /** true = ขึ้นแท็บ "มอดยอดนิยม" บนหน้าแรก */
    popular: z.boolean().default(false),

    cover: z.string().default('/img/mods/placeholder.svg'),
    gallery: z.array(z.string()).default([]),
    /** ลิงก์ YouTube ของวิดีโอรีวิว (เว้นว่างได้) */
    video: z.string().default(''),

    /** ลิงก์ดาวน์โหลดปลายทาง (MediaFire / Nexus / Google Drive ฯลฯ) */
    downloadUrl: z.string().default(''),
    downloadNote: z.string().default(''),

    /** ลิงก์ร้านขายเกมถูกลิขสิทธิ์ */
    gameLinks: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.string().url(),
        }),
      )
      .default([]),

    install: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),

    /** true = ยังไม่แสดงบนเว็บ */
    draft: z.boolean().default(false),
  }),
});

export const collections = { mods };
