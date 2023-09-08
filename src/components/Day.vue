<template>
    <div class="main__week-day">
        <p class="main__week-day-today">{{getWeekDay}}</p>
        <p class="main__week-day-date">{{getDay}} {{ getMonth }}</p>
        <img :src="getImg" alt="" class="main__week-day-img">
        <p class="main__week-day-temp">{{ Math.round(day.temp.max) }}°</p>
        <p class="main__week-day-temp2">{{ Math.round(day.feels_like.eve) }}°</p>
        <p class="main__week-day-info">{{ day.weather[0].description }}</p>
    </div>
</template>

<script>
import { weatherName } from '@/icons' 
import { unix } from '@/unix'
    export default {
        props: {
            day: Object,
            i: Number
        },
        computed: {
            getWeekDay() {
                return this.i == 0 ? 'Сегодня' : this.i == 1 ? 'Завтра' : unix(this.day.dt, 'weekday')
            },
            getDay() {
                return unix(this.day.dt, 'day')
            },
            getMonth() {
                return unix(this.day.dt, 'month')
            },
            description() {
                return this.day.weather[0].description
            },
            getImg() {
                return weatherName[this.description] || weatherName['пасмурно']
            },
        }
    }
    

    
</script>

