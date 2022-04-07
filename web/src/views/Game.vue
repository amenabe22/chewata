 <template>
  <div>
    <navbar />
    <light-gallery :showModal="showModal" @close="showModal = false" />
    <div class="mt-16 bg-green-400 h-1/2 w-full">
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
          md:mx-10
          pt-20
        "
      >
        <div class="flex flex-row">
          <vote-clickers :dark="true" color="#92daac" class="mt-5" />
          <div class="xl:w-3/4 w-full lg:w-3/5 md:w-3/5">
            <p class="pt-5">Karlson</p>
            <p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">
              Did you know crocodiles could grow up to 15 feet? But most just
              have 4.
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
      <div class="md:w-2/3 sm:w-full lg:w-2/5 w-full xl:w-2/6 bg-white">
        <p
          class="text-2xl px-6 pt-5 font-semibold tracking-wider text-gray-500"
        >
          Comments
        </p>
        <comment-tile
          text="Dont know when devRant became NatGeo Wild Trivia ..."
          v-for="x in 10"
          :key="x"
        />
      </div>
      <!-- comments section end -->
      <div
        style="width: 13%"
        class="
          xl:block
          md:block
          flex-row
          justify-center
          gap-10
          mt-2
          hidden
          md:hidden
        "
      >
        <div class="mt-2 hidden lg:block xl:block md:block">
          <h1 class="text-gray-500 text-2xl font-semibold tracking-widest pb-2">
            Related Chewata
          </h1>
          <related-items v-for="x in 5" :key="x" />
        </div>
      </div>
    </div>
    <comment-meda :hide="false" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import CommentMeda from "../components/CommentMeda.vue";
import CommentTile from "../components/CommentTile.vue";
// import GroundMeda from "../components/GroundMeda.vue";
import LightGallery from "../components/LightGallery.vue";
import Navbar from "../components/Navbar.vue";
import RelatedItems from "../components/RelatedItems.vue";
import UserAvatar from "../components/UserAvatar.vue";
import VoteClickers from "../components/VoteClickers.vue";

export default defineComponent({
  components: {
    Navbar,
    // GroundMeda,
    VoteClickers,
    CommentTile,
    UserAvatar,
    RelatedItems,
    LightGallery,
    CommentMeda,
  },
  data: () => ({
    showModal: false,
    showSide: true,
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
});
</script>

