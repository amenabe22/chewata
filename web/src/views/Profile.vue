<template>
  <div>
    <navbar />
    <div
      class="mt-16 bg-green-400 h-3/4 w-full"
      style="
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
      :class="{
        'bg-[url()]': true,
      }"
    >
      <div
        class="
          text-white
          font-semibold
          xl:text-4xl
          lg:text-4xl
          md:text-3xl
          text-2xl
          xl:tracking-wider
          lg:tracking-wider
          md:tracking-wider
          tracking-normal
          font-sans
          flex
          lg:mx-80
          xl:mx-80
          mx-10
          pt-20
          bg-ima
        "
      >
        <div class="flex flex-row pb-50" style="back">
          <vote-clickers :dark="true" color="#92daac" class="mt-5" />
          <div class="xl:w-3/4 lg:w-3/5 md:w-3/5">
            <p class="pt-5">Cool Dude</p>
            <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
              If you treat me like an option, I’ll leave you like a choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../components/Navbar.vue";

export default defineComponent({
  components: { Navbar },
  setup() {},
});
</script>
