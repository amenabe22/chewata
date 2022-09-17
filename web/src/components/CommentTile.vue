<template>
  <div>
    <div class="flex flex-row mt-4 gap-3 hover:bg-gray-50">
      <vote-clickers />
      <div>
        <div class="flex flex-row mt-2">
          <user-avatar :img="comment.user.photoURL" />
          <div></div>
          <div v-if="comment.user">
            <p
              class="text-sm text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              {{ comment.user.name }}
            </p>
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              {{ comment.user.totalLikes }}
            </div>
          </div>
        </div>
        <p
          class="py-2 mb-2 tracking-wide text-gray-600 text-lg"
          v-text="comment.comment.message"
        ></p>

        <img
          v-if="comment.user.profile"
          :src="comment.user.profile"
          alt=""
          style="object-fit: contain"
        />
      </div>
    </div>
    <img
      v-if="comment.comment.cover"
      :src="comment.comment.cover"
      alt=""
      style="object-fit: contain"
    />

    <a href="" class="px-20 font-black text-gray-400">Reply</a>
    <hr class="mt-2" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserAvatar from "./UserAvatar.vue";
import VoteClickers from "./VoteClickers.vue";

export default defineComponent({
  components: { VoteClickers, UserAvatar },
  setup() {},
  props: ["comment"],
});
</script>
