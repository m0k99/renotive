import { API_BASE_URL } from '@/environment'

export const getHeaders = async (): Promise<HeadersInit> => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
} as const)

export const request = async <T>(url: string, method: string, body?: { [key: string]: any }): Promise<{
  data: T,
  status: number,
  headers: Headers
}> => {

  const init: RequestInit = {
    method,
    headers: await getHeaders()
  }

  if (body) {

    if (body?.append) {
      // @ts-ignore
      delete init.headers['Content-Type']
    } else {
      body = {
        ...body
      }
    }

    init.body = (body?.append ? body : JSON.stringify(body)) as unknown as BodyInit
  }

  const response = await fetch(API_BASE_URL + url, init)

  const json = await response.json()

  return {
    data: json,
    status: response.status,
    headers: response.headers
  }
}

export const get = async <T>(url: string) => request<T>(url, 'GET')
