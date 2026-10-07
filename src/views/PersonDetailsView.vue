<template>
  <div>
    <div class="page-heading">
      <div>
        <h2>Person Details</h2>
        <p>View the complete person record.</p>
      </div>

      <div class="actions">
        <RouterLink class="secondary-button" to="/persons">
          Back
        </RouterLink>

        <RouterLink
          v-if="person"
          class="primary-button"
          :to="`/persons/${person.id}/edit`"
        >
          Edit
        </RouterLink>
      </div>
    </div>

    <div v-if="loading" class="empty-state">
      Loading person...
    </div>

    <div v-else-if="error" class="alert error">
      {{ error }}
    </div>

    <div v-else-if="person" class="details-card">
      <div class="details-grid">
        <Detail label="ID" :value="person.id" />
        <Detail label="Full Names" :value="person.fullNames" />
        <Detail label="Last Name" :value="person.lastName" />
        <Detail label="Initials" :value="person.initials" />
        <Detail label="Date of Birth" :value="formatDate(person.dateOfBirth)" />
        <Detail label="Title" :value="person.titleTypeKey" />
        <Detail label="Gender" :value="person.genderTypeKey" />
        <Detail label="Marital Status" :value="person.maritalStatusTypeKey" />
        <Detail label="Marital Date" :value="formatDate(person.maritalDate)" />
        <Detail label="Nationality" :value="person.nationalityTypeKey" />
        <Detail
          label="Population Group"
          :value="person.populationGroupTypeKey"
        />
        <Detail label="Home Language" :value="person.homeLanguageTypeKey" />
        <Detail label="Foreign" :value="person.isForeign ? 'Yes' : 'No'" />
        <Detail label="Passport Number" :value="person.passportNumber" />
        <Detail
          label="Passport Country"
          :value="person.passportCountryOfIssueTypeKey"
        />
        <Detail label="Race" :value="person.raceTypeKey" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getPersonById } from '../api/personApi'
import type { PersonResponse } from '../types/person'

const route = useRoute()

const person = ref<PersonResponse | null>(null)
const loading = ref(true)
const error = ref('')

const Detail = (props: { label: string; value: unknown }) =>
  h('div', { class: 'detail-item' }, [
    h('span', { class: 'detail-label' }, props.label),
    h('strong', null, String(props.value || '-'))
  ])

function formatDate(value: string | null) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('en-ZA').format(new Date(value))
}

async function loadPerson() {
  try {
    person.value = await getPersonById(Number(route.params.id))
  } catch (err) {
    console.error(err)
    error.value = 'Unable to load this person.'
  } finally {
    loading.value = false
  }
}

onMounted(loadPerson)
</script>
