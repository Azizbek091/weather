<template>
    <div class="main__week">
        <Day
            v-for="(day,i) in weather.daily"
            :key="day.dt"
            :day="day"
            :i="i"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Day from './Day.vue';
    export default {
    components: { Day },
    computed: {
        ...mapState(['weather'])
    }
}
</script>

