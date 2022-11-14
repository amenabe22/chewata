<template>
  <div>
    <div
      class="border border-green-100 dark:border-brand-dark-500 dark:bg-brand-dark-900"
    >
      <!-- profile link section -->
      <div class="p-4 bg-green-100 dark:bg-brand-dark-500 flex justify-between">
        <p class="text-lg dark:text-gray-300">About community</p>
        <button
          v-if="!editMode && $store.state.loggedIn && stat.stat == 'admin'"
          class="bg-white border rounded-full"
          @click="editMode = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7 p-1 text-green-700"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
            />
          </svg>
        </button>
        <div class="flex gap-2" v-else>
          <button
            v-if="$store.state.loggedIn && stat.stat == 'admin'"
            class="bg-white border rounded-full"
            @click="editMode = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 p-1 font-semibold text-red-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            class="bg-white border rounded-full"
            @click="saveDescription"
            v-if="$store.state.loggedIn && stat.stat == 'admin'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 p-1 font-semibold text-lg text-green-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-4 flex flex-col gap-3 text-gray-700 relative">
        <textarea
          type="text"
          v-model="description"
          class="outline-none border px-2 dark:bg-gray-600 dark:text-gray-200"
          v-if="editMode && $store.state.loggedIn && stat.stat == 'admin'"
        />
        <p v-else class="dark:text-gray-300">{{ data.description }}</p>
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

          <p class="text-gray-400 dark:text-gray-300">
            Created at {{ parseDate(data.createdAt) }}
          </p>
        </div>
      </div>
      <hr class="w-full" />
      <div class="p-4 flex flex-col gap-3 dark:text-gray-300">
        <p>Members</p>
        <div class="flex text-gray-800 dark:text-gray-300 font-bold text-3xl">
          <p>-</p>
        </div>
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
    <div class="border mt-4 hidden">
      <div class="flex p-4 bg-green-100 flex-col">
        <p class="text-lg">Community Rules</p>
      </div>
      <div class="p-4 flex flex-col gap-3 text-gray-700">
        <div class="divide-y flex flex-col dark:divide-gray-700">
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
import { UPDATE_DESC } from "../queries";
import { parseDate } from "../utils";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: {
    UserAvatar,
  },
  props: ["data", "stat"],
  data: () => ({
    rules: [
      "No US Internal News or Politics",
      "No Editorialized or Misleading Titles",
      "No Feature stories",
      "No Feature stories",
    ],
    description: "",
    editMode: false,
    notifications: [] as any,
  }),
  async created() {
    this.description = this.data.description;
  },
  methods: {
    parseDate,
    saveDescription() {
      this.$apollo
        .mutate({
          mutation: UPDATE_DESC,
          variables: {
            desc: this.description,
            community: this.data.communityId,
          },
        })
        .then(({ data }) => {
          if (data) {
            this.$emit("updatedDesc");
          }
          this.editMode = false;
        });
    },
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
