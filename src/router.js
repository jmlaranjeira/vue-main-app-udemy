import { createRouter, createWebHistory } from 'vue-router';

// import CoachesDetail from './pages/coaches/CoachesDetail.vue';
// import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
// import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const CoachesDetail = () => import('./pages/coaches/CoachesDetail.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const CoachesList = () => import('./pages/coaches/CoachesList.vue');
const CoachesRegistration = () =>
  import('./pages/coaches/CoachesRegistration.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');
const NotFound = () => import('./pages/NotFound.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachesRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  console.log(store);
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticatd) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
