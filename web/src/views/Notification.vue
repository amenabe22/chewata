 <template>
  <div>
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
      <!-- start of notifs -->
      <div class="md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white">
        <p
          class="text-2xl px-6 pt-5 font-semibold tracking-wider text-gray-500"
        >
          Notifications
        </p>
        <notification-tile
          text="Dont know when devRant became NatGeo Wild Trivia ..."
          v-for="x in 10"
          :key="x"
        />
      </div>
      <!-- end of notifs -->
      <!-- start of side ads -->
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
      <!-- end of side ads -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import NotificationTile from "../components/NotificationTile.vue";

export default defineComponent({
  components: { Navbar, NotificationTile },
  setup() {},
  data: () => ({
    showModal: false,
  }),
});
</script>
