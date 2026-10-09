<template>
  <div>
    <div class="page-heading">
      <div>
        <h2>Create</h2>
        <p>Create a new person record.</p>
      </div>
    </div>

    <PersonForm
      :saving="saving"
      submit-label="Create Person"
      @submit="savePerson"
    />

    <div v-if="error" class="alert error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PersonForm from '../components/PersonForm.vue'
import { createPerson } from '../api/personApi'
import type { Person } from '../types/person'

const router = useRouter()
const saving = ref(false)
const error = ref('')

async function savePerson(person: Person) {
  saving.value = true
  error.value = ''

  try {
    await createPerson(person)
    await router.push('/persons')
  } catch (err) {
    console.error(err)
    error.value = 'Unable to create the person. Please check the API response.'
  } finally {
    saving.value = false
  }
}
</script>
