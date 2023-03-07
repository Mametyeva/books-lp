import { createApp } from 'vue'
import App from './App.vue'
import globalComponents from './components/global/index.js'

//import './assets/main.css'

const app = createApp(App)
app.use(globalComponents)
app.mount('#app')
