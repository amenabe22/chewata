<template>
  <div>
    <h1 class="text-gray-500 pb-3 text-xl font-normal tracking-widest">
      Top Jema
    </h1>
    <div class="flex flex-col gap-2 bg-white py-2 divide-y divide-green-200 border border-green-100">
      <div v-for="(com, ix) in communities" :key="ix" class="flex gap-2 items-center p-1">
        <img :src="com.logo?com.logo:'../src/assets/favicon.png'" class="w-8 rounded-full h-8 object-cover" />
        <router-link :to="`/${com.slug}`" class="text-sm font-semibold text-green-800">{{ com.name }}</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { TOP_COMMUNITIES } from "../queries";

export default defineComponent({
  data: () => ({ communities: [] as any }),
  async created() {
    const {
      data: {
        topCommunities: { data },
      },
    } = await this.$apollo.query({
      query: TOP_COMMUNITIES,
      fetchPolicy: "no-cache",
      variables: {
        pagination: {
          page: 1,
          pageSize: 10,
        },
      },
    });
    this.communities = data;
  },
});
</script>
