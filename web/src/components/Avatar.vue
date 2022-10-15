<template>
  <router-link class="relative inline-block z-0" :to="path">
    <img
      class="inline-block object-cover rounded-full"
      :class="{ 'w-14 h-14': large, 'w-11 h-11': !large }"
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
