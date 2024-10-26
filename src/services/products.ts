import { get } from './network'

// Function to fetch products from the API
export const getProducts = get('/products').then((response) => ({
  // Structure the response to include only the relevant data and status
  data: response.data, // Extract the data from the response
  status: response.status // Extract the HTTP status code from the response
}))
