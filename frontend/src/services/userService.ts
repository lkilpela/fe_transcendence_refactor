import { request } from './api'
import { User } from '../types'

export const userService = {
  getAll: (): Promise<User[]> => request('/users'),
  
  get: (id: number): Promise<User> => request(`/users/${id}`),
  
  update: (id: number, data: Partial<User>): Promise<User> =>
    request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (): Promise<{ message: string }> =>
    request('/users', {
      method: 'DELETE',
    })
} 