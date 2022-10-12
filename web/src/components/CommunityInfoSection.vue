<template>
  <div class="border border-green-100">
    <!-- profile link section -->
    <div class="flex p-4 bg-green-100 flex-col">
      <p class="text-lg font-semibold">About community</p>
    </div>
    <div class="p-4 flex flex-col gap-3">
      <p>A place where you can discuss Kendrick Lamar!</p>
      <div class="flex text-gray-400"><p>Created at 12/02/2024</p></div>
    </div>
    <div class="p-4 flex flex-col gap-3">
      <p>Members</p>
      <div class="flex text-gray-800 font-bold text-3xl"><p>12k</p></div>
    </div>
    <hr class="w-full" />
    <div class="flex mx-3">
      <router-link
        :to="`/post?j=${$route.params.community}`"
        type="button"
        style="background: #a5dec4"
        class="py-2.5 my-3 text-center w-full px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Create Post
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LATEST_NOTIFICATIONS, ME } from "../queries";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: {
    UserAvatar,
  },
  data: () => ({
    notifications: [] as any,
  }),
  async created() {},
  methods: {},
});
</script>

UserAvatar
