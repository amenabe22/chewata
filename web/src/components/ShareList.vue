<template>
  <div class="bg-white dark:bg-brand-dark-500 rounded-xl">
    <ul class="w-80 divide-y divide-gray-100 dark:divide-gray-700">
      <li
        class="py-3 sm:pb-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        v-for="(link, ix) in shareLinks"
        :key="ix"
        :class="{ 'rounded-xl': ix == 0 || ix == shareLinks.length - 1 }"
      >
        <a :href="getLink(link)" target="_blank">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 px-3 pt-2">
              <img class="w-7 h-7 rounded-full" :src="link.image" />
            </div>
            <div class="flex-1 min-w-0 mt-2">
              <p class="text-lg text-gray-600 truncate dark:text-gray-300">
                Share on {{ link.name }}
              </p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["post"],
  methods: {
    stripHtml(html) {
      let tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    },
    getLink(link: any) {
      let shareLink;
      const content =
        this.stripHtml(this.post.content).substring(0, 200) + "\n\n";
      if (link.name === "Facebook") {
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${this.link}/${this.post.postId}&quote=${content}...`;
      } else if (link.name === "Telegram") {
        shareLink = `https://telegram.me/share/url?url=${this.link}/${this.post.postId}&text=${content}`;
      } else if (link.name === "Twitter") {
        shareLink = `http://twitter.com/share?text=${escape(content)}&url=${
          this.link
        }/${this.post.postId}`;
      } else if (link.name === "Messenger") {
        shareLink = `fb-messenger://share/?link=${this.link}/${this.post.postId}&app_id=${this.appid}`;
      } else if (link.name === "WhatsApp") {
        shareLink = `https://api.whatsapp.com/send/?text=${content}&type=custom_url&app_absent=0`;
      }
      return shareLink;
    },
  },
  data: () => ({
    appid: "123456",
    link: "https://chewata.fun/game",
    shareLinks: [
      {
        name: "Facebook",
        link: "",
        image: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
      },
      {
        name: "Telegram",
        link: "",
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",
      },
      {
        name: "Twitter",
        link: "",
        image: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
      },
      {
        name: "WhatsApp",
        link: "",
        image: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
      },
      {
        name: "Messenger",
        link: "",
        image: "https://cdn-icons-png.flaticon.com/512/5968/5968771.png",
      },
    ],
  }),
});
</script>
