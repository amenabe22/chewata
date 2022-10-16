<template>
  <div class="flex flex-row justify-center gap-10 pt-20">
    <div
      class="w-1/5 mt-2 hidden lg:block xl:block md:block"
      v-if="$store.state.loggedIn"
    >
      <!-- profile link section -->
      <div class="w-full text-gray-500">
        <p class="text-2xl">Profile</p>
        <div class="flex gap-2 pt-2">
          <user-avatar :large="true" :img="$store.state.user.photo" />
          <router-link to="/user">
            <div class="flex flex-col">
              <p class="font-semibold text-lg hover:text-green-800">
                {{ $store.state.user.fullName }}
              </p>
              <div class="mx-2">
                <span
                  class="px-1 rounded-md text-white text-sm"
                  style="background: #5fd49f"
                >
                  {{ $store.state.user.totalLikes }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="w-1/6 mt-2 hidden lg:block xl:block md:block" v-else>
      <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
        Join Chewata
      </h1>

      <p class="font-normal text-gray-400 text-lg">
        Do all the things like ++ or -- rants, post your own rants, comment on
        others' rants and build your customized dev avatar
      </p>
      <button
        class="rounded-xl tracking-widest border-2 mt-2 p-2"
        @click="showModal = true"
      >
        Sign Up
      </button>
    </div>
    <!-- start of notifs -->
    <div class="md:w-2/3 lg:w-2/5 xl:w-2/5">
      <p class="text-3xl sm:pt-5 font-semibold tracking-wider text-gray-500">
        Notifications
      </p>
      <div class="flex flex-col gap-3 pt-5">
        <notification-tile
          v-for="(not, ix) in notifications"
          :item="not"
          :key="ix"
        />
      </div>
    </div>
    <!-- end of notifs -->
    <!-- start of side ads -->
    <div class="w-1/6 mt-2 hidden lg:block xl:block">
      <div class="flex flex-col">
        <h1 class="text-gray-500 pb-3 text-2xl font-normal tracking-widest">
          Top Tags
        </h1>
        <div class="flex flex-row gap-2 flex-wrap flex-grow">
          <div v-for="(tg, ix) in topTags" :key="ix" @click="tagSelected(tg)">
            <span
              class="hover:border-green-600 text-gray-400 text-center text-sm hover:text-green-600 cursor-pointer duration-100 transition ease-in-out delay-75 chip-items"
            >
              {{ tg.tagName }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- end of side ads -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import NotificationTile from "../components/NotificationTile.vue";
import UserAvatar from "../components/UserAvatar.vue";
import { NOTIFICATIONS, TOP_TAGS } from "../queries";

export default defineComponent({
  components: { Navbar, NotificationTile, UserAvatar },
  async created() {
    const {
      data: {
        notifications: { data },
      },
    } = await this.$apollo.query({
      query: NOTIFICATIONS,
      fetchPolicy: "network-only",
      variables: {
        pagination: this.pagination,
      },
    });
    this.notifications = data;
    await this.loadTags();
  },
  data: () => ({
    pagination: {
      page: 1,
      pageSize: 10,
    },
    topTags: [] as any,
    showModal: false,
    notifications: [] as any,
  }),
  methods: {
    tagSelected(tg: any) {
      this.$router.push(`/tag/${tg.tagName}`);
    },
    async loadTags() {
      const {
        data: { topTags },
      } = await this.$apollo.query({
        query: TOP_TAGS,
        fetchPolicy: "network-only",
      });
      this.topTags = topTags;
    },
  },
});
</script>

<style scoped>
.amen-enter-from {
  opacity: 0;
}
.amen-enter-to {
  opacity: 1;
}
.amen-enter-active {
  transition: opacity 2s ease;
}
.chip-items {
  border-radius: 5px;
  border-width: 2px;
  padding: 3px;
}
</style>
