<template>
  <div>
    <button
      @click="$emit('ballClicked')"
      v-if="!hideBall"
      class="shadow-2xl xl:block lg:block md:block ball"
    >
      <img class="shadow-2xl" src="../assets/soccer-ball.png" alt="" />
    </button>
    <nav
      class="bg-gradient-to-t from-green-400 to-tranparent text-white"
      style="
        position: fixed;
        width: 100%;
        height: 60px;
        bottom: 1px;
        color: #fff;
        text-align: center;
      "
    ></nav>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    hideBall: Boolean,
  },
});
</script>
<style scoped>
.ball {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 35px;
  right: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
}
</style>
