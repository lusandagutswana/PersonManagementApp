import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import PersonListView from './views/PersonListView.vue'
import CreatePersonView from './views/CreatePersonView.vue'
import EditPersonView from './views/EditPersonView.vue'
import PersonDetailsView from './views/PersonDetailsView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/persons' },
    { path: '/persons', component: PersonListView },
    { path: '/persons/create', component: CreatePersonView },
    { path: '/persons/:id', component: PersonDetailsView },
    { path: '/persons/:id/edit', component: EditPersonView }
  ]
})

createApp(App).use(router).mount('#app')
