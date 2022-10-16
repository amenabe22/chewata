<template>
  <div>
    <h1
      class="text-gray-500 pb-3 text-xl font-normal tracking-widest"
      v-if="!hideTitle"
    >
      Top Jema
    </h1>
    <div
      class="flex flex-col gap-2 bg-white py-2 divide-y divide-green-200 border border-green-100"
    >
      <div
        v-for="(com, ix) in communities"
        :key="ix"
        class="flex gap-2 items-center"
        :class="{ 'p-3': large, 'p-1': !large }"
      >
        <img
          :src="com.logo ? com.logo : 'https://res.cloudinary.com/dtabnh5py/image/upload/v1665875009/favicon_z0elvl.png'"
          class="w-8 rounded-full h-8 object-cover"
        />
        <router-link
          :to="`/${com.slug}`"
          class="text-sm font-semibold text-green-800"
          >{{ com.name }}</router-link
        >
      </div>
    </div>
    <button
      v-if="!large"
      @click="$router.push('/explore')"
      class="w-full flex gap-1 border-green-300 border justify-center items-center text-md py-1 bg-green-100 hover:bg-green-200 h-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5 text-green-600"
      >
        <path
          d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z"
        />
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
          clip-rule="evenodd"
        />
      </svg>

      <p class="text-green-700">Explore More</p>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { TOP_COMMUNITIES } from "../queries";

export default defineComponent({
  data: () => ({ communities: [] as any }),
  props: {
    hideTitle: Boolean,
    large: Boolean,
    cat: String,
    pageSize: { type: Number, default: 10 },
  },
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
          pageSize: this.pageSize,
        },
        cat: this.cat,
      },
    });
    this.communities = data;
  },
});
</script>
