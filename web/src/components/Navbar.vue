<template>
  <nav
    class="bg-green-400 h-16 fixed w-full top-0 z-50"
    style="box-sizing: content-box"
  >
    <div
      class="flex flex-row text-center md:text-left xl:text-left lg:text-left justify-between"
    >
      <div class="flex">
        <router-link to="/">
          <div class="flex flex-row">
            <img
              src="../assets/final.svg"
              alt=""
              style="-webkit-transform: scaleX(-1); transform: scaleX(-1)"
              class="w-12 h-12 ml-3 md:ml-10 lg:ml-10 xl:ml-10 my-3 block"
            />

            <p class="text-white font-black text-3xl tracking-widest pt-4 pr-5">
              ጨዋታ
            </p>
          </div>
        </router-link>
        <div
          class="lg:flex hidden md:flex xl:flex flex-row pt-5 font-light text-xl text-white"
        >
          <p v-for="x in 5" :key="x" class="px-2">Item</p>
        </div>
      </div>
      <div class="rounded-xl mb-4 mt-2 bg-transparent mx-10">
        <router-link to="/notification" class="ont-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 m-2 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {},
});
</script>
