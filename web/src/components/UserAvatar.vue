<template>
  <router-link class="relative inline-block z-0" :to="path ?? '/user'">
    <img
      class="inline-block object-cover rounded-full"
      :class="{ 'w-14': large, 'w-11': !large }"
      :src="img"
      alt="Profile image"
    />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["img", "user", "path", "large"],
});
</script>
