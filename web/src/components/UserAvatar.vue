<template>
  <router-link class="relative inline-block z-0" :to="path ?? '/user'">
    <img
      class="inline-block object-cover w-11 h-11 rounded-full"
      :src="img"
      alt="Profile image"
    />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["img", "user", "path"],
});
</script>
