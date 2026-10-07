import api from './axios'
import type { Person, PersonResponse } from '../types/person'

export async function getAllPersons(): Promise<PersonResponse[]> {
  const response = await api.get<PersonResponse[]>('/api-v1/All-persons')
  return response.data
}

export async function getPersonById(id: number): Promise<PersonResponse> {
  const response = await api.get<PersonResponse>(`/api-v1/persons/${id}`)
  return response.data
}

export async function createPerson(person: Person): Promise<PersonResponse> {
  const response = await api.post<PersonResponse>(
    '/api-v1/create-update-person',
    person
  )
  return response.data
}
export async function updatePerson(
  person: PersonResponse
): Promise<PersonResponse> {
  const response = await api.post<PersonResponse>(
    '/api-v1/create-update-person',
    person
  )
  return response.data
}
