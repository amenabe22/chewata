<template>
  <div>
    <button
      @click="$emit('ballClicked')"
      v-if="!hideBall"
      class="shadow-2xl xl:block lg:block md:block ball flex items-center justify-center flex-row"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-full p-1 z-50"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
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
