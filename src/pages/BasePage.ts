import { Page } from "@playwright/test"

const baseUrl = process.env.HOST_URL

export class BasePage {

	readonly page: Page
	readonly url: string

	constructor(page: Page, url: string) {
		this.page = page
		this.url = url
    }

	async open(): Promise<void> {
		await this.page.goto(baseUrl + this.url)
	}
}