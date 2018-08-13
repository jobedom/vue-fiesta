import _ from 'lodash';
import Tween from '@tweenjs/tween.js';

export default {
   install(Vue) {
      Vue.config.optionMergeStrategies.interpolated = Vue.config.optionMergeStrategies.computed;

      const prefixed = t => `tweened_${t}`;

      const DEFAULT_DEFINITION = {
         time: 600,
         easing: Tween.Easing.Quartic.Out,
      };

      const calculateEasing = easing => {
         if (typeof easing !== 'string') return easing;
         const easingFn = _.get(Tween.Easing, easing.split('.'));
         if (typeof easingFn !== 'function') {
            console.error(`Unknown tween.js easing "Tween.Easing.${easing}"`);
            return Tween.Easing.Quartic.Out;
         }
         return easingFn;
      };

      Vue.mixin({
         data() {
            const result = {};
            for (const key in this.$options.tweened) {
               result[prefixed(key)] = [];
            }
            return result;
         },

         beforeCreate() {
            this.$options.tweened = this.$options.tweened || {};
            this.$options.watch = this.$options.watch || {};
            for (const key in this.$options.tweened) {
               const tweenedKey = prefixed(key);
               this.$options.data[tweenedKey] = this.$options.data[key];
               const definition = Object.assign({}, DEFAULT_DEFINITION);
               Object.assign(definition, this.$options.tweened[key]);
               definition.easing = calculateEasing(definition.easing);
               this.$options.watch[key] = value => {
                  new Tween.Tween(this.$data)
                     .to({ [tweenedKey]: value }, definition.time)
                     .easing(definition.easing)
                     .start();
               };
            }
         },

         created() {
            const animate = () => {
               requestAnimationFrame(animate);
               Tween.update();
            };
            animate();
         },
      });
   },
};

// Tween.js easing functions:
// https://sole.github.io/tween.js/examples/03_graphs.html
//
// Linear.None
// Quadratic.In
// Quadratic.Out
// Quadratic.InOut
// Cubic.In
// Cubic.Out
// Cubic.InOut
// Quartic.In
// Quartic.Out
// Quartic.InOut
// Quintic.In
// Quintic.Out
// Quintic.InOut
// Sinusoidal.In
// Sinusoidal.Out
// Sinusoidal.InOut
// Exponential.In
// Exponential.Out
// Exponential.InOut
// Circular.In
// Circular.Out
// Circular.InOut
// Elastic.In
// Elastic.Out
// Elastic.InOut
// Back.In
// Back.Out
// Back.InOut
// Bounce.In
// Bounce.Out
// Bounce.InOut
