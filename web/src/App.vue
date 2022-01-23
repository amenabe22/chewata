<script setup lang="ts">
</script>

<template>
  <div class="w-full">
    <nav class="bg-green-400 h-20">
      <div class="flex flex-row">
        <div>
          <img
            src="./assets/soccer.png"
            alt=""
            class="w-16 h-16 ml-5 md:ml-10 lg:ml-10 xl:ml-10 my-2 block"
          />
        </div>
        <p class="text-white font-black text-2xl tracking-widest p-4">
          Chewata
        </p>
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
    </nav>
    <div class="flex flex-row justify-center gap-10 mt-4">
      <div class="w-1/6 mt-2 hidden lg:block xl:block md:block">
        <h1 class="text-gray-500 text-2xl font-semibold tracking-widest">
          Join DevRant
        </h1>

        <p class="font-normal text-gray-400 text-lg">
          Do all the things like ++ or -- rants, post your own rants, comment on
          others' rants and build your customized dev avatar
        </p>
        <button class="rounded-xl tracking-widest border-2 mt-2 p-2">
          Sign Up
        </button>
      </div>
      <div class="md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white">
        <p
          class="text-2xl px-6 pt-5 font-semibold tracking-wider text-gray-500"
        >
          Feed
        </p>

        <div class="flex flex-row mt-4">
          <div>
            <div
              class="
                duration-300
                transition
                ease-in-out
                delay-100
                font-black
                text-2xl text-white
                hover:bg-green-500
                cursor-pointer
                bg-gray-400
                rounded-t-full
                px-2
                mx-5
              "
            >
              ++
            </div>
            <p class="text-center py-1 text-gray-600 font-black">3</p>
            <div
              class="
                duration-300
                transition
                ease-in-out
                delay-100
                font-black
                text-2xl text-white
                hover:bg-green-500
                cursor-pointer
                bg-gray-400
                rounded-b-full
                px-2
                mx-5
              "
            >
              - -
            </div>
          </div>
          <div>
            <p class="py-2 mb-2 tracking-wide text-gray-600 text-xl">
              Here goes some nice caption
            </p>
            <img
              src="https://img.devrant.com/devrant/rant/r_5062886_BL7qm.jpg"
              alt=""
              style="object-fit: contain"
            />
          </div>
        </div>

        <div v-for="x in 10" :key="x" class="mt-4">
          <div class="flex flex-row">
            <div>
              <div
                class="
                  duration-300
                  transition
                  ease-in-out
                  delay-100
                  font-black
                  text-2xl text-white
                  hover:bg-green-500
                  cursor-pointer
                  bg-gray-400
                  rounded-t-full
                  px-2
                  mx-5
                "
              >
                ++
              </div>
              <p class="text-center py-1 text-gray-600 font-black">10</p>
              <div
                class="
                  duration-300
                  transition
                  ease-in-out
                  delay-100
                  font-black
                  text-2xl text-white
                  hover:bg-green-500
                  cursor-pointer
                  bg-gray-400
                  rounded-b-full
                  px-2
                  mx-5
                "
              >
                - -
              </div>
            </div>
            <p class="py-2 mb-2 tracking-wide text-gray-500 text-xl">
              Hired a new BI developer. She tested reasonably ok in SQL, and
              certainly showed good strengths in visualising data, plus had a
              good attitude in the interview. We hired her. She broke her laptop
              the first day. We got her another then she complained the camera
              didn't work but didn't realise the lever in front of the camera
              was to move the privacy shutter off and on.
            </p>
          </div>
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
    <button
      style="
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 42px;
        right: 50%;
        background-color: #0c9;
        color: #fff;
        border-radius: 50px;
        text-align: center;
      "
      class="shadow-2xl animate-bounce"
    >
      <img class="shadow-2xl" src="./assets/soccer-ball.png" alt="" />
    </button>
    <nav
      class="bg-gradient-to-t from-green-400 to-tranparent text-white"
      style="
        position: fixed;
        width: 100%;
        height: 60px;
        bottom: 1px;
        color: #fff;
        text-align: center;
      "
    >
      <!-- <div class="bg-green w-full">wazza</div> -->
    </nav>
  </div>
</template>




