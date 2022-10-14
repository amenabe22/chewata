<template>
  <div class="flex flex-row mt-20 h-full bg-green-50">
    <div class="w-full sm:block hidden">
      <img
        class="h-screen object-cover"
        src="https://cdn.dribbble.com/users/5349290/screenshots/16218240/media/dd3f03302cef3b447b21ee27226c744b.png"
      />
    </div>
    <div class="mt-3 w-full">
      <form class="p-4 flex flex-col gap-3" @submit.prevent="addCommunity">
        <p class="text-4xl">አዲስ ጀማ</p>
        <div class="relative z-0 mb-6 w-full group">
          <div class="flex flex-col mb-3">
            <label>Community Name</label>
            <small class="text-gray-400">Name your community</small>
          </div>
          <input
            type="text"
            required
            v-model="name"
            name="floating_email"
            class="block py-2.5 rounded-lg px-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <div class="flex flex-col mb-3">
            <label>Topic</label>
            <small class="text-gray-400"
              >Pick a topic that fits your community best</small
            >
          </div>
          <div class="w-full">
            <select
              required
              id="countries"
              v-model="category"
              class="bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 outline-none"
            >
              <option
                v-for="(cat, ix) in categories"
                :key="ix"
                :value="cat.catId"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <div class="flex flex-col mb-3">
            <label>Description</label>
            <small class="text-gray-400"
              >Describe your community and what it's all about</small
            >
          </div>
          <textarea
            required
            id="message"
            rows="4"
            v-model="description"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-0 border-b-2 outline-none border-gray-300 focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6 z-0">
          <div class="relative z-0 mb-6 w-full group">
            <fieldset class="flex gap-3">
              <div class="flex items-center mb-4">
                <input
                  v-model="public"
                  required
                  id="country-option-1"
                  type="radio"
                  name="countries"
                  value="public"
                  class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-green-300 outline-nonene"
                  checked
                />
                <label
                  for="country-option-1"
                  class="block ml-2 text-sm font-medium text-gray-900 outline-none"
                  >Public
                </label>
              </div>

              <div class="flex items-center mb-4">
                <input
                  v-model="private"
                  required
                  id="country-option-2"
                  type="radio"
                  name="countries"
                  value="private"
                  class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-green-300"
                />
                <label
                  for="country-option-2"
                  class="block ml-2 text-sm font-medium text-gray-900"
                >
                  Private
                </label>
              </div>
            </fieldset>
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center"
        >
          Create Community
        </button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DropDown from "../components/DropDown.vue";
import { ADD_COMMUNITY, CATEGORIES } from "../queries";

export default defineComponent({
  components: { DropDown },
  data: () => ({
    name: "",
    public: false,
    private: false,
    category: "",
    description: "",
    categories: [] as any,
    selected: null as any,
  }),
  methods: {
    async addCommunity() {
      const { data } = await this.$apollo.mutate({
        mutation: ADD_COMMUNITY,
        variables: {
          input: {
            name: this.name,
            description: this.description,
            type: this.public ? "public" : "private",
            category: this.category,
          },
        },
      });

      if (data) this.$router.push(`/${data.addCommunity.slug}`);
      else {
        alert("community not found");
      }
    },
  },
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
});
</script>
