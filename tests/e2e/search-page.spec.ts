import { test, expect, BrowserContext, Page, Locator } from '@playwright/test'
import { SearchPage } from '../../src/pages/SearchPage'
import { SearchForm } from '../../src/elements/SearchPage/SearchForm'
import { SearchResultBlock } from '../../src/elements/SearchPage/SearchResultBlock'
import { ClientCard } from '../../src/elements/SearchPage/ClientCard'

test.describe('Тесты страницы поиска', { tag: '@e2e' }, () => {
	let context: BrowserContext
	let page: Page
	let searchPage: SearchPage
	let form: SearchForm
	let result: SearchResultBlock
	let card: ClientCard

	const testParameters = [
		{
			request: 'Влад', expected: [
				'Морозов Владимир Петрович',
				'Закрыт',
				'7890123456',
				'+7(999)789-01-23',
				'morozov@example.com',
				'950000₽',
			]
		},
		{
			request: 'Коз', expected: [
				'Козлов Михаил Александрович',
				'Просрочен',
				'5678901234',
				'+7(999)567-89-01',
				'kozlov@example.com',
				'850000₽',
			]
		},
		{
			request: 'Елена', expected: [
				'Смирнова Елена Дмитриевна',
				'Активный',
				'4567890123',
				'+7(999)456-78-90',
				'smirnova@example.com',
				'300000₽',
			]
		},
	]

	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext()
		page = await context.newPage()
		searchPage = new SearchPage(page)
		form = searchPage.searchForm
		result = searchPage.searchResultBlock
		card = result.clientCard
	})

	test.beforeEach(async () => {
		await searchPage.open()
	})

	test('Проверка элементов формы поиска', async () => {
		await expect(searchPage.searchForm.requestBlock.el, 'Блок ввода поискового запроса должен быть виден').toBeVisible()
		await expect(searchPage.searchForm.sortingBlock.el, 'Блок выбора сортировки должен быть виден').toBeVisible()
		await expect(searchPage.searchForm.filteringBlock.el, 'Блок выбора фильтрации должен быть виден').toBeVisible()
		await expect(searchPage.searchForm.minAmountBlock.el, 'Блок ввода минимальной суммы должен быть виден').toBeVisible()
		await expect(searchPage.searchForm.searchButton.el, 'Кнопка "Найти" должна быть видна').toBeVisible()
		await expect(searchPage.searchForm.clearButton.el, 'Кнопка "Очистить" должна быть видна').toBeVisible()
	})

	test('Проверка элементов карточки клиента', async () => {
		await form.fillSearchRequest('Коз')

		await form.pressEnterInSearchInput()

		await expect(result.el, 'Блок результатов поиска должен быть виден').toBeVisible()
		await expect(card.el, 'Карточка клиента должна быть в выдаче результатов поиска').toBeVisible()

		await expect(card.fullname, 'ФИО должно отображаться в карточке').toBeVisible()
		await expect(card.creditStatusBadge, 'Статус кредита должен отображаться').toBeVisible()
		await expect(card.passportBlock, 'Номер паспорта должен отображаться').toBeVisible()
		await expect(card.phoneBlock, 'Номер телефона должен отображаться').toBeVisible()
		await expect(card.emailBlock, 'Адрес Email должен отображаться').toBeVisible()
		await expect(card.creditAmountBlock, 'Сумма кредита должна отображаться').toBeVisible()
	})

	testParameters.forEach(({ request, expected }) => {
		test(`Проверка данных в карточке клиента по запросу ${request}`, async () => {
			await form.fillSearchRequest(request)
			await form.pressEnterInSearchInput()

			await expect(result.el, 'Блок результатов поиска должен быть виден').toBeVisible()
			await expect(result.clientCard.el, 'Карточка клиента должна быть в выдаче результатов поиска').toBeVisible()

			const fullname = await card.getFullname()
			const status = await card.getStatus()
			const passportNumber = await card.getPassportNumber()
			const phoneNumber = await card.getPhoneNumber()
			const email = await card.getEmail()
			const creditAmount = await card.getCreditAmount()

			const clientData = [
				fullname,
				status,
				passportNumber,
				phoneNumber,
				email,
				creditAmount,
			]

			expect(clientData, 'Данные клиента на карточке должны соответствовать тестовым').toEqual(expected)
		})
	})
})
