import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "@/assets/css/main.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'boxicons'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();

app.use(pinia);
app.use(router)
app.use(Toast)
app.mount('#app')
