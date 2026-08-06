import { expect, test } from '@playwright/test'

test('homepage exposes the starter and CMS entry point', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un socle simple')
  await expect(page.getByRole('link', { name: 'Ouvrir le CMS' })).toHaveAttribute('href', '/admin')
  expect(consoleErrors).toEqual([])
})
