import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { library } from '@fortawesome/fontawesome-svg-core'
import { router } from './routes/router'

import App from './App.vue'

import '../public/custom.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(BootstrapVue3)
library.add(faThumbsUp, faThumbsUpRegular)
app.use(router)
app.mount('#app')