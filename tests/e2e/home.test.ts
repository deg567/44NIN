import { test, expect } from '@playwright/test'

test('홈 스모크: 핵심 섹션 렌더', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'WE ARE 44NIN RUNNERS' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '이번 주 일정' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '대표 코스' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '갤러리 하이라이트' })).toBeVisible()
  await expect(page.getByRole('link', { name: '함께 뛰기' })).toBeVisible()

  // 일정 샘플 항목 존재 확인(정적 JSON 기준)
  await expect(page.getByText('목요 나이트런')).toBeVisible()
})

