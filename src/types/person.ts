export interface Person {
  id?: number
  fullNames: string
  lastName: string
  initials: string
  dateOfBirth: string | null
  titleTypeKey: string
  genderTypeKey: string
  maritalStatusTypeKey: string
  maritalDate: string | null
  nationalityTypeKey: string
  populationGroupTypeKey: string
  homeLanguageTypeKey: string
  isForeign: boolean
  passportNumber: string
  passportCountryOfIssueTypeKey: string
  raceTypeKey: string
}

export interface PersonResponse extends Person {
  id: number
}

export interface PersonFormErrors {
  fullNames?: string
  lastName?: string
  initials?: string
  dateOfBirth?: string
  passportNumber?: string
  general?: string
}
