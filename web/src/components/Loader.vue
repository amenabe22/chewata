<template>
  <span :class="{ loader: !dark, 'loader-dark': dark }"></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dark: Boolean,
  },
});
</script>
<style scoped>
.loader {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: rgb(75, 216, 75);
  left: -100px;
  box-sizing: border-box;
  animation: shadowRolling 2s linear infinite;
}

.loader-dark {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: white;
  left: -100px;
  box-sizing: border-box;
  animation: shadowRollingDark 2s linear infinite;
}

@keyframes shadowRollingDark {
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 rgb(136, 255, 136), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 110px 0 rgb(136, 255, 136), 100px 0 rgb(136, 255, 136),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 120px 0 rgb(136, 255, 136), 110px 0 rgb(136, 255, 136),
      100px 0 rgb(136, 255, 136), 0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 130px 0 rgb(136, 255, 136), 120px 0 rgb(136, 255, 136),
      110px 0 rgb(136, 255, 136), 100px 0 rgb(136, 255, 136);
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 rgb(136, 255, 136),
      120px 0 rgb(136, 255, 136), 110px 0 rgb(136, 255, 136);
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      130px 0 rgb(136, 255, 136), 120px 0 rgb(136, 255, 136);
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 130px 0 rgb(136, 255, 136);
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
}

@keyframes shadowRolling {
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 rgb(75, 216, 75), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 110px 0 rgb(75, 216, 75), 100px 0 rgb(75, 216, 75),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 120px 0 rgb(75, 216, 75), 110px 0 rgb(75, 216, 75),
      100px 0 rgb(75, 216, 75), 0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 130px 0 rgb(75, 216, 75), 120px 0 rgb(75, 216, 75),
      110px 0 rgb(75, 216, 75), 100px 0 rgb(75, 216, 75);
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 rgb(75, 216, 75),
      120px 0 rgb(75, 216, 75), 110px 0 rgb(75, 216, 75);
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      130px 0 rgb(75, 216, 75), 120px 0 rgb(75, 216, 75);
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 130px 0 rgb(75, 216, 75);
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
}
</style>
