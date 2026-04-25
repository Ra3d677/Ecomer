"use server";

import { cookies } from "next/headers";

export async function setLanguageCookie(lang: 'en' | 'ar') {
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', lang, { path: '/' });
}
