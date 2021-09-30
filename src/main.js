import { createApp } from 'vue'
import App from './App.vue'
import { Dialog } from 'vant'

const app = createApp(App)

app.use(Dialog)
app.mount('#app')
