import { test, expect } from '@playwright/test'

test('코스 상세: 링크 이동 및 요소 확인', async ({ page }) => {
  await page.goto('./')

  await page.getByRole('link', { name: '상세보기' }).first().click()

  await expect(page.getByRole('heading', { level: 1, name: /코스$/ })).toBeVisible()
  await expect(page.getByRole('link', { name: 'GPX 다운로드' })).toHaveAttribute('href', /\/routes\/sample\.gpx$/)
  await expect(page.getByRole('link', { name: '← 돌아가기' })).toBeVisible()
})
