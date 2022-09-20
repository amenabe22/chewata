<template>
  <router-link class="relative inline-block z-0" :to="path ?? '/user'">
    <img
      class="inline-block object-cover w-12 h-12 rounded-full"
      :src="img"
      alt="Profile image"
    />

    <img
      src="../assets/manchester-united.png"
      class="w-5 h-5 absolute bottom-0 right-0 inline-block bg-green-600 border-2 border-white rounded-full"
      alt=""
    />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["img", "user", "path"],
});
</script>
