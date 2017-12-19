import App from './App.web'
import mixins from './mixins'
// register global mixins.
Vue.mixin(mixins)

App.el = '#root'
new Vue(App)
