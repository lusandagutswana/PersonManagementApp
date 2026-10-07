<template>
  <div>
    <div class="page-heading">
      <div>
        <h2>Edit Person</h2>
        <p>Update the selected person record.</p>
      </div>
    </div>

    <div v-if="loading" class="empty-state">
      Loading person...
    </div>

    <div v-else-if="error && !person" class="alert error">
      {{ error }}
    </div>

    <PersonForm
      v-else-if="person"
      :initial-person="person"
      :saving="saving"
      submit-label="Update Person"
      @submit="savePerson"
    />

    <div v-if="error && person" class="alert error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PersonForm from '../components/PersonForm.vue'
import { getPersonById, updatePerson } from '../api/personApi'
import type { PersonResponse } from '../types/person'

const route = useRoute()
const router = useRouter()

const person = ref<PersonResponse | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const id = Number(route.params.id)

async function loadPerson() {
  try {
    person.value = await getPersonById(id)
  } catch (err) {
    console.error(err)
    error.value = 'Unable to load this person.'
  } finally {
    loading.value = false
  }
}

async function savePerson(updatedPerson: PersonResponse) {
  saving.value = true
  error.value = ''

  try {
    await updatePerson(updatedPerson)
    await router.push(`/persons/${id}`)
  } catch (err) {
    console.error(err)
    error.value = 'Unable to update the person.'
  } finally {
    saving.value = false
  }
}

onMounted(loadPerson)
</script>
