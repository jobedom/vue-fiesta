import Vue from 'vue';

Vue.config.productionTip = false;

import VueTimers from 'vue-timers';
import VueTweening from '~/plugins/vue-tweening';

Vue.use(VueTimers);
Vue.use(VueTweening);

import App from '~/components/App.vue';

new Vue({
   el: '#app',
   render: h => h('app'),
   components: { App },
});
