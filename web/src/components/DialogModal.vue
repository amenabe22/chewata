<template>
  <div>
    <transition name="fade" appear>
      <div
        class="modal-overlay opacity-80"
        v-if="show"
        @click="$emit('close')"
      ></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal bg-transparent" role="dialog" v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  name: "Modal",
  props: {
    show: Boolean,
  },
});
</script>

<style lang="sass" scoped>
.modal
    position: absolute
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    margin: auto
    text-align: center
    width: fit-content
    height: fit-content
    max-width: 22em
    border-radius: 1rem
    z-index: 999
    transform: none

    & h1
        margin: 0 0 1rem

    &-overlay
        content: ''
        position: absolute
        position: fixed
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 998
        cursor: pointer
        background: #1e1f1e

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active
    transition: opacity .4s linear

.fade-enter-from,
.fade-leave-to
    opacity: 0

.pop-enter-active,
.pop-leave-active
    transition: all 0.2s cubic-bezier(0, 0, 0.97, 1)

.pop-enter-from,
.pop-leave-to
    opacity: 0
    transform: translateY(220px)
</style>
