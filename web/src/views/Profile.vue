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
        <div class="flex flex-row pb-50 md:mt-0 lg:mt-0 xl:mt-0 mt-10" style="back">
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
    <div class="flex flex-row justify-center gap-2 mt-2">
      <div class="w-1/6 mt-2 hidden lg:block xl:block md:block">
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest pb-2">
          Degafi
        </h1>
        <div class="flex flex-row">
          <user-avatar />
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
            <div
              class="
                mx-2
                w-1/2
                text-center
                font-black
                text-sm
                rounded-md
                text-white
                bg-green-500
              "
            >
              1099
            </div>
          </div>
        </div>

        <h1 class="text-gray-500 text-2xl font-semibold tracking-wide mt-8">
          Support Us
        </h1>
        <p class="font-normal text-gray-400 text-lg">
          Do all the things like ++ or -- rants, post your own rants, comment on
          others' rants and build your customized dev avatar
        </p>
        <button
          class="rounded-xl tracking-widest border-2 mt-2 p-2"
          @click="showModal = true"
        >
          Sign Up
        </button>
      </div>
      <!-- comments section -->
      <div class="md:w-2/5 lg:w-2/5 xl:w-2/6 bg-white">
        <div class="flex flex-row">
          <button
            class="
              text-2xl
              px-2
              pt-5
              font-semibold
              tracking-wider
              text-gray-400
            "
          >
            Posts
          </button>
          <button
            class="
              text-2xl
              px-2
              pt-5
              font-semibold
              tracking-wider
              text-gray-400
            "
          >
            Comments
          </button>
          <button
            class="
              text-2xl
              px-2
              pt-5
              font-semibold
              tracking-wider
              text-gray-400
            "
          >
            Favourites
          </button>
        </div>
        <feed-tile
          pic="https://img.devrant.com/devrant/rant/r_4913002_e2Y73.jpg"
          text="From the window of my new office I see a lot of chicks."
        />
        <feed-tile
          text="
All jobs required experience in stuff I never seen/heard before (back then I didn’t know most job listings were copy pasted by people who knew less than me)."
          v-for="x in 3"
          :key="x"
        />
      </div>
      <!-- comments section end -->
      <div style="width: 13%" class="flex flex-row justify-center gap-10 mt-2">
        <div class="mt-2 hidden lg:block xl:block md:block">
          <h1 class="text-gray-500 text-2xl font-semibold tracking-widest pb-2">
            Related Chewata
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CommentTile from "../components/CommentTile.vue";
import FeedTile from "../components/FeedTile.vue";
import Navbar from "../components/Navbar.vue";
import UserAvatar from "../components/UserAvatar.vue";

export default defineComponent({
  components: { Navbar, UserAvatar, CommentTile, FeedTile },
  setup() {},
});
</script>
