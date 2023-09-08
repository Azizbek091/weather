<template>
   <nav class="nav">
    <a href="#" class="logo">
        <img src="@/assets/images/logo.svg" alt="">
        <span class="logo__span">vue weather</span>
    </a>
    <div class="nav__search">
        <img src="@/assets/images/kaplya.svg" alt="" @click="toggleTheme">
        <input 
            type="text" 
            class="nav__search-input"
            placeholder="Выбрать город"
            v-model="getCity"
            @keydown.enter="getWeather(getCity)"
        >
    </div>
   </nav>
</template>

<script>
import { mapState,mapActions,mapMutations } from 'vuex'
    export default {
        methods: {
            ...mapMutations(['setCity']),
            ...mapActions(['getWeather', 'toggleTheme'])
        },
        computed: {
            ...mapState(['city']),
            getCity: {
                get() {
                   return this.city
                },
                set(val) {
                   this.setCity(val)
                }
            }
        }
    }
</script>
