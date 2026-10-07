<template>
  <div>
    <div class="page-heading">
      <div>
        <h2>Persons</h2>
        <p>View and manage person records.</p>
      </div>

      <RouterLink class="primary-button" to="/persons/create">
        + Create Person
      </RouterLink>
    </div>

    <div class="toolbar">
      <input
        v-model="search"
        type="search"
        placeholder="Search by name, surname or ID..."
      />

      <button class="secondary-button" @click="loadPersons">
        Refresh
      </button>
    </div>

    <div v-if="error" class="alert error">
      {{ error }}
    </div>

    <PersonTable :persons="filteredPersons" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getAllPersons } from '../api/personApi'
import PersonTable from '../components/PersonTable.vue'
import type { PersonResponse } from '../types/person'

const persons = ref<PersonResponse[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')

const filteredPersons = computed(() => {
  const value = search.value.trim().toLowerCase()

  if (!value) return persons.value

  return persons.value.filter((person) => {
    return (
      String(person.id).includes(value) ||
      person.fullNames.toLowerCase().includes(value) ||
      person.lastName.toLowerCase().includes(value)
    )
  })
})

async function loadPersons() {
  loading.value = true
  error.value = ''

  try {
    persons.value = await getAllPersons()
  } catch (err) {
    console.error(err)
    error.value =
      'Unable to load persons. Check that the API is running and authentication/CORS are configured correctly.'
  } finally {
    loading.value = false
  }
}

onMounted(loadPersons)
</script>
