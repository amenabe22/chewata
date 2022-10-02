<template>
  <div class="flex flex-col">
    <h1 class="text-gray-500 pb-6 text-2xl font-normal tracking-widest">
      Suggested Chewata
    </h1>
    <div class="flex flex-col gap-4">
      <div v-for="x in 2" :key="x" class="flex flex-col items-start gap-1">
        <div class="flex items-start justify-between w-full py-2">
          <div>
            <p class="text-lg font-semibold text-gray-500">Lucas Hombre</p>
          </div>
          <div class="flex justify-center gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <p class="text-sm">123</p>
          </div>
        </div>
        <p class="text-gray-400">
          Do you agree that the hardest part of the job as a software engineer
          is not the complication of the tech stack, but working for an
          inconsiderate arsehole is what makes the job difficult?
        </p>
      </div>
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-start justify-between w-full">
          <div>
            <p class="text-lg font-semibold text-gray-500">Lucas Hombre</p>
          </div>
          <div class="flex justify-center gap-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <p class="text-sm">123</p>
          </div>
        </div>
        <div class="grid grid-cols-3">
          <p class="text-gray-400 col-span-2">
            Do you agree that the hardest part of the job as a software
            engineer...
          </p>
          <img
            class="w-full"
            src="https://res.cloudinary.com/dtabnh5py/image/upload/v1664655156/twp86bvvyofbvsqe38qp.jpg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
