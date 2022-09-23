import { defineComponent, useSSRContext, mergeProps, resolveComponent, withCtx, createVNode, Transition, openBlock, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, createTextVNode, createApp } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { getAuth, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import gql from "graphql-tag";
import { defineComponent as defineComponent$1 } from "@vue/runtime-core";
import { Head, createHead } from "@vueuse/head";
import { getAuth as getAuth$1, signOut } from "@firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import VueLoadImage from "vue-load-image";
import axios from "axios";
import InfiniteScroll from "infinite-loading-vue3";
import { query as query$1, collection as collection$1, where as where$1, getDocs as getDocs$1 } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { onMessage } from "@firebase/messaging";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faJs, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
var DialogModal_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$m = defineComponent({
  setup() {
  },
  name: "Modal",
  props: {
    show: Boolean,
    persistent: Boolean
  },
  methods: {
    closePop() {
      if (!this.persistent) {
        this.$emit("close");
      }
    }
  }
});
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-17573adf>`);
  if (_ctx.show) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay opacity-80" }, _attrs))} data-v-17573adf></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.show) {
    _push(`<div${ssrRenderAttrs(mergeProps({
      class: "modal bg-transparent",
      role: "dialog"
    }, _attrs))} data-v-17573adf>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/DialogModal.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
var DialogModal = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$m], ["__scopeId", "data-v-17573adf"]]);
const GET_POSTS = gql`
  query getPosts($input: PaginationInputType!) {
    getPosts(input: $input) {
      page
      per_page
      total
      data {
        id
        postId
        slug
        content
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;
const POST = gql`
  query getPost($post: String!) {
    getPost(post: $post) {
      id
      slug
      postId
      content
      cover
      likes
      user {
        id
        userId
        fullName
        photo
        totalLikes
      }
      createdAt
    }
  }
`;
const POST_COMMENTS = gql`
  query getPostComments($post: String!, $pagination: PaginationInputType!) {
    getPostComments(post: $post, pagination: $pagination) {
      page
      per_page
      total
      data {
        id
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          userId
          fullName
          photo
          totalLikes
          createdAt
        }
        createdAt
      }
    }
  }
`;
const SOCIAL_LOGIN = gql`
  mutation socialMediaLoginGoogle($input: String!) {
    socialMediaLoginGoogle(input: $input) {
      token
      user {
        id
        userId
        fullName
        email
        photo
        socialIdtoken
        totalLikes
      }
      errors {
        field
        message
      }
    }
  }
`;
const SET_VOTE = gql`
  mutation setVote($input: VoteInputType!) {
    setVote(input: $input)
  }
`;
const GET_POST_VOTES = gql`
  query getPostVote($post: String!) {
    getPostVote(post: $post) {
      vote
      voted
    }
  }
`;
const GET_COMMENT_VOTES = gql`
  query getCommentVote($comment: String!) {
    getCommentVote(comment: $comment) {
      vote
      voted
    }
  }
`;
const ADD_POST = gql`
  mutation addPost($input: PostInputType!) {
    addPost(input: $input) {
      id
      postId
      slug
      content
      cover
      likes
      user {
        id
        fullName
        photo
        totalLikes
      }
      createdAt
    }
  }
`;
const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput!) {
    addComment(input: $input) {
      id
      commentId
      message
      isReply
      cover
      likes
      user {
        id
        fullName
        photo
        totalLikes
        createdAt
      }
      createdAt
    }
  }
`;
gql`
  query {
    me {
      userId
      fullName
      email
      photo
      totalLikes
      createdAt
    }
  }
`;
const LOGOUT = gql`
  mutation {
    logout
  }
`;
const USER_PUBLIC = gql`
  query userPublic($user: String!) {
    userPublic(user: $user) {
      id
      userId
      fullName
      photo
      totalLikes
      createdAt
    }
  }
`;
const USER_POSTS = gql`
  query userPosts($pagination: PaginationInputType!) {
    userPosts(pagination: $pagination) {
      page
      total
      total_pages
      data {
        id
        postId
        slug
        content
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;
const USER_COMMENTS = gql`
  query userComments($pagination: PaginationInputType!) {
    userComments(pagination: $pagination) {
      page
      per_page
      total
      data {
        id
        post {
          postId
        }
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
          createdAt
        }
        createdAt
      }
    }
  }
`;
const USER_PUBLIC_POSTS = gql`
  query userPublicPosts($pagination: PaginationInputType!, $user: String!) {
    userPublicPosts(pagination: $pagination, user: $user) {
      page
      total
      total_pages
      data {
        id
        postId
        slug
        content
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;
const USER_PUBLIC_COMMENTS = gql`
  query userPublicComments($pagination: PaginationInputType!, $user: String!) {
    userPublicComments(pagination: $pagination, user: $user) {
      page
      per_page
      total
      data {
        id
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
          createdAt
        }
        post {
          postId
        }
        createdAt
      }
    }
  }
`;
const DELETE_POST = gql`
  mutation deletePost($post: String!){
    deletePost(post: $post)
  }
`;
const _sfc_main$l = defineComponent({
  components: { DialogModal },
  props: { loginPopup: Boolean },
  data: () => ({ loadingAuth: false }),
  methods: {
    async loginFb() {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider).then(async (result) => {
        this.$apollo.mutate({
          mutation: SOCIAL_LOGIN,
          variables: {
            input: result.user.accessToken
          }
        }).then(({ data: { socialMediaLoginGoogle } }) => {
          console.log("Logged In", socialMediaLoginGoogle);
          this.$store.commit("SET_LOGGEDIN", true);
          this.$store.commit("SET_USER", socialMediaLoginGoogle.user);
          this.$emit("loggedin");
        }).finally(() => {
          this.$store.state.loading = false;
          this.loadingAuth = false;
          this.$store.commit("SET_LOGIN_POP", false);
          this.$store.commit("SET_MAIN_POP", false);
        });
      }).catch((error) => {
        console.warn(error);
      });
    },
    async loginG() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(async (result) => {
        console.log("Result", result);
        this.$apollo.mutate({
          mutation: SOCIAL_LOGIN,
          variables: {
            input: result.user.accessToken
          }
        }).then(({ data: { socialMediaLoginGoogle } }) => {
          console.log("Logged In", socialMediaLoginGoogle);
          this.$store.commit("SET_LOGGEDIN", true);
          this.$store.commit("SET_USER", socialMediaLoginGoogle.user);
          this.$emit("loggedin");
        }).finally(() => {
          this.$store.state.loading = false;
          this.loadingAuth = false;
          this.$store.commit("SET_LOGIN_POP", false);
          this.$store.commit("SET_MAIN_POP", false);
        });
      }).catch((error) => {
        console.warn(error);
      });
    }
  }
});
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_dialog_modal = resolveComponent("dialog-modal");
  const _component_router_link = resolveComponent("router-link");
  const _component_fa = resolveComponent("fa");
  _push(ssrRenderComponent(_component_dialog_modal, mergeProps({ show: _ctx.loginPopup }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${ssrRenderAttrs(mergeProps({ class: "lg:w-96 xl:w-96 md:lg:w-96 z-0" }, _attrs))}${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-4xl xl:text-5xl lg:text-5xl text-white"${_scopeId2}> Login / Register </p><div class="flex flex-col justify-center items-center gap-3 pt-4"${_scopeId2}><button type="button" class="text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_fa, {
                icon: ["fab", "fa-facebook"],
                class: "text-3xl"
              }, null, _parent3, _scopeId2));
              _push3(`<p${_scopeId2}>Sign in with Facebook</p></button><button type="button" class="text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_fa, {
                icon: ["fab", "fa-google"],
                class: "text-3xl"
              }, null, _parent3, _scopeId2));
              _push3(`<p${_scopeId2}>Sign in with Google</p></button></div>`);
            } else {
              return [
                createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, " Login / Register "),
                createVNode("div", { class: "flex flex-col justify-center items-center gap-3 pt-4" }, [
                  createVNode("button", {
                    onClick: _ctx.loginFb,
                    type: "button",
                    class: "text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
                  }, [
                    createVNode(_component_fa, {
                      icon: ["fab", "fa-facebook"],
                      class: "text-3xl"
                    }),
                    createVNode("p", null, "Sign in with Facebook")
                  ], 8, ["onClick"]),
                  createVNode("button", {
                    onClick: _ctx.loginG,
                    type: "button",
                    class: "text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
                  }, [
                    createVNode(_component_fa, {
                      icon: ["fab", "fa-google"],
                      class: "text-3xl"
                    }),
                    createVNode("p", null, "Sign in with Google")
                  ], 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(Transition, { name: "slide-fade" }, {
            default: withCtx(() => [
              createVNode("div", { class: "lg:w-96 xl:w-96 md:lg:w-96 z-0" }, [
                createVNode(_component_router_link, { to: "/" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, " Login / Register "),
                    createVNode("div", { class: "flex flex-col justify-center items-center gap-3 pt-4" }, [
                      createVNode("button", {
                        onClick: _ctx.loginFb,
                        type: "button",
                        class: "text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
                      }, [
                        createVNode(_component_fa, {
                          icon: ["fab", "fa-facebook"],
                          class: "text-3xl"
                        }),
                        createVNode("p", null, "Sign in with Facebook")
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: _ctx.loginG,
                        type: "button",
                        class: "text-white rounded-full flex items-center justify-center gap-3 w-full bg-gradient-to-r from-red-500 via-red-600 to-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium py-2.5 text-center mr-2 mb-2"
                      }, [
                        createVNode(_component_fa, {
                          icon: ["fab", "fa-google"],
                          class: "text-3xl"
                        }),
                        createVNode("p", null, "Sign in with Google")
                      ], 8, ["onClick"])
                    ])
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LoginPopup.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
var LoginPopup = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l]]);
var _imports_0$1 = "./assets/final.baddaad2.svg";
const _sfc_main$k = defineComponent$1({
  setup() {
  }
});
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<nav${ssrRenderAttrs(mergeProps({
    class: "h-16 fixed w-full top-0 z-50",
    style: { "box-sizing": "content-box", "background": "#5fe18c" }
  }, _attrs))}><div class="flex flex-row text-center md:text-left xl:text-left lg:text-left justify-between"><div class="flex">`);
  _push(ssrRenderComponent(_component_router_link, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-row"${_scopeId}><img${ssrRenderAttr("src", _imports_0$1)} alt="" style="${ssrRenderStyle({ "-webkit-transform": "scaleX(-1)", "transform": "scaleX(-1)" })}" class="w-12 h-12 ml-3 md:ml-10 lg:ml-10 xl:ml-10 my-3 block"${_scopeId}><p class="text-white font-black text-3xl tracking-widest pt-4 pr-5"${_scopeId}> \u1328\u12CB\u1273 </p></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-row" }, [
            createVNode("img", {
              src: _imports_0$1,
              alt: "",
              style: { "-webkit-transform": "scaleX(-1)", "transform": "scaleX(-1)" },
              class: "w-12 h-12 ml-3 md:ml-10 lg:ml-10 xl:ml-10 my-3 block"
            }),
            createVNode("p", { class: "text-white font-black text-3xl tracking-widest pt-4 pr-5" }, " \u1328\u12CB\u1273 ")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="flex flex-row mx-2">`);
  if (_ctx.$store.state.loggedIn) {
    _push(`<div class="rounded-xl mb-4 mt-2 bg-transparent">`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/notification",
      class: "ont-black"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 m-2 text-white" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"${_scopeId}></path></svg>`);
        } else {
          return [
            (openBlock(), createBlock("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-8 w-8 m-2 text-white",
              viewBox: "0 0 20 20",
              fill: "currentColor"
            }, [
              createVNode("path", { d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" })
            ]))
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<div><button class="p- bg-white rounded-xl mx-5 mt-3 py-2 px-3 ring-2 hover:bg-green-100 ring-green-500"> Login </button></div>`);
  }
  if (_ctx.$store.state.user) {
    _push(`<div class="p-3 cursor-pointer"><img${ssrRenderAttr("src", _ctx.$store.state.user.photo)} class="w-10 h-10 rounded-full ring-2 ring-green-600"></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></nav>`);
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navbar.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
var Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k]]);
const _sfc_main$j = defineComponent({
  components: { DialogModal },
  props: { profileClicked: Boolean }
});
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_dialog_modal = resolveComponent("dialog-modal");
  const _component_router_link = resolveComponent("router-link");
  _push(ssrRenderComponent(_component_dialog_modal, mergeProps({ show: _ctx.profileClicked }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col w-full gap-3"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-4xl xl:text-5xl lg:text-5xl text-white"${_scopeId2}>More</p>`);
            } else {
              return [
                createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, "More")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<button style="${ssrRenderStyle({ "opacity": "12px" })}" class="rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"${_scopeId}><div class="flex items-center justify-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"${_scopeId}></path></svg><span${_scopeId}> Meme/ Story</span></div></button><button style="${ssrRenderStyle({ "opacity": "12px" })}" class="rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"${_scopeId}><div class="flex items-center justify-center gap-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"${_scopeId}></path></svg><span${_scopeId}>Logout</span></div></button></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col w-full gap-3" }, [
            createVNode(_component_router_link, { to: "/" }, {
              default: withCtx(() => [
                createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, "More")
              ]),
              _: 1
            }),
            createVNode("button", {
              onClick: ($event) => _ctx.$emit("showpost"),
              style: { "opacity": "12px" },
              class: "rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"
            }, [
              createVNode("div", { class: "flex items-center justify-center gap-2" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-8 h-8"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  })
                ])),
                createVNode("span", null, " Meme/ Story")
              ])
            ], 8, ["onClick"]),
            createVNode("button", {
              onClick: ($event) => _ctx.$emit("logout"),
              style: { "opacity": "12px" },
              class: "rounded-lg w-full font-semibold hover:bg-green-700 text-white p-3 xl:text-xl lg:text-md text-xl"
            }, [
              createVNode("div", { class: "flex items-center justify-center gap-2" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "1.5",
                  stroke: "currentColor",
                  class: "w-8 h-8"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  })
                ])),
                createVNode("span", null, "Logout")
              ])
            ], 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AccountPopup.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var AccountPopup = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j]]);
const _sfc_main$i = defineComponent({
  components: { LoginPopup, Navbar, AccountPopup, Head },
  data: () => ({
    loginPopup: false,
    profileClicked: false
  }),
  methods: {
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    cleanStates() {
      this.$store.commit("SET_LOGGEDIN", false);
      this.$store.commit("SET_USER", null);
      this.$store.commit("SET_PROFILE_POP", false);
      this.$store.commit("SET_LOGIN_POP", false);
      this.$store.commit("SET_MAIN_POP", false);
    },
    showPostDialog() {
      this.$store.commit("SET_PROFILE_POP", false);
      this.$store.commit("SET_LOGIN_POP", false);
      this.menuClicked();
      this.$router.push("/");
    },
    async logout() {
      this.cleanStates();
      const auth = getAuth$1();
      await this.$apollo.mutate({ mutation: LOGOUT });
      signOut(auth).then(() => {
        window.location.assign("/");
      }).catch((error) => {
      });
    }
  }
});
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_login_popup = resolveComponent("login-popup");
  const _component_account_popup = resolveComponent("account-popup");
  const _component_navbar = resolveComponent("navbar");
  const _component_router_view = resolveComponent("router-view");
  _push(`<main${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_login_popup, {
    loginPopup: _ctx.$store.state.loginPopup
  }, null, _parent));
  _push(ssrRenderComponent(_component_account_popup, {
    profileClicked: _ctx.$store.state.profilePopup
  }, null, _parent));
  _push(ssrRenderComponent(_component_navbar, null, null, _parent));
  _push(ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i]]);
const _sfc_main$h = defineComponent$1({
  setup() {
  },
  props: ["count", "vote", "voted", "large", "color", "dark", "readonly"]
});
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-2" }, _attrs))}>`);
  if (!_ctx.readonly) {
    _push(`<div class="${ssrRenderClass([{
      "hover:bg-green-500": !_ctx.color,
      "w-8 h-6 text-lg": !_ctx.large,
      "bg-green-200 text-green-400": !_ctx.vote && _ctx.voted,
      "bg-green-500 text-white": _ctx.vote && _ctx.voted,
      "bg-green-100 text-green-400": !_ctx.voted && !_ctx.vote,
      "w-10 h-8 text-xl p-1": _ctx.large
    }, "duration-300 transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-t-full"])}"> ++ </div>`);
  } else {
    _push(`<div class="${ssrRenderClass([{
      "hover:bg-green-500": !_ctx.color,
      "w-8 h-6 text-lg": !_ctx.large,
      "bg-green-200 text-green-400": !_ctx.vote && _ctx.voted,
      "bg-green-500 text-white": _ctx.vote && _ctx.voted,
      "bg-green-100 text-green-400": !_ctx.voted && !_ctx.vote,
      "w-10 h-8 text-xl p-1": _ctx.large
    }, "duration-300 transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-t-full"])}"> ++ </div>`);
  }
  _push(`<p class="${ssrRenderClass([{ "text-white": _ctx.dark, "text-gray-600": !_ctx.dark, "py-1": _ctx.large }, "text-center text-lg"])}">${ssrInterpolate(_ctx.count)}</p>`);
  if (!_ctx.readonly) {
    _push(`<div class="${ssrRenderClass([{
      "hover:bg-green-500": !_ctx.color,
      "w-8 h-6 text-lg": !_ctx.large,
      "bg-green-500 text-green-200": !_ctx.vote && _ctx.voted,
      "bg-green-200 text-green-400": _ctx.vote && _ctx.voted,
      "bg-green-100 text-green-400": !_ctx.voted && !_ctx.vote,
      "w-10 h-8 text-xl p-1": _ctx.large
    }, "duration-300 text-xl transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-b-full"])}"> -- </div>`);
  } else {
    _push(`<div class="${ssrRenderClass([{
      "hover:bg-green-500": !_ctx.color,
      "w-8 h-6 text-lg": !_ctx.large,
      "bg-green-500 text-green-200": !_ctx.vote && _ctx.voted,
      "bg-green-200 text-green-400": _ctx.vote && _ctx.voted,
      "bg-green-100 text-green-400": !_ctx.voted && !_ctx.vote,
      "w-10 h-8 text-xl p-1": _ctx.large
    }, "duration-300 text-xl transition ease-in-out delay-75 font-semibold text-center cursor-pointer rounded-b-full"])}"> -- </div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/VoteClickers.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
var VoteClickers = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h]]);
var Loader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$g = defineComponent({
  props: {
    dark: Boolean
  }
});
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    class: { loader: !_ctx.dark, "loader-dark": _ctx.dark }
  }, _attrs))} data-v-85933e5c></span>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Loader.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
var Loader = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g], ["__scopeId", "data-v-85933e5c"]]);
const _sfc_main$f = defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  setup() {
  },
  props: ["post", "count"]
});
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_vote_clickers = resolveComponent("vote-clickers");
  const _component_vue_load_image = resolveComponent("vue-load-image");
  const _component_loader = resolveComponent("loader");
  _push(ssrRenderComponent(_component_router_link, mergeProps({
    to: `/game/${_ctx.post.id}`,
    class: "flex flex-row mt-4 hover:bg-gray-50 cursor-pointer"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_vote_clickers, {
          count: _ctx.post.likes
        }, null, _parent2, _scopeId));
        _push2(`<div class="mx-3"${_scopeId}><p class="tracking-wide text-gray-600 text-lg"${_scopeId}>${ssrInterpolate(_ctx.post.content)}</p>`);
        _push2(ssrRenderComponent(_component_vue_load_image, null, {
          image: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.post.cover) {
                _push3(`<img${ssrRenderAttr("src", _ctx.post.cover)} alt="" style="${ssrRenderStyle({ "object-fit": "contain" })}"${_scopeId2}>`);
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                _ctx.post.cover ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: _ctx.post.cover,
                  alt: "",
                  style: { "object-fit": "contain" }
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ];
            }
          }),
          preloader: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_loader, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_loader)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_vote_clickers, {
            count: _ctx.post.likes
          }, null, 8, ["count"]),
          createVNode("div", { class: "mx-3" }, [
            createVNode("p", {
              class: "tracking-wide text-gray-600 text-lg",
              textContent: toDisplayString(_ctx.post.content)
            }, null, 8, ["textContent"]),
            createVNode(_component_vue_load_image, null, {
              image: withCtx(() => [
                _ctx.post.cover ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: _ctx.post.cover,
                  alt: "",
                  style: { "object-fit": "contain" }
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ]),
              preloader: withCtx(() => [
                createVNode(_component_loader)
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FeedTile.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
var FeedTile = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f]]);
var _imports_0 = "./assets/soccer-ball.3f469443.png";
var GroundMeda_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$e = defineComponent$1({
  props: {
    hideBall: Boolean
  }
});
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-ee096a8a>`);
  if (!_ctx.hideBall) {
    _push(`<button class="shadow-2xl xl:block lg:block md:block ball" data-v-ee096a8a><img class="shadow-2xl"${ssrRenderAttr("src", _imports_0)} alt="" data-v-ee096a8a></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<nav class="bg-gradient-to-t from-green-200 to-tranparent text-white" style="${ssrRenderStyle({ "position": "fixed", "width": "100%", "height": "60px", "bottom": "1px", "color": "#fff", "text-align": "center" })}" data-v-ee096a8a></nav></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/GroundMeda.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
var GroundMeda = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e], ["__scopeId", "data-v-ee096a8a"]]);
const state = {
  showMainDialog: false,
  profilePopup: false,
  loggedIn: false,
  loginPopup: false,
  user: null
};
const mutations = {
  ["SET_USER"](state2, data) {
    state2.user = data;
  },
  ["SET_LOGGEDIN"](state2, value) {
    state2.loggedIn = value;
  },
  ["SET_MAIN_POP"](state2, value) {
    state2.showMainDialog = value;
  },
  ["SET_LOGIN_POP"](state2, value) {
    state2.loginPopup = value;
  },
  ["SET_PROFILE_POP"](state2, value) {
    state2.profilePopup = value;
  }
};
const store = createStore({
  plugins: [createPersistedState()],
  state,
  mutations
});
const config = {
  apiKey: "AIzaSyDQV6SMwJk91fFuZGewlyvJHNcxyYTUxqQ",
  authDomain: "moyats-60dfd.firebaseapp.com",
  databaseURL: "https://moyats-60dfd-default-rtdb.firebaseio.com",
  projectId: "moyats-60dfd",
  storageBucket: "moyats-60dfd.appspot.com",
  messagingSenderId: "960557736635",
  appId: "1:960557736635:web:2b65cedfa4b794e1383f9e",
  measurementId: "G-G7RHL9H6J3"
};
const app$1 = initializeApp(config);
const db = getFirestore(app$1);
const messaging = getMessaging(app$1);
const setupFirebase = () => {
  navigator.serviceWorker.register("/firebase-messaging-sw.js").then((registration) => {
    console.log("Registration", registration);
  }).catch((err) => {
    console.log(err);
  });
  getToken(messaging, {
    vapidKey: "BBWn7Fkrmhrj0BkeKLiYcD5VhagQg4zlrW-QtpC0VpuPGiPVTK6nleZMNrmo4U0qUSgM48esnt_hAv1vOSivkUk"
  }).then(async (currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      if (store.state.loggedIn) {
        const uid = store.state.user.uid;
        const userQry = query(collection(db, "users"), where("id", "==", uid));
        const userSnap = await getDocs(userQry);
        if (!userSnap.empty) {
          updateDoc(userSnap.docs[0].ref, {
            pushToken: currentToken
          });
        }
      }
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  }).catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
};
const _sfc_main$d = defineComponent({
  components: { VoteClickers, "vue-load-image": VueLoadImage, Loader },
  data: () => ({
    voteData: { vote: null, voted: null },
    initialVote: 0,
    postRef: null
  }),
  props: ["post", "count", "readonly", "compKey"],
  async created() {
    this.initialVote = this.post.likes;
    if (this.$store.state.loggedIn) {
      await this.fetchVotes();
    }
  },
  methods: {
    async fetchVotes() {
      const {
        data: { getPostVote }
      } = await this.$apollo.query({
        query: GET_POST_VOTES,
        fetchPolicy: "network-only",
        variables: { post: this.post.postId }
      });
      this.voteData = {
        vote: getPostVote.vote,
        voted: getPostVote.voted
      };
      const voteFlag = this.voteData.vote == 1;
      if (this.voteData.voted && voteFlag) {
        this.initialVote = this.post.likes - 1;
      } else if (this.voteData.voted && !voteFlag) {
        this.initialVote = this.post.likes + 1;
      } else {
        this.initialVote = this.post.likes;
      }
    },
    async setVote(vote) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote,
            type: "post",
            entityId: this.post.postId
          }
        }
      });
      if (vote == 1) {
        this.post.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.post.likes = this.initialVote - 1;
      } else {
        this.post.likes = this.initialVote;
      }
    },
    async setRef() {
      const q = query$1(collection$1(db, "posts"), where$1("id", "==", this.post.id));
      const querySnapshot = await getDocs$1(q);
      this.postRef = querySnapshot.docs[0].ref;
    },
    async removeVote() {
      this.post.likes = this.initialVote;
      this.voteData.voted = false;
      this.voteData.vote = 0;
      this.setVote(0);
    },
    async upvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == 1) {
          this.removeVote();
          return;
        } else {
          this.voteData.voted = true;
          this.voteData.vote = 1;
          this.setVote(1);
          return;
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async downvoted() {
      console.log("downvoted");
      if (this.$store.state.user) {
        if (this.voteData.vote == -1) {
          this.removeVote();
        } else {
          this.voteData.voted = true;
          this.voteData.vote = -1;
          this.setVote(-1);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    }
  }
});
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_vote_clickers = resolveComponent("vote-clickers");
  const _component_vue_load_image = resolveComponent("vue-load-image");
  const _component_loader = resolveComponent("loader");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row mt-4 hover:bg-gray-50 relative xl:p-2 lg:p-2 md:p-2" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_vote_clickers, {
    readonly: _ctx.readonly,
    voted: _ctx.voteData.voted,
    vote: _ctx.voteData.vote == 1,
    large: false,
    count: _ctx.post.likes,
    color: "#92daac",
    class: "mt-5"
  }, null, _parent));
  _push(`<div class="mx-3 pt-2 cursor-pointer w-full"><p class="${ssrRenderClass([{ "py-2": _ctx.post.cover, "pt-5": !_ctx.post.cover }, "px-2 tracking-wide text-gray-600 text-lg"])}">${ssrInterpolate(_ctx.post.content)}</p>`);
  _push(ssrRenderComponent(_component_vue_load_image, { key: _ctx.compKey }, {
    image: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.post.cover) {
          _push2(`<img${ssrRenderAttr("src", _ctx.post.cover)} alt="" style="${ssrRenderStyle({ "object-fit": "contain" })}"${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.post.cover ? (openBlock(), createBlock("img", {
            key: 0,
            src: _ctx.post.cover,
            alt: "",
            style: { "object-fit": "contain" }
          }, null, 8, ["src"])) : createCommentVNode("", true)
        ];
      }
    }),
    preloader: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_loader, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_loader)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PostTile.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
var PostTile = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d]]);
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = defineComponent({
  name: "HomePage",
  components: {
    Navbar,
    GroundMeda,
    FeedTile,
    DialogModal,
    Loader,
    LoginPopup,
    AccountPopup,
    InfiniteScroll,
    PostTile
  },
  data: () => ({
    loadingFeed: false,
    showModal: false,
    loginPopup: false,
    content: "",
    message: "",
    uploadedUrl: null,
    noResult: false,
    page: 1,
    progress: 0,
    formData: null,
    totalCount: 0,
    invalidImage: false,
    showMainDialog: false,
    showForm: false,
    loadingPost: false,
    showFormx: false,
    loadComplete: false,
    limit: 10,
    preset: "c4o7elzd",
    loaded: false,
    filename: null,
    file: null,
    pagination: {
      page: 1,
      pageSize: 3
    },
    posts: [],
    lastSnapshot: null
  }),
  async mounted() {
    console.log("Test");
    try {
      onMessage(messaging, (payload) => {
        console.info("Message received : ", payload);
      });
    } catch (e) {
      console.error("Error : ", e);
    }
    await this.loadFeed();
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    async handleScroll(e) {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        if (this.totalCount) {
          this.pagination.page++;
          const totalCount = await this.loadFeed();
          console.log("load more", totalCount);
        }
      }
    },
    menuClicked() {
      if (this.$store.state.loggedIn) {
        this.$store.commit("SET_MAIN_POP", true);
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async loadMoreFeed() {
      this.page++;
      console.log(this.page);
      await this.loadFeed();
    },
    async loadFeed() {
      this.loadingFeed = true;
      const {
        data: {
          getPosts: { data, total }
        }
      } = await this.$apollo.query({
        query: GET_POSTS,
        fetchPolicy: "network-only",
        variables: {
          input: this.pagination
        }
      }).finally(() => {
        this.loadingFeed = false;
      });
      this.totalCount = data.length;
      const posts = JSON.parse(JSON.stringify(data));
      posts.forEach((p) => {
        this.posts.push(p);
      });
    },
    clickFileRef() {
      this.$refs.file.click();
    },
    checkFile(e) {
      var file_list = e.target.files;
      let txt = "";
      let error = false;
      const file = file_list[0];
      var sFileName = file.name;
      var sFileExtension = sFileName.split(".")[sFileName.split(".").length - 1].toLowerCase();
      var iFileSize = file.size;
      (file.size / 1048576).toFixed(2);
      const allowed = ["webp", "jpg", "jpeg", "png", "gif"];
      if (!allowed.includes(sFileExtension) || iFileSize > 2485760) {
        txt += "Please make sure your file is in image format and less than 2 MB.\n\n";
        error = true;
        this.invalidImage = true;
      }
      return { txt, error };
    },
    uploaded(e) {
      const { txt, error } = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.file = e.target.files[0];
      this.filename = e.target.files[0].name;
      this.prepareFormData();
    },
    cancelPost() {
      this.showFormx = false;
      setTimeout(() => {
        this.showForm = false;
      }, 250);
    },
    closeDialog() {
      this.showForm = false;
      this.showFormx = false;
      this.$store.commit("SET_MAIN_POP", false);
    },
    animateForm() {
      this.showForm = true;
      setTimeout(() => {
        this.showFormx = true;
      }, 250);
    },
    clicked(post) {
      this.$router.push({ path: `/game/${post.postId}` });
    },
    async savePost(cover = null) {
      await this.$apollo.mutate({
        mutation: ADD_POST,
        variables: {
          input: {
            content: this.content,
            cover
          }
        }
      }).then(({ data: { addPost } }) => {
        this.posts.unshift(addPost);
      }).finally(() => {
        this.loadingPost = false;
        this.closeDialog();
      });
    },
    async post() {
      if (this.invalidImage) {
        alert("Invalid file size and format: make sure it's below 2mb");
        return;
      }
      if (this.content == "") {
        alert("Message can't be empty");
        return;
      }
      this.loadingPost = true;
      const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
      const { data } = await axios({
        url,
        method: "POST",
        data: this.formData,
        onUploadProgress: (e) => {
          this.progress = Math.round(e.loaded * 100 / e.total);
        }
      });
      await this.savePost(data.secure_url);
    }
  }
});
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_login_popup = resolveComponent("login-popup");
  const _component_dialog_modal = resolveComponent("dialog-modal");
  const _component_loader = resolveComponent("loader");
  const _component_router_link = resolveComponent("router-link");
  const _component_post_tile = resolveComponent("post-tile");
  const _component_ground_meda = resolveComponent("ground-meda");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))} data-v-a3c4611c>`);
  _push(ssrRenderComponent(_component_login_popup, {
    loginPopup: _ctx.$store.state.loginPopup
  }, null, _parent));
  _push(ssrRenderComponent(_component_dialog_modal, {
    show: _ctx.$store.state.showMainDialog
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="px-2 relative w-full" data-v-a3c4611c${_scopeId}>`);
        if (_ctx.loadingPost) {
          _push2(`<div class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50" data-v-a3c4611c${_scopeId}><div class="flex flex-col mt-32 justify-center items-center" data-v-a3c4611c${_scopeId}><p class="text-xl font-bold text-white tracking-wider" data-v-a3c4611c${_scopeId}> Loading... </p>`);
          _push2(ssrRenderComponent(_component_loader, { dark: true }, null, _parent2, _scopeId));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (!_ctx.showForm) {
          _push2(`<div${ssrRenderAttrs(mergeProps({ class: "lg:w-96 xl:w-96 md:lg:w-96 z-0" }, _attrs))} data-v-a3c4611c${_scopeId}>`);
          _push2(ssrRenderComponent(_component_router_link, {
            to: "/",
            style: { filter: _ctx.loadingPost ? "blur(8px)" : "" }
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<p class="${ssrRenderClass([{ "opacity-40": _ctx.loadingPost }, "text-4xl xl:text-5xl lg:text-5xl text-white"])}" data-v-a3c4611c${_scopeId2}> \u12A0\u12F2\u1235 \u1328\u12CB\u1273 </p>`);
              } else {
                return [
                  createVNode("p", {
                    class: ["text-4xl xl:text-5xl lg:text-5xl text-white", { "opacity-40": _ctx.loadingPost }]
                  }, " \u12A0\u12F2\u1235 \u1328\u12CB\u1273 ", 2)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
          _push2(`<button style="${ssrRenderStyle({ "opacity": "12px" })}" class="bg-green-600 rounded-lg mt-5 w-full font-bold text-white p-16 xl:text-2xl lg:text-2xl text-xl" data-v-a3c4611c${_scopeId}><p style="${ssrRenderStyle({ filter: _ctx.loadingPost ? "blur(8px)" : "" })}" class="${ssrRenderClass({ "opacity-40": _ctx.loadingPost })}" data-v-a3c4611c${_scopeId}> Meme / Story </p></button><button class="w-full bg-yellow-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" data-v-a3c4611c${_scopeId}><p style="${ssrRenderStyle({ filter: _ctx.loadingPost ? "blur(8px)" : "" })}" class="${ssrRenderClass({ "opacity-40": _ctx.loadingPost })}" data-v-a3c4611c${_scopeId}> Sport Rant </p></button><button class="w-full bg-red-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" data-v-a3c4611c${_scopeId}><p style="${ssrRenderStyle({ filter: _ctx.loadingPost ? "blur(8px)" : "" })}" class="${ssrRenderClass({ "opacity-40": _ctx.loadingPost })}" data-v-a3c4611c${_scopeId}> Random Shit </p></button></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.showFormx) {
          _push2(`<div${ssrRenderAttrs(mergeProps({
            class: ["w-full relative", { "opacity-70": _ctx.loadingPost }],
            style: { filter: _ctx.loadingPost ? "blur(2px)" : "" }
          }, _attrs))} data-v-a3c4611c${_scopeId}><p class="text-4xl xl:text-5xl lg:text-5xl text-white" data-v-a3c4611c${_scopeId}>Post Here</p><textarea class="form-control rounded-b-none block w-full h-44 resize-none border-none px-3 mt-5 text-xl py-1.5 font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea1" rows="3" placeholder="Your post starts here ..." data-v-a3c4611c${_scopeId}>${ssrInterpolate(_ctx.content)}</textarea><div class="w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white" data-v-a3c4611c${_scopeId}><input type="file" class="hidden" accept="image/png, image/gif, image/jpeg" data-v-a3c4611c${_scopeId}><p data-v-a3c4611c${_scopeId}>5000</p><button data-v-a3c4611c${_scopeId}>`);
          if (!_ctx.filename) {
            _push2(`<span data-v-a3c4611c${_scopeId}>Attach Img/Gif</span>`);
          } else {
            _push2(`<span data-v-a3c4611c${_scopeId}>${ssrInterpolate(_ctx.filename)}</span>`);
          }
          _push2(`</button></div><button class="bg-green-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" data-v-a3c4611c${_scopeId}><p data-v-a3c4611c${_scopeId}>Post</p></button><button class="bg-red-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" data-v-a3c4611c${_scopeId}><p data-v-a3c4611c${_scopeId}>Cancel</p></button></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "px-2 relative w-full" }, [
            _ctx.loadingPost ? (openBlock(), createBlock("div", {
              key: 0,
              class: "h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
            }, [
              createVNode("div", { class: "flex flex-col mt-32 justify-center items-center" }, [
                createVNode("p", { class: "text-xl font-bold text-white tracking-wider" }, " Loading... "),
                createVNode(_component_loader, { dark: true })
              ])
            ])) : createCommentVNode("", true),
            createVNode(Transition, { name: "slide-fade" }, {
              default: withCtx(() => [
                !_ctx.showForm ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "lg:w-96 xl:w-96 md:lg:w-96 z-0"
                }, [
                  createVNode(_component_router_link, {
                    to: "/",
                    style: { filter: _ctx.loadingPost ? "blur(8px)" : "" }
                  }, {
                    default: withCtx(() => [
                      createVNode("p", {
                        class: ["text-4xl xl:text-5xl lg:text-5xl text-white", { "opacity-40": _ctx.loadingPost }]
                      }, " \u12A0\u12F2\u1235 \u1328\u12CB\u1273 ", 2)
                    ]),
                    _: 1
                  }, 8, ["style"]),
                  createVNode("button", {
                    style: { "opacity": "12px" },
                    onClick: _ctx.animateForm,
                    class: "bg-green-600 rounded-lg mt-5 w-full font-bold text-white p-16 xl:text-2xl lg:text-2xl text-xl"
                  }, [
                    createVNode("p", {
                      style: { filter: _ctx.loadingPost ? "blur(8px)" : "" },
                      class: { "opacity-40": _ctx.loadingPost }
                    }, " Meme / Story ", 6)
                  ], 8, ["onClick"]),
                  createVNode("button", { class: "w-full bg-yellow-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" }, [
                    createVNode("p", {
                      style: { filter: _ctx.loadingPost ? "blur(8px)" : "" },
                      class: { "opacity-40": _ctx.loadingPost }
                    }, " Sport Rant ", 6)
                  ]),
                  createVNode("button", { class: "w-full bg-red-600 rounded-lg mt-3 font-bold text-white px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl" }, [
                    createVNode("p", {
                      style: { filter: _ctx.loadingPost ? "blur(8px)" : "" },
                      class: { "opacity-40": _ctx.loadingPost }
                    }, " Random Shit ", 6)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(Transition, { name: "slide-form" }, {
              default: withCtx(() => [
                _ctx.showFormx ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ["w-full relative", { "opacity-70": _ctx.loadingPost }],
                  style: { filter: _ctx.loadingPost ? "blur(2px)" : "" }
                }, [
                  createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, "Post Here"),
                  withDirectives(createVNode("textarea", {
                    class: "form-control rounded-b-none block w-full h-44 resize-none border-none px-3 mt-5 text-xl py-1.5 font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none",
                    id: "exampleFormControlTextarea1",
                    rows: "3",
                    "onUpdate:modelValue": ($event) => _ctx.content = $event,
                    placeholder: "Your post starts here ..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, _ctx.content]
                  ]),
                  createVNode("div", { class: "w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white" }, [
                    createVNode("input", {
                      type: "file",
                      onChange: _ctx.uploaded,
                      class: "hidden",
                      ref: "file",
                      accept: "image/png, image/gif, image/jpeg"
                    }, null, 40, ["onChange"]),
                    createVNode("p", null, "5000"),
                    createVNode("button", { onClick: _ctx.clickFileRef }, [
                      !_ctx.filename ? (openBlock(), createBlock("span", { key: 0 }, "Attach Img/Gif")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.filename), 1))
                    ], 8, ["onClick"])
                  ]),
                  createVNode("button", {
                    onClick: _ctx.post,
                    class: "bg-green-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
                  }, [
                    createVNode("p", null, "Post")
                  ], 8, ["onClick"]),
                  createVNode("button", {
                    onClick: _ctx.cancelPost,
                    class: "bg-red-600 rounded-lg mt-3 font-bold text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
                  }, [
                    createVNode("p", null, "Cancel")
                  ], 8, ["onClick"])
                ], 6)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex flex-row justify-center gap-10 mt-24" data-v-a3c4611c>`);
  if (_ctx.$store.state.loggedIn) {
    _push(`<div class="w-1/6 mt-2 hidden lg:block xl:block md:block" data-v-a3c4611c><h1 class="text-gray-500 text-2xl font-semibold tracking-widest" data-v-a3c4611c> Welcome to Chewata </h1><p class="font-normal text-gray-400 text-lg" data-v-a3c4611c> you can start posting by clicking the ball icon and just go around and like and enjoy. </p></div>`);
  } else {
    _push(`<div class="w-1/6 mt-2 hidden lg:block xl:block md:block" data-v-a3c4611c><h1 class="text-gray-500 text-2xl font-semibold tracking-widest" data-v-a3c4611c> Join Chewata </h1><p class="font-normal text-gray-400 text-lg" data-v-a3c4611c> Do all the things like ++ or -- rants, post your own rants, comment on others&#39; rants and just have fun. </p><button class="rounded-xl tracking-widest border-2 mt-2 p-2" data-v-a3c4611c> Sign Up </button></div>`);
  }
  _push(`<div class="w-full md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white p-2" data-v-a3c4611c><p class="text-2xl font-semibold tracking-wider text-gray-500" data-v-a3c4611c>Feed</p>`);
  if (_ctx.loadingFeed) {
    _push(`<div class="flex justify-center items-center mt-28" data-v-a3c4611c>`);
    _push(ssrRenderComponent(_component_loader, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList(_ctx.posts, (post, ix) => {
    _push(`<div class="mt-4" data-v-a3c4611c>`);
    _push(ssrRenderComponent(_component_post_tile, {
      compKey: post.postId,
      post
    }, null, _parent));
    _push(`<div class="mb-3 flex flex-row justify-end" data-v-a3c4611c><button class="px-2 mx-2" data-v-a3c4611c><div class="flex" data-v-a3c4611c><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-500 mt-1" viewBox="0 0 20 20" fill="currentColor" data-v-a3c4611c><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" data-v-a3c4611c></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" data-v-a3c4611c></path></svg><p class="text-green-500 mt-1 text-xl" data-v-a3c4611c>2</p></div></button></div><div class="border-t border-gray-200 w-full" data-v-a3c4611c></div></div>`);
  });
  _push(`<!--]-->`);
  if (_ctx.loadComplete) {
    _push(`<div class="text-center pb-32 pt-10" data-v-a3c4611c><p class="text-lg text-gray-400 font-semibold" data-v-a3c4611c>No More Posts</p></div>`);
  } else if (_ctx.loadingFeed && _ctx.posts.length) {
    _push(`<div class="flex justify-center my-10" data-v-a3c4611c>`);
    _push(ssrRenderComponent(_component_loader, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="w-1/6 mt-2 hidden lg:block xl:block" data-v-a3c4611c><h1 class="text-gray-500 px-2 pb-4 text-2xl font-semibold tracking-widest" data-v-a3c4611c> Top Tags </h1><div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-1" data-v-a3c4611c><!--[-->`);
  ssrRenderList(13, (x) => {
    _push(`<div class="rounded-md border-2 px-1 hover:border-green-500 duration-300 transition ease-in-out delay-75" data-v-a3c4611c><p class="text-gray-500 text-center text-sm hover:text-green-600 cursor-pointer duration-300 transition ease-in-out delay-75" data-v-a3c4611c> Soccer </p></div>`);
  });
  _push(`<!--]--></div></div></div>`);
  if (!_ctx.loadingFeed) {
    _push(ssrRenderComponent(_component_ground_meda, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Home.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c], ["__scopeId", "data-v-a3c4611c"]]);
var CommentMeda_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = defineComponent$1({
  props: {
    hide: Boolean
  },
  data: () => ({
    hideBall: false
  })
});
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-10" }, _attrs))} data-v-71babe14>`);
  if (!_ctx.hideBall) {
    _push(`<button class="ball bg-green-200 shadow-xl" data-v-71babe14><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 p-2 ml-1 text-green-600 bg-gray-200 rounded-full" viewBox="0 0 20 20" fill="currentColor" data-v-71babe14><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" data-v-71babe14></path></svg></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<nav class="bg-gradient-to-t from-green-400 to-tranparent text-white" style="${ssrRenderStyle({ "position": "fixed", "width": "100%", "height": "60px", "bottom": "1px", "color": "#fff", "text-align": "center" })}" data-v-71babe14></nav></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CommentMeda.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var CommentMeda = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b], ["__scopeId", "data-v-71babe14"]]);
const _sfc_main$a = defineComponent({
  props: ["img", "user", "path"]
});
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_router_link = resolveComponent("router-link");
  _push(ssrRenderComponent(_component_router_link, mergeProps({
    class: "relative inline-block z-0",
    to: (_a = _ctx.path) != null ? _a : "/user"
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="inline-block object-cover w-11 h-11 rounded-full"${ssrRenderAttr("src", _ctx.img)} alt="Profile image"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "inline-block object-cover w-11 h-11 rounded-full",
            src: _ctx.img,
            alt: "Profile image"
          }, null, 8, ["src"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UserAvatar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var UserAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$9 = defineComponent({
  components: { VoteClickers, UserAvatar },
  data: () => ({
    initialVote: 0,
    commentRef: null,
    voteData: { vote: null, voted: null }
  }),
  props: ["comment", "readonly"],
  async created() {
    if (this.$store.state.loggedIn) {
      this.fetchVotes();
    }
  },
  methods: {
    async fetchVotes() {
      const {
        data: { getCommentVote }
      } = await this.$apollo.query({
        query: GET_COMMENT_VOTES,
        variables: { comment: this.comment.commentId }
      });
      this.voteData = {
        vote: getCommentVote.vote,
        voted: getCommentVote.voted
      };
      const voteFlag = this.voteData.vote == 1;
      if (this.voteData.voted && voteFlag) {
        this.initialVote = this.comment.likes - 1;
      } else if (this.voteData.voted && !voteFlag) {
        this.initialVote = this.comment.likes + 1;
      } else {
        this.initialVote = this.comment.likes;
      }
      console.log(this.comment.likes);
    },
    async setRef() {
      const q = query$1(collection$1(db, "comments"), where$1("id", "==", this.comment.id));
      const querySnapshot = await getDocs$1(q);
      this.commentRef = querySnapshot.docs[0].ref;
    },
    async setVote(vote) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote,
            type: "comment",
            entityId: this.comment.commentId
          }
        }
      });
      if (vote == 1) {
        this.comment.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.comment.likes = this.initialVote - 1;
      } else {
        this.comment.likes = this.initialVote;
      }
    },
    async removeVote() {
      console.log("Remove me");
      this.comment.likes = this.initialVote;
      this.voteData.voted = false;
      this.voteData.vote = 0;
      this.setVote(0);
    },
    async upvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == 1) {
          this.removeVote();
          return;
        } else {
          this.voteData.voted = true;
          this.voteData.vote = 1;
          this.setVote(1);
          return;
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async downvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == -1) {
          this.removeVote();
        } else {
          this.voteData.voted = true;
          this.voteData.vote = -1;
          this.setVote(-1);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    }
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_vote_clickers = resolveComponent("vote-clickers");
  const _component_user_avatar = resolveComponent("user-avatar");
  const _component_vue_load_image = resolveComponent("vue-load-image");
  const _component_loader = resolveComponent("loader");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-row mt-4 gap-3 hover:bg-gray-50 p-2">`);
  _push(ssrRenderComponent(_component_vote_clickers, {
    voted: _ctx.voteData.voted,
    readonly: _ctx.readonly,
    vote: _ctx.voteData.vote == 1,
    large: false,
    count: _ctx.comment.likes
  }, null, _parent));
  _push(`<div><div class="flex flex-row mt-2">`);
  if (_ctx.$store.state.loggedIn) {
    _push(`<div>`);
    _push(ssrRenderComponent(_component_user_avatar, {
      img: _ctx.comment.user.photo,
      path: _ctx.$store.state.user.userId == _ctx.comment.user.userId ? "/user" : `/user/${_ctx.comment.user.userId}`,
      user: _ctx.comment.user
    }, null, _parent));
    _push(`</div>`);
  } else {
    _push(ssrRenderComponent(_component_user_avatar, {
      img: _ctx.comment.user.photo,
      path: "/",
      user: _ctx.comment.user
    }, null, _parent));
  }
  _push(`<div></div>`);
  if (_ctx.comment.user) {
    _push(`<div><p class="text-sm text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans">${ssrInterpolate(_ctx.comment.user.fullName)}</p><div class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500">${ssrInterpolate(_ctx.comment.user.totalLikes)}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><p class="pt-2 tracking-wide text-gray-600 text-lg">${ssrInterpolate(_ctx.comment.message)}</p>`);
  if (_ctx.$store.state.user) {
    _push(`<div>`);
    if (_ctx.$store.state.user.uid != _ctx.comment.user.id) {
      _push(`<button class="font-semibold text-sm text-gray-400"> Reply </button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<button class="font-semibold text-sm text-gray-400"> Reply </button>`);
  }
  _push(ssrRenderComponent(_component_vue_load_image, null, {
    image: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.comment.user.profile) {
          _push2(`<img${ssrRenderAttr("src", _ctx.comment.user.profile)} alt="" style="${ssrRenderStyle({ "object-fit": "contain" })}"${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.comment.user.profile ? (openBlock(), createBlock("img", {
            key: 0,
            src: _ctx.comment.user.profile,
            alt: "",
            style: { "object-fit": "contain" }
          }, null, 8, ["src"])) : createCommentVNode("", true)
        ];
      }
    }),
    preloader: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_loader, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_loader)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
  if (_ctx.comment.cover) {
    _push(`<img${ssrRenderAttr("src", _ctx.comment.cover)} alt="" style="${ssrRenderStyle({ "object-fit": "contain" })}">`);
  } else {
    _push(`<!---->`);
  }
  _push(`<hr class="mt-2"></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CommentTile.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var CommentTile = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9]]);
var LightGallery_vue_vue_type_style_index_0_lang = "";
const _sfc_main$8 = defineComponent({
  setup() {
  },
  data: () => ({
    windowWidth: window.innerWidth
  }),
  created() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    windowWidth() {
      return this.windowWidth;
    }
  },
  props: {
    showModal: Boolean
  }
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (_ctx.showModal) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask fixed top-0 left-0 mb-24 bg-opacity-70 bg-gray-700 w-full h-full z-50 overflow-visible flex" }, _attrs))}><div class="hidden xl:block"><button class="bg-gray-700 rounded-full m-5 p-1 h-8 w-8 text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="modal-body"><div class="block xl:hidden mb-15"><button class="bg-gray-700 rounded-full m-5 p-1 h-8 w-8 text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="hidden xl:block mt-2"></div><img src="https://pbs.twimg.com/media/FKDUMT9WQAYIcED?format=jpg&amp;name=large" class="m-auto block" alt="" style="${ssrRenderStyle({
      width: _ctx.windowWidth > 1600 ? "50%" : _ctx.windowWidth > 1400 ? "60%" : _ctx.windowWidth > 1280 ? "50%" : _ctx.windowWidth > 1200 ? "85%" : _ctx.windowWidth > 1025 ? "70%" : "80%"
    })}"><p class="text-center text-white">Image Caption Goes Here</p></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LightGallery.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var LightGallery = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$7 = defineComponent({
  components: { UserAvatar },
  setup() {
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_user_avatar = resolveComponent("user-avatar");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-10" }, _attrs))}><div class="flex flex-row">`);
  _push(ssrRenderComponent(_component_user_avatar, null, null, _parent));
  _push(`<div class="flex flex-row"><div><p class="text-gray-500 font-semibold px-2 pt-2">AmenAbe</p><p class="px-2 font-normal text-gray-500">Small excerpt...</p></div><div class="flex float-right"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 mt-1" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg><span class="font-semibold text-md text-gray-400 pt-1">12</span></div></div></div><img src="https://img.devrant.com/devrant/rant/r_438038_pnhMu.jpg" alt="" class="flex w-full h-2/6 mt-4"></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RelatedItems.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var RelatedItems = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
var GameLoader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$6 = defineComponent({
  props: {
    dark: Boolean
  }
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<span${ssrRenderAttrs(mergeProps({
    class: { loader: !_ctx.dark, "loader-dark": _ctx.dark }
  }, _attrs))} data-v-6fd9c10a></span>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/GameLoader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var GameLoader = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-6fd9c10a"]]);
const _sfc_main$5 = defineComponent({
  components: {
    VoteClickers,
    CommentTile,
    UserAvatar,
    RelatedItems,
    LightGallery,
    CommentMeda,
    DialogModal,
    GameLoader,
    Loader,
    Head,
    "vue-load-image": VueLoadImage
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.loading = true;
    console.log(this.$store.state);
    if (this.$store.state.loggedIn) {
      await this.getPostVote();
    }
    const {
      data: { getPost }
    } = await this.$apollo.query({
      query: POST,
      fetchPolicy: "network-only",
      variables: { post: this.$route.params.id }
    }).finally(() => {
      this.loading = true;
    });
    const voteFlag = this.voteData.vote == 1;
    this.post = JSON.parse(JSON.stringify(getPost));
    if (this.voteData.voted && voteFlag) {
      this.initialVote = getPost.likes - 1;
    } else if (this.voteData.voted && !voteFlag) {
      this.initialVote = getPost.likes + 1;
    } else {
      this.initialVote = getPost.likes;
    }
    this.loading = false;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data: () => ({
    comments: [],
    loadingPost: false,
    filename: "",
    content: "",
    uploadedUrl: null,
    invalidImage: false,
    loading: false,
    initialVote: 0,
    preset: "c4o7elzd",
    formData: null,
    postRef: null,
    lastIncremented: null,
    lastDecremented: null,
    file: null,
    post: null,
    loadingComments: false,
    showCommentForm: false,
    showModal: false,
    replyTarget: null,
    showSide: true,
    totalCount: 0,
    pagination: { page: 1, pageSize: 2 },
    voteData: { vote: null, voted: null }
  }),
  methods: {
    async handleScroll(e) {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        if (this.totalCount) {
          this.pagination.page++;
          const totalCount = await this.loadComments();
          console.log("load more", totalCount);
        }
      }
    },
    getCover() {
      const defualtcover = "http://yourwebsite.com/images/default-banner.png";
      return this.post.cover ? this.post.cover : defualtcover;
    },
    replyComment(com) {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
        this.replyTarget = com;
        this.content = `@${this.replyTarget.user.name}`;
        this.showCommentForm = true;
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async postComment() {
      if (this.content == "") {
        alert("Message can't be empty");
        return;
      }
      if (this.invalidImage) {
        alert("Invalid file size and format: make sure it's below 2mb");
        return;
      }
      this.loadingPost = true;
      if (this.file && this.formData) {
        const url = "https://api.cloudinary.com/v1_1/dtabnh5py/image/upload";
        const { data } = await axios({
          url,
          method: "POST",
          data: this.formData
        });
        this.uploadedUrl = data.secure_url;
      }
      await this.saveComment();
    },
    ballClicked() {
      if (this.$store.state.loggedIn) {
        this.showCommentForm = true;
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    sortedArray: function() {
      function compare(a, b) {
        if (new Date(a.comment.createdAt) < new Date(b.comment.createdAt))
          return -1;
        if (new Date(a.comment.createdAt) > new Date(b.comment.createdAt))
          return 1;
        return 0;
      }
      return this.comments.sort(compare);
    },
    async loadComments() {
      this.loadingComments = true;
      const {
        data: {
          getPostComments: { data }
        }
      } = await this.$apollo.query({
        query: POST_COMMENTS,
        fetchPolicy: "network-only",
        variables: {
          post: this.$route.params.id,
          pagination: this.pagination
        }
      }).finally(() => {
        this.loadingComments = false;
      });
      const comments = JSON.parse(JSON.stringify(data));
      this.totalCount = comments.length;
      this.comments.push(...comments);
    },
    clickFileRef() {
      this.$refs.file.click();
    },
    checkFile(e) {
      var file_list = e.target.files;
      let txt = "";
      let error = false;
      const file = file_list[0];
      var sFileName = file.name;
      var sFileExtension = sFileName.split(".")[sFileName.split(".").length - 1].toLowerCase();
      var iFileSize = file.size;
      (file.size / 1048576).toFixed(2);
      const allowed = ["webp", "jpg", "jpeg", "png", "gif"];
      if (!allowed.includes(sFileExtension) || iFileSize > 2485760) {
        txt += "Please make sure your file is in image format and less than 2 MB.\n\n";
        error = true;
        this.invalidImage = true;
      }
      return { txt, error };
    },
    uploaded(e) {
      const { txt, error } = this.checkFile(e);
      if (error) {
        alert(txt);
        return;
      }
      this.file = e.target.files[0];
      this.filename = e.target.files[0].name.substring(0, 20);
      this.prepareFormData();
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.file);
    },
    async saveComment() {
      await this.$apollo.mutate({
        mutation: ADD_COMMENT,
        variables: {
          input: {
            message: this.content,
            cover: this.uploadedUrl,
            replyTo: this.replyTarget ? this.replyTarget.user.id : "",
            post: this.$route.params.id
          }
        }
      }).then(({ data: { addComment } }) => {
        this.comments.unshift(addComment);
      }).finally(() => {
        this.loadingPost = false;
        this.showCommentForm = false;
      });
    },
    async setVote(vote) {
      await this.$apollo.mutate({
        mutation: SET_VOTE,
        variables: {
          input: {
            vote,
            type: "post",
            entityId: this.$route.params.id
          }
        }
      });
      if (vote == 1) {
        this.post.likes = this.initialVote + 1;
      } else if (vote == -1) {
        this.post.likes = this.initialVote - 1;
      } else {
        this.post.likes = this.initialVote;
      }
    },
    async removeVote() {
      this.post.likes = this.initialVote;
      this.voteData.voted = false;
      this.voteData.vote = 0;
      this.setVote(0);
    },
    async upvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == 1) {
          this.removeVote();
          return;
        } else {
          this.voteData.voted = true;
          this.voteData.vote = 1;
          this.setVote(1);
          return;
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async downvoted() {
      if (this.$store.state.user) {
        if (this.voteData.vote == -1) {
          this.removeVote();
        } else {
          this.voteData.voted = true;
          this.voteData.vote = -1;
          this.setVote(-1);
        }
      } else {
        this.$store.commit("SET_LOGIN_POP", true);
      }
    },
    async getPostVote() {
      const {
        data: { getPostVote }
      } = await this.$apollo.query({
        query: GET_POST_VOTES,
        variables: { post: this.$route.params.id },
        fetchPolicy: "network-only"
      });
      this.voteData = {
        vote: getPostVote.vote,
        voted: getPostVote.voted
      };
    },
    async deletePost() {
      const confirmDelte = confirm("Are you sure you want to do delete this post? ");
      if (confirmDelte) {
        await this.$apollo.mutate({
          mutation: DELETE_POST,
          variables: {
            post: this.$route.params.id
          }
        }).finally(() => {
          this.$router.push("/");
        });
      }
    }
  },
  async created() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
    await this.loadComments();
  },
  computed: {
    windowWidth() {
      return this.windowWidth;
    }
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_dialog_modal = resolveComponent("dialog-modal");
  const _component_game_loader = resolveComponent("game-loader");
  const _component_router_link = resolveComponent("router-link");
  const _component_vote_clickers = resolveComponent("vote-clickers");
  const _component_vue_load_image = resolveComponent("vue-load-image");
  const _component_user_avatar = resolveComponent("user-avatar");
  const _component_loader = resolveComponent("loader");
  const _component_comment_tile = resolveComponent("comment-tile");
  const _component_comment_meda = resolveComponent("comment-meda");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_dialog_modal, { show: _ctx.showCommentForm }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="relative"${_scopeId}><div class="w-full z-0"${_scopeId}>`);
        if (_ctx.loadingPost) {
          _push2(`<div class="h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"${_scopeId}><div class="flex flex-col mt-32 justify-center items-center w-full"${_scopeId}><p class="text-xl font-black text-white tracking-wider w-full"${_scopeId}> Loading... </p>`);
          _push2(ssrRenderComponent(_component_game_loader, null, null, _parent2, _scopeId));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(ssrRenderComponent(_component_router_link, { to: "/" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-4xl xl:text-5xl lg:text-5xl text-white"${_scopeId2}>Comment</p>`);
            } else {
              return [
                createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, "Comment")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div${ssrRenderAttrs(mergeProps({
          class: ["w-full relative", { "opacity-70": _ctx.loadingPost }],
          style: { filter: _ctx.loadingPost ? "blur(2px)" : "" }
        }, _attrs))}${_scopeId}><textarea class="form-control p-3 rounded-b-none block h-44 resize-none border-none mt-5 text-xl font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea1" rows="3" placeholder="Type it in..."${_scopeId}>${ssrInterpolate(_ctx.content)}</textarea><div class="w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white"${_scopeId}><input type="file" accept="image/png, image/gif, image/jpeg" class="hidden"${_scopeId}><p${_scopeId}>5000</p><button${_scopeId}>`);
        if (!_ctx.filename) {
          _push2(`<span${_scopeId}>Attach Img/Gif</span>`);
        } else {
          _push2(`<span${_scopeId}>${ssrInterpolate(_ctx.filename)}</span>`);
        }
        _push2(`</button></div><button class="bg-green-600 rounded-lg mt-3 font-black text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"${_scopeId}><p${_scopeId}>Post</p></button></div></div></div>`);
      } else {
        return [
          createVNode("div", { class: "relative" }, [
            createVNode("div", { class: "w-full z-0" }, [
              _ctx.loadingPost ? (openBlock(), createBlock("div", {
                key: 0,
                class: "h-full bg-gray-500 top-0 left-0 right-0 w-full opacity-60 absolute z-50"
              }, [
                createVNode("div", { class: "flex flex-col mt-32 justify-center items-center w-full" }, [
                  createVNode("p", { class: "text-xl font-black text-white tracking-wider w-full" }, " Loading... "),
                  createVNode(_component_game_loader)
                ])
              ])) : createCommentVNode("", true),
              createVNode(_component_router_link, { to: "/" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-4xl xl:text-5xl lg:text-5xl text-white" }, "Comment")
                ]),
                _: 1
              }),
              createVNode(Transition, { name: "slide-fade" }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: ["w-full relative", { "opacity-70": _ctx.loadingPost }],
                    style: { filter: _ctx.loadingPost ? "blur(2px)" : "" }
                  }, [
                    withDirectives(createVNode("textarea", {
                      class: "form-control p-3 rounded-b-none block h-44 resize-none border-none mt-5 text-xl font-normal bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-gray-50 focus:border-blue-600 focus:outline-none",
                      id: "exampleFormControlTextarea1",
                      rows: "3",
                      "onUpdate:modelValue": ($event) => _ctx.content = $event,
                      placeholder: "Type it in..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, _ctx.content]
                    ]),
                    createVNode("div", { class: "w-full rounded-b-md bg-gray-500 flex flex-row justify-between p-2 text-white" }, [
                      createVNode("input", {
                        type: "file",
                        onChange: _ctx.uploaded,
                        accept: "image/png, image/gif, image/jpeg",
                        class: "hidden",
                        ref: "file"
                      }, null, 40, ["onChange"]),
                      createVNode("p", null, "5000"),
                      createVNode("button", { onClick: _ctx.clickFileRef }, [
                        !_ctx.filename ? (openBlock(), createBlock("span", { key: 0 }, "Attach Img/Gif")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(_ctx.filename), 1))
                      ], 8, ["onClick"])
                    ]),
                    createVNode("button", {
                      onClick: ($event) => _ctx.postComment(),
                      class: "bg-green-600 rounded-lg mt-3 font-black text-white w-full px-20 py-4 lg:py-2 xl:py-2 text-xl xl:text-2xl lg:text-2xl"
                    }, [
                      createVNode("p", null, "Post")
                    ], 8, ["onClick"])
                  ], 6)
                ]),
                _: 1
              })
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="h-1/2 w-full" style="${ssrRenderStyle({ "background": "#5fe18c" })}"><div class="text-white p-2 relative font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20">`);
  if (_ctx.post) {
    _push(`<div class="flex flex-row gap-4">`);
    _push(ssrRenderComponent(_component_vote_clickers, {
      voted: _ctx.voteData.voted,
      vote: _ctx.voteData.vote == 1,
      large: true,
      count: _ctx.post.likes,
      dark: true,
      color: "#92daac",
      class: "mt-5"
    }, null, _parent));
    _push(`<div class="flex flex-row justify-start items-start"><div class="flex flex-col gap-4 w-full px-2"><p class="pt-5">${ssrInterpolate(_ctx.post.user.fullName)}</p><p class="pt-2 text-xl xl:text-2xl lg:text-2xl font-normal">${ssrInterpolate(_ctx.post.content)}</p><div class="mr-3 mb-3">`);
    _push(ssrRenderComponent(_component_vue_load_image, null, {
      image: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          if (_ctx.post.cover) {
            _push2(`<img${ssrRenderAttr("src", _ctx.post.cover)}${_scopeId}>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            _ctx.post.cover ? (openBlock(), createBlock("img", {
              key: 0,
              src: _ctx.post.cover
            }, null, 8, ["src"])) : createCommentVNode("", true)
          ];
        }
      }),
      preloader: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(_component_game_loader, null, null, _parent2, _scopeId));
        } else {
          return [
            createVNode(_component_game_loader)
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div></div>`);
    if (_ctx.$store.state.loggedIn) {
      _push(`<div class="absolute right-0 mr-5 mt-5">`);
      if (_ctx.$store.state.user.userId == _ctx.post.user.userId) {
        _push(`<button class="bg-green-300 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 text-green-800 h-10 p-2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  } else {
    _push(ssrRenderComponent(_component_game_loader, null, null, _parent));
  }
  _push(`</div></div><div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3"><div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">`);
  if (_ctx.post && _ctx.post.user) {
    _push(`<div class="flex flex-row">`);
    if (_ctx.$store.state.loggedIn) {
      _push(`<div>`);
      _push(ssrRenderComponent(_component_user_avatar, {
        path: _ctx.$store.state.user.userId == _ctx.post.user.userId ? "/user" : `/user/${_ctx.post.user.userId}`,
        img: _ctx.post.user.photo,
        user: _ctx.post.user
      }, null, _parent));
      _push(`</div>`);
    } else {
      _push(ssrRenderComponent(_component_user_avatar, {
        path: "/",
        img: _ctx.post.user.photo,
        user: _ctx.post.user
      }, null, _parent));
    }
    _push(`<div><p class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans">${ssrInterpolate(_ctx.post.user.fullName)}</p><div class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"> 1099 </div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="pt-2 text-gray-400"><p class="text-xl font-semibold text-gray-500">Welcome To Chewata</p><p class="pr-12"> Start commenting and upvoting posts and express yourself! </p></div>`);
  if (!_ctx.$store.state.loggedIn) {
    _push(`<button class="rounded-xl tracking-widest border-2 mt-10 p-2"> Sign Up </button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="w-full bg-white mb-20 col-span-7 md:col-span-6 xl:col-span-5">`);
  if (_ctx.loadingComments) {
    _push(`<div class="flex items-start justify-start">`);
    _push(ssrRenderComponent(_component_loader, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<p class="text-xl pt-5 font-semibold tracking-wider text-gray-400"> Comments </p>`);
  }
  if (_ctx.comments.length) {
    _push(`<div><!--[-->`);
    ssrRenderList(_ctx.comments, (com, ix) => {
      _push(ssrRenderComponent(_component_comment_tile, {
        key: ix,
        comment: com
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
  if (_ctx.post) {
    _push(ssrRenderComponent(_component_comment_meda, { hide: false }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Game.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Game = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = defineComponent({
  components: { Navbar, UserAvatar, CommentTile, FeedTile, PostTile, Loader },
  setup() {
  },
  data: () => ({
    loading: false,
    lastCommentSnapshot: null,
    lastSnapshot: null,
    loadComplete: false,
    activeTab: "posts",
    showModal: false,
    totalCountPost: 0,
    totalCountComments: 0,
    paginationP: {
      page: 1,
      pageSize: 2
    },
    paginationC: {
      page: 1,
      pageSize: 4
    },
    comments: [],
    posts: [],
    limit: 2
  }),
  async created() {
    await this.fetchUserPosts();
    await this.loadComments();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async handleScroll(e) {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        console.log("there");
        if (this.totalCountPost) {
          this.paginationP.page++;
          await this.fetchUserPosts();
          console.log("load more");
        } else if (this.totalCountComments) {
          this.paginationC.page++;
          const totalCount = await this.loadComments();
          console.log("load more", totalCount);
        }
      }
    },
    setTab(tab) {
      this.activeTab = tab;
    },
    clicked(post) {
      this.$router.push({ path: `/game/${post.postId}` });
    },
    async loadComments() {
      this.loading = true;
      const {
        data: {
          userComments: { data, total }
        }
      } = await this.$apollo.query({
        query: USER_COMMENTS,
        variables: {
          pagination: this.paginationC
        }
      }).finally(() => {
        this.loading = false;
      });
      const comments = JSON.parse(JSON.stringify(data));
      this.totalCountComments = this.comments.length;
      this.comments.push(...comments);
    },
    async fetchUserPosts() {
      this.loading = true;
      const {
        data: {
          userPosts: { data }
        }
      } = await this.$apollo.query({
        query: USER_POSTS,
        fetchPolicy: "network-only",
        variables: {
          pagination: this.paginationP
        }
      }).finally(() => {
        this.loading = false;
      });
      const post = JSON.parse(JSON.stringify(data));
      this.totalCountPost = post.length;
      this.posts.push(...post);
    }
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_navbar = resolveComponent("navbar");
  const _component_user_avatar = resolveComponent("user-avatar");
  const _component_post_tile = resolveComponent("post-tile");
  const _component_loader = resolveComponent("loader");
  const _component_comment_tile = resolveComponent("comment-tile");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_navbar, null, null, _parent));
  _push(`<div class="mt-16 h-3/4 w-full" style="${ssrRenderStyle({ "background": "#5fe18c", "background-repeat": "no-repeat", "background-size": "cover" })}"><div class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"><div class="flex flex-col gap-4 w-full items-start px-2"><p class="pt-5">${ssrInterpolate(_ctx.$store.state.user.fullName)}</p><p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal"> If you treat me like an option, I\u2019ll leave you like a choice. </p></div></div></div><div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3"><div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">`);
  if (_ctx.$store.state.loggedIn) {
    _push(`<div class="flex flex-row">`);
    _push(ssrRenderComponent(_component_user_avatar, {
      img: _ctx.$store.state.user.photo
    }, null, _parent));
    _push(`<div><p class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans">${ssrInterpolate(_ctx.$store.state.user.fullName)}</p><div class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500"> 1099 </div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!_ctx.$store.state.loggedIn) {
    _push(`<button class="rounded-xl tracking-widest border-2 mt-10 p-2"> Sign Up </button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="bg-white col-span-7 lg:col-span-3 sm::col-span-4 md::col-span-4 xl:col-span-4 w-full"><div class="flex flex-row pt-3"><button class="${ssrRenderClass([{
    "text-green-600 text-xl": _ctx.activeTab == "posts",
    "text-gray-400": _ctx.activeTab == "comments"
  }, "px-2 font-semibold tracking-wider"])}"> Posts </button><button class="${ssrRenderClass([{
    "text-gray-400": _ctx.activeTab == "posts",
    "text-green-600 text-lg": _ctx.activeTab == "comments"
  }, "px-2 font-semibold tracking-wider"])}"> Comments </button></div>`);
  if (_ctx.activeTab == "posts") {
    _push(`<div><!--[-->`);
    ssrRenderList(_ctx.posts, (post, ix) => {
      _push(ssrRenderComponent(_component_post_tile, {
        readonly: true,
        postRef: _ctx.postRef,
        post,
        key: ix
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if (_ctx.loading) {
      _push(`<div class="flex items-start justify-start flex-col mt-10">`);
      _push(ssrRenderComponent(_component_loader, { class: "mt-20" }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.loadComplete) {
      _push(`<div class="text-center pb-32 pt-10"><p class="text-lg text-gray-400 font-semibold">No More Posts</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<div><!--[-->`);
    ssrRenderList(_ctx.comments, (com, ix) => {
      _push(ssrRenderComponent(_component_comment_tile, {
        readonly: true,
        key: ix,
        comment: com
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if (_ctx.loading) {
      _push(`<div class="flex items-start justify-start flex-col mt-10">`);
      _push(ssrRenderComponent(_component_loader, { class: "mt-20" }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.loadComplete) {
      _push(`<div class="text-center pb-32 pt-10"><p class="text-lg text-gray-400 font-semibold">No More Posts</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Profile.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Profile = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = defineComponent({
  components: {
    Navbar,
    UserAvatar,
    CommentTile,
    FeedTile,
    PostTile,
    Loader,
    GameLoader
  },
  setup() {
  },
  data: () => ({
    loading: false,
    lastCommentSnapshot: null,
    lastSnapshot: null,
    loadComplete: false,
    activeTab: "posts",
    showModal: false,
    user: null,
    totalCountPost: 0,
    totalCountComments: 0,
    paginationP: {
      page: 1,
      pageSize: 2
    },
    paginationC: {
      page: 1,
      pageSize: 4
    },
    comments: [],
    posts: [],
    limit: 10
  }),
  async created() {
    await this.loadUserData();
    await this.fetchUserPosts();
    await this.loadComments();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async handleScroll(e) {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        console.log("there");
        if (this.totalCountPost) {
          this.paginationP.page++;
          await this.fetchUserPosts();
          console.log("load more");
        } else if (this.totalCountComments) {
          this.paginationC.page++;
          const totalCount = await this.loadComments();
          console.log("load more", totalCount);
        }
      }
    },
    setTab(tab) {
      this.activeTab = tab;
    },
    clicked(post) {
      this.$router.push({ path: `/game/${post.id}` });
    },
    async loadUserData() {
      const {
        data: { userPublic }
      } = await this.$apollo.query({
        query: USER_PUBLIC,
        fetchPolicy: "network-only",
        variables: { user: this.$route.params.uid }
      });
      this.user = userPublic;
    },
    async loadComments() {
      this.loading = true;
      const {
        data: {
          userPublicComments: { data, total }
        }
      } = await this.$apollo.query({
        query: USER_PUBLIC_COMMENTS,
        variables: {
          pagination: this.paginationC,
          user: this.$route.params.uid
        }
      }).finally(() => {
        this.loading = false;
      });
      const comments = JSON.parse(JSON.stringify(data));
      this.totalCountComments = this.comments.length;
      this.comments.push(...comments);
    },
    async fetchUserPosts() {
      this.loading = true;
      const {
        data: {
          userPublicPosts: { data }
        }
      } = await this.$apollo.query({
        query: USER_PUBLIC_POSTS,
        fetchPolicy: "network-only",
        variables: {
          pagination: this.paginationP,
          user: this.$route.params.uid
        }
      }).finally(() => {
        this.loading = false;
      });
      const post = JSON.parse(JSON.stringify(data));
      this.totalCountPost = post.length;
      this.posts.push(...post);
    }
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_navbar = resolveComponent("navbar");
  const _component_game_loader = resolveComponent("game-loader");
  const _component_user_avatar = resolveComponent("user-avatar");
  const _component_post_tile = resolveComponent("post-tile");
  const _component_loader = resolveComponent("loader");
  const _component_comment_tile = resolveComponent("comment-tile");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_navbar, null, null, _parent));
  _push(`<div class="mt-16 h-3/4 w-full" style="${ssrRenderStyle({ "background": "#5fe18c", "background-repeat": "no-repeat", "background-size": "cover" })}">`);
  if (_ctx.user) {
    _push(`<div class="text-white font-semibold xl:text-4xl lg:text-4xl md:text-3xl text-2xl xl:tracking-wider lg:tracking-wider md:tracking-wider tracking-normal font-sans flex xl:mx-52 md:mx-10 pt-20"><div class="flex flex-col gap-4 w-full items-start px-2"><p class="pt-5">${ssrInterpolate(_ctx.user.fullName)}</p><p class="pb-20 pt-2 text-xl xl:text-2xl lg:text-2xl font-normal"> If you treat me like an option, I\u2019ll leave you like a choice. </p></div></div>`);
  } else {
    _push(`<div class="flex items-center justify-center">`);
    _push(ssrRenderComponent(_component_game_loader, null, null, _parent));
    _push(`</div>`);
  }
  _push(`</div><div class="grid grid-cols-7 xl:mx-52 lg:mx-0 m-3"><div class="w-full mt-2 hidden lg:block xl:block md:block col-span-2">`);
  if (_ctx.$store.state.loggedIn && _ctx.user) {
    _push(`<div class="flex flex-row">`);
    _push(ssrRenderComponent(_component_user_avatar, {
      img: _ctx.user.photo
    }, null, _parent));
    _push(`<div><p class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans">${ssrInterpolate(_ctx.user.fullName)}</p><div class="mx-2 w-1/2 text-center font-black text-sm rounded-md text-white bg-green-500">${ssrInterpolate(_ctx.user.totalLikes)}</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!_ctx.$store.state.loggedIn) {
    _push(`<button class="rounded-xl tracking-widest border-2 mt-10 p-2"> Sign Up </button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="bg-white col-span-7 lg:col-span-3 sm::col-span-4 md::col-span-4 xl:col-span-4 w-full"><div class="flex flex-row pt-3"><button class="${ssrRenderClass([{
    "text-green-600 text-xl": _ctx.activeTab == "posts",
    "text-gray-400": _ctx.activeTab == "comments"
  }, "px-2 font-semibold tracking-wider"])}"> Posts </button><button class="${ssrRenderClass([{
    "text-gray-400": _ctx.activeTab == "posts",
    "text-green-600 text-lg": _ctx.activeTab == "comments"
  }, "px-2 font-semibold tracking-wider"])}"> Comments </button></div>`);
  if (_ctx.activeTab == "posts") {
    _push(`<div><!--[-->`);
    ssrRenderList(_ctx.posts, (post, ix) => {
      _push(ssrRenderComponent(_component_post_tile, {
        postRef: _ctx.postRef,
        post,
        key: ix
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if (_ctx.loading) {
      _push(`<div class="flex items-start justify-start flex-col mt-10">`);
      _push(ssrRenderComponent(_component_loader, { class: "mt-20" }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.loadComplete) {
      _push(`<div class="text-center pb-32 pt-10"><p class="text-lg text-gray-400 font-semibold">No More Posts</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<div><!--[-->`);
    ssrRenderList(_ctx.comments, (com, ix) => {
      _push(ssrRenderComponent(_component_comment_tile, {
        readonly: false,
        key: ix,
        comment: com,
        class: "cursor-pointer"
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if (_ctx.loading) {
      _push(`<div class="flex items-start justify-start flex-col mt-10">`);
      _push(ssrRenderComponent(_component_loader, { class: "mt-20" }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.loadComplete) {
      _push(`<div class="text-center pb-32 pt-10"><p class="text-lg text-gray-400 font-semibold">No More Posts</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PublicProfile.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var PublicProfile = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = defineComponent({
  components: { UserAvatar },
  setup() {
  },
  props: {
    pic: String,
    text: String
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_user_avatar = resolveComponent("user-avatar");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-row mt-4 hover:bg-gray-50"><div class="md:mx-0 lg:mx-0 xl:mx-0 mx-5"><div class="flex flex-row mt-2">`);
  _push(ssrRenderComponent(_component_user_avatar, null, null, _parent));
  _push(`<div></div><div><p class="text-xl text-gray-500 px-2 pt-1 font-semibold tracking-wider font-sans"> Samuna </p></div></div><p class="py-2 mb-2 tracking-wide text-gray-600 text-lg xl:text-xl lg:text-xl">${ssrInterpolate(_ctx.text)}</p>`);
  if (_ctx.pic) {
    _push(`<img${ssrRenderAttr("src", _ctx.pic)} alt="" style="${ssrRenderStyle({ "object-fit": "contain" })}">`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><hr class="mt-2"></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/NotificationTile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var NotificationTile = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = defineComponent({
  components: { Navbar, NotificationTile },
  setup() {
  },
  data: () => ({
    showModal: false,
    notifications: [
      {
        annotation: "Amar ++'d your comment!"
      }
    ]
  })
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_notification_tile = resolveComponent("notification-tile");
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-row justify-center gap-10 mt-24"><div class="w-1/6 mt-2 hidden lg:block xl:block md:block"><h1 class="text-gray-500 text-2xl font-semibold tracking-widest"> Join DevRant </h1><p class="font-normal text-gray-400 text-lg"> Do all the things like ++ or -- rants, post your own rants, comment on others&#39; rants and build your customized dev avatar </p><button class="rounded-xl tracking-widest border-2 mt-2 p-2"> Sign Up </button></div><div class="md:w-2/3 lg:w-2/5 xl:w-2/5 bg-white"><p class="text-2xl pt-5 font-semibold tracking-wider text-gray-500"> Notifications </p><!--[-->`);
  ssrRenderList(_ctx.notifications, (not, ix) => {
    _push(ssrRenderComponent(_component_notification_tile, {
      text: not.annotation,
      key: ix
    }, null, _parent));
  });
  _push(`<!--]--></div><div class="w-1/6 mt-2 hidden lg:block xl:block"><h1 class="text-gray-500 px-2 pb-4 text-2xl font-semibold tracking-widest"> Top Tags </h1><div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-1"><!--[-->`);
  ssrRenderList(13, (x) => {
    _push(`<div class="rounded-md border-2 px-1 hover:border-green-500 duration-300 transition ease-in-out delay-75"><p class="text-gray-500 text-center text-sm hover:text-green-600 cursor-pointer duration-300 transition ease-in-out delay-75"> Soccer </p></div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Notification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Notification = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = defineComponent({
  setup() {
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_P = resolveComponent("P");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center" }, _attrs))}><div class="prose pt-28 px-5"><h1>Privacy Policy for Chewata</h1><p> At chewata, accessible from https://chewata.fun/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by chewata and how we use it. </p><p> If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. </p><p> This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in chewata. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info/">Free Privacy Policy Generator</a>. </p><h2>Consent</h2><p> By using our website, you hereby consent to our Privacy Policy and agree to its terms. </p><h2>Information we collect</h2><p> The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. </p><p> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. </p><p> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. </p><h2>How we use your information</h2><p>We use the information we collect in various ways, including to:</p><ul><li>Provide, operate, and maintain our website</li><li>Improve, personalize, and expand our website</li><li>Understand and analyze how you use our website</li><li>Develop new products, services, features, and functionality</li><li> Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes </li><li>Send you emails</li><li>Find and prevent fraud</li></ul><h2>Log Files</h2><p> chewata follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&#39; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&#39; movement on the website, and gathering demographic information. </p><h2>Cookies and Web Beacons</h2><p> Like any other website, chewata uses &#39;cookies&#39;. These cookies are used to store information including visitors&#39; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&#39; experience by customizing our web page content based on visitors&#39; browser type and/or other information. </p><h2>Google DoubleClick DART Cookie</h2><p> Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL \u2013 <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a></p><h2>Advertising Partners Privacy Policies</h2>`);
  _push(ssrRenderComponent(_component_P, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`You may consult this list to find the Privacy Policy for each of the advertising partners of chewata.`);
      } else {
        return [
          createTextVNode("You may consult this list to find the Privacy Policy for each of the advertising partners of chewata.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p> Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on chewata, which are sent directly to users&#39; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. </p><p> Note that chewata has no access to or control over these cookies that are used by third-party advertisers. </p><h2>Third Party Privacy Policies</h2><p> chewata&#39;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p><p> You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&#39; respective websites. </p><h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2><p> Under the CCPA, among other rights, California consumers have the right to: </p><p> Request that a business that collects a consumer&#39;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers. </p><p> Request that a business delete any personal data about the consumer that a business has collected. </p><p> Request that a business that sells a consumer&#39;s personal data, not sell the consumer&#39;s personal data. </p><p> If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. </p><h2>GDPR Data Protection Rights</h2><p> We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: </p><p> The right to access \u2013 You have the right to request copies of your personal data. We may charge you a small fee for this service. </p><p> The right to rectification \u2013 You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete. </p><p> The right to erasure \u2013 You have the right to request that we erase your personal data, under certain conditions. </p><p> The right to restrict processing \u2013 You have the right to request that we restrict the processing of your personal data, under certain conditions. </p><p> The right to object to processing \u2013 You have the right to object to our processing of your personal data, under certain conditions. </p><p> The right to data portability \u2013 You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions. </p><p> If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. </p><h2>Children&#39;s Information</h2><p> Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. </p><p> chewata does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records. </p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Privacy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const routes = [
  {
    path: "/",
    name: "Landing",
    component: Home
  },
  {
    path: "/game/:id",
    name: "Game",
    component: Game
  },
  {
    path: "/user",
    name: "User",
    component: Profile
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/user/:uid",
    name: "UserPublic",
    component: PublicProfile
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  }
});
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  if (to.meta.type === "login" && user) {
    next({ name: "home" });
    return;
  }
  if (to.meta.type === "home" && !user) {
    next({ name: "login" });
    return;
  }
  next();
});
var index = "";
const uri = "https://chewata.fun/graphql";
createHttpLink({
  uri,
  credentials: "include"
});
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: "include",
  uri
});
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
});
library.add(faCoffee, faJs, faFacebook, faGoogle);
setupFirebase();
const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.use(createHead());
app.use(apolloProvider);
app.use(store);
app.mount("#app");
