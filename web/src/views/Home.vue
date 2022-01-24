<template>
  <div class="w-full">
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>

            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="showModal = false">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <navbar />
    <div class="flex flex-row justify-center gap-10 mt-24">
      <div class="w-1/6 mt-2 hidden lg:block xl:block md:block">
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
          Join DevRant
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
      <div class="md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white">
        <p
          class="text-2xl px-6 pt-5 font-semibold tracking-wider text-gray-500"
        >
          Feed
        </p>

        <feed-tile
          pic="https://img.devrant.com/devrant/rant/r_5062886_BL7qm.jpg"
          text="This shit funny Af 🤣"
        />
        <div
          v-for="x in 10"
          :key="x"
          class="mt-4 cursor-pointer"
          @click="clicked"
        >
          <feed-tile
            text="Hired a new BI developer. She tested reasonably ok in SQL, and
              certainly showed good strengths in visualising data, plus had a
              good attitude in the interview. We hired her. She broke her laptop
              the first day. We got her another then she complained the camera
              didn't work but didn't realise the lever in front of the camera
              was to move the privacy shutter off and on."
          />
          <div>
            <div class="mb-3 flex flex-row justify-end">
              <button class="px-2 mx-2">
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 text-green-500 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                    />
                    <path
                      d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                    />
                  </svg>
                  <p class="text-green-500 mt-1 text-xl">2</p>
                </div>
              </button>
            </div>
            <div
              class="border-t border-gray-200 mx-20"
              style="width: 90%"
            ></div>
          </div>
        </div>
        <div class="mb-32"></div>
      </div>
      <div class="w-1/6 mt-2 hidden lg:block xl:block">
        <h1
          class="text-gray-500 px-2 pb-4 text-2xl font-semibold tracking-widest"
        >
          Top Tags
        </h1>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-1">
          <div
            v-for="x in 13"
            :key="x"
            class="
              rounded-md
              border-2
              px-1
              hover:border-green-500
              duration-300
              transition
              ease-in-out
              delay-75
            "
          >
            <p
              class="
                text-gray-500 text-center text-sm
                hover:text-green-600
                cursor-pointer
                duration-300
                transition
                ease-in-out
                delay-75
              "
            >
              Soccer
            </p>
          </div>
        </div>
      </div>
    </div>
    <ground-meda />
  </div>
</template>

<script lang="ts">
// import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import FeedTile from "../components/FeedTile.vue";
import GroundMeda from "../components/GroundMeda.vue";
import Navbar from "../components/Navbar.vue";
import VoteClickers from "../components/VoteClickers.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    Navbar,
    GroundMeda,
    VoteClickers,
    FeedTile,
  },
  data: () => ({
    showModal: false,
  }),
  methods: {
    clicked() {
      this.$router.push({ path: "/game" });
    },
  },
});
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(174, 240, 174, 0.356);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
