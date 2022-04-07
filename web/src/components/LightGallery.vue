<template>
  <transition name="modal" v-if="showModal">
    <div
      class="
        modal-mask
        fixed
        top-0
        left-0
        mb-24
        bg-opacity-70 bg-gray-700
        w-full
        h-full
        z-50
        overflow-visible
        flex
      "
    >
      <div class="hidden xl:block">
        <button
          @click="$emit('close')"
          class="bg-gray-700 rounded-full m-5 p-1 h-8 w-8 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="block xl:hidden mb-15">
          <button
            @click="$emit('close')"
            class="bg-gray-700 rounded-full m-5 p-1 h-8 w-8 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="hidden xl:block mt-2"></div>
        <img
          src="https://pbs.twimg.com/media/FKDUMT9WQAYIcED?format=jpg&name=large"
          class="m-auto block"
          alt=""
          :style="{
            width:
              windowWidth > 1600
                ? '50%'
                : windowWidth > 1400
                ? '60%'
                : windowWidth > 1280
                ? '50%'
                : windowWidth > 1200
                ? '85%'
                : windowWidth > 1025
                ? '70%'
                : '80%',
          }"
        />
        <p class="text-center text-white">Image Caption Goes Here</p>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  data: () => ({
    windowWidth: window.innerWidth,
  }),
  created() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    windowWidth():any {
      return this.windowWidth;
    },
  },
  props: {
    showModal: Boolean,
  },
});
</script>

<style>
.modal-mask {
  /* position: fixed;
  z-index: 9998;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease; */
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  /* background-color: #fff; */
  border-radius: 2px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

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