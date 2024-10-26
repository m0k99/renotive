import { API_BASE_URL } from '@/environment'

// Function to get default headers for API requests
export const getHeaders = async (): Promise<HeadersInit> => ({
  Accept: 'application/json', // Specify that we accept JSON response
  'Content-Type': 'application/json' // Specify that we are sending JSON data
} as const)

// Generic function to make API requests
export const request = async <T>(url: string, method: string): Promise<{
  data: T, // Response data of generic type T
  status: number, // HTTP status code of the response
  headers: Headers // Response headers
}> => {

  // Initialize the request options
  const init: RequestInit = {
    method, // Set the HTTP method (GET, POST, etc.)
    headers: await getHeaders() // Get headers for the request
  }

  // Make the API call using the Fetch API
  const response = await fetch(API_BASE_URL + url, init)

  // Parse the response as JSON
  const json = await response.json()

  // Return the response data, status, and headers
  return {
    data: json,
    status: response.status,
    headers: response.headers
  }
}

//function for making GET requests
export const get = async <T>(url: string) => request<T>(url, 'GET')
