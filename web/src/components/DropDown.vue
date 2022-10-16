<template>
  <div class="w-full">
    <select
      id="countries"
      class="bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 outline-none"
    >
      <option v-for="(cat, ix) in categories" :key="ix" :value="cat.catId">
        {{ cat.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { CATEGORIES } from "../queries";

export default defineComponent({
  data: () => ({
    categories: [] as any,
    selected: null as any,
  }),
  async created() {
    const {
      data: { categories },
    } = await this.$apollo.query({
      query: CATEGORIES,
      fetchPolicy: "network-only",
    });
    this.categories = categories;
    this.selected = categories[0];
  },
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronUpDownIcon,
  },
});
</script>
<style scoped>
#headlessui-listbox-options-1 {
  position: relative;
}
</style>
