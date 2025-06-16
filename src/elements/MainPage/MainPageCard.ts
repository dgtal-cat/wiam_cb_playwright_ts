import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'

export class MainPageCard extends BaseElement {
	readonly icon: Locator
	readonly header: Locator
	readonly infoBlock: Locator
	readonly actionButton: Locator

	constructor(l: Locator) {
		super(l)
		this.icon = this.el.locator('i')
		this.header = this.el.locator('h5')
		this.infoBlock = this.el.locator('p')
		this.actionButton = this.el.locator('a')
	}

	async clickActionButton() {
		await this.actionButton.click()
	}
}