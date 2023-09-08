import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    city: '',
    key: '3c9333a1a3a40ca893996cbeb44b7022',
    weather: null,
    theme: 'light'
  },
  mutations: {
    setCity(state,payload) {
      state.city = payload
    },
    getWeather(state,info) {
      state.weather = info
    },
    setTheme(state,newTheme) {
      state.theme = newTheme
    }
  },
  actions: {
    toggleTheme(context) {
      const newTheme = context.state.theme == 'light' ? 'dark' : 'light'
      context.commit('setTheme', newTheme)
      localStorage.setItem('theme', newTheme)
    },
    initTheme(context) {
      const getTheme = localStorage.getItem('theme')
      if(getTheme) {
        context.commit('setTheme', getTheme)
      }
    },
    async getWeather(context,city) {
      city = city.trim()
      try {
        let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${context.state.key}`)
        let coor = { ...response.data[0], city: city }
        context.dispatch('getWeatherInfo', coor)
      } catch (error) {
        console.error('Ошибка при получении координат ' + error);
      }
    },
    async getWeatherInfo(context, coor) {
      try {
        let { lat, lon, local_names, city } = coor
        if(local_names.ru.toLowerCase() == city.toLowerCase()) {
          let response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly&appid=${context.state.key}&lang=ru&units=metric`)
          let info = {
            ...response.data,
            name: city
          }
          context.commit('getWeather', info)
        }
      } catch (error) {
        console.error('Ошибка при получении данных о погоде ' + error);
      }
      
    }
  },
  getters: {
  },
})


