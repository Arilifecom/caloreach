import { expect, test, vi } from 'vitest'

vi.mock('@/backend/Middleware/auth', async () => {
  const { createMiddleware } = await import('hono/factory')

  return {
    authMiddleware: createMiddleware(async (c) => {
      return c.json({ error: '認証が必要です' }, 401)
    }),
  }
})

import app from '@/backend'

test('未認証ユーザーがmealrecords API にアクセスすると401を返す', async () => {
  const res = await app.request('/api/dashboard/mealrecords?date=2026-06-29')

  expect(res.status).toBe(401)
  expect(await res.json()).toEqual({ error: '認証が必要です' })
})
