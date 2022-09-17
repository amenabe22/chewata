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
    width: 20px;
    height: 20px;
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
    width: 30px;
    height: 30px;
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
      box-shadow: 100px 0 white, 0px 0 rgba(255, 255, 255, 0),
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 110px 0 white, 100px 0 white,
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    36% {
      box-shadow: 120px 0 white, 110px 0 white,
        100px 0 white, 0px 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 130px 0 white, 120px 0 white,
        110px 0 white, 100px 0 white;
    }
    62% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 white,
        120px 0 white, 110px 0 white;
    }
    75% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        130px 0 white, 120px 0 white;
    }
    87% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        200px 0 rgba(255, 255, 255, 0), 130px 0 white;
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
      box-shadow: 100px 0 white, 0px 0 rgba(255, 255, 255, 0),
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 110px 0 white, 100px 0 white,
        0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    36% {
      box-shadow: 120px 0 white, 110px 0 white,
        100px 0 white, 0px 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 130px 0 white, 120px 0 white,
        110px 0 white, 100px 0 white;
    }
    62% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 white,
        120px 0 white, 110px 0 white;
    }
    75% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        130px 0 white, 120px 0 white;
    }
    87% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        200px 0 rgba(255, 255, 255, 0), 130px 0 white;
    }
    100% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
        200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
    }
  }
  </style>
  