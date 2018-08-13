<template>

<div class="app">
   <div class="box" :style="boxStyle1">{{ number1 }}</div>
   <div class="box" :style="boxStyle2">{{ number2 }}</div>
</div>

</template>

<script>
import _ from 'lodash';

export default {
   data() {
      return {
         number1: 0,
         number2: 0,
      };
   },

   tweened: {
      number1: {},
      number2: { time: 1000, easing: 'Bounce.Out' },
   },

   computed: {
      boxStyle1() {
         return {
            width: `${Math.floor(40 + this.tweened_number1 * 40)}px`,
         };
      },

      boxStyle2() {
         return {
            width: `${Math.floor(40 + this.tweened_number2 * 40)}px`,
         };
      },
   },

   timers: {
      changeNumbers: { time: 2000, autostart: true, repeat: true },
   },

   methods: {
      changeNumbers() {
         this.number1 = Math.round(Math.random() * 10);
         this.number2 = Math.round(Math.random() * 10);
      },
   },
};
</script>

<style lang="stylus" scoped>
div.app
   padding 40px

   div.box
      font 14px sans-serif
      background #55a
      color white
      padding 10px
      border-radius 5px
      margin-bottom 20px
</style>
