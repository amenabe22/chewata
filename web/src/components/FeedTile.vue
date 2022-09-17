<template>
  <router-link
    :to="`/game/${post.id}`"
    class="flex flex-row mt-4 hover:bg-gray-50 cursor-pointer"
  >
    <vote-clickers :count="post.likes" />
    <div class="mx-3">
      <p
        class="tracking-wide text-gray-600 text-lg"
        v-text="post.content"
      ></p>
      <vue-load-image>
        <template v-slot:image>
          <img
            v-if="post.cover"
            :src="post.cover"
            alt=""
            style="object-fit: contain"
          />
        </template>
        <template v-slot:preloader>
          <loader></loader>
        </template>
      </vue-load-image>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import VoteClickers from "./VoteClickers.vue";
import VueLoadImage from "vue-load-image";
import Loader from "./Loader.vue";

export default defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  setup() {},
  props: ["post", "count"],
});
</script>
