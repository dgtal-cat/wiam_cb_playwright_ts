import { Locator, Page } from "@playwright/test"
import { BasePage } from './BasePage'
import { SearchForm } from '../elements/SearchPage/SearchForm'
import { SearchResultBlock } from '../elements/SearchPage/SearchResultBlock'

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
		this.searchResultBlock = new SearchResultBlock(this.page.locator('div.search-container'))
	}
}