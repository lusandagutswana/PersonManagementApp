<template>
  <div class="table-card">
    <div v-if="loading" class="empty-state">
      Loading persons...
    </div>

    <div v-else-if="persons.length === 0" class="empty-state">
      No persons found.
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Names</th>
            <th>Last Name</th>
            <th>Initials</th>
            <th>Date of Birth</th>
            <th>Foreign</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="person in persons" :key="person.id">
            <td>{{ person.id }}</td>
            <td>{{ person.fullNames }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.initials || '-' }}</td>
            <td>{{ formatDate(person.dateOfBirth) }}</td>
            <td>
              <span :class="person.isForeign ? 'badge badge-blue' : 'badge'">
                {{ person.isForeign ? 'Yes' : 'No' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <RouterLink :to="`/persons/${person.id}`">View</RouterLink>
                <RouterLink :to="`/persons/${person.id}/edit`">
                  Edit
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { PersonResponse } from '../types/person'

defineProps<{
  persons: PersonResponse[]
  loading: boolean
}>()

function formatDate(value: string | null) {
  if (!value) return '-'

  return new Intl.DateTimeFormat('en-ZA').format(new Date(value))
}
</script>
