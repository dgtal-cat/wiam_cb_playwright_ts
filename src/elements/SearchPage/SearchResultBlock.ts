import { expect, Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import { ClientCard } from './ClientCard'

export class SearchResultBlock extends BaseElement {
	readonly header: BaseElement
	readonly newSearchButton: BaseElement
	readonly searchRequestBlock: BaseElement
	readonly foundShownCLinets: BaseElement
	readonly clientCard: ClientCard

	constructor(l: Locator) {
		super(l)
		this.header = new BaseElement(this.el.locator('h2'))
		this.newSearchButton = new BaseElement(this.el.locator('xpath=//a[contains(@class, "btn-outline-primary")]'))
		this.searchRequestBlock = new BaseElement(this.el.locator('strong', { hasText: 'Поисковый запрос:'}).locator('..'))
		this.foundShownCLinets = new BaseElement(this.el.locator('p', { hasText: 'Найдено клиентов:'}).locator('..'))
		this.clientCard = new ClientCard(this.el.locator('div.card-body'))
	}

	async getFoundedClients() {
		const text = await this.foundShownCLinets.el.textContent()
		if (text) {
			return text.split(' (')[0]
		} else throw new Error('Не удалось получить текст из элемента')
	}

	async getShownClients() {
		const text = await this.foundShownCLinets.el.textContent()
		if (text) {
			return text.split(' (')[1].replace(')', '')
		} else throw new Error('Не удалось получить текст из элемента')
	}
}