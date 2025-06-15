import { Locator, Page } from "@playwright/test"
import { envConfig } from '../../config/config'
import { BasePage } from './BasePage'
import { SearchForm } from '../elements/SearchPage/SearchForm'

export class SearchPage extends BasePage {
	readonly header: Locator
	readonly infoText: Locator
	readonly searchForm: SearchForm
	readonly searchResultBlock: SearchResultBlock

	constructor(page: Page) {
		super(page, 'search')
		this.header = page.locator('h2')
		this.infoText = this.header.locator('..').locator('p')
		this.searchForm = new SearchForm(this.page.locator('form').nth(0))
	}
}