<template>
  <div class="top-16 w-72">
    <Listbox v-model="selected">
      <div class="relative mt-1">
        <ListboxButton
          v-if="selected"
          class="relative w-full cursor-default border border-gray-300 rounded-md dark:bg-brand-dark-500 dark:text-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selected.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 cursor-pointer max-h-60 w-full overflow-auto rounded-md dark:bg-brand-dark-500 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="comm in communities"
              :key="comm.name"
              :value="comm"
              as="template"
            >
              <li
                @click="$emit('selected', comm)"
                class="cursor-pointer"
                :class="[
                  active ? 'bg-green-100 dark:bg-gray-600 dark:text-brand-200 text-green-900' : 'text-gray-900 dark:text-brand-200',
                  'relative select-none py-2 px-2 pr-4',
                ]"
              >
                <div class="flex justify-start gap-3">
                  <img
                    :src="
                      comm.logo
                        ? comm.logo
                        : 'https://res.cloudinary.com/dtabnh5py/image/upload/v1665875009/favicon_z0elvl.png'
                    "
                    alt=""
                    class="w-7 h-7 rounded-full"
                  />
                  <p>
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ comm.name }}</span
                    >
                  </p>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
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
import { USER_COMMUNITIES } from "../queries";

export default defineComponent({
  data: () => ({
    communities: [] as any,
    selected: null as any,
  }),
  props: ["com"],
  async created() {
    await this.loadCommunities();
  },
  methods: {
    async loadCommunities() {
      const {
        data: { userCommunities },
      } = await this.$apollo.query({
        query: USER_COMMUNITIES,
        fetchPolicy: "network-only",
      });
      this.communities = userCommunities;
      if (userCommunities.length) {
        if (this.com) {
          this.selected = this.communities.find((e: any) => e.slug == this.com);
        }
        if (!this.selected) {
          this.selected = userCommunities[0];
        }
        this.$emit("selected", this.selected);
        this.$emit("empty", false);
      } else {
        this.$emit("empty", true);
      }
    },
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
<style lang="scss">
#headlessui-listbox-options-1 {
  z-index: 50;
}
</style>
