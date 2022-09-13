<template>
  <router-link
    to="/game"
    class="flex flex-row mt-4 hover:bg-gray-50 cursor-pointer"
  >
    <vote-clickers />
    <div class="mx-3">
      <p
        class="py-2 mb-2 tracking-wide text-gray-600 text-lg"
        v-text="text"
      ></p>
      <img v-if="pic" :src="pic" alt="" style="object-fit: contain" />
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VoteClickers from "./VoteClickers.vue";

export default defineComponent({
  components: { VoteClickers },
  setup() {},
  props: {
    pic: String,
    text: String,
  },
});
</script>
