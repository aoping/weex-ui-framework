export default [
  { path: '/', redirect: { path: '/home' } },
  { path: '/home', component: require('views/home') },
]
