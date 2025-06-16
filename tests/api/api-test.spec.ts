import { test, expect } from '@playwright/test'
import type { ClientData, SearchResponse } from '../../src/types/api/api-types'

const baseUrl = process.env.API_URL

test.describe('Тесты API', { tag: '@api' }, () => {
	test('Проверка данных клиента в ответе API', async ({ request }) => {
		const response = await request.get(baseUrl + 'search?q=Анна')
		const data = await response.json() as SearchResponse
		const clientData = data.data[0] as ClientData

		expect(clientData.id).toEqual(2)
		expect(clientData.name).toEqual('Петрова Анна Сергеевна')
		expect(clientData.credit_status).toEqual('Просрочен')
		expect(clientData.passport).toEqual('2345678901')
		expect(clientData.phone).toEqual('+7(999)234-56-78')
		expect(clientData.email).toEqual('petrova@example.com')
		expect(clientData.credit_amount).toEqual(750000)
	})
})