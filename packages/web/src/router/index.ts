import { createRouter, createWebHistory, RouterView } from 'vue-router'

import TaskList from '@/views/TaskList.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'task-list',
          component: TaskList,
        },
        {
          path: 'tasks/:id',
          name: 'task',
          component: () => import('@/views/SingleTask.vue'),
        },
      ],
    },
    {
      path: '/users',
      name: 'users',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'user-list',
          component: () => import('@/views/UserList.vue'),
        },
      ],
    },
    {
      path: '/new-task',
      name: 'new-task',
      component: () => import('@/views/NewTask.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicy.vue'),
    },
  ],
})
