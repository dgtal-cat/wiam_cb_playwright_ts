import { expect, Locator } from '@playwright/test'
import BaseElement from '../BaseElement'

export class SearchForm extends BaseElement {
	readonly header: BaseElement
	readonly newSearchButton: BaseElement
	readonly foundShownCLinets: BaseElement
	readonly clientCard: ClientCard
	readonly paginator: Paginator

	constructor(l: Locator) {
		super(l)
		
	}
}