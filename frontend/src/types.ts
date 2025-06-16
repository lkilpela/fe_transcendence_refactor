export interface User {
  id: number
  username: string
  email: string
}

export interface LoginResponse {
  token: string
  username: string
  id: number
}
