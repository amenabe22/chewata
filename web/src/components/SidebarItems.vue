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
          <div class="flex gap-3 pt-2" v-for="x in 5" :key="x">
            <user-avatar :large="true" :img="$store.state.user.photo"></user-avatar>
            <p><b>Jack Harlow</b> Liked your comment !</p>
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
});
</script>

UserAvatar
