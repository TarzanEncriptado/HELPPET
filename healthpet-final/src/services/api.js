const API_BASE_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000/api' : '')

export async function apiRequest(path, { method = 'GET', body } = {}) {
  if (!API_BASE_URL) {
    throw new Error('A API do HEALTHPET ainda não foi configurada.')
  }

  const headers = { Accept: 'application/json' }
  const token = sessionStorage.getItem('healthpet_access_token')
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = Array.isArray(data?.message) ? data.message.join(' ') : data?.message
    const error = new Error(message || `A API respondeu com erro (${response.status}).`)
    error.status = response.status
    throw error
  }

  return data
}
