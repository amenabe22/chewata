<template>
  <div class="flex flex-row justify-center gap-10 mt-16 sm:mt-20">
    <div
      v-if="$store.state.loggedIn"
      class="w-1/5 mt-2 hidden lg:block xl:block md:block"
    >
      <sidebar-items></sidebar-items>
    </div>
    <div class="w-1/6 mt-2 hidden lg:block xl:block md:block" v-else>
      <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
        Join Chewata
      </h1>

      <p class="font-normal text-gray-400 text-lg">
        Do all the things like ++ or -- rants, post your own rants, comment on
        others' rants and just have fun.
      </p>
      <button
        class="rounded-xl tracking-widest border-2 mt-2 p-2"
        @click="$store.commit('SET_LOGIN_POP', true)"
      >
        Sign Up
      </button>
    </div>

    <div class="w-full md:w-2/3 lg:w-2/5 xl:w-2/5 p-2">
      <!-- form start -->
      <new-post-form></new-post-form>
    </div>
    <!-- suggested section -->
    <div class="w-1/6 mt-2 hidden lg:block xl:block">
      <div class="flex flex-col">
        <h1 class="text-gray-500 pb-3 text-2xl font-normal tracking-widest">
          Top Tags
        </h1>
        <div class="flex flex-row gap-2 flex-wrap flex-grow">
          <div v-for="(tg, ix) in topTags" :key="ix" @click="tagSelected(tg)">
            <div
              class="hover:border-green-600 text-gray-400 text-center text-sm hover:text-green-600 cursor-pointer duration-100 transition ease-in-out delay-75 chip-items"
            >
              {{ tg.tagName }}
            </div>
          </div>
        </div>
      </div>
      <!-- suggested chewata -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NewPostForm from "../components/NewPostForm.vue";
import SidebarItems from "../components/SidebarItems.vue";
import SuggestedGames from "../components/SuggestedGames.vue";
import { TOP_TAGS } from "../queries";

export default defineComponent({
  components: { SidebarItems, SuggestedGames, NewPostForm },
  data: () => ({ topTags: [] as Array<any> }),
  async created() {
    await this.loadTags();
    this.$store.commit("SET_PROFILE_POP", false);
    this.$store.commit("SET_MAIN_POP", false);
  },
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
      this.topTags = topTags.map((tg: any) => {
        return {
          ...tg,
          selected: false,
        };
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.chip-items {
  border-radius: 5px;
  border-width: 2px;
  padding: 3px;
}
</style>
