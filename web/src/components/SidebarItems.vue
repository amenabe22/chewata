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
              <span
                class="px-1 rounded-md text-white"
                style="background: #5fd49f"
                >{{ $store.state.user.totalLikes }}</span
              >
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col pt-10">
      <div class="text-gray-500">
        <p class="text-2xl">Notifs</p>
        <div class="pt-5 flex flex-col divide-y gap-3">
          <a
            :href="nt.link"
            class="flex pt-2 gap-3"
            v-for="(nt, ix) in notifications"
            :key="ix"
          >
            <user-avatar  :large="true" :img="nt.user.photo"></user-avatar>
            <p class="text-lg w-full">{{ nt.message }}</p>
          </a>
        </div>
      </div>
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
  async created() {
    await this.persistUserData(), await this.loadNotifications();
  },
  methods: {
    async persistUserData() {
      const {
        data: { me },
      } = await this.$apollo.query({
        query: ME,
        fetchPolicy: "network-only",
      });
      if (me) {
        this.$store.commit("SET_USER", me);
        this.$emit("loggedin");
      }
    },
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
