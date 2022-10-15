<template>
  <div>
    <div class="border border-green-100">
      <!-- profile link section -->
      <div class="flex p-4 bg-green-100 flex-col">
        <p class="text-lg">About community</p>
      </div>
      <div class="p-4 flex flex-col gap-3 text-gray-700">
        <p>A place where you can discuss Kendrick Lamar!</p>
        <div class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>

          <p class="text-gray-400">Created at 12/02/2024</p>
        </div>
      </div>
      <hr class="w-full" />
      <div class="p-4 flex flex-col gap-3">
        <p>Members</p>
        <div class="flex text-gray-800 font-bold text-3xl"><p>12k</p></div>
      </div>
      <hr class="w-full" />
      <div class="flex mx-3">
        <button
          @click="toPost"
          type="button"
          style="background: #a5dec4"
          class="py-2.5 my-3 text-center w-full px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
        >
          Create Post
        </button>
      </div>
    </div>
    <div class="border mt-4">
      <div class="flex p-4 bg-green-100 flex-col">
        <p class="text-lg">Community Rules</p>
      </div>
      <div class="p-4 flex flex-col gap-3 text-gray-700">
        <div class="divide-y flex flex-col">
          <div class="py-3 text-sm flex" v-for="(rule, ix) in rules" :key="ix">
            <span class="px-1">{{ ix + 1 }}. </span>
            <p>
              {{ rule }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: {
    UserAvatar,
  },
  data: () => ({
    rules: [
      "No US Internal News or Politics",
      "No Editorialized or Misleading Titles",
      "No Feature stories",
      "No Feature stories",
    ],
    notifications: [] as any,
  }),
  async created() {},
  methods: {
    toPost() {
      if (this.$store.state.loggedIn) {
        this.$router.push(`/post?j=${this.$route.params.community}`);
      } else {
        this.$router.push("/login");
      }
    },
  },
});
</script>

UserAvatar
