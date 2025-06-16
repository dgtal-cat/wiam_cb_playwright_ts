import { expect, Locator } from '@playwright/test'
import BaseElement from '../BaseElement'

export class SearchForm extends BaseElement {
	readonly requestBlock: BaseElement
	readonly sortingBlock: BaseElement
	readonly filteringBlock: BaseElement
	readonly minAmountBlock: BaseElement
	readonly searchButton: BaseElement
	readonly clearButton: BaseElement

	constructor(l: Locator) {
		super(l)
		this.requestBlock = new BaseElement(this.el.locator('input#query').locator('..'))
		this.sortingBlock = new BaseElement(this.el.locator('select#sort_by').locator('..'))
		this.filteringBlock = new BaseElement(this.el.locator('input#active').locator('..'))
		this.minAmountBlock = new BaseElement(this.el.locator('input#min_amount').locator('..'))
		this.searchButton = new BaseElement(this.el.locator('xpath=//button[@type="submit"]'))
		this.clearButton = new BaseElement(this.el.locator('xpath=//button[@type="reset"]'))
	}

	async fillSearchRequest(text: string) {
		const input = this.requestBlock.el.locator('input')
		
		await input.fill(text)
	}

	async pressEnterInSearchInput() {
		const input = this.requestBlock.el.locator('input')
		
		await input.press('Enter')
	}

	async selectSorting(type: '-- Выберите --' | 'По имени' | 'По сумме кредита' | 'По статусу' | 'Удалить все') {
		const dropdown = this.sortingBlock.el.locator('select')
		const option = this.sortingBlock.el.locator('option', {hasText: type})

		await dropdown.click()
		await option.click()
	}

	async activateFilters(filters: string[]) {
		filters.forEach(async (type) => {
			const checkbox = this.filteringBlock.el.locator('label', {hasText: type})
			
			await checkbox.check()

			expect(await checkbox.isChecked()).toBeTruthy()
		})
	}

	async fillMinAmount(minAmount: number) {
		const input = this.minAmountBlock.el.locator('input')

		await input.fill(minAmount.toString())
	}

	async clickSearchButton() {
		await this.searchButton.el.click()
	}

	async clickClearButton() {
		await this.clearButton.el.click()
	}
}