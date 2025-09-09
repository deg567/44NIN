import { test, expect } from '@playwright/test'

test('갤러리: 모달 열기/닫기', async ({ page }) => {
  await page.goto('/')

  // 첫 번째 썸네일 클릭해 모달 열기
  const firstThumb = page.getByRole('button', { name: /확대 보기/ }).first()
  await firstThumb.click()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()

  await page.getByRole('button', { name: '닫기' }).click()
  await expect(dialog).toBeHidden()
})

