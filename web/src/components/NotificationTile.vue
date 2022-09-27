<template>
  <div>
    <a
      :href="item.link"
      class="flex bg-gray-50 rounded-xl p-3 gap-3 hover:bg-green-50 cursor-pointer"
    >
      <img :src="item.cover" class="w-20 object-contain rounded-xl" alt="" />
      <div class="flex flex-col">
        <p class="font-semibold">{{ item.user.fullName }}</p>
        <div>
          <span class="bg-green-100 text-gray-500 w-full rounded-lg text-xs p-1"
            >202</span
          >
        </div>
        <p class="pt- text-gray-500">
          {{ item.message }}
        </p>
      </div>
    </a>
    <!-- <p>{{ item.message }}</p> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: { UserAvatar },
  setup() {},
  props: ["item"],
});
</script>
