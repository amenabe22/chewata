<template>
  <div>
    <div class="flex flex-row mt-4 hover:bg-gray-50">
      <div class="md:mx-0 lg:mx-0 xl:mx-0 mx-5">
        <div class="flex flex-row mt-2">
          <user-avatar />
          <div></div>
          <div>
            <p
              class="
                text-xl text-gray-500
                px-2
                pt-1
                font-semibold
                tracking-wider
                font-sans
              "
            >
              Samuna
            </p>
          </div>
        </div>
        <p
          class="
            py-2
            mb-2
            tracking-wide
            text-gray-600 text-lg
            xl:text-xl
            lg:text-xl
          "
          v-text="text"
        ></p>

        <img v-if="pic" :src="pic" alt="" style="object-fit: contain" />
      </div>
    </div>
    <hr class="mt-2" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserAvatar from "./UserAvatar.vue";

export default defineComponent({
  components: { UserAvatar },
  setup() {},
  props: {
    pic: String,
    text: String,
  },
});
</script>