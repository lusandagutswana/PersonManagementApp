<template>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <h1>Person Management</h1>
        <p>Manage person records through the Person API</p>
      </div>

      <nav>
        <RouterLink to="/persons">Persons</RouterLink>
        <RouterLink class="primary-button" to="/persons/create">
          + Create Person
        </RouterLink>
      </nav>
    </header>

    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
