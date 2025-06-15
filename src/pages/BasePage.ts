import { Page } from "@playwright/test"
import { envConfig } from '../../config/config'

export class BasePage {

	readonly page: Page
	readonly url: string

	constructor(page: Page, url: string) {
		this.page = page
		this.url = url
    }

	async open(): Promise<void> {
		await this.page.goto(envConfig.HOST_URL + this.url)
	}
}