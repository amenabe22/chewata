<template>
  <nav
    class="h-16 fixed w-full top-0 z-50"
    style="box-sizing: content-box; background: #5fe18c"
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
      </div>
      <div class="flex flex-row mx-2">
        <div
          class="rounded-xl mb-4 mt-2 bg-transparent"
          v-if="$store.state.loggedIn"
        >
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
        <div v-else>
          <button
            @click="$emit('clickedLogin')"
            class="p- bg-white rounded-xl mx-5 mt-3 py-2 px-3 ring-2 hover:bg-green-100 ring-green-500"
          >
            Login
          </button>
        </div>
        <div
          v-if="$store.state.user"
          class="p-3 cursor-pointer"
          @click="$emit('profileClicked')"
        >
          <img
            :src="$store.state.user.photo"
            class="w-10 h-10 rounded-full ring-2 ring-green-600"
          />
        </div>
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
