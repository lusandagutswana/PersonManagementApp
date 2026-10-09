<template>
  <form class="form-card" @submit.prevent="submitForm">
    <div v-if="errors.general" class="alert error">
      {{ errors.general }}
    </div>

    <section>
      <h2>Basic Information</h2>

      <div class="form-grid">
        <div class="form-field">
          <label for="fullNames">Full Names *</label>
          <input id="fullNames" v-model="form.fullNames" type="text" />
          <small v-if="errors.fullNames" class="field-error">
            {{ errors.fullNames }}
          </small>
        </div>

        <div class="form-field">
          <label for="lastName">Last Name *</label>
          <input id="lastName" v-model="form.lastName" type="text" />
          <small v-if="errors.lastName" class="field-error">
            {{ errors.lastName }}
          </small>
        </div>

        <div class="form-field">
          <label for="initials">Initials</label>
          <input
            id="initials"
            v-model="form.initials"
            type="text"
            maxlength="10"
          />
          <small v-if="errors.initials" class="field-error">
            {{ errors.initials }}
          </small>
        </div>

        <div class="form-field">
          <label for="dateOfBirth">Date of Birth *</label>
          <input
            id="dateOfBirth"
            v-model="dateOfBirthInput"
            type="date"
            :max="today"
          />
          <small v-if="errors.dateOfBirth" class="field-error">
            {{ errors.dateOfBirth }}
          </small>
        </div>

        <div class="form-field">
          <label for="titleTypeKey">Title</label>
          <input
            id="titleTypeKey"
            v-model="form.titleTypeKey"
            type="text"
            placeholder="e.g. MR"
          />
        </div>

        <div class="form-field">
          <label for="genderTypeKey">Gender</label>
          <input
            id="genderTypeKey"
            v-model="form.genderTypeKey"
            type="text"
            placeholder="e.g. MALE"
          />
        </div>

        <div class="form-field">
          <label for="nationalityTypeKey">Nationality</label>
          <input
            id="nationalityTypeKey"
            v-model="form.nationalityTypeKey"
            type="text"
            placeholder="e.g. SOUTH-AFRICAN"
          />
        </div>

        <div class="form-field">
          <label for="homeLanguageTypeKey">Home Language</label>
          <input
            id="homeLanguageTypeKey"
            v-model="form.homeLanguageTypeKey"
            type="text"
          />
        </div>
      </div>
    </section>

    <section>
      <h2>Marital Information</h2>

      <div class="form-grid">
        <div class="form-field">
          <label for="maritalStatusTypeKey">Marital Status</label>
          <input
            id="maritalStatusTypeKey"
            v-model="form.maritalStatusTypeKey"
            type="text"
          />
        </div>

        <div class="form-field">
          <label for="maritalDate">Marital Date</label>
          <input id="maritalDate" v-model="maritalDateInput" type="date" />
        </div>
      </div>
    </section>

    <section>
      <h2>Additional Information</h2>

      <div class="form-grid">
        <div class="form-field">
          <label for="populationGroupTypeKey">Population Group</label>
          <input
            id="populationGroupTypeKey"
            v-model="form.populationGroupTypeKey"
            type="text"
          />
        </div>

        <div class="form-field">
          <label for="raceTypeKey">Race</label>
          <input id="raceTypeKey" v-model="form.raceTypeKey" type="text" />
        </div>

        <div class="form-field checkbox-field">
          <label>
            <input v-model="form.isForeign" type="checkbox" />
            Person is foreign
          </label>
        </div>
      </div>
    </section>

    <section v-if="form.isForeign">
      <h2>Passport Information</h2>

      <div class="form-grid">
        <div class="form-field">
          <label for="passportNumber">Passport Number</label>
          <input
            id="passportNumber"
            v-model="form.passportNumber"
            type="text"
            maxlength="20"
          />
          <small v-if="errors.passportNumber" class="field-error">
            {{ errors.passportNumber }}
          </small>
        </div>

        <div class="form-field">
          <label for="passportCountryOfIssueTypeKey">
            Passport Country of Issue
          </label>
          <input
            id="passportCountryOfIssueTypeKey"
            v-model="form.passportCountryOfIssueTypeKey"
            type="text"
          />
        </div>
      </div>
    </section>

    <div class="form-actions">
      <RouterLink class="secondary-button" to="/persons">
        Cancel
      </RouterLink>

      <button class="primary-button" type="submit" :disabled="saving">
        {{ saving ? 'Saving...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { Person, PersonFormErrors } from '../types/person'

const props = withDefaults(
  defineProps<{
    initialPerson?: Person
    saving?: boolean
    submitLabel?: string
  }>(),
  {
    saving: false,
    submitLabel: 'Save Person'
  }
)

const emit = defineEmits<{
  submit: [person: Person]
}>()

const emptyPerson = (): Person => ({
  fullNames: '',
  lastName: '',
  initials: '',
  dateOfBirth: null,
  titleTypeKey: '',
  genderTypeKey: '',
  maritalStatusTypeKey: '',
  maritalDate: null,
  nationalityTypeKey: '',
  populationGroupTypeKey: '',
  homeLanguageTypeKey: '',
  isForeign: false,
  passportNumber: '',
  passportCountryOfIssueTypeKey: '',
  raceTypeKey: ''
})

const form = reactive<Person>(emptyPerson())
const errors = reactive<PersonFormErrors>({})

const dateOfBirthInput = ref('')
const maritalDateInput = ref('')

const today = computed(() => new Date().toISOString().split('T')[0])

watch(
  () => props.initialPerson,
  (person) => {
    Object.assign(form, person ?? emptyPerson())
    dateOfBirthInput.value = toDateInput(form.dateOfBirth)
    maritalDateInput.value = toDateInput(form.maritalDate)
  },
  { immediate: true }
)

watch(dateOfBirthInput, (value) => {
  form.dateOfBirth = value ? `${value}T00:00:00Z` : null
})

watch(maritalDateInput, (value) => {
  form.maritalDate = value ? `${value}T00:00:00Z` : null
})

function toDateInput(value: string | null | undefined) {
  return value ? value.substring(0, 10) : ''
}

function validate() {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof PersonFormErrors]
  })

  if (!form.fullNames.trim()) {
    errors.fullNames = 'Full names is required.'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required.'
  }

  if (form.initials.length > 10) {
    errors.initials = 'Initials must be 10 characters or fewer.'
  }

  if (!form.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.'
  } else if (new Date(form.dateOfBirth) >= new Date()) {
    errors.dateOfBirth = 'Date of birth must be in the past.'
  }

  if (
    form.passportNumber &&
    !/^[A-Za-z0-9]{6,20}$/.test(form.passportNumber)
  ) {
    errors.passportNumber =
      'Passport number must contain 6-20 letters or numbers.'
  }

  return Object.keys(errors).length === 0
}

function submitForm() {
  if (!validate()) return

  emit('submit', { ...form })
}
</script>
