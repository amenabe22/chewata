<template>
  <div>
    <a
      :href="item.link"
      class="flex border border-green-200 dark:border-gray-500 rounded-xl p-3 gap-3 hover:bg-green-50 cursor-pointer dark:hover:bg-gray-700"
    >
      <img :src="item.cover" class="w-20 object-contain rounded-xl" alt="" />
      <div class="flex flex-col">
        <p class="font-semibold dark:text-gray-300">{{ item.user.fullName }}</p>
        <div>
          <span
            class="bg-green-100 dark:text-gray-700 dark:bg-green-300 text-gray-500 w-full rounded-lg text-xs p-1"
            >202</span
          >
        </div>
        <p class="pt- text-gray-500 dark:text-gray-300">
          {{ item.message }}
        </p>
      </div>
    </a>
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
