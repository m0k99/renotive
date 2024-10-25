import { get } from './network'

export const getProducts = get('/products').then((response) => ({ data: response.data, status: response.status }))
