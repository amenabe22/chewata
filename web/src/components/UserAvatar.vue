<template>
  <router-link class="relative inline-block z-0" to="/user">
    <img
      class="inline-block object-cover w-12 h-12 rounded-full"
      src="https://avatars.devrant.com/v-37_c-1_b-6_g-m_9-1_1-1_16-15_3-4_8-1_7-1_5-1_12-1_6-3_10-1_2-39_22-6_4-1.png"
      alt="Profile image"
    />

    <img
      src="../assets/manchester-united.png"
      class="
        w-5
        h-5
        absolute
        bottom-0
        right-0
        inline-block
        bg-green-600
        border-2 border-white
        rounded-full
      "
      alt=""
    />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
