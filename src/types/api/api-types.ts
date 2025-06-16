export type SearchResponse = {
	count: number
	data: ClientData[]
}

export type ClientData = {
	id: number
	name: string
	credit_status: string
	passport: string
	phone: string
	email: string
	credit_amount: number
}
