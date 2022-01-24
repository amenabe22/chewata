<template>
  <nav
    class="bg-green-400 h-16 fixed w-full top-0 z-50"
    style="box-sizing: content-box"
  >
    <div
      class="flex flex-row text-center md:text-left xl:text-left lg:text-left"
    >
        <img
          src="../assets/soccer.png"
          alt=""
          class="w-14 h-14 ml-5 md:ml-10 lg:ml-10 xl:ml-10 my-2 block"
        />

      <router-link to="/">
        <p class="text-white font-black text-2xl tracking-widest p-4">
          Chewata
        </p>
      </router-link>
      <div
        class="
          lg:flex
          hidden
          md:flex
          xl:flex
          flex-row
          pt-5
          font-light
          text-xl text-white
        "
      >
        <p v-for="x in 5" :key="x" class="px-2">Item</p>
      </div>
    </div>
    <!-- <div class="float-right">
      </div> -->
  </nav>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {},
});
</script>
