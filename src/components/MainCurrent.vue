<template>
    <div class="main__current">
        <div class="main__current-left">
            <p class="main__current-left-degree">{{ Math.round(weather.current.temp) }}°</p>
            <p class="main__current-left-today">Сегодня</p>
            <p class="main__current-left-time">Время: {{ getTime }}</p>
            <p class="main__current-left-city">Город: {{ weather.name }}</p>
            <img :src="getImg" alt="" class="main__current-left-img">
        </div>
        <div class="main__current-right">
            <img src="@/assets/images/headerBg.svg" alt="" class="main__current-right-bg">
            <div class="main__current-right-item" v-for="item in items" :key="item.name">
                <div class="main__current-right-item-img">
                    <img :src="item.img" alt="">
                </div>
                <span>{{ item.name }}</span>
                <p>{{ item.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { weatherName } from '@/icons' 
    export default {
        computed: {
            ...mapState(['weather']),
            description() {
                return this.weather.current.weather[0].description
            },
            getImg() {
                return weatherName[this.description] || weatherName['пасмурно']
            },
            items() {
              return [
                {
                    img: require('@/assets/images/temp.svg'),
                    name: 'Температура',
                    text: `${Math.round(this.weather.current.temp)}° - ощущается как ${Math.round(this.weather.current.feels_like)}°`
                },
                {
                    img: require('@/assets/images/davlenie.svg'),
                    name: 'Давление',
                    text: `${this.weather.current.pressure}`
                },
                {
                    img: require('@/assets/images/osadki.svg'),
                    name: 'Облачность',
                    text: `${this.weather.current.clouds}%`
                },
                {
                    img: require('@/assets/images/wind.svg'),
                    name: 'Ветер',
                    text: `${this.weather.current.wind_speed} м/с`
                },
                
              ]  
            },
            getTime() {
                return new Date().toLocaleString('ru-RU', {
                    timeZone: this.weather.timezone,
                    timeStyle: 'short',
                    hourCycle: 'h23'
                })
            }
        }
    }
</script>

