<template>
  <div>
    <div class="flex flex-row mt-4 hover:bg-gray-50">
      <vote-clickers />
      <div>
        <div class="flex flex-row mt-2">
          <user-avatar />
          <div></div>
          <div>
            <p
              class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"
            >
              Samuna
            </p>
            <div
              class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"
            >
              1099
            </div>
          </div>
        </div>
        <p
          class="py-2 mb-2 tracking-wide text-gray-600 text-lg"
          v-text="text"
        ></p>

        <img v-if="pic" :src="pic" alt="" style="object-fit: contain" />
      </div>
    </div>
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
  props: {
    pic: String,
    text: String,
  },
});
</script>
