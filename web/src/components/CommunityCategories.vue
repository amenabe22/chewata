<template>
  <div class="bg-white border border-green-200 mt-6">
    <div class="bg-green-50 dark:bg-gray-700 dark:text-gray-300">
      <p class="text-lg py-2 px-6 text-start">Categories</p>
      <ul class="max-w-md bg-white dark:bg-brand-dark-500">
        <li
          class="pb-3 sm:pb-4 py-2 px-6 cursor-pointer dark:hover:bg-gray-600 hover:bg-green-50"
          v-for="(cat, ix) in categories"
          :key="ix"
          @click="selectedCat(cat)"
          :class="{ 'bg-green-100 dark:bg-gray-600': cat.selected }"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm dark:text-gray-300 text-gray-700 truncate"
                :class="{ 'font-semibold': cat.selected }"
              >
                {{ cat.name }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CATEGORIES } from "../queries";

export default defineComponent({
  data: () => ({
    categories: [] as any,
    selected: null as any,
  }),
  methods: {
    selectedCat(cat: any) {
      this.categories.forEach((c: any) => {
        if (c.catId == cat.catId) {
          c.selected = true;
        } else {
          c.selected = false;
        }
      });
      this.selected = cat;
      this.$emit("selected", cat.catId);
    },
  },
  async created() {
    const {
      data: { categories },
    } = await this.$apollo.query({
      query: CATEGORIES,
    });
    const cats = JSON.parse(JSON.stringify(categories));
    this.categories = cats.map((e: any) => {
      return { ...e, selected: false };
    });
  },
});
</script>
