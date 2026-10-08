import { parseApiBaseUrl } from './apiUrl'

export const env = {
  pokeApiBaseUrl: parseApiBaseUrl(import.meta.env.VITE_POKE_API_BASE_URL),
}
