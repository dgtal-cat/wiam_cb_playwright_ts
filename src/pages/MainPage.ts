import { Locator, Page } from "@playwright/test"
import { BasePage } from './BasePage'
import { MainPageCard } from '../elements/MainPage/MainPageCard'

export class MainPage extends BasePage {
	readonly header: Locator
	readonly leadText: Locator
	private searchCard: MainPageCard
	private statisticsCard: MainPageCard

	constructor(page: Page) {
		super(page, '')
		this.header = page.locator('h1')
		this.leadText = page.locator('xpath=//p[contains(@class, "lead")]')
		this.searchCard = new MainPageCard(this.page.locator('xpath=//div[contains(@class, "card-body")]').nth(0))
		this.statisticsCard = new MainPageCard(this.page.locator('xpath=//div[contains(@class, "card-body")]').nth(1))
	}

	async goToSearch() {
		await this.searchCard.clickActionButton()
	}

	async goToDetailedStatistics() {
		await this.statisticsCard.clickActionButton()
	}
}
