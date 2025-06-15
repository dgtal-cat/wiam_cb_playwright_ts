import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'

export class Paginator extends BaseElement {
	previous: Locator
	next: Locator
	pagesNumbers: Locator

	constructor(l: Locator) {
		super(l)
		this.previous = this.el.locator('a.page-link', { hasText: 'Предыдущая' })
		this.next = this.el.locator('a.page-link', { hasText: 'Следующая' })
		this.pagesNumbers = this.el.locator('a.page-link')
	}

	async goToPreviousPage() {
		await this.previous.click()
	}

	async goToNextPage() {
		await this.next.click()
	}

	async goToPageByNumber(value: number) {
		if (value > 0) {
			await this.pagesNumbers.nth(value - 1).click()
		} else throw new Error('Неверное значение номера страницы')
	}
}