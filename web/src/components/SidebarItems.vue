<template>
  <div>
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
            <div>
              <span class="bg-green-700 px-1 rounded-md text-white">123</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col pt-10">
      <div class="text-gray-500">
        <p class="text-2xl">Notifs</p>
        <div class="pt-5 flex flex-col divide-y gap-3">
          <div
            class="flex gap-2 pt-2"
            v-for="(nt, ix) in notifications"
            :key="ix"
          >
            <user-avatar :large="true" :img="nt.user.photo"></user-avatar>
            <p class="text-lg">{{ nt.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LATEST_NOTIFICATIONS } from "../queries";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: {
    UserAvatar,
  },
  data: () => ({
    notifications: [] as any,
  }),
  async created() {
    await this.loadNotifications();
  },
  methods: {
    async loadNotifications() {
      const {
        data: { latestNotifications },
      } = await this.$apollo.query({
        query: LATEST_NOTIFICATIONS,
        fetchPolicy: "network-only",
      });
      this.notifications = latestNotifications;
    },
  },
});
</script>

UserAvatar
