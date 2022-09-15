<template>
  <router-link
    :to="`/game/${post.id}`"
    class="flex flex-row mt-4 hover:bg-gray-50 cursor-pointer"
  >
    <vote-clickers />
    <div class="mx-3 pt-2">
      <p
        class="py-2 tracking-wide text-gray-600 text-lg"
        v-text="post.content"
      ></p>
      <img
        v-if="post.cover"
        :src="post.cover"
        alt=""
        style="object-fit: contain"
      />
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VoteClickers from "./VoteClickers.vue";

export default defineComponent({
  components: { VoteClickers },
  setup() {},
  props: ["post"],
});
</script>
