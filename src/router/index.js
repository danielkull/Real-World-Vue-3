import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetailsView from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/about',
      redirect: { name: 'about' },
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetailsView,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ],
    },
    // One way of creating redirect for children
    /*     {
      path: '/event/:id',
      redirect: () => {
        return { name: 'event-details' }
      },
      children: [
        { path: 'register', redirect: () => ({ name: 'event-register'})},
        { path: 'edit', redirect: () => ({ name: 'event-edit'})}
      ]
    }, */
    // Another way for the redirection
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      },
    },
    // Catches the resource ids if a 404 error occures while calling it
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    // Uses this route for network erros, else it found catch it and give a wrong msg
    // The Catching is done in the api call, with the router push to the respective component
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
    // Catches everything which is not defined (except for resource like event ids)
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
