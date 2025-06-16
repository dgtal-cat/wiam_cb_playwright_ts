import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'

export class ClientCard extends BaseElement {
	readonly fullname: Locator
	readonly creditStatusBadge: Locator
	readonly passportBlock: Locator
	readonly phoneBlock: Locator
	readonly emailBlock: Locator
	readonly creditAmountBlock: Locator
	readonly detailsButton: Locator
	readonly editButton: Locator
	readonly deleteButton: Locator

	constructor(l: Locator) {
		super(l)
		this.fullname = this.el.locator('h5')
		this.creditStatusBadge = this.el.locator('xpath=//span[contains(@class, "badge")]')
		this.passportBlock = this.el.locator('div.col-6').nth(0)
		this.phoneBlock = this.el.locator('div.col-6').nth(1)
		this.emailBlock = this.el.locator('div.col-6').nth(2)
		this.creditAmountBlock = this.el.locator('div.col-6').nth(3)
		this.detailsButton = this.el.locator('xpath=//\*[contains(@class, "btn-primary")]')
		this.editButton = this.el.locator('xpath=//\*[contains(@class, "btn-warning")]')
		this.deleteButton = this.el.locator('xpath=//\*[contains(@class, "btn-danger")]')
	}

	async getFullname() {
		const fullname = await this.fullname.textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getStatus() {
		const fullname = await this.creditStatusBadge.textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getPassportNumber() {
		const fullname = await this.passportBlock.locator('strong').textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getPhoneNumber() {
		const fullname = await this.phoneBlock.locator('strong').textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getEmail() {
		const fullname = await this.emailBlock.locator('a').textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getCreditAmount() {
		const fullname = await this.creditAmountBlock.locator('strong').textContent()

		if (typeof fullname === 'string') {
			return fullname.trim()
		} else throw new Error('Не удалось получить текст из элемента')
	}
}