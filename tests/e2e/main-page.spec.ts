import { test, expect, BrowserContext, Page } from '@playwright/test'
import { MainPage } from '../../src/pages/MainPage'
import { SearchPage } from '../../src/pages/SearchPage'


test.describe('Тесты главной страницы', () => {
	let context: BrowserContext
	let page: Page
	let mainPage: MainPage
	let searchPage: SearchPage

	test.beforeEach(async ({ browser }) => {
		context = await browser.newContext()
		page = await context.newPage()
		mainPage = new MainPage(page)
		searchPage = new SearchPage(page)
		await mainPage.open()
	})

	test('Проверка элементов на странице', async () => {
		await expect(mainPage.header, 'Проверка отображения хэдера').toBeVisible()
		expect(await mainPage.header.textContent(), 'Проверка соответствия текста хэдера').toContain('Система поиска клиентов')
		await expect(mainPage.leadText, 'Проверка наличия приветственного текста').toBeVisible()
		expect(await mainPage.leadText.textContent(), 'Проверка соответствия приветственного текста').toContain('Добро пожаловать в систему управления клиентами КредитБанка')
	})

	test('Проверка перехода на страницу поиска', async () => {
		await mainPage.goToSearch()

	})
})
