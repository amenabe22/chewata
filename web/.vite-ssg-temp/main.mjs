import { defineComponent, useSSRContext, mergeProps, resolveComponent, withCtx, createVNode, Transition, openBlock, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, createTextVNode, createApp } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { getAuth, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import gql from "graphql-tag";
import { defineComponent as defineComponent$1 } from "@vue/runtime-core";
import { Head, createHead } from "@vueuse/head";
import { getAuth as getAuth$1, signOut } from "@firebase/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import VueLoadImage from "vue-load-image";
import axios from "axios";
import InfiniteScroll from "infinite-loading-vue3";
import { query as query$1, collection as collection$1, where as where$1, getDocs as getDocs$1 } from "@firebase/firestore";
import { getFirestore, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { isSupported, getMessaging, getToken } from "firebase/messaging";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { onMessage } from "@firebase/messaging";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faJs, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import require$$8, { Source, visit, print } from "graphql";
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
const empty$1 = () => {
};
const store = createStore({
  plugins: [typeof window != "undefined" ? createPersistedState() : empty$1],
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
let messaging;
const setupFirebase = async () => {
  if (await isSupported()) {
    messaging = getMessaging(app$1);
  }
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
  var _a2;
  const _component_router_link = resolveComponent("router-link");
  _push(ssrRenderComponent(_component_router_link, mergeProps({
    class: "relative inline-block z-0",
    to: (_a2 = _ctx.path) != null ? _a2 : "/user"
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
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  }
});
router.beforeEach((to, from2, next) => {
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var core$1 = {};
var tslib = { exports: {} };
(function(module) {
  var __extends;
  var __assign;
  var __rest;
  var __decorate;
  var __param;
  var __metadata;
  var __awaiter;
  var __generator;
  var __exportStar;
  var __values;
  var __read;
  var __spread;
  var __spreadArrays;
  var __spreadArray;
  var __await;
  var __asyncGenerator;
  var __asyncDelegator;
  var __asyncValues;
  var __makeTemplateObject;
  var __importStar;
  var __importDefault;
  var __classPrivateFieldGet;
  var __classPrivateFieldSet;
  var __classPrivateFieldIn;
  var __createBinding;
  (function(factory) {
    var root = typeof commonjsGlobal === "object" ? commonjsGlobal : typeof self === "object" ? self : typeof this === "object" ? this : {};
    {
      factory(createExporter(root, createExporter(module.exports)));
    }
    function createExporter(exports, previous) {
      if (exports !== root) {
        if (typeof Object.create === "function") {
          Object.defineProperty(exports, "__esModule", { value: true });
        } else {
          exports.__esModule = true;
        }
      }
      return function(id, v) {
        return exports[id] = previous ? previous(id, v) : v;
      };
    }
  })(function(exporter) {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
      d.__proto__ = b;
    } || function(d, b) {
      for (var p in b)
        if (Object.prototype.hasOwnProperty.call(b, p))
          d[p] = b[p];
    };
    __extends = function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __2() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__2.prototype = b.prototype, new __2());
    };
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    __rest = function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    __decorate = function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    __metadata = function(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __generator = function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    __exportStar = function(m, o) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
          __createBinding(o, m, p);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __values = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    __read = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    __spread = function() {
      for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    __spreadArrays = function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    __spreadArray = function(to, from2, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from2.length, ar; i < l; i++) {
          if (ar || !(i in from2)) {
            if (!ar)
              ar = Array.prototype.slice.call(from2, 0, i);
            ar[i] = from2[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from2));
    };
    __await = function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n])
          i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]);
      }
    };
    __asyncDelegator = function(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function() {
        return this;
      }, i;
      function verb(n, f) {
        i[n] = o[n] ? function(v) {
          return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
        } : f;
      }
    };
    __asyncValues = function(o) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    __makeTemplateObject = function(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
      } else {
        cooked.raw = raw;
      }
      return cooked;
    };
    var __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    __importStar = function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    __importDefault = function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    __classPrivateFieldGet = function(receiver, state2, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state2.get(receiver);
    };
    __classPrivateFieldSet = function(receiver, state2, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state2.set(receiver, value), value;
    };
    __classPrivateFieldIn = function(state2, receiver) {
      if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
        throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state2 === "function" ? receiver === state2 : state2.has(receiver);
    };
    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
  });
})(tslib);
var genericMessage = "Invariant Violation";
var _a$3 = Object.setPrototypeOf, setPrototypeOf = _a$3 === void 0 ? function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a$3;
var InvariantError = function(_super) {
  tslib.exports.__extends(InvariantError2, _super);
  function InvariantError2(message) {
    if (message === void 0) {
      message = genericMessage;
    }
    var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
    _this.framesToPop = 1;
    _this.name = genericMessage;
    setPrototypeOf(_this, InvariantError2.prototype);
    return _this;
  }
  return InvariantError2;
}(Error);
function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}
var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
var verbosityLevel = verbosityLevels.indexOf("log");
function wrapConsoleMethod(name) {
  return function() {
    if (verbosityLevels.indexOf(name) >= verbosityLevel) {
      var method = console[name] || console.log;
      return method.apply(console, arguments);
    }
  };
}
(function(invariant2) {
  invariant2.debug = wrapConsoleMethod("debug");
  invariant2.log = wrapConsoleMethod("log");
  invariant2.warn = wrapConsoleMethod("warn");
  invariant2.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
function setVerbosity(level) {
  var old = verbosityLevels[verbosityLevel];
  verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
  return old;
}
var invariant$1 = invariant;
var invariant$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InvariantError,
  get invariant() {
    return invariant;
  },
  setVerbosity,
  "default": invariant$1
}, Symbol.toStringTag, { value: "Module" }));
function maybe$1(thunk) {
  try {
    return thunk();
  } catch (_a2) {
  }
}
var global$1 = maybe$1(function() {
  return globalThis;
}) || maybe$1(function() {
  return window;
}) || maybe$1(function() {
  return self;
}) || maybe$1(function() {
  return global;
}) || maybe$1(function() {
  return maybe$1.constructor("return this")();
});
var __ = "__";
var GLOBAL_KEY = [__, __].join("DEV");
function getDEV() {
  try {
    return Boolean(__DEV__);
  } catch (_a2) {
    Object.defineProperty(global$1, GLOBAL_KEY, {
      value: maybe$1(function() {
        return { "npm_package_devDependencies__tailwindcss_typography": "^0.5.7", "npm_package_dependencies__fortawesome_fontawesome_svg_core": "^6.2.0", "MANPATH": "/opt/homebrew/share/man:/usr/share/man:/usr/local/share/man:/opt/homebrew/share/man:", "TERM_PROGRAM": "vscode", "NODE": "/usr/local/bin/node", "INIT_CWD": "/Users/mac/projects/fun/chewata/web", "npm_package_devDependencies_typescript": "^4.4.4", "npm_package_dependencies_axios": "^0.27.2", "npm_package_homepage": "http://.", "npm_config_version_git_tag": "true", "TERM": "xterm-256color", "SHELL": "/bin/zsh", "npm_package_devDependencies_vite": "^2.7.2", "npm_package_dependencies_vue_apollo": "^3.1.0", "HOMEBREW_REPOSITORY": "/opt/homebrew", "TMPDIR": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/", "npm_package_dependencies_vue_meta": "^3.0.0-alpha.7", "npm_config_init_license": "MIT", "TERM_PROGRAM_VERSION": "1.71.2", "npm_package_dependencies_apollo_cache_inmemory": "^1.6.6", "npm_package_devDependencies__vitejs_plugin_vue": "^2.0.0", "npm_package_scripts_dev": "vite", "MallocNanoZone": "0", "ORIGINAL_XDG_CURRENT_DESKTOP": "undefined", "ZDOTDIR": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/vscode-zsh", "npm_package_devDependencies_sass_loader": "^12.6.0", "TERM_SESSION_ID": "D96E4968-A398-4689-8637-E90900D2C0BA", "npm_config_registry": "https://registry.yarnpkg.com", "npm_package_readmeFilename": "README.md", "npm_package_dependencies_vue_load_image": "^1.1.0", "USER": "mac", "npm_package_description": "This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.", "npm_package_dependencies_graphql_tag": "^2.12.6", "npm_package_dependencies_apollo_link_http": "^1.5.17", "COMMAND_MODE": "unix2003", "SSH_AUTH_SOCK": "/private/tmp/com.apple.launchd.8aw7fjYhzP/Listeners", "__CF_USER_TEXT_ENCODING": "0x1F5:0x0:0x0", "npm_package_devDependencies_postcss": "^8.4.5", "npm_execpath": "/usr/local/lib/node_modules/yarn/bin/yarn.js", "npm_package_dependencies_graphql": "^15.8.0", "npm_package_dependencies_apollo_boost": "^0.4.9", "npm_package_dependencies__fortawesome_free_brands_svg_icons": "^6.2.0", "PATH": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/yarn--1664031490999-0.6494682133738998:/Users/mac/projects/fun/chewata/web/node_modules/.bin:/Users/mac/.config/yarn/link/node_modules/.bin:/Users/mac/.yarn/bin:/usr/local/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/bin/node_modules/npm/bin/node-gyp-bin:/Users/mac/opt/anaconda3/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Users/mac/Downloads/flutter/bin:/usr/local/go/bin", "npm_config_argv": '{"remain":[],"cooked":["run","build"],"original":["build"]}', "npm_package_dependencies__fortawesome_free_solid_svg_icons": "^6.2.0", "_": "/Users/mac/projects/fun/chewata/web/node_modules/.bin/vite-ssg", "npm_package_dependencies_vue": "^3.2.25", "__CFBundleIdentifier": "com.microsoft.VSCode", "PWD": "/Users/mac/projects/fun/chewata/web", "npm_package_devDependencies_tailwindcss": "^3.0.15", "npm_package_scripts_preview": "vite preview", "npm_lifecycle_event": "build", "LANG": "en_US.UTF-8", "npm_package_name": "sports", "npm_package_devDependencies_sass": "^1.50.0", "npm_package_dependencies__vue_apollo_option": "^4.0.0-alpha.20", "npm_package_scripts_build": "vite-ssg build", "npm_config_version_commit_hooks": "true", "XPC_FLAGS": "0x0", "VSCODE_GIT_ASKPASS_EXTRA_ARGS": "--ms-enable-electron-run-as-node", "npm_package_dependencies_vue_3_meta": "^2.4.0", "npm_package_dependencies__fortawesome_vue_fontawesome": "^3.0.1", "npm_config_bin_links": "true", "npm_package_devDependencies_vite_ssg": "^0.20.2", "XPC_SERVICE_NAME": "0", "npm_package_version": "0.0.0", "VSCODE_INJECTION": "1", "npm_package_devDependencies_autoprefixer": "^10.4.2", "SHLVL": "4", "HOME": "/Users/mac", "APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL": "true", "VSCODE_GIT_ASKPASS_MAIN": "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", "npm_package_dependencies_apollo_client": "^2.6.10", "npm_config_save_prefix": "^", "npm_config_strict_ssl": "true", "HOMEBREW_PREFIX": "/opt/homebrew", "npm_package_dependencies_infinite_loading_vue3": "^1.0.1", "npm_config_version_git_message": "v%s", "npm_package_dependencies_firebase": "^9.10.0", "npm_package_dependencies__vueuse_head": "^0.7.12", "LOGNAME": "mac", "YARN_WRAP_OUTPUT": "false", "npm_package_dependencies_vue_uuid": "^3.0.0", "npm_lifecycle_script": "vite-ssg build", "LC_CTYPE": "UTF-8", "VSCODE_GIT_IPC_HANDLE": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/vscode-git-227b12fc25.sock", "npm_package_dependencies_vuex": "^4.0.2", "npm_package_dependencies_vuex_persistedstate": "^4.1.0", "npm_package_dependencies_apollo_link": "^1.2.14", "npm_config_version_git_sign": "", "npm_config_ignore_scripts": "", "npm_config_user_agent": "yarn/1.22.18 npm/? node/v16.14.2 darwin arm64", "INFOPATH": "/opt/homebrew/share/info:/opt/homebrew/share/info:", "HOMEBREW_CELLAR": "/opt/homebrew/Cellar", "GIT_ASKPASS": "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", "VSCODE_GIT_ASKPASS_NODE": "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper", "npm_package_devDependencies__types_node": "^17.0.10", "npm_package_dependencies_vue_infinite_scroll": "^2.0.2", "npm_package_dependencies__fortawesome_free_regular_svg_icons": "^6.2.0", "npm_config_init_version": "1.0.0", "npm_config_ignore_optional": "", "npm_package_dependencies_vue_router": "^4.0.12", "npm_package_dependencies__apollo_client": "^3.6.9", "COLORTERM": "truecolor", "npm_node_execpath": "/usr/local/bin/node", "npm_package_devDependencies_vue_tsc": "^0.29.8", "npm_config_version_tag_prefix": "v", "NODE_ENV": "production", "VITE_SSG": "true" }.NODE_ENV;
      }) !== "production",
      enumerable: false,
      configurable: true,
      writable: true
    });
    return global$1[GLOBAL_KEY];
  }
}
var DEV = getDEV();
function maybe(thunk) {
  try {
    return thunk();
  } catch (_) {
  }
}
var safeGlobal = maybe(function() {
  return globalThis;
}) || maybe(function() {
  return window;
}) || maybe(function() {
  return self;
}) || maybe(function() {
  return global;
}) || maybe(function() {
  return maybe.constructor("return this")();
});
var needToRemove = false;
function install() {
  if (safeGlobal && !maybe(function() {
    return { "npm_package_devDependencies__tailwindcss_typography": "^0.5.7", "npm_package_dependencies__fortawesome_fontawesome_svg_core": "^6.2.0", "MANPATH": "/opt/homebrew/share/man:/usr/share/man:/usr/local/share/man:/opt/homebrew/share/man:", "TERM_PROGRAM": "vscode", "NODE": "/usr/local/bin/node", "INIT_CWD": "/Users/mac/projects/fun/chewata/web", "npm_package_devDependencies_typescript": "^4.4.4", "npm_package_dependencies_axios": "^0.27.2", "npm_package_homepage": "http://.", "npm_config_version_git_tag": "true", "TERM": "xterm-256color", "SHELL": "/bin/zsh", "npm_package_devDependencies_vite": "^2.7.2", "npm_package_dependencies_vue_apollo": "^3.1.0", "HOMEBREW_REPOSITORY": "/opt/homebrew", "TMPDIR": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/", "npm_package_dependencies_vue_meta": "^3.0.0-alpha.7", "npm_config_init_license": "MIT", "TERM_PROGRAM_VERSION": "1.71.2", "npm_package_dependencies_apollo_cache_inmemory": "^1.6.6", "npm_package_devDependencies__vitejs_plugin_vue": "^2.0.0", "npm_package_scripts_dev": "vite", "MallocNanoZone": "0", "ORIGINAL_XDG_CURRENT_DESKTOP": "undefined", "ZDOTDIR": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/vscode-zsh", "npm_package_devDependencies_sass_loader": "^12.6.0", "TERM_SESSION_ID": "D96E4968-A398-4689-8637-E90900D2C0BA", "npm_config_registry": "https://registry.yarnpkg.com", "npm_package_readmeFilename": "README.md", "npm_package_dependencies_vue_load_image": "^1.1.0", "USER": "mac", "npm_package_description": "This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.", "npm_package_dependencies_graphql_tag": "^2.12.6", "npm_package_dependencies_apollo_link_http": "^1.5.17", "COMMAND_MODE": "unix2003", "SSH_AUTH_SOCK": "/private/tmp/com.apple.launchd.8aw7fjYhzP/Listeners", "__CF_USER_TEXT_ENCODING": "0x1F5:0x0:0x0", "npm_package_devDependencies_postcss": "^8.4.5", "npm_execpath": "/usr/local/lib/node_modules/yarn/bin/yarn.js", "npm_package_dependencies_graphql": "^15.8.0", "npm_package_dependencies_apollo_boost": "^0.4.9", "npm_package_dependencies__fortawesome_free_brands_svg_icons": "^6.2.0", "PATH": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/yarn--1664031490999-0.6494682133738998:/Users/mac/projects/fun/chewata/web/node_modules/.bin:/Users/mac/.config/yarn/link/node_modules/.bin:/Users/mac/.yarn/bin:/usr/local/libexec/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/lib/node_modules/npm/bin/node-gyp-bin:/usr/local/bin/node_modules/npm/bin/node-gyp-bin:/Users/mac/opt/anaconda3/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Users/mac/Downloads/flutter/bin:/usr/local/go/bin", "npm_config_argv": '{"remain":[],"cooked":["run","build"],"original":["build"]}', "npm_package_dependencies__fortawesome_free_solid_svg_icons": "^6.2.0", "_": "/Users/mac/projects/fun/chewata/web/node_modules/.bin/vite-ssg", "npm_package_dependencies_vue": "^3.2.25", "__CFBundleIdentifier": "com.microsoft.VSCode", "PWD": "/Users/mac/projects/fun/chewata/web", "npm_package_devDependencies_tailwindcss": "^3.0.15", "npm_package_scripts_preview": "vite preview", "npm_lifecycle_event": "build", "LANG": "en_US.UTF-8", "npm_package_name": "sports", "npm_package_devDependencies_sass": "^1.50.0", "npm_package_dependencies__vue_apollo_option": "^4.0.0-alpha.20", "npm_package_scripts_build": "vite-ssg build", "npm_config_version_commit_hooks": "true", "XPC_FLAGS": "0x0", "VSCODE_GIT_ASKPASS_EXTRA_ARGS": "--ms-enable-electron-run-as-node", "npm_package_dependencies_vue_3_meta": "^2.4.0", "npm_package_dependencies__fortawesome_vue_fontawesome": "^3.0.1", "npm_config_bin_links": "true", "npm_package_devDependencies_vite_ssg": "^0.20.2", "XPC_SERVICE_NAME": "0", "npm_package_version": "0.0.0", "VSCODE_INJECTION": "1", "npm_package_devDependencies_autoprefixer": "^10.4.2", "SHLVL": "4", "HOME": "/Users/mac", "APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL": "true", "VSCODE_GIT_ASKPASS_MAIN": "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js", "npm_package_dependencies_apollo_client": "^2.6.10", "npm_config_save_prefix": "^", "npm_config_strict_ssl": "true", "HOMEBREW_PREFIX": "/opt/homebrew", "npm_package_dependencies_infinite_loading_vue3": "^1.0.1", "npm_config_version_git_message": "v%s", "npm_package_dependencies_firebase": "^9.10.0", "npm_package_dependencies__vueuse_head": "^0.7.12", "LOGNAME": "mac", "YARN_WRAP_OUTPUT": "false", "npm_package_dependencies_vue_uuid": "^3.0.0", "npm_lifecycle_script": "vite-ssg build", "LC_CTYPE": "UTF-8", "VSCODE_GIT_IPC_HANDLE": "/var/folders/81/9hzkkkhx0pg1349vxdwt32yh0000gn/T/vscode-git-227b12fc25.sock", "npm_package_dependencies_vuex": "^4.0.2", "npm_package_dependencies_vuex_persistedstate": "^4.1.0", "npm_package_dependencies_apollo_link": "^1.2.14", "npm_config_version_git_sign": "", "npm_config_ignore_scripts": "", "npm_config_user_agent": "yarn/1.22.18 npm/? node/v16.14.2 darwin arm64", "INFOPATH": "/opt/homebrew/share/info:/opt/homebrew/share/info:", "HOMEBREW_CELLAR": "/opt/homebrew/Cellar", "GIT_ASKPASS": "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh", "VSCODE_GIT_ASKPASS_NODE": "/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper.app/Contents/MacOS/Code Helper", "npm_package_devDependencies__types_node": "^17.0.10", "npm_package_dependencies_vue_infinite_scroll": "^2.0.2", "npm_package_dependencies__fortawesome_free_regular_svg_icons": "^6.2.0", "npm_config_init_version": "1.0.0", "npm_config_ignore_optional": "", "npm_package_dependencies_vue_router": "^4.0.12", "npm_package_dependencies__apollo_client": "^3.6.9", "COLORTERM": "truecolor", "npm_node_execpath": "/usr/local/bin/node", "npm_package_devDependencies_vue_tsc": "^0.29.8", "npm_config_version_tag_prefix": "v", "NODE_ENV": "production", "VITE_SSG": "true" }.NODE_ENV;
  }) && !maybe(function() {
    return process;
  })) {
    Object.defineProperty(safeGlobal, "process", {
      value: {
        env: {
          NODE_ENV: "production"
        }
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
    needToRemove = true;
  }
}
install();
function remove() {
  if (needToRemove) {
    delete safeGlobal.process;
    needToRemove = false;
  }
}
function removeTemporaryGlobals() {
  return typeof Source === "function" ? remove() : remove();
}
function checkDEV() {
  __DEV__ ? invariant(typeof DEV === "boolean", DEV) : invariant(typeof DEV === "boolean", 36);
}
removeTemporaryGlobals();
checkDEV();
var globals = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEV,
  checkDEV,
  get invariant() {
    return invariant;
  },
  InvariantError,
  maybe: maybe$1,
  global: global$1
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(globals);
function shouldInclude(_a2, variables) {
  var directives = _a2.directives;
  if (!directives || !directives.length) {
    return true;
  }
  return getInclusionDirectives(directives).every(function(_a3) {
    var directive = _a3.directive, ifArgument = _a3.ifArgument;
    var evaledValue = false;
    if (ifArgument.value.kind === "Variable") {
      evaledValue = variables && variables[ifArgument.value.name.value];
      __DEV__ ? invariant(evaledValue !== void 0, "Invalid variable referenced in @".concat(directive.name.value, " directive.")) : invariant(evaledValue !== void 0, 37);
    } else {
      evaledValue = ifArgument.value.value;
    }
    return directive.name.value === "skip" ? !evaledValue : evaledValue;
  });
}
function getDirectiveNames(root) {
  var names = [];
  visit(root, {
    Directive: function(node) {
      names.push(node.name.value);
    }
  });
  return names;
}
function hasDirectives(names, root) {
  return getDirectiveNames(root).some(function(name) {
    return names.indexOf(name) > -1;
  });
}
function hasClientExports(document2) {
  return document2 && hasDirectives(["client"], document2) && hasDirectives(["export"], document2);
}
function isInclusionDirective(_a2) {
  var value = _a2.name.value;
  return value === "skip" || value === "include";
}
function getInclusionDirectives(directives) {
  var result = [];
  if (directives && directives.length) {
    directives.forEach(function(directive) {
      if (!isInclusionDirective(directive))
        return;
      var directiveArguments = directive.arguments;
      var directiveName = directive.name.value;
      __DEV__ ? invariant(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @".concat(directiveName, " directive.")) : invariant(directiveArguments && directiveArguments.length === 1, 38);
      var ifArgument = directiveArguments[0];
      __DEV__ ? invariant(ifArgument.name && ifArgument.name.value === "if", "Invalid argument for the @".concat(directiveName, " directive.")) : invariant(ifArgument.name && ifArgument.name.value === "if", 39);
      var ifValue = ifArgument.value;
      __DEV__ ? invariant(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), "Argument for the @".concat(directiveName, " directive must be a variable or a boolean value.")) : invariant(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 40);
      result.push({ directive, ifArgument });
    });
  }
  return result;
}
function getFragmentQueryDocument(document2, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document2.definitions.forEach(function(definition) {
    if (definition.kind === "OperationDefinition") {
      throw __DEV__ ? new InvariantError("Found a ".concat(definition.operation, " operation").concat(definition.name ? " named '".concat(definition.name.value, "'") : "", ". ") + "No operations are allowed when using a fragment as a query. Only fragments are allowed.") : new InvariantError(41);
    }
    if (definition.kind === "FragmentDefinition") {
      fragments.push(definition);
    }
  });
  if (typeof actualFragmentName === "undefined") {
    __DEV__ ? invariant(fragments.length === 1, "Found ".concat(fragments.length, " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.")) : invariant(fragments.length === 1, 42);
    actualFragmentName = fragments[0].name.value;
  }
  var query2 = tslib.exports.__assign(tslib.exports.__assign({}, document2), { definitions: tslib.exports.__spreadArray([
    {
      kind: "OperationDefinition",
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: actualFragmentName
            }
          }
        ]
      }
    }
  ], document2.definitions, true) });
  return query2;
}
function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }
  var symTable = {};
  fragments.forEach(function(fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}
function getFragmentFromSelection(selection, fragmentMap) {
  switch (selection.kind) {
    case "InlineFragment":
      return selection;
    case "FragmentSpread": {
      var fragment = fragmentMap && fragmentMap[selection.name.value];
      __DEV__ ? invariant(fragment, "No fragment named ".concat(selection.name.value, ".")) : invariant(fragment, 43);
      return fragment;
    }
    default:
      return null;
  }
}
function isNonNullObject(obj) {
  return obj !== null && typeof obj === "object";
}
function makeReference(id) {
  return { __ref: String(id) };
}
function isReference(obj) {
  return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
}
function isDocumentNode(value) {
  return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
}
function isStringValue(value) {
  return value.kind === "StringValue";
}
function isBooleanValue(value) {
  return value.kind === "BooleanValue";
}
function isIntValue(value) {
  return value.kind === "IntValue";
}
function isFloatValue(value) {
  return value.kind === "FloatValue";
}
function isVariable(value) {
  return value.kind === "Variable";
}
function isObjectValue(value) {
  return value.kind === "ObjectValue";
}
function isListValue(value) {
  return value.kind === "ListValue";
}
function isEnumValue(value) {
  return value.kind === "EnumValue";
}
function isNullValue(value) {
  return value.kind === "NullValue";
}
function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function(obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function(listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw __DEV__ ? new InvariantError('The inline argument "'.concat(name.value, '" of kind "').concat(value.kind, '"') + "is not supported. Use variables instead of inline arguments to overcome this limitation.") : new InvariantError(52);
  }
}
function storeKeyNameFromField(field, variables) {
  var directivesObj = null;
  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function(directive) {
      directivesObj[directive.name.value] = {};
      if (directive.arguments) {
        directive.arguments.forEach(function(_a2) {
          var name = _a2.name, value = _a2.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }
  var argObj = null;
  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }
  return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export"
];
var getStoreKeyName = Object.assign(function(fieldName, args, directives) {
  if (args && directives && directives["connection"] && directives["connection"]["key"]) {
    if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
      var filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
      filterKeys.sort();
      var filteredArgs_1 = {};
      filterKeys.forEach(function(key) {
        filteredArgs_1[key] = args[key];
      });
      return "".concat(directives["connection"]["key"], "(").concat(stringify(filteredArgs_1), ")");
    } else {
      return directives["connection"]["key"];
    }
  }
  var completeFieldName = fieldName;
  if (args) {
    var stringifiedArgs = stringify(args);
    completeFieldName += "(".concat(stringifiedArgs, ")");
  }
  if (directives) {
    Object.keys(directives).forEach(function(key) {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
        return;
      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += "@".concat(key, "(").concat(stringify(directives[key]), ")");
      } else {
        completeFieldName += "@".concat(key);
      }
    });
  }
  return completeFieldName;
}, {
  setStringify: function(s) {
    var previous = stringify;
    stringify = s;
    return previous;
  }
});
var stringify = function defaultStringify(value) {
  return JSON.stringify(value, stringifyReplacer);
};
function stringifyReplacer(_key, value) {
  if (isNonNullObject(value) && !Array.isArray(value)) {
    value = Object.keys(value).sort().reduce(function(copy, key) {
      copy[key] = value[key];
      return copy;
    }, {});
  }
  return value;
}
function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }
  return null;
}
function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}
function getTypenameFromResult(result, selectionSet, fragmentMap) {
  if (typeof result.__typename === "string") {
    return result.__typename;
  }
  for (var _i = 0, _a2 = selectionSet.selections; _i < _a2.length; _i++) {
    var selection = _a2[_i];
    if (isField(selection)) {
      if (selection.name.value === "__typename") {
        return result[resultKeyNameFromField(selection)];
      }
    } else {
      var typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
      if (typeof typename === "string") {
        return typename;
      }
    }
  }
}
function isField(selection) {
  return selection.kind === "Field";
}
function isInlineFragment(selection) {
  return selection.kind === "InlineFragment";
}
function checkDocument(doc) {
  __DEV__ ? invariant(doc && doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : invariant(doc && doc.kind === "Document", 44);
  var operations = doc.definitions.filter(function(d) {
    return d.kind !== "FragmentDefinition";
  }).map(function(definition) {
    if (definition.kind !== "OperationDefinition") {
      throw __DEV__ ? new InvariantError('Schema type definitions not allowed in queries. Found: "'.concat(definition.kind, '"')) : new InvariantError(45);
    }
    return definition;
  });
  __DEV__ ? invariant(operations.length <= 1, "Ambiguous GraphQL document: contains ".concat(operations.length, " operations")) : invariant(operations.length <= 1, 46);
  return doc;
}
function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition";
  })[0];
}
function getOperationName(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition" && definition.name;
  }).map(function(x) {
    return x.name.value;
  })[0] || null;
}
function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "FragmentDefinition";
  });
}
function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
  __DEV__ ? invariant(queryDef && queryDef.operation === "query", "Must contain a query definition.") : invariant(queryDef && queryDef.operation === "query", 47);
  return queryDef;
}
function getFragmentDefinition(doc) {
  __DEV__ ? invariant(doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : invariant(doc.kind === "Document", 48);
  __DEV__ ? invariant(doc.definitions.length <= 1, "Fragment must have exactly one definition.") : invariant(doc.definitions.length <= 1, 49);
  var fragmentDef = doc.definitions[0];
  __DEV__ ? invariant(fragmentDef.kind === "FragmentDefinition", "Must be a fragment definition.") : invariant(fragmentDef.kind === "FragmentDefinition", 50);
  return fragmentDef;
}
function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;
  for (var _i = 0, _a2 = queryDoc.definitions; _i < _a2.length; _i++) {
    var definition = _a2[_i];
    if (definition.kind === "OperationDefinition") {
      var operation = definition.operation;
      if (operation === "query" || operation === "mutation" || operation === "subscription") {
        return definition;
      }
    }
    if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }
  if (fragmentDefinition) {
    return fragmentDefinition;
  }
  throw __DEV__ ? new InvariantError("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.") : new InvariantError(51);
}
function getDefaultValues(definition) {
  var defaultValues = /* @__PURE__ */ Object.create(null);
  var defs = definition && definition.variableDefinitions;
  if (defs && defs.length) {
    defs.forEach(function(def) {
      if (def.defaultValue) {
        valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
      }
    });
  }
  return defaultValues;
}
function filterInPlace(array, test, context) {
  var target = 0;
  array.forEach(function(elem, i) {
    if (test.call(this, elem, i, array)) {
      array[target++] = elem;
    }
  }, context);
  array.length = target;
  return array;
}
var TYPENAME_FIELD = {
  kind: "Field",
  name: {
    kind: "Name",
    value: "__typename"
  }
};
function isEmpty(op, fragments) {
  return op.selectionSet.selections.every(function(selection) {
    return selection.kind === "FragmentSpread" && isEmpty(fragments[selection.name.value], fragments);
  });
}
function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}
function getDirectiveMatcher(directives) {
  return function directiveMatcher(directive) {
    return directives.some(function(dir) {
      return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
    });
  };
}
function removeDirectivesFromDocument(directives, doc) {
  var variablesInUse = /* @__PURE__ */ Object.create(null);
  var variablesToRemove = [];
  var fragmentSpreadsInUse = /* @__PURE__ */ Object.create(null);
  var fragmentSpreadsToRemove = [];
  var modifiedDoc = nullIfDocIsEmpty(visit(doc, {
    Variable: {
      enter: function(node, _key, parent) {
        if (parent.kind !== "VariableDefinition") {
          variablesInUse[node.name.value] = true;
        }
      }
    },
    Field: {
      enter: function(node) {
        if (directives && node.directives) {
          var shouldRemoveField = directives.some(function(directive) {
            return directive.remove;
          });
          if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
            if (node.arguments) {
              node.arguments.forEach(function(arg) {
                if (arg.value.kind === "Variable") {
                  variablesToRemove.push({
                    name: arg.value.name.value
                  });
                }
              });
            }
            if (node.selectionSet) {
              getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function(frag) {
                fragmentSpreadsToRemove.push({
                  name: frag.name.value
                });
              });
            }
            return null;
          }
        }
      }
    },
    FragmentSpread: {
      enter: function(node) {
        fragmentSpreadsInUse[node.name.value] = true;
      }
    },
    Directive: {
      enter: function(node) {
        if (getDirectiveMatcher(directives)(node)) {
          return null;
        }
      }
    }
  }));
  if (modifiedDoc && filterInPlace(variablesToRemove, function(v) {
    return !!v.name && !variablesInUse[v.name];
  }).length) {
    modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
  }
  if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function(fs) {
    return !!fs.name && !fragmentSpreadsInUse[fs.name];
  }).length) {
    modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
  }
  return modifiedDoc;
}
var addTypenameToDocument = Object.assign(function(doc) {
  return visit(doc, {
    SelectionSet: {
      enter: function(node, _key, parent) {
        if (parent && parent.kind === "OperationDefinition") {
          return;
        }
        var selections = node.selections;
        if (!selections) {
          return;
        }
        var skip = selections.some(function(selection) {
          return isField(selection) && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
        });
        if (skip) {
          return;
        }
        var field = parent;
        if (isField(field) && field.directives && field.directives.some(function(d) {
          return d.name.value === "export";
        })) {
          return;
        }
        return tslib.exports.__assign(tslib.exports.__assign({}, node), { selections: tslib.exports.__spreadArray(tslib.exports.__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
      }
    }
  });
}, {
  added: function(field) {
    return field === TYPENAME_FIELD;
  }
});
var connectionRemoveConfig = {
  test: function(directive) {
    var willRemove = directive.name.value === "connection";
    if (willRemove) {
      if (!directive.arguments || !directive.arguments.some(function(arg) {
        return arg.name.value === "key";
      })) {
        __DEV__ && invariant.warn("Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key.");
      }
    }
    return willRemove;
  }
};
function removeConnectionDirectiveFromDocument(doc) {
  return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}
function getArgumentMatcher(config2) {
  return function argumentMatcher(argument) {
    return config2.some(function(aConfig) {
      return argument.value && argument.value.kind === "Variable" && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
    });
  };
}
function removeArgumentsFromDocument(config2, doc) {
  var argMatcher = getArgumentMatcher(config2);
  return nullIfDocIsEmpty(visit(doc, {
    OperationDefinition: {
      enter: function(node) {
        return tslib.exports.__assign(tslib.exports.__assign({}, node), { variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function(varDef) {
          return !config2.some(function(arg) {
            return arg.name === varDef.variable.name.value;
          });
        }) : [] });
      }
    },
    Field: {
      enter: function(node) {
        var shouldRemoveField = config2.some(function(argConfig) {
          return argConfig.remove;
        });
        if (shouldRemoveField) {
          var argMatchCount_1 = 0;
          if (node.arguments) {
            node.arguments.forEach(function(arg) {
              if (argMatcher(arg)) {
                argMatchCount_1 += 1;
              }
            });
          }
          if (argMatchCount_1 === 1) {
            return null;
          }
        }
      }
    },
    Argument: {
      enter: function(node) {
        if (argMatcher(node)) {
          return null;
        }
      }
    }
  }));
}
function removeFragmentSpreadFromDocument(config2, doc) {
  function enter(node) {
    if (config2.some(function(def) {
      return def.name === node.name.value;
    })) {
      return null;
    }
  }
  return nullIfDocIsEmpty(visit(doc, {
    FragmentSpread: { enter },
    FragmentDefinition: { enter }
  }));
}
function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
  var allFragments = [];
  selectionSet.selections.forEach(function(selection) {
    if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
      getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function(frag) {
        return allFragments.push(frag);
      });
    } else if (selection.kind === "FragmentSpread") {
      allFragments.push(selection);
    }
  });
  return allFragments;
}
function buildQueryFromSelectionSet(document2) {
  var definition = getMainDefinition(document2);
  var definitionOperation = definition.operation;
  if (definitionOperation === "query") {
    return document2;
  }
  var modifiedDoc = visit(document2, {
    OperationDefinition: {
      enter: function(node) {
        return tslib.exports.__assign(tslib.exports.__assign({}, node), { operation: "query" });
      }
    }
  });
  return modifiedDoc;
}
function removeClientSetsFromDocument(document2) {
  checkDocument(document2);
  var modifiedDoc = removeDirectivesFromDocument([
    {
      test: function(directive) {
        return directive.name.value === "client";
      },
      remove: true
    }
  ], document2);
  if (modifiedDoc) {
    modifiedDoc = visit(modifiedDoc, {
      FragmentDefinition: {
        enter: function(node) {
          if (node.selectionSet) {
            var isTypenameOnly = node.selectionSet.selections.every(function(selection) {
              return isField(selection) && selection.name.value === "__typename";
            });
            if (isTypenameOnly) {
              return null;
            }
          }
        }
      }
    });
  }
  return modifiedDoc;
}
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
function mergeDeep() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;
  if (count > 1) {
    var merger = new DeepMerger();
    for (var i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }
  return target;
}
var defaultReconciler = function(target, source, property) {
  return this.merge(target[property], source[property]);
};
var DeepMerger = function() {
  function DeepMerger2(reconciler) {
    if (reconciler === void 0) {
      reconciler = defaultReconciler;
    }
    this.reconciler = reconciler;
    this.isObject = isNonNullObject;
    this.pastCopies = /* @__PURE__ */ new Set();
  }
  DeepMerger2.prototype.merge = function(target, source) {
    var _this = this;
    var context = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      context[_i - 2] = arguments[_i];
    }
    if (isNonNullObject(source) && isNonNullObject(target)) {
      Object.keys(source).forEach(function(sourceKey) {
        if (hasOwnProperty$3.call(target, sourceKey)) {
          var targetValue = target[sourceKey];
          if (source[sourceKey] !== targetValue) {
            var result = _this.reconciler.apply(_this, tslib.exports.__spreadArray([target, source, sourceKey], context, false));
            if (result !== targetValue) {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = result;
            }
          }
        } else {
          target = _this.shallowCopyForMerge(target);
          target[sourceKey] = source[sourceKey];
        }
      });
      return target;
    }
    return source;
  };
  DeepMerger2.prototype.shallowCopyForMerge = function(value) {
    if (isNonNullObject(value)) {
      if (!this.pastCopies.has(value)) {
        if (Array.isArray(value)) {
          value = value.slice(0);
        } else {
          value = tslib.exports.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        this.pastCopies.add(value);
      }
    }
    return value;
  };
  return DeepMerger2;
}();
function concatPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    merge: function(existing, incoming) {
      return existing ? tslib.exports.__spreadArray(tslib.exports.__spreadArray([], existing, true), incoming, true) : incoming;
    }
  };
}
function offsetLimitPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    merge: function(existing, incoming, _a2) {
      var args = _a2.args;
      var merged = existing ? existing.slice(0) : [];
      if (incoming) {
        if (args) {
          var _b = args.offset, offset = _b === void 0 ? 0 : _b;
          for (var i = 0; i < incoming.length; ++i) {
            merged[offset + i] = incoming[i];
          }
        } else {
          merged.push.apply(merged, incoming);
        }
      }
      return merged;
    }
  };
}
function relayStylePagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    read: function(existing, _a2) {
      var canRead = _a2.canRead, readField = _a2.readField;
      if (!existing)
        return existing;
      var edges = [];
      var firstEdgeCursor = "";
      var lastEdgeCursor = "";
      existing.edges.forEach(function(edge) {
        if (canRead(readField("node", edge))) {
          edges.push(edge);
          if (edge.cursor) {
            firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
            lastEdgeCursor = edge.cursor || lastEdgeCursor;
          }
        }
      });
      var _b = existing.pageInfo || {}, startCursor = _b.startCursor, endCursor = _b.endCursor;
      return tslib.exports.__assign(tslib.exports.__assign({}, getExtras(existing)), { edges, pageInfo: tslib.exports.__assign(tslib.exports.__assign({}, existing.pageInfo), { startCursor: startCursor || firstEdgeCursor, endCursor: endCursor || lastEdgeCursor }) });
    },
    merge: function(existing, incoming, _a2) {
      var args = _a2.args, isReference2 = _a2.isReference, readField = _a2.readField;
      if (!existing) {
        existing = makeEmptyData();
      }
      if (!incoming) {
        return existing;
      }
      var incomingEdges = incoming.edges ? incoming.edges.map(function(edge) {
        if (isReference2(edge = tslib.exports.__assign({}, edge))) {
          edge.cursor = readField("cursor", edge);
        }
        return edge;
      }) : [];
      if (incoming.pageInfo) {
        var pageInfo_1 = incoming.pageInfo;
        var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
        var firstEdge = incomingEdges[0];
        var lastEdge = incomingEdges[incomingEdges.length - 1];
        if (firstEdge && startCursor) {
          firstEdge.cursor = startCursor;
        }
        if (lastEdge && endCursor) {
          lastEdge.cursor = endCursor;
        }
        var firstCursor = firstEdge && firstEdge.cursor;
        if (firstCursor && !startCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              startCursor: firstCursor
            }
          });
        }
        var lastCursor = lastEdge && lastEdge.cursor;
        if (lastCursor && !endCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              endCursor: lastCursor
            }
          });
        }
      }
      var prefix = existing.edges;
      var suffix = [];
      if (args && args.after) {
        var index2 = prefix.findIndex(function(edge) {
          return edge.cursor === args.after;
        });
        if (index2 >= 0) {
          prefix = prefix.slice(0, index2 + 1);
        }
      } else if (args && args.before) {
        var index2 = prefix.findIndex(function(edge) {
          return edge.cursor === args.before;
        });
        suffix = index2 < 0 ? prefix : prefix.slice(index2);
        prefix = [];
      } else if (incoming.edges) {
        prefix = [];
      }
      var edges = tslib.exports.__spreadArray(tslib.exports.__spreadArray(tslib.exports.__spreadArray([], prefix, true), incomingEdges, true), suffix, true);
      var pageInfo = tslib.exports.__assign(tslib.exports.__assign({}, incoming.pageInfo), existing.pageInfo);
      if (incoming.pageInfo) {
        var _b = incoming.pageInfo, hasPreviousPage = _b.hasPreviousPage, hasNextPage = _b.hasNextPage, startCursor = _b.startCursor, endCursor = _b.endCursor, extras = tslib.exports.__rest(_b, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
        Object.assign(pageInfo, extras);
        if (!prefix.length) {
          if (hasPreviousPage !== void 0)
            pageInfo.hasPreviousPage = hasPreviousPage;
          if (startCursor !== void 0)
            pageInfo.startCursor = startCursor;
        }
        if (!suffix.length) {
          if (hasNextPage !== void 0)
            pageInfo.hasNextPage = hasNextPage;
          if (endCursor !== void 0)
            pageInfo.endCursor = endCursor;
        }
      }
      return tslib.exports.__assign(tslib.exports.__assign(tslib.exports.__assign({}, getExtras(existing)), getExtras(incoming)), { edges, pageInfo });
    }
  };
}
var getExtras = function(obj) {
  return tslib.exports.__rest(obj, notExtras);
};
var notExtras = ["edges", "pageInfo"];
function makeEmptyData() {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: true,
      startCursor: "",
      endCursor: ""
    }
  };
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var hasSymbols = function() {
  return typeof Symbol === "function";
};
var hasSymbol = function(name) {
  return hasSymbols() && Boolean(Symbol[name]);
};
var getSymbol = function(name) {
  return hasSymbol(name) ? Symbol[name] : "@@" + name;
};
if (hasSymbols() && !hasSymbol("observable")) {
  Symbol.observable = Symbol("observable");
}
var SymbolIterator = getSymbol("iterator");
var SymbolObservable = getSymbol("observable");
var SymbolSpecies = getSymbol("species");
function getMethod(obj, key) {
  var value = obj[key];
  if (value == null)
    return void 0;
  if (typeof value !== "function")
    throw new TypeError(value + " is not a function");
  return value;
}
function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== void 0) {
    ctor = ctor[SymbolSpecies];
    if (ctor === null) {
      ctor = void 0;
    }
  }
  return ctor !== void 0 ? ctor : Observable;
}
function isObservable(x) {
  return x instanceof Observable;
}
function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function() {
      throw e;
    });
  }
}
function enqueue(fn) {
  Promise.resolve().then(function() {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}
function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === void 0)
    return;
  subscription._cleanup = void 0;
  if (!cleanup) {
    return;
  }
  try {
    if (typeof cleanup === "function") {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, "unsubscribe");
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}
function closeSubscription(subscription) {
  subscription._observer = void 0;
  subscription._queue = void 0;
  subscription._state = "closed";
}
function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = void 0;
  subscription._state = "ready";
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === "closed")
      break;
  }
}
function notifySubscription(subscription, type, value) {
  subscription._state = "running";
  var observer = subscription._observer;
  try {
    var m = getMethod(observer, type);
    switch (type) {
      case "next":
        if (m)
          m.call(observer, value);
        break;
      case "error":
        closeSubscription(subscription);
        if (m)
          m.call(observer, value);
        else
          throw value;
        break;
      case "complete":
        closeSubscription(subscription);
        if (m)
          m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }
  if (subscription._state === "closed")
    cleanupSubscription(subscription);
  else if (subscription._state === "running")
    subscription._state = "ready";
}
function onNotify(subscription, type, value) {
  if (subscription._state === "closed")
    return;
  if (subscription._state === "buffering") {
    subscription._queue.push({
      type,
      value
    });
    return;
  }
  if (subscription._state !== "ready") {
    subscription._state = "buffering";
    subscription._queue = [{
      type,
      value
    }];
    enqueue(function() {
      return flushSubscription(subscription);
    });
    return;
  }
  notifySubscription(subscription, type, value);
}
var Subscription = /* @__PURE__ */ function() {
  function Subscription2(observer, subscriber) {
    this._cleanup = void 0;
    this._observer = observer;
    this._queue = void 0;
    this._state = "initializing";
    var subscriptionObserver = new SubscriptionObserver(this);
    try {
      this._cleanup = subscriber.call(void 0, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }
    if (this._state === "initializing")
      this._state = "ready";
  }
  var _proto = Subscription2.prototype;
  _proto.unsubscribe = function unsubscribe() {
    if (this._state !== "closed") {
      closeSubscription(this);
      cleanupSubscription(this);
    }
  };
  _createClass(Subscription2, [{
    key: "closed",
    get: function() {
      return this._state === "closed";
    }
  }]);
  return Subscription2;
}();
var SubscriptionObserver = /* @__PURE__ */ function() {
  function SubscriptionObserver2(subscription) {
    this._subscription = subscription;
  }
  var _proto2 = SubscriptionObserver2.prototype;
  _proto2.next = function next(value) {
    onNotify(this._subscription, "next", value);
  };
  _proto2.error = function error(value) {
    onNotify(this._subscription, "error", value);
  };
  _proto2.complete = function complete() {
    onNotify(this._subscription, "complete");
  };
  _createClass(SubscriptionObserver2, [{
    key: "closed",
    get: function() {
      return this._subscription._state === "closed";
    }
  }]);
  return SubscriptionObserver2;
}();
var Observable = /* @__PURE__ */ function() {
  function Observable2(subscriber) {
    if (!(this instanceof Observable2))
      throw new TypeError("Observable cannot be called as a function");
    if (typeof subscriber !== "function")
      throw new TypeError("Observable initializer must be a function");
    this._subscriber = subscriber;
  }
  var _proto3 = Observable2.prototype;
  _proto3.subscribe = function subscribe(observer) {
    if (typeof observer !== "object" || observer === null) {
      observer = {
        next: observer,
        error: arguments[1],
        complete: arguments[2]
      };
    }
    return new Subscription(observer, this._subscriber);
  };
  _proto3.forEach = function forEach2(fn) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      if (typeof fn !== "function") {
        reject(new TypeError(fn + " is not a function"));
        return;
      }
      function done() {
        subscription.unsubscribe();
        resolve();
      }
      var subscription = _this.subscribe({
        next: function(value) {
          try {
            fn(value, done);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  };
  _proto3.map = function map(fn) {
    var _this2 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C = getSpecies(this);
    return new C(function(observer) {
      return _this2.subscribe({
        next: function(value) {
          try {
            value = fn(value);
          } catch (e) {
            return observer.error(e);
          }
          observer.next(value);
        },
        error: function(e) {
          observer.error(e);
        },
        complete: function() {
          observer.complete();
        }
      });
    });
  };
  _proto3.filter = function filter(fn) {
    var _this3 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C = getSpecies(this);
    return new C(function(observer) {
      return _this3.subscribe({
        next: function(value) {
          try {
            if (!fn(value))
              return;
          } catch (e) {
            return observer.error(e);
          }
          observer.next(value);
        },
        error: function(e) {
          observer.error(e);
        },
        complete: function() {
          observer.complete();
        }
      });
    });
  };
  _proto3.reduce = function reduce(fn) {
    var _this4 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C = getSpecies(this);
    var hasSeed = arguments.length > 1;
    var hasValue = false;
    var seed = arguments[1];
    var acc = seed;
    return new C(function(observer) {
      return _this4.subscribe({
        next: function(value) {
          var first = !hasValue;
          hasValue = true;
          if (!first || hasSeed) {
            try {
              acc = fn(acc, value);
            } catch (e) {
              return observer.error(e);
            }
          } else {
            acc = value;
          }
        },
        error: function(e) {
          observer.error(e);
        },
        complete: function() {
          if (!hasValue && !hasSeed)
            return observer.error(new TypeError("Cannot reduce an empty sequence"));
          observer.next(acc);
          observer.complete();
        }
      });
    });
  };
  _proto3.concat = function concat2() {
    var _this5 = this;
    for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }
    var C = getSpecies(this);
    return new C(function(observer) {
      var subscription;
      var index2 = 0;
      function startNext(next) {
        subscription = next.subscribe({
          next: function(v) {
            observer.next(v);
          },
          error: function(e) {
            observer.error(e);
          },
          complete: function() {
            if (index2 === sources.length) {
              subscription = void 0;
              observer.complete();
            } else {
              startNext(C.from(sources[index2++]));
            }
          }
        });
      }
      startNext(_this5);
      return function() {
        if (subscription) {
          subscription.unsubscribe();
          subscription = void 0;
        }
      };
    });
  };
  _proto3.flatMap = function flatMap(fn) {
    var _this6 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C = getSpecies(this);
    return new C(function(observer) {
      var subscriptions = [];
      var outer = _this6.subscribe({
        next: function(value) {
          if (fn) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
          }
          var inner = C.from(value).subscribe({
            next: function(value2) {
              observer.next(value2);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              var i = subscriptions.indexOf(inner);
              if (i >= 0)
                subscriptions.splice(i, 1);
              completeIfDone();
            }
          });
          subscriptions.push(inner);
        },
        error: function(e) {
          observer.error(e);
        },
        complete: function() {
          completeIfDone();
        }
      });
      function completeIfDone() {
        if (outer.closed && subscriptions.length === 0)
          observer.complete();
      }
      return function() {
        subscriptions.forEach(function(s) {
          return s.unsubscribe();
        });
        outer.unsubscribe();
      };
    });
  };
  _proto3[SymbolObservable] = function() {
    return this;
  };
  Observable2.from = function from2(x) {
    var C = typeof this === "function" ? this : Observable2;
    if (x == null)
      throw new TypeError(x + " is not an object");
    var method = getMethod(x, SymbolObservable);
    if (method) {
      var observable = method.call(x);
      if (Object(observable) !== observable)
        throw new TypeError(observable + " is not an object");
      if (isObservable(observable) && observable.constructor === C)
        return observable;
      return new C(function(observer) {
        return observable.subscribe(observer);
      });
    }
    if (hasSymbol("iterator")) {
      method = getMethod(x, SymbolIterator);
      if (method) {
        return new C(function(observer) {
          enqueue(function() {
            if (observer.closed)
              return;
            for (var _iterator = _createForOfIteratorHelperLoose(method.call(x)), _step; !(_step = _iterator()).done; ) {
              var item = _step.value;
              observer.next(item);
              if (observer.closed)
                return;
            }
            observer.complete();
          });
        });
      }
    }
    if (Array.isArray(x)) {
      return new C(function(observer) {
        enqueue(function() {
          if (observer.closed)
            return;
          for (var i = 0; i < x.length; ++i) {
            observer.next(x[i]);
            if (observer.closed)
              return;
          }
          observer.complete();
        });
      });
    }
    throw new TypeError(x + " is not observable");
  };
  Observable2.of = function of() {
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    var C = typeof this === "function" ? this : Observable2;
    return new C(function(observer) {
      enqueue(function() {
        if (observer.closed)
          return;
        for (var i = 0; i < items.length; ++i) {
          observer.next(items[i]);
          if (observer.closed)
            return;
        }
        observer.complete();
      });
    });
  };
  _createClass(Observable2, null, [{
    key: SymbolSpecies,
    get: function() {
      return this;
    }
  }]);
  return Observable2;
}();
if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol("extensions"), {
    value: {
      symbol: SymbolObservable,
      hostReportError
    },
    configurable: true
  });
}
var toString$1 = Object.prototype.toString;
function cloneDeep(value) {
  return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
  switch (toString$1.call(val)) {
    case "[object Array]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_1 = val.slice(0);
      seen.set(val, copy_1);
      copy_1.forEach(function(child, i) {
        copy_1[i] = cloneDeepHelper(child, seen);
      });
      return copy_1;
    }
    case "[object Object]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_2 = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy_2);
      Object.keys(val).forEach(function(key) {
        copy_2[key] = cloneDeepHelper(val[key], seen);
      });
      return copy_2;
    }
    default:
      return val;
  }
}
function deepFreeze(value) {
  var workSet = /* @__PURE__ */ new Set([value]);
  workSet.forEach(function(obj) {
    if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        if (isNonNullObject(obj[name]))
          workSet.add(obj[name]);
      });
    }
  });
  return value;
}
function shallowFreeze(obj) {
  if (__DEV__ && !Object.isFrozen(obj)) {
    try {
      Object.freeze(obj);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  }
  return obj;
}
function maybeDeepFreeze(obj) {
  if (__DEV__) {
    deepFreeze(obj);
  }
  return obj;
}
function iterateObserversSafely(observers, method, argument) {
  var observersWithMethod = [];
  observers.forEach(function(obs) {
    return obs[method] && observersWithMethod.push(obs);
  });
  observersWithMethod.forEach(function(obs) {
    return obs[method](argument);
  });
}
function asyncMap(observable, mapFn, catchFn) {
  return new Observable(function(observer) {
    var next = observer.next, error = observer.error, complete = observer.complete;
    var activeCallbackCount = 0;
    var completed = false;
    var promiseQueue = {
      then: function(callback) {
        return new Promise(function(resolve) {
          return resolve(callback());
        });
      }
    };
    function makeCallback(examiner, delegate) {
      if (examiner) {
        return function(arg) {
          ++activeCallbackCount;
          var both = function() {
            return examiner(arg);
          };
          promiseQueue = promiseQueue.then(both, both).then(function(result) {
            --activeCallbackCount;
            next && next.call(observer, result);
            if (completed) {
              handler.complete();
            }
          }, function(error2) {
            --activeCallbackCount;
            throw error2;
          }).catch(function(caught) {
            error && error.call(observer, caught);
          });
        };
      } else {
        return function(arg) {
          return delegate && delegate.call(observer, arg);
        };
      }
    }
    var handler = {
      next: makeCallback(mapFn, next),
      error: makeCallback(catchFn, error),
      complete: function() {
        completed = true;
        if (!activeCallbackCount) {
          complete && complete.call(observer);
        }
      }
    };
    var sub = observable.subscribe(handler);
    return function() {
      return sub.unsubscribe();
    };
  });
}
var canUseWeakMap = typeof WeakMap === "function" && maybe$1(function() {
  return navigator.product;
}) !== "ReactNative";
var canUseWeakSet = typeof WeakSet === "function";
var canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
var canUseDOM = typeof maybe$1(function() {
  return window.document.createElement;
}) === "function";
var usingJSDOM = maybe$1(function() {
  return navigator.userAgent.indexOf("jsdom") >= 0;
}) || false;
var canUseLayoutEffect = canUseDOM && !usingJSDOM;
function fixObservableSubclass(subclass) {
  function set(key) {
    Object.defineProperty(subclass, key, { value: Observable });
  }
  if (canUseSymbol && Symbol.species) {
    set(Symbol.species);
  }
  set("@@species");
  return subclass;
}
function isPromiseLike(value) {
  return value && typeof value.then === "function";
}
var Concast = function(_super) {
  tslib.exports.__extends(Concast2, _super);
  function Concast2(sources) {
    var _this = _super.call(this, function(observer) {
      _this.addObserver(observer);
      return function() {
        return _this.removeObserver(observer);
      };
    }) || this;
    _this.observers = /* @__PURE__ */ new Set();
    _this.addCount = 0;
    _this.promise = new Promise(function(resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
    _this.handlers = {
      next: function(result) {
        if (_this.sub !== null) {
          _this.latest = ["next", result];
          iterateObserversSafely(_this.observers, "next", result);
        }
      },
      error: function(error) {
        var sub = _this.sub;
        if (sub !== null) {
          if (sub)
            setTimeout(function() {
              return sub.unsubscribe();
            });
          _this.sub = null;
          _this.latest = ["error", error];
          _this.reject(error);
          iterateObserversSafely(_this.observers, "error", error);
        }
      },
      complete: function() {
        var sub = _this.sub;
        if (sub !== null) {
          var value = _this.sources.shift();
          if (!value) {
            if (sub)
              setTimeout(function() {
                return sub.unsubscribe();
              });
            _this.sub = null;
            if (_this.latest && _this.latest[0] === "next") {
              _this.resolve(_this.latest[1]);
            } else {
              _this.resolve();
            }
            iterateObserversSafely(_this.observers, "complete");
          } else if (isPromiseLike(value)) {
            value.then(function(obs) {
              return _this.sub = obs.subscribe(_this.handlers);
            });
          } else {
            _this.sub = value.subscribe(_this.handlers);
          }
        }
      }
    };
    _this.cancel = function(reason) {
      _this.reject(reason);
      _this.sources = [];
      _this.handlers.complete();
    };
    _this.promise.catch(function(_) {
    });
    if (typeof sources === "function") {
      sources = [new Observable(sources)];
    }
    if (isPromiseLike(sources)) {
      sources.then(function(iterable) {
        return _this.start(iterable);
      }, _this.handlers.error);
    } else {
      _this.start(sources);
    }
    return _this;
  }
  Concast2.prototype.start = function(sources) {
    if (this.sub !== void 0)
      return;
    this.sources = Array.from(sources);
    this.handlers.complete();
  };
  Concast2.prototype.deliverLastMessage = function(observer) {
    if (this.latest) {
      var nextOrError = this.latest[0];
      var method = observer[nextOrError];
      if (method) {
        method.call(observer, this.latest[1]);
      }
      if (this.sub === null && nextOrError === "next" && observer.complete) {
        observer.complete();
      }
    }
  };
  Concast2.prototype.addObserver = function(observer) {
    if (!this.observers.has(observer)) {
      this.deliverLastMessage(observer);
      this.observers.add(observer);
      ++this.addCount;
    }
  };
  Concast2.prototype.removeObserver = function(observer, quietly) {
    if (this.observers.delete(observer) && --this.addCount < 1 && !quietly) {
      this.handlers.complete();
    }
  };
  Concast2.prototype.cleanup = function(callback) {
    var _this = this;
    var called = false;
    var once = function() {
      if (!called) {
        called = true;
        _this.observers.delete(observer);
        callback();
      }
    };
    var observer = {
      next: once,
      error: once,
      complete: once
    };
    var count = this.addCount;
    this.addObserver(observer);
    this.addCount = count;
  };
  return Concast2;
}(Observable);
fixObservableSubclass(Concast);
function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}
function graphQLResultHasError(result) {
  return result.errors && result.errors.length > 0 || false;
}
function compact() {
  var objects = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  var result = /* @__PURE__ */ Object.create(null);
  objects.forEach(function(obj) {
    if (!obj)
      return;
    Object.keys(obj).forEach(function(key) {
      var value = obj[key];
      if (value !== void 0) {
        result[key] = value;
      }
    });
  });
  return result;
}
var prefixCounts = /* @__PURE__ */ new Map();
function makeUniqueId(prefix) {
  var count = prefixCounts.get(prefix) || 1;
  prefixCounts.set(prefix, count + 1);
  return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
}
function stringifyForDisplay(value) {
  var undefId = makeUniqueId("stringifyForDisplay");
  return JSON.stringify(value, function(key, value2) {
    return value2 === void 0 ? undefId : value2;
  }).split(JSON.stringify(undefId)).join("<undefined>");
}
function mergeOptions(defaults, options) {
  return compact(defaults, options, options.variables && {
    variables: tslib.exports.__assign(tslib.exports.__assign({}, defaults && defaults.variables), options.variables)
  });
}
var utilities = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEV,
  maybe: maybe$1,
  shouldInclude,
  hasDirectives,
  hasClientExports,
  getDirectiveNames,
  getInclusionDirectives,
  createFragmentMap,
  getFragmentQueryDocument,
  getFragmentFromSelection,
  checkDocument,
  getOperationDefinition,
  getOperationName,
  getFragmentDefinitions,
  getQueryDefinition,
  getFragmentDefinition,
  getMainDefinition,
  getDefaultValues,
  makeReference,
  isDocumentNode,
  isReference,
  isField,
  isInlineFragment,
  valueToObjectRepresentation,
  storeKeyNameFromField,
  argumentsObjectFromField,
  resultKeyNameFromField,
  getStoreKeyName,
  getTypenameFromResult,
  addTypenameToDocument,
  buildQueryFromSelectionSet,
  removeDirectivesFromDocument,
  removeConnectionDirectiveFromDocument,
  removeArgumentsFromDocument,
  removeFragmentSpreadFromDocument,
  removeClientSetsFromDocument,
  concatPagination,
  offsetLimitPagination,
  relayStylePagination,
  Observable,
  mergeDeep,
  mergeDeepArray,
  DeepMerger,
  cloneDeep,
  maybeDeepFreeze,
  iterateObserversSafely,
  asyncMap,
  Concast,
  fixObservableSubclass,
  isNonEmptyArray,
  isNonNullObject,
  graphQLResultHasError,
  canUseWeakMap,
  canUseWeakSet,
  canUseSymbol,
  canUseDOM,
  canUseLayoutEffect,
  compact,
  makeUniqueId,
  stringifyForDisplay,
  mergeOptions
}, Symbol.toStringTag, { value: "Module" }));
function fromError(errorValue) {
  return new Observable(function(observer) {
    observer.error(errorValue);
  });
}
function toPromise(observable) {
  var completed = false;
  return new Promise(function(resolve, reject) {
    observable.subscribe({
      next: function(data) {
        if (completed) {
          __DEV__ && invariant.warn("Promise Wrapper does not support multiple results from Observable");
        } else {
          completed = true;
          resolve(data);
        }
      },
      error: reject
    });
  });
}
function fromPromise(promise) {
  return new Observable(function(observer) {
    promise.then(function(value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}
var throwServerError = function(response, result, message) {
  var error = new Error(message);
  error.name = "ServerError";
  error.response = response;
  error.statusCode = response.status;
  error.result = result;
  throw error;
};
function validateOperation(operation) {
  var OPERATION_FIELDS = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ];
  for (var _i = 0, _a2 = Object.keys(operation); _i < _a2.length; _i++) {
    var key = _a2[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw __DEV__ ? new InvariantError("illegal argument: ".concat(key)) : new InvariantError(24);
    }
  }
  return operation;
}
function createOperation(starting, operation) {
  var context = tslib.exports.__assign({}, starting);
  var setContext = function(next) {
    if (typeof next === "function") {
      context = tslib.exports.__assign(tslib.exports.__assign({}, context), next(context));
    } else {
      context = tslib.exports.__assign(tslib.exports.__assign({}, context), next);
    }
  };
  var getContext = function() {
    return tslib.exports.__assign({}, context);
  };
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  return operation;
}
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== "string" ? getOperationName(transformedOperation.query) || void 0 : "";
  }
  return transformedOperation;
}
var utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fromError,
  toPromise,
  fromPromise,
  throwServerError,
  validateOperation,
  createOperation,
  transformOperation
}, Symbol.toStringTag, { value: "Module" }));
function passthrough(op, forward) {
  return forward ? forward(op) : Observable.of();
}
function toLink(handler) {
  return typeof handler === "function" ? new ApolloLink$1(handler) : handler;
}
function isTerminating(link) {
  return link.request.length <= 1;
}
var LinkError = function(_super) {
  tslib.exports.__extends(LinkError2, _super);
  function LinkError2(message, link) {
    var _this = _super.call(this, message) || this;
    _this.link = link;
    return _this;
  }
  return LinkError2;
}(Error);
var ApolloLink$1 = function() {
  function ApolloLink2(request) {
    if (request)
      this.request = request;
  }
  ApolloLink2.empty = function() {
    return new ApolloLink2(function() {
      return Observable.of();
    });
  };
  ApolloLink2.from = function(links) {
    if (links.length === 0)
      return ApolloLink2.empty();
    return links.map(toLink).reduce(function(x, y) {
      return x.concat(y);
    });
  };
  ApolloLink2.split = function(test, left, right) {
    var leftLink = toLink(left);
    var rightLink = toLink(right || new ApolloLink2(passthrough));
    if (isTerminating(leftLink) && isTerminating(rightLink)) {
      return new ApolloLink2(function(operation) {
        return test(operation) ? leftLink.request(operation) || Observable.of() : rightLink.request(operation) || Observable.of();
      });
    } else {
      return new ApolloLink2(function(operation, forward) {
        return test(operation) ? leftLink.request(operation, forward) || Observable.of() : rightLink.request(operation, forward) || Observable.of();
      });
    }
  };
  ApolloLink2.execute = function(link, operation) {
    return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of();
  };
  ApolloLink2.concat = function(first, second) {
    var firstLink = toLink(first);
    if (isTerminating(firstLink)) {
      __DEV__ && invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
      return firstLink;
    }
    var nextLink = toLink(second);
    if (isTerminating(nextLink)) {
      return new ApolloLink2(function(operation) {
        return firstLink.request(operation, function(op) {
          return nextLink.request(op) || Observable.of();
        }) || Observable.of();
      });
    } else {
      return new ApolloLink2(function(operation, forward) {
        return firstLink.request(operation, function(op) {
          return nextLink.request(op, forward) || Observable.of();
        }) || Observable.of();
      });
    }
  };
  ApolloLink2.prototype.split = function(test, left, right) {
    return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
  };
  ApolloLink2.prototype.concat = function(next) {
    return ApolloLink2.concat(this, next);
  };
  ApolloLink2.prototype.request = function(operation, forward) {
    throw __DEV__ ? new InvariantError("request is not implemented") : new InvariantError(19);
  };
  ApolloLink2.prototype.onError = function(error, observer) {
    if (observer && observer.error) {
      observer.error(error);
      return false;
    }
    throw error;
  };
  ApolloLink2.prototype.setOnError = function(fn) {
    this.onError = fn;
    return this;
  };
  return ApolloLink2;
}();
var empty = ApolloLink$1.empty;
var from = ApolloLink$1.from;
var split = ApolloLink$1.split;
var concat = ApolloLink$1.concat;
var execute = ApolloLink$1.execute;
var core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  empty,
  from,
  split,
  concat,
  execute,
  ApolloLink: ApolloLink$1
}, Symbol.toStringTag, { value: "Module" }));
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(core);
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function parseAndCheckHttpResponse(operations) {
  return function(response) {
    return response.text().then(function(bodyText) {
      try {
        return JSON.parse(bodyText);
      } catch (err) {
        var parseError = err;
        parseError.name = "ServerParseError";
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        throw parseError;
      }
    }).then(function(result) {
      if (response.status >= 300) {
        throwServerError(response, result, "Response not successful: Received status code ".concat(response.status));
      }
      if (!Array.isArray(result) && !hasOwnProperty$2.call(result, "data") && !hasOwnProperty$2.call(result, "errors")) {
        throwServerError(response, result, "Server response was missing for query '".concat(Array.isArray(operations) ? operations.map(function(op) {
          return op.operationName;
        }) : operations.operationName, "'."));
      }
      return result;
    });
  };
}
var serializeFetchParameter = function(p, label) {
  var serialized;
  try {
    serialized = JSON.stringify(p);
  } catch (e) {
    var parseError = __DEV__ ? new InvariantError("Network request failed. ".concat(label, " is not serializable: ").concat(e.message)) : new InvariantError(21);
    parseError.parseError = e;
    throw parseError;
  }
  return serialized;
};
var defaultHttpOptions = {
  includeQuery: true,
  includeExtensions: false
};
var defaultHeaders = {
  accept: "*/*",
  "content-type": "application/json"
};
var defaultOptions = {
  method: "POST"
};
var fallbackHttpConfig = {
  http: defaultHttpOptions,
  headers: defaultHeaders,
  options: defaultOptions
};
var defaultPrinter = function(ast, printer) {
  return printer(ast);
};
function selectHttpOptionsAndBody(operation, fallbackConfig) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  configs.unshift(fallbackConfig);
  return selectHttpOptionsAndBodyInternal.apply(void 0, tslib.exports.__spreadArray([
    operation,
    defaultPrinter
  ], configs, false));
}
function selectHttpOptionsAndBodyInternal(operation, printer) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  var options = {};
  var http2 = {};
  configs.forEach(function(config2) {
    options = tslib.exports.__assign(tslib.exports.__assign(tslib.exports.__assign({}, options), config2.options), { headers: tslib.exports.__assign(tslib.exports.__assign({}, options.headers), headersToLowerCase(config2.headers)) });
    if (config2.credentials) {
      options.credentials = config2.credentials;
    }
    http2 = tslib.exports.__assign(tslib.exports.__assign({}, http2), config2.http);
  });
  var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query2 = operation.query;
  var body = { operationName, variables };
  if (http2.includeExtensions)
    body.extensions = extensions;
  if (http2.includeQuery)
    body.query = printer(query2, print);
  return {
    options,
    body
  };
}
function headersToLowerCase(headers) {
  if (headers) {
    var normalized_1 = /* @__PURE__ */ Object.create(null);
    Object.keys(Object(headers)).forEach(function(name) {
      normalized_1[name.toLowerCase()] = headers[name];
    });
    return normalized_1;
  }
  return headers;
}
var checkFetcher = function(fetcher) {
  if (!fetcher && typeof fetch === "undefined") {
    throw __DEV__ ? new InvariantError(`
"fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

import fetch from 'cross-fetch';
import { ApolloClient, HttpLink } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', fetch })
});
    `) : new InvariantError(20);
  }
};
var createSignalIfSupported = function() {
  if (typeof AbortController === "undefined")
    return { controller: false, signal: false };
  var controller = new AbortController();
  var signal = controller.signal;
  return { controller, signal };
};
var selectURI = function(operation, fallbackURI) {
  var context = operation.getContext();
  var contextURI = context.uri;
  if (contextURI) {
    return contextURI;
  } else if (typeof fallbackURI === "function") {
    return fallbackURI(operation);
  } else {
    return fallbackURI || "/graphql";
  }
};
function rewriteURIForGET(chosenURI, body) {
  var queryParams = [];
  var addQueryParam = function(key, value) {
    queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
  };
  if ("query" in body) {
    addQueryParam("query", body.query);
  }
  if (body.operationName) {
    addQueryParam("operationName", body.operationName);
  }
  if (body.variables) {
    var serializedVariables = void 0;
    try {
      serializedVariables = serializeFetchParameter(body.variables, "Variables map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("variables", serializedVariables);
  }
  if (body.extensions) {
    var serializedExtensions = void 0;
    try {
      serializedExtensions = serializeFetchParameter(body.extensions, "Extensions map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("extensions", serializedExtensions);
  }
  var fragment = "", preFragment = chosenURI;
  var fragmentStart = chosenURI.indexOf("#");
  if (fragmentStart !== -1) {
    fragment = chosenURI.substr(fragmentStart);
    preFragment = chosenURI.substr(0, fragmentStart);
  }
  var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
  var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
  return { newURI };
}
var backupFetch = maybe$1(function() {
  return fetch;
});
var createHttpLink$1 = function(linkOptions) {
  if (linkOptions === void 0) {
    linkOptions = {};
  }
  var _a2 = linkOptions.uri, uri2 = _a2 === void 0 ? "/graphql" : _a2, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print2 = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = tslib.exports.__rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
  if (__DEV__) {
    checkFetcher(preferredFetch || backupFetch);
  }
  var linkConfig = {
    http: { includeExtensions },
    options: requestOptions.fetchOptions,
    credentials: requestOptions.credentials,
    headers: requestOptions.headers
  };
  return new ApolloLink$1(function(operation) {
    var chosenURI = selectURI(operation, uri2);
    var context = operation.getContext();
    var clientAwarenessHeaders = {};
    if (context.clientAwareness) {
      var _a3 = context.clientAwareness, name_1 = _a3.name, version = _a3.version;
      if (name_1) {
        clientAwarenessHeaders["apollographql-client-name"] = name_1;
      }
      if (version) {
        clientAwarenessHeaders["apollographql-client-version"] = version;
      }
    }
    var contextHeaders = tslib.exports.__assign(tslib.exports.__assign({}, clientAwarenessHeaders), context.headers);
    var contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: contextHeaders
    };
    var _b2 = selectHttpOptionsAndBodyInternal(operation, print2, fallbackHttpConfig, linkConfig, contextConfig), options = _b2.options, body = _b2.body;
    if (body.variables && !includeUnusedVariables) {
      var unusedNames_1 = new Set(Object.keys(body.variables));
      visit(operation.query, {
        Variable: function(node, _key, parent) {
          if (parent && parent.kind !== "VariableDefinition") {
            unusedNames_1.delete(node.name.value);
          }
        }
      });
      if (unusedNames_1.size) {
        body.variables = tslib.exports.__assign({}, body.variables);
        unusedNames_1.forEach(function(name) {
          delete body.variables[name];
        });
      }
    }
    var controller;
    if (!options.signal) {
      var _c2 = createSignalIfSupported(), _controller = _c2.controller, signal = _c2.signal;
      controller = _controller;
      if (controller)
        options.signal = signal;
    }
    var definitionIsMutation = function(d) {
      return d.kind === "OperationDefinition" && d.operation === "mutation";
    };
    if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
      options.method = "GET";
    }
    if (options.method === "GET") {
      var _d = rewriteURIForGET(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
      if (parseError) {
        return fromError(parseError);
      }
      chosenURI = newURI;
    } else {
      try {
        options.body = serializeFetchParameter(body, "Payload");
      } catch (parseError2) {
        return fromError(parseError2);
      }
    }
    return new Observable(function(observer) {
      var currentFetch = preferredFetch || maybe$1(function() {
        return fetch;
      }) || backupFetch;
      currentFetch(chosenURI, options).then(function(response) {
        operation.setContext({ response });
        return response;
      }).then(parseAndCheckHttpResponse(operation)).then(function(result) {
        observer.next(result);
        observer.complete();
        return result;
      }).catch(function(err) {
        if (err.name === "AbortError")
          return;
        if (err.result && err.result.errors && err.result.data) {
          observer.next(err.result);
        }
        observer.error(err);
      });
      return function() {
        if (controller)
          controller.abort();
      };
    });
  });
};
var HttpLink$1 = function(_super) {
  tslib.exports.__extends(HttpLink2, _super);
  function HttpLink2(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this, createHttpLink$1(options).request) || this;
    _this.options = options;
    return _this;
  }
  return HttpLink2;
}(ApolloLink$1);
var http = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseAndCheckHttpResponse,
  serializeFetchParameter,
  fallbackHttpConfig,
  defaultPrinter,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  checkFetcher,
  createSignalIfSupported,
  selectURI,
  createHttpLink: createHttpLink$1,
  HttpLink: HttpLink$1,
  rewriteURIForGET
}, Symbol.toStringTag, { value: "Module" }));
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(http);
var _a$2 = Object.prototype, toString = _a$2.toString, hasOwnProperty$1 = _a$2.hasOwnProperty;
var fnToStr = Function.prototype.toString;
var previousComparisons = /* @__PURE__ */ new Map();
function equal(a, b) {
  try {
    return check(a, b);
  } finally {
    previousComparisons.clear();
  }
}
function check(a, b) {
  if (a === b) {
    return true;
  }
  var aTag = toString.call(a);
  var bTag = toString.call(b);
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case "[object Array]":
      if (a.length !== b.length)
        return false;
    case "[object Object]": {
      if (previouslyCompared(a, b))
        return true;
      var aKeys = definedKeys(a);
      var bKeys = definedKeys(b);
      var keyCount = aKeys.length;
      if (keyCount !== bKeys.length)
        return false;
      for (var k = 0; k < keyCount; ++k) {
        if (!hasOwnProperty$1.call(b, aKeys[k])) {
          return false;
        }
      }
      for (var k = 0; k < keyCount; ++k) {
        var key = aKeys[k];
        if (!check(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    case "[object Error]":
      return a.name === b.name && a.message === b.message;
    case "[object Number]":
      if (a !== a)
        return b !== b;
    case "[object Boolean]":
    case "[object Date]":
      return +a === +b;
    case "[object RegExp]":
    case "[object String]":
      return a == "".concat(b);
    case "[object Map]":
    case "[object Set]": {
      if (a.size !== b.size)
        return false;
      if (previouslyCompared(a, b))
        return true;
      var aIterator = a.entries();
      var isMap = aTag === "[object Map]";
      while (true) {
        var info = aIterator.next();
        if (info.done)
          break;
        var _a2 = info.value, aKey = _a2[0], aValue = _a2[1];
        if (!b.has(aKey)) {
          return false;
        }
        if (isMap && !check(aValue, b.get(aKey))) {
          return false;
        }
      }
      return true;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    case "[object DataView]": {
      var len = a.byteLength;
      if (len === b.byteLength) {
        while (len-- && a[len] === b[len]) {
        }
      }
      return len === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      var aCode = fnToStr.call(a);
      if (aCode !== fnToStr.call(b)) {
        return false;
      }
      return !endsWith(aCode, nativeCodeSuffix);
    }
  }
  return false;
}
function definedKeys(obj) {
  return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
  return this[key] !== void 0;
}
var nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
  var fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
  var bSet = previousComparisons.get(a);
  if (bSet) {
    if (bSet.has(b))
      return true;
  } else {
    previousComparisons.set(a, bSet = /* @__PURE__ */ new Set());
  }
  bSet.add(b);
  return false;
}
var equality_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": equal,
  equal
}, Symbol.toStringTag, { value: "Module" }));
var require$$4 = /* @__PURE__ */ getAugmentedNamespace(equality_esm);
var defaultMakeData = function() {
  return /* @__PURE__ */ Object.create(null);
};
var _a$1 = Array.prototype, forEach = _a$1.forEach, slice = _a$1.slice;
var Trie = function() {
  function Trie2(weakness, makeData) {
    if (weakness === void 0) {
      weakness = true;
    }
    if (makeData === void 0) {
      makeData = defaultMakeData;
    }
    this.weakness = weakness;
    this.makeData = makeData;
  }
  Trie2.prototype.lookup = function() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i] = arguments[_i];
    }
    return this.lookupArray(array);
  };
  Trie2.prototype.lookupArray = function(array) {
    var node = this;
    forEach.call(array, function(key) {
      return node = node.getChildTrie(key);
    });
    return node.data || (node.data = this.makeData(slice.call(array)));
  };
  Trie2.prototype.getChildTrie = function(key) {
    var map = this.weakness && isObjRef(key) ? this.weak || (this.weak = /* @__PURE__ */ new WeakMap()) : this.strong || (this.strong = /* @__PURE__ */ new Map());
    var child = map.get(key);
    if (!child)
      map.set(key, child = new Trie2(this.weakness, this.makeData));
    return child;
  };
  return Trie2;
}();
function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null)
        break;
    case "function":
      return true;
  }
  return false;
}
var currentContext = null;
var MISSING_VALUE = {};
var idCounter = 1;
var makeSlotClass = function() {
  return function() {
    function Slot2() {
      this.id = [
        "slot",
        idCounter++,
        Date.now(),
        Math.random().toString(36).slice(2)
      ].join(":");
    }
    Slot2.prototype.hasValue = function() {
      for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
        if (this.id in context_1.slots) {
          var value = context_1.slots[this.id];
          if (value === MISSING_VALUE)
            break;
          if (context_1 !== currentContext) {
            currentContext.slots[this.id] = value;
          }
          return true;
        }
      }
      if (currentContext) {
        currentContext.slots[this.id] = MISSING_VALUE;
      }
      return false;
    };
    Slot2.prototype.getValue = function() {
      if (this.hasValue()) {
        return currentContext.slots[this.id];
      }
    };
    Slot2.prototype.withValue = function(value, callback, args, thisArg) {
      var _a2;
      var slots = (_a2 = {
        __proto__: null
      }, _a2[this.id] = value, _a2);
      var parent = currentContext;
      currentContext = { parent, slots };
      try {
        return callback.apply(thisArg, args);
      } finally {
        currentContext = parent;
      }
    };
    Slot2.bind = function(callback) {
      var context = currentContext;
      return function() {
        var saved = currentContext;
        try {
          currentContext = context;
          return callback.apply(this, arguments);
        } finally {
          currentContext = saved;
        }
      };
    };
    Slot2.noContext = function(callback, args, thisArg) {
      if (currentContext) {
        var saved = currentContext;
        try {
          currentContext = null;
          return callback.apply(thisArg, args);
        } finally {
          currentContext = saved;
        }
      } else {
        return callback.apply(thisArg, args);
      }
    };
    return Slot2;
  }();
};
var globalKey = "@wry/context:Slot";
var host = Array;
var Slot = host[globalKey] || function() {
  var Slot2 = makeSlotClass();
  try {
    Object.defineProperty(host, globalKey, {
      value: host[globalKey] = Slot2,
      enumerable: false,
      writable: false,
      configurable: false
    });
  } finally {
    return Slot2;
  }
}();
Slot.bind;
Slot.noContext;
function defaultDispose() {
}
var Cache$1 = function() {
  function Cache2(max, dispose) {
    if (max === void 0) {
      max = Infinity;
    }
    if (dispose === void 0) {
      dispose = defaultDispose;
    }
    this.max = max;
    this.dispose = dispose;
    this.map = /* @__PURE__ */ new Map();
    this.newest = null;
    this.oldest = null;
  }
  Cache2.prototype.has = function(key) {
    return this.map.has(key);
  };
  Cache2.prototype.get = function(key) {
    var node = this.getNode(key);
    return node && node.value;
  };
  Cache2.prototype.getNode = function(key) {
    var node = this.map.get(key);
    if (node && node !== this.newest) {
      var older = node.older, newer = node.newer;
      if (newer) {
        newer.older = older;
      }
      if (older) {
        older.newer = newer;
      }
      node.older = this.newest;
      node.older.newer = node;
      node.newer = null;
      this.newest = node;
      if (node === this.oldest) {
        this.oldest = newer;
      }
    }
    return node;
  };
  Cache2.prototype.set = function(key, value) {
    var node = this.getNode(key);
    if (node) {
      return node.value = value;
    }
    node = {
      key,
      value,
      newer: null,
      older: this.newest
    };
    if (this.newest) {
      this.newest.newer = node;
    }
    this.newest = node;
    this.oldest = this.oldest || node;
    this.map.set(key, node);
    return node.value;
  };
  Cache2.prototype.clean = function() {
    while (this.oldest && this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  };
  Cache2.prototype.delete = function(key) {
    var node = this.map.get(key);
    if (node) {
      if (node === this.newest) {
        this.newest = node.older;
      }
      if (node === this.oldest) {
        this.oldest = node.newer;
      }
      if (node.newer) {
        node.newer.older = node.older;
      }
      if (node.older) {
        node.older.newer = node.newer;
      }
      this.map.delete(key);
      this.dispose(node.value, key);
      return true;
    }
    return false;
  };
  return Cache2;
}();
var parentEntrySlot = new Slot();
var _a;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toArray = (_a = Array.from, _a === void 0 ? function(collection2) {
  var array = [];
  collection2.forEach(function(item) {
    return array.push(item);
  });
  return array;
} : _a);
function maybeUnsubscribe(entryOrDep) {
  var unsubscribe = entryOrDep.unsubscribe;
  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}
var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}
function valueIs(a, b) {
  var len = a.length;
  return len > 0 && len === b.length && a[len - 1] === b[len - 1];
}
function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return value[0];
    case 2:
      throw value[1];
  }
}
function valueCopy(value) {
  return value.slice(0);
}
var Entry = function() {
  function Entry2(fn) {
    this.fn = fn;
    this.parents = /* @__PURE__ */ new Set();
    this.childValues = /* @__PURE__ */ new Map();
    this.dirtyChildren = null;
    this.dirty = true;
    this.recomputing = false;
    this.value = [];
    this.deps = null;
    ++Entry2.count;
  }
  Entry2.prototype.peek = function() {
    if (this.value.length === 1 && !mightBeDirty(this)) {
      rememberParent(this);
      return this.value[0];
    }
  };
  Entry2.prototype.recompute = function(args) {
    assert(!this.recomputing, "already recomputing");
    rememberParent(this);
    return mightBeDirty(this) ? reallyRecompute(this, args) : valueGet(this.value);
  };
  Entry2.prototype.setDirty = function() {
    if (this.dirty)
      return;
    this.dirty = true;
    this.value.length = 0;
    reportDirty(this);
    maybeUnsubscribe(this);
  };
  Entry2.prototype.dispose = function() {
    var _this = this;
    this.setDirty();
    forgetChildren(this);
    eachParent(this, function(parent, child) {
      parent.setDirty();
      forgetChild(parent, _this);
    });
  };
  Entry2.prototype.forget = function() {
    this.dispose();
  };
  Entry2.prototype.dependOn = function(dep2) {
    dep2.add(this);
    if (!this.deps) {
      this.deps = emptySetPool.pop() || /* @__PURE__ */ new Set();
    }
    this.deps.add(dep2);
  };
  Entry2.prototype.forgetDeps = function() {
    var _this = this;
    if (this.deps) {
      toArray(this.deps).forEach(function(dep2) {
        return dep2.delete(_this);
      });
      this.deps.clear();
      emptySetPool.push(this.deps);
      this.deps = null;
    }
  };
  Entry2.count = 0;
  return Entry2;
}();
function rememberParent(child) {
  var parent = parentEntrySlot.getValue();
  if (parent) {
    child.parents.add(parent);
    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }
    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }
    return parent;
  }
}
function reallyRecompute(entry, args) {
  forgetChildren(entry);
  parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
  if (maybeSubscribe(entry, args)) {
    setClean(entry);
  }
  return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
  entry.recomputing = true;
  entry.value.length = 0;
  try {
    entry.value[0] = entry.fn.apply(null, args);
  } catch (e) {
    entry.value[1] = e;
  }
  entry.recomputing = false;
}
function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
  entry.dirty = false;
  if (mightBeDirty(entry)) {
    return;
  }
  reportClean(entry);
}
function reportDirty(child) {
  eachParent(child, reportDirtyChild);
}
function reportClean(child) {
  eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
  var parentCount = child.parents.size;
  if (parentCount) {
    var parents = toArray(child.parents);
    for (var i = 0; i < parentCount; ++i) {
      callback(parents[i], child);
    }
  }
}
function reportDirtyChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));
  var parentWasClean = !mightBeDirty(parent);
  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || /* @__PURE__ */ new Set();
  } else if (parent.dirtyChildren.has(child)) {
    return;
  }
  parent.dirtyChildren.add(child);
  if (parentWasClean) {
    reportDirty(parent);
  }
}
function reportCleanChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  var childValue = parent.childValues.get(child);
  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }
  removeDirtyChild(parent, child);
  if (mightBeDirty(parent)) {
    return;
  }
  reportClean(parent);
}
function removeDirtyChild(parent, child) {
  var dc = parent.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      parent.dirtyChildren = null;
    }
  }
}
function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach(function(_value, child) {
      forgetChild(parent, child);
    });
  }
  parent.forgetDeps();
  assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry);
      entry.unsubscribe = entry.subscribe.apply(null, args);
    } catch (e) {
      entry.setDirty();
      return false;
    }
  }
  return true;
}
var EntryMethods = {
  setDirty: true,
  dispose: true,
  forget: true
};
function dep(options) {
  var depsByKey = /* @__PURE__ */ new Map();
  var subscribe = options && options.subscribe;
  function depend(key) {
    var parent = parentEntrySlot.getValue();
    if (parent) {
      var dep_1 = depsByKey.get(key);
      if (!dep_1) {
        depsByKey.set(key, dep_1 = /* @__PURE__ */ new Set());
      }
      parent.dependOn(dep_1);
      if (typeof subscribe === "function") {
        maybeUnsubscribe(dep_1);
        dep_1.unsubscribe = subscribe(key);
      }
    }
  }
  depend.dirty = function dirty(key, entryMethodName) {
    var dep2 = depsByKey.get(key);
    if (dep2) {
      var m_1 = entryMethodName && hasOwnProperty.call(EntryMethods, entryMethodName) ? entryMethodName : "setDirty";
      toArray(dep2).forEach(function(entry) {
        return entry[m_1]();
      });
      depsByKey.delete(key);
      maybeUnsubscribe(dep2);
    }
  };
  return depend;
}
function makeDefaultMakeCacheKeyFunction() {
  var keyTrie = new Trie(typeof WeakMap === "function");
  return function() {
    return keyTrie.lookupArray(arguments);
  };
}
makeDefaultMakeCacheKeyFunction();
var caches = /* @__PURE__ */ new Set();
function wrap(originalFunction, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var cache2 = new Cache$1(options.max || Math.pow(2, 16), function(entry) {
    return entry.dispose();
  });
  var keyArgs = options.keyArgs;
  var makeCacheKey = options.makeCacheKey || makeDefaultMakeCacheKeyFunction();
  var optimistic = function() {
    var key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }
    var entry = cache2.get(key);
    if (!entry) {
      cache2.set(key, entry = new Entry(originalFunction));
      entry.subscribe = options.subscribe;
      entry.forget = function() {
        return cache2.delete(key);
      };
    }
    var value = entry.recompute(Array.prototype.slice.call(arguments));
    cache2.set(key, entry);
    caches.add(cache2);
    if (!parentEntrySlot.hasValue()) {
      caches.forEach(function(cache3) {
        return cache3.clean();
      });
      caches.clear();
    }
    return value;
  };
  Object.defineProperty(optimistic, "size", {
    get: function() {
      return cache2["map"].size;
    },
    configurable: false,
    enumerable: false
  });
  function dirtyKey(key) {
    var entry = cache2.get(key);
    if (entry) {
      entry.setDirty();
    }
  }
  optimistic.dirtyKey = dirtyKey;
  optimistic.dirty = function dirty() {
    dirtyKey(makeCacheKey.apply(null, arguments));
  };
  function peekKey(key) {
    var entry = cache2.get(key);
    if (entry) {
      return entry.peek();
    }
  }
  optimistic.peekKey = peekKey;
  optimistic.peek = function peek() {
    return peekKey(makeCacheKey.apply(null, arguments));
  };
  function forgetKey(key) {
    return cache2.delete(key);
  }
  optimistic.forgetKey = forgetKey;
  optimistic.forget = function forget() {
    return forgetKey(makeCacheKey.apply(null, arguments));
  };
  optimistic.makeCacheKey = makeCacheKey;
  optimistic.getKey = keyArgs ? function getKey() {
    return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
  } : makeCacheKey;
  return Object.freeze(optimistic);
}
var ApolloCache = function() {
  function ApolloCache2() {
    this.getFragmentDoc = wrap(getFragmentQueryDocument);
  }
  ApolloCache2.prototype.batch = function(options) {
    var _this = this;
    var optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
    var updateResult;
    this.performTransaction(function() {
      return updateResult = options.update(_this);
    }, optimisticId);
    return updateResult;
  };
  ApolloCache2.prototype.recordOptimisticTransaction = function(transaction, optimisticId) {
    this.performTransaction(transaction, optimisticId);
  };
  ApolloCache2.prototype.transformDocument = function(document2) {
    return document2;
  };
  ApolloCache2.prototype.identify = function(object) {
    return;
  };
  ApolloCache2.prototype.gc = function() {
    return [];
  };
  ApolloCache2.prototype.modify = function(options) {
    return false;
  };
  ApolloCache2.prototype.transformForLink = function(document2) {
    return document2;
  };
  ApolloCache2.prototype.readQuery = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = !!options.optimistic;
    }
    return this.read(tslib.exports.__assign(tslib.exports.__assign({}, options), { rootId: options.id || "ROOT_QUERY", optimistic }));
  };
  ApolloCache2.prototype.readFragment = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = !!options.optimistic;
    }
    return this.read(tslib.exports.__assign(tslib.exports.__assign({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic }));
  };
  ApolloCache2.prototype.writeQuery = function(_a2) {
    var id = _a2.id, data = _a2.data, options = tslib.exports.__rest(_a2, ["id", "data"]);
    return this.write(Object.assign(options, {
      dataId: id || "ROOT_QUERY",
      result: data
    }));
  };
  ApolloCache2.prototype.writeFragment = function(_a2) {
    var id = _a2.id, data = _a2.data, fragment = _a2.fragment, fragmentName = _a2.fragmentName, options = tslib.exports.__rest(_a2, ["id", "data", "fragment", "fragmentName"]);
    return this.write(Object.assign(options, {
      query: this.getFragmentDoc(fragment, fragmentName),
      dataId: id,
      result: data
    }));
  };
  ApolloCache2.prototype.updateQuery = function(options, update) {
    return this.batch({
      update: function(cache2) {
        var value = cache2.readQuery(options);
        var data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache2.writeQuery(tslib.exports.__assign(tslib.exports.__assign({}, options), { data }));
        return data;
      }
    });
  };
  ApolloCache2.prototype.updateFragment = function(options, update) {
    return this.batch({
      update: function(cache2) {
        var value = cache2.readFragment(options);
        var data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache2.writeFragment(tslib.exports.__assign(tslib.exports.__assign({}, options), { data }));
        return data;
      }
    });
  };
  return ApolloCache2;
}();
var Cache;
(function(Cache2) {
})(Cache || (Cache = {}));
var MissingFieldError = function() {
  function MissingFieldError2(message, path, query2, variables) {
    this.message = message;
    this.path = path;
    this.query = query2;
    this.variables = variables;
  }
  return MissingFieldError2;
}();
var hasOwn = Object.prototype.hasOwnProperty;
function defaultDataIdFromObject(_a2, context) {
  var __typename = _a2.__typename, id = _a2.id, _id = _a2._id;
  if (typeof __typename === "string") {
    if (context) {
      context.keyObject = id !== void 0 ? { id } : _id !== void 0 ? { _id } : void 0;
    }
    if (id === void 0)
      id = _id;
    if (id !== void 0) {
      return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
    }
  }
}
var defaultConfig = {
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
  resultCaching: true,
  canonizeResults: false
};
function normalizeConfig(config2) {
  return compact(defaultConfig, config2);
}
function shouldCanonizeResults(config2) {
  var value = config2.canonizeResults;
  return value === void 0 ? defaultConfig.canonizeResults : value;
}
function getTypenameFromStoreObject(store2, objectOrReference) {
  return isReference(objectOrReference) ? store2.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
}
var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
function fieldNameFromStoreName(storeFieldName) {
  var match = storeFieldName.match(TypeOrFieldNameRegExp);
  return match ? match[0] : storeFieldName;
}
function selectionSetMatchesResult(selectionSet, result, variables) {
  if (isNonNullObject(result)) {
    return isArray(result) ? result.every(function(item) {
      return selectionSetMatchesResult(selectionSet, item, variables);
    }) : selectionSet.selections.every(function(field) {
      if (isField(field) && shouldInclude(field, variables)) {
        var key = resultKeyNameFromField(field);
        return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
      }
      return true;
    });
  }
  return false;
}
function storeValueIsStoreObject(value) {
  return isNonNullObject(value) && !isReference(value) && !isArray(value);
}
function makeProcessedFieldsMerger() {
  return new DeepMerger();
}
var isArray = function(a) {
  return Array.isArray(a);
};
var DELETE = /* @__PURE__ */ Object.create(null);
var delModifier = function() {
  return DELETE;
};
var INVALIDATE = /* @__PURE__ */ Object.create(null);
var EntityStore = function() {
  function EntityStore2(policies, group) {
    var _this = this;
    this.policies = policies;
    this.group = group;
    this.data = /* @__PURE__ */ Object.create(null);
    this.rootIds = /* @__PURE__ */ Object.create(null);
    this.refs = /* @__PURE__ */ Object.create(null);
    this.getFieldValue = function(objectOrReference, storeFieldName) {
      return maybeDeepFreeze(isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
    };
    this.canRead = function(objOrRef) {
      return isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
    };
    this.toReference = function(objOrIdOrRef, mergeIntoStore) {
      if (typeof objOrIdOrRef === "string") {
        return makeReference(objOrIdOrRef);
      }
      if (isReference(objOrIdOrRef)) {
        return objOrIdOrRef;
      }
      var id = _this.policies.identify(objOrIdOrRef)[0];
      if (id) {
        var ref = makeReference(id);
        if (mergeIntoStore) {
          _this.merge(id, objOrIdOrRef);
        }
        return ref;
      }
    };
  }
  EntityStore2.prototype.toObject = function() {
    return tslib.exports.__assign({}, this.data);
  };
  EntityStore2.prototype.has = function(dataId) {
    return this.lookup(dataId, true) !== void 0;
  };
  EntityStore2.prototype.get = function(dataId, fieldName) {
    this.group.depend(dataId, fieldName);
    if (hasOwn.call(this.data, dataId)) {
      var storeObject = this.data[dataId];
      if (storeObject && hasOwn.call(storeObject, fieldName)) {
        return storeObject[fieldName];
      }
    }
    if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
      return this.policies.rootTypenamesById[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.get(dataId, fieldName);
    }
  };
  EntityStore2.prototype.lookup = function(dataId, dependOnExistence) {
    if (dependOnExistence)
      this.group.depend(dataId, "__exists");
    if (hasOwn.call(this.data, dataId)) {
      return this.data[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.lookup(dataId, dependOnExistence);
    }
    if (this.policies.rootTypenamesById[dataId]) {
      return /* @__PURE__ */ Object.create(null);
    }
  };
  EntityStore2.prototype.merge = function(older, newer) {
    var _this = this;
    var dataId;
    if (isReference(older))
      older = older.__ref;
    if (isReference(newer))
      newer = newer.__ref;
    var existing = typeof older === "string" ? this.lookup(dataId = older) : older;
    var incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
    if (!incoming)
      return;
    __DEV__ ? invariant(typeof dataId === "string", "store.merge expects a string ID") : invariant(typeof dataId === "string", 1);
    var merged = new DeepMerger(storeObjectReconciler).merge(existing, incoming);
    this.data[dataId] = merged;
    if (merged !== existing) {
      delete this.refs[dataId];
      if (this.group.caching) {
        var fieldsToDirty_1 = /* @__PURE__ */ Object.create(null);
        if (!existing)
          fieldsToDirty_1.__exists = 1;
        Object.keys(incoming).forEach(function(storeFieldName) {
          if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
            fieldsToDirty_1[storeFieldName] = 1;
            var fieldName = fieldNameFromStoreName(storeFieldName);
            if (fieldName !== storeFieldName && !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
              fieldsToDirty_1[fieldName] = 1;
            }
            if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
              delete merged[storeFieldName];
            }
          }
        });
        if (fieldsToDirty_1.__typename && !(existing && existing.__typename) && this.policies.rootTypenamesById[dataId] === merged.__typename) {
          delete fieldsToDirty_1.__typename;
        }
        Object.keys(fieldsToDirty_1).forEach(function(fieldName) {
          return _this.group.dirty(dataId, fieldName);
        });
      }
    }
  };
  EntityStore2.prototype.modify = function(dataId, fields) {
    var _this = this;
    var storeObject = this.lookup(dataId);
    if (storeObject) {
      var changedFields_1 = /* @__PURE__ */ Object.create(null);
      var needToMerge_1 = false;
      var allDeleted_1 = true;
      var sharedDetails_1 = {
        DELETE,
        INVALIDATE,
        isReference,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: function(fieldNameOrOptions, from2) {
          return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
            fieldName: fieldNameOrOptions,
            from: from2 || makeReference(dataId)
          } : fieldNameOrOptions, { store: _this });
        }
      };
      Object.keys(storeObject).forEach(function(storeFieldName) {
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var fieldValue = storeObject[storeFieldName];
        if (fieldValue === void 0)
          return;
        var modify = typeof fields === "function" ? fields : fields[storeFieldName] || fields[fieldName];
        if (modify) {
          var newValue = modify === delModifier ? DELETE : modify(maybeDeepFreeze(fieldValue), tslib.exports.__assign(tslib.exports.__assign({}, sharedDetails_1), { fieldName, storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
          if (newValue === INVALIDATE) {
            _this.group.dirty(dataId, storeFieldName);
          } else {
            if (newValue === DELETE)
              newValue = void 0;
            if (newValue !== fieldValue) {
              changedFields_1[storeFieldName] = newValue;
              needToMerge_1 = true;
              fieldValue = newValue;
            }
          }
        }
        if (fieldValue !== void 0) {
          allDeleted_1 = false;
        }
      });
      if (needToMerge_1) {
        this.merge(dataId, changedFields_1);
        if (allDeleted_1) {
          if (this instanceof Layer) {
            this.data[dataId] = void 0;
          } else {
            delete this.data[dataId];
          }
          this.group.dirty(dataId, "__exists");
        }
        return true;
      }
    }
    return false;
  };
  EntityStore2.prototype.delete = function(dataId, fieldName, args) {
    var _a2;
    var storeObject = this.lookup(dataId);
    if (storeObject) {
      var typename = this.getFieldValue(storeObject, "__typename");
      var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
      return this.modify(dataId, storeFieldName ? (_a2 = {}, _a2[storeFieldName] = delModifier, _a2) : delModifier);
    }
    return false;
  };
  EntityStore2.prototype.evict = function(options, limit) {
    var evicted = false;
    if (options.id) {
      if (hasOwn.call(this.data, options.id)) {
        evicted = this.delete(options.id, options.fieldName, options.args);
      }
      if (this instanceof Layer && this !== limit) {
        evicted = this.parent.evict(options, limit) || evicted;
      }
      if (options.fieldName || evicted) {
        this.group.dirty(options.id, options.fieldName || "__exists");
      }
    }
    return evicted;
  };
  EntityStore2.prototype.clear = function() {
    this.replace(null);
  };
  EntityStore2.prototype.extract = function() {
    var _this = this;
    var obj = this.toObject();
    var extraRootIds = [];
    this.getRootIdSet().forEach(function(id) {
      if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
        extraRootIds.push(id);
      }
    });
    if (extraRootIds.length) {
      obj.__META = { extraRootIds: extraRootIds.sort() };
    }
    return obj;
  };
  EntityStore2.prototype.replace = function(newData) {
    var _this = this;
    Object.keys(this.data).forEach(function(dataId) {
      if (!(newData && hasOwn.call(newData, dataId))) {
        _this.delete(dataId);
      }
    });
    if (newData) {
      var __META = newData.__META, rest_1 = tslib.exports.__rest(newData, ["__META"]);
      Object.keys(rest_1).forEach(function(dataId) {
        _this.merge(dataId, rest_1[dataId]);
      });
      if (__META) {
        __META.extraRootIds.forEach(this.retain, this);
      }
    }
  };
  EntityStore2.prototype.retain = function(rootId) {
    return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
  };
  EntityStore2.prototype.release = function(rootId) {
    if (this.rootIds[rootId] > 0) {
      var count = --this.rootIds[rootId];
      if (!count)
        delete this.rootIds[rootId];
      return count;
    }
    return 0;
  };
  EntityStore2.prototype.getRootIdSet = function(ids) {
    if (ids === void 0) {
      ids = /* @__PURE__ */ new Set();
    }
    Object.keys(this.rootIds).forEach(ids.add, ids);
    if (this instanceof Layer) {
      this.parent.getRootIdSet(ids);
    } else {
      Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
    }
    return ids;
  };
  EntityStore2.prototype.gc = function() {
    var _this = this;
    var ids = this.getRootIdSet();
    var snapshot = this.toObject();
    ids.forEach(function(id) {
      if (hasOwn.call(snapshot, id)) {
        Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
        delete snapshot[id];
      }
    });
    var idsToRemove = Object.keys(snapshot);
    if (idsToRemove.length) {
      var root_1 = this;
      while (root_1 instanceof Layer)
        root_1 = root_1.parent;
      idsToRemove.forEach(function(id) {
        return root_1.delete(id);
      });
    }
    return idsToRemove;
  };
  EntityStore2.prototype.findChildRefIds = function(dataId) {
    if (!hasOwn.call(this.refs, dataId)) {
      var found_1 = this.refs[dataId] = /* @__PURE__ */ Object.create(null);
      var root = this.data[dataId];
      if (!root)
        return found_1;
      var workSet_1 = /* @__PURE__ */ new Set([root]);
      workSet_1.forEach(function(obj) {
        if (isReference(obj)) {
          found_1[obj.__ref] = true;
        }
        if (isNonNullObject(obj)) {
          Object.keys(obj).forEach(function(key) {
            var child = obj[key];
            if (isNonNullObject(child)) {
              workSet_1.add(child);
            }
          });
        }
      });
    }
    return this.refs[dataId];
  };
  EntityStore2.prototype.makeCacheKey = function() {
    return this.group.keyMaker.lookupArray(arguments);
  };
  return EntityStore2;
}();
var CacheGroup = function() {
  function CacheGroup2(caching, parent) {
    if (parent === void 0) {
      parent = null;
    }
    this.caching = caching;
    this.parent = parent;
    this.d = null;
    this.resetCaching();
  }
  CacheGroup2.prototype.resetCaching = function() {
    this.d = this.caching ? dep() : null;
    this.keyMaker = new Trie(canUseWeakMap);
  };
  CacheGroup2.prototype.depend = function(dataId, storeFieldName) {
    if (this.d) {
      this.d(makeDepKey(dataId, storeFieldName));
      var fieldName = fieldNameFromStoreName(storeFieldName);
      if (fieldName !== storeFieldName) {
        this.d(makeDepKey(dataId, fieldName));
      }
      if (this.parent) {
        this.parent.depend(dataId, storeFieldName);
      }
    }
  };
  CacheGroup2.prototype.dirty = function(dataId, storeFieldName) {
    if (this.d) {
      this.d.dirty(makeDepKey(dataId, storeFieldName), storeFieldName === "__exists" ? "forget" : "setDirty");
    }
  };
  return CacheGroup2;
}();
function makeDepKey(dataId, storeFieldName) {
  return storeFieldName + "#" + dataId;
}
function maybeDependOnExistenceOfEntity(store2, entityId) {
  if (supportsResultCaching(store2)) {
    store2.group.depend(entityId, "__exists");
  }
}
(function(EntityStore2) {
  var Root = function(_super) {
    tslib.exports.__extends(Root2, _super);
    function Root2(_a2) {
      var policies = _a2.policies, _b = _a2.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a2.seed;
      var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
      _this.stump = new Stump(_this);
      _this.storageTrie = new Trie(canUseWeakMap);
      if (seed)
        _this.replace(seed);
      return _this;
    }
    Root2.prototype.addLayer = function(layerId, replay) {
      return this.stump.addLayer(layerId, replay);
    };
    Root2.prototype.removeLayer = function() {
      return this;
    };
    Root2.prototype.getStorage = function() {
      return this.storageTrie.lookupArray(arguments);
    };
    return Root2;
  }(EntityStore2);
  EntityStore2.Root = Root;
})(EntityStore || (EntityStore = {}));
var Layer = function(_super) {
  tslib.exports.__extends(Layer2, _super);
  function Layer2(id, parent, replay, group) {
    var _this = _super.call(this, parent.policies, group) || this;
    _this.id = id;
    _this.parent = parent;
    _this.replay = replay;
    _this.group = group;
    replay(_this);
    return _this;
  }
  Layer2.prototype.addLayer = function(layerId, replay) {
    return new Layer2(layerId, this, replay, this.group);
  };
  Layer2.prototype.removeLayer = function(layerId) {
    var _this = this;
    var parent = this.parent.removeLayer(layerId);
    if (layerId === this.id) {
      if (this.group.caching) {
        Object.keys(this.data).forEach(function(dataId) {
          var ownStoreObject = _this.data[dataId];
          var parentStoreObject = parent["lookup"](dataId);
          if (!parentStoreObject) {
            _this.delete(dataId);
          } else if (!ownStoreObject) {
            _this.group.dirty(dataId, "__exists");
            Object.keys(parentStoreObject).forEach(function(storeFieldName) {
              _this.group.dirty(dataId, storeFieldName);
            });
          } else if (ownStoreObject !== parentStoreObject) {
            Object.keys(ownStoreObject).forEach(function(storeFieldName) {
              if (!equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                _this.group.dirty(dataId, storeFieldName);
              }
            });
          }
        });
      }
      return parent;
    }
    if (parent === this.parent)
      return this;
    return parent.addLayer(this.id, this.replay);
  };
  Layer2.prototype.toObject = function() {
    return tslib.exports.__assign(tslib.exports.__assign({}, this.parent.toObject()), this.data);
  };
  Layer2.prototype.findChildRefIds = function(dataId) {
    var fromParent = this.parent.findChildRefIds(dataId);
    return hasOwn.call(this.data, dataId) ? tslib.exports.__assign(tslib.exports.__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
  };
  Layer2.prototype.getStorage = function() {
    var p = this.parent;
    while (p.parent)
      p = p.parent;
    return p.getStorage.apply(p, arguments);
  };
  return Layer2;
}(EntityStore);
var Stump = function(_super) {
  tslib.exports.__extends(Stump2, _super);
  function Stump2(root) {
    return _super.call(this, "EntityStore.Stump", root, function() {
    }, new CacheGroup(root.group.caching, root.group)) || this;
  }
  Stump2.prototype.removeLayer = function() {
    return this;
  };
  Stump2.prototype.merge = function() {
    return this.parent.merge.apply(this.parent, arguments);
  };
  return Stump2;
}(Layer);
function storeObjectReconciler(existingObject, incomingObject, property) {
  var existingValue = existingObject[property];
  var incomingValue = incomingObject[property];
  return equal(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store2) {
  return !!(store2 instanceof EntityStore && store2.group.caching);
}
function shallowCopy(value) {
  if (isNonNullObject(value)) {
    return isArray(value) ? value.slice(0) : tslib.exports.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
  }
  return value;
}
var ObjectCanon = function() {
  function ObjectCanon2() {
    this.known = new (canUseWeakSet ? WeakSet : Set)();
    this.pool = new Trie(canUseWeakMap);
    this.passes = /* @__PURE__ */ new WeakMap();
    this.keysByJSON = /* @__PURE__ */ new Map();
    this.empty = this.admit({});
  }
  ObjectCanon2.prototype.isKnown = function(value) {
    return isNonNullObject(value) && this.known.has(value);
  };
  ObjectCanon2.prototype.pass = function(value) {
    if (isNonNullObject(value)) {
      var copy = shallowCopy(value);
      this.passes.set(copy, value);
      return copy;
    }
    return value;
  };
  ObjectCanon2.prototype.admit = function(value) {
    var _this = this;
    if (isNonNullObject(value)) {
      var original = this.passes.get(value);
      if (original)
        return original;
      var proto = Object.getPrototypeOf(value);
      switch (proto) {
        case Array.prototype: {
          if (this.known.has(value))
            return value;
          var array = value.map(this.admit, this);
          var node = this.pool.lookupArray(array);
          if (!node.array) {
            this.known.add(node.array = array);
            if (__DEV__) {
              Object.freeze(array);
            }
          }
          return node.array;
        }
        case null:
        case Object.prototype: {
          if (this.known.has(value))
            return value;
          var proto_1 = Object.getPrototypeOf(value);
          var array_1 = [proto_1];
          var keys = this.sortedKeys(value);
          array_1.push(keys.json);
          var firstValueIndex_1 = array_1.length;
          keys.sorted.forEach(function(key) {
            array_1.push(_this.admit(value[key]));
          });
          var node = this.pool.lookupArray(array_1);
          if (!node.object) {
            var obj_1 = node.object = Object.create(proto_1);
            this.known.add(obj_1);
            keys.sorted.forEach(function(key, i) {
              obj_1[key] = array_1[firstValueIndex_1 + i];
            });
            if (__DEV__) {
              Object.freeze(obj_1);
            }
          }
          return node.object;
        }
      }
    }
    return value;
  };
  ObjectCanon2.prototype.sortedKeys = function(obj) {
    var keys = Object.keys(obj);
    var node = this.pool.lookupArray(keys);
    if (!node.keys) {
      keys.sort();
      var json = JSON.stringify(keys);
      if (!(node.keys = this.keysByJSON.get(json))) {
        this.keysByJSON.set(json, node.keys = { sorted: keys, json });
      }
    }
    return node.keys;
  };
  return ObjectCanon2;
}();
var canonicalStringify = Object.assign(function(value) {
  if (isNonNullObject(value)) {
    if (stringifyCanon === void 0) {
      resetCanonicalStringify();
    }
    var canonical = stringifyCanon.admit(value);
    var json = stringifyCache.get(canonical);
    if (json === void 0) {
      stringifyCache.set(canonical, json = JSON.stringify(canonical));
    }
    return json;
  }
  return JSON.stringify(value);
}, {
  reset: resetCanonicalStringify
});
var stringifyCanon;
var stringifyCache;
function resetCanonicalStringify() {
  stringifyCanon = new ObjectCanon();
  stringifyCache = new (canUseWeakMap ? WeakMap : Map)();
}
function execSelectionSetKeyArgs(options) {
  return [
    options.selectionSet,
    options.objectOrReference,
    options.context,
    options.context.canonizeResults
  ];
}
var StoreReader = function() {
  function StoreReader2(config2) {
    var _this = this;
    this.knownResults = new (canUseWeakMap ? WeakMap : Map)();
    this.config = compact(config2, {
      addTypename: config2.addTypename !== false,
      canonizeResults: shouldCanonizeResults(config2)
    });
    this.canon = config2.canon || new ObjectCanon();
    this.executeSelectionSet = wrap(function(options) {
      var _a2;
      var canonizeResults = options.context.canonizeResults;
      var peekArgs = execSelectionSetKeyArgs(options);
      peekArgs[3] = !canonizeResults;
      var other = (_a2 = _this.executeSelectionSet).peek.apply(_a2, peekArgs);
      if (other) {
        if (canonizeResults) {
          return tslib.exports.__assign(tslib.exports.__assign({}, other), { result: _this.canon.admit(other.result) });
        }
        return other;
      }
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return _this.execSelectionSetImpl(options);
    }, {
      max: this.config.resultCacheMaxSize,
      keyArgs: execSelectionSetKeyArgs,
      makeCacheKey: function(selectionSet, parent, context, canonizeResults) {
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(selectionSet, isReference(parent) ? parent.__ref : parent, context.varString, canonizeResults);
        }
      }
    });
    this.executeSubSelectedArray = wrap(function(options) {
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return _this.execSubSelectedArrayImpl(options);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(_a2) {
        var field = _a2.field, array = _a2.array, context = _a2.context;
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(field, array, context.varString);
        }
      }
    });
  }
  StoreReader2.prototype.resetCanon = function() {
    this.canon = new ObjectCanon();
  };
  StoreReader2.prototype.diffQueryAgainstStore = function(_a2) {
    var store2 = _a2.store, query2 = _a2.query, _b = _a2.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a2.variables, _c = _a2.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a2.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
    var policies = this.config.cache.policies;
    variables = tslib.exports.__assign(tslib.exports.__assign({}, getDefaultValues(getQueryDefinition(query2))), variables);
    var rootRef = makeReference(rootId);
    var execResult = this.executeSelectionSet({
      selectionSet: getMainDefinition(query2).selectionSet,
      objectOrReference: rootRef,
      enclosingRef: rootRef,
      context: {
        store: store2,
        query: query2,
        policies,
        variables,
        varString: canonicalStringify(variables),
        canonizeResults,
        fragmentMap: createFragmentMap(getFragmentDefinitions(query2))
      }
    });
    var missing;
    if (execResult.missing) {
      missing = [new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query2, variables)];
      if (!returnPartialData) {
        throw missing[0];
      }
    }
    return {
      result: execResult.result,
      complete: !missing,
      missing
    };
  };
  StoreReader2.prototype.isFresh = function(result, parent, selectionSet, context) {
    if (supportsResultCaching(context.store) && this.knownResults.get(result) === selectionSet) {
      var latest = this.executeSelectionSet.peek(selectionSet, parent, context, this.canon.isKnown(result));
      if (latest && result === latest.result) {
        return true;
      }
    }
    return false;
  };
  StoreReader2.prototype.execSelectionSetImpl = function(_a2) {
    var _this = this;
    var selectionSet = _a2.selectionSet, objectOrReference = _a2.objectOrReference, enclosingRef = _a2.enclosingRef, context = _a2.context;
    if (isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
      return {
        result: this.canon.empty,
        missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object")
      };
    }
    var variables = context.variables, policies = context.policies, store2 = context.store;
    var typename = store2.getFieldValue(objectOrReference, "__typename");
    var objectsToMerge = [];
    var missing;
    var missingMerger = new DeepMerger();
    if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
      objectsToMerge.push({ __typename: typename });
    }
    function handleMissing(result2, resultName) {
      var _a3;
      if (result2.missing) {
        missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = result2.missing, _a3));
      }
      return result2.result;
    }
    var workSet = new Set(selectionSet.selections);
    workSet.forEach(function(selection) {
      var _a3, _b;
      if (!shouldInclude(selection, variables))
        return;
      if (isField(selection)) {
        var fieldValue = policies.readField({
          fieldName: selection.name.value,
          field: selection,
          variables: context.variables,
          from: objectOrReference
        }, context);
        var resultName = resultKeyNameFromField(selection);
        if (fieldValue === void 0) {
          if (!addTypenameToDocument.added(selection)) {
            missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)), _a3));
          }
        } else if (isArray(fieldValue)) {
          fieldValue = handleMissing(_this.executeSubSelectedArray({
            field: selection,
            array: fieldValue,
            enclosingRef,
            context
          }), resultName);
        } else if (!selection.selectionSet) {
          if (context.canonizeResults) {
            fieldValue = _this.canon.pass(fieldValue);
          }
        } else if (fieldValue != null) {
          fieldValue = handleMissing(_this.executeSelectionSet({
            selectionSet: selection.selectionSet,
            objectOrReference: fieldValue,
            enclosingRef: isReference(fieldValue) ? fieldValue : enclosingRef,
            context
          }), resultName);
        }
        if (fieldValue !== void 0) {
          objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
        }
      } else {
        var fragment = getFragmentFromSelection(selection, context.fragmentMap);
        if (fragment && policies.fragmentMatches(fragment, typename)) {
          fragment.selectionSet.selections.forEach(workSet.add, workSet);
        }
      }
    });
    var result = mergeDeepArray(objectsToMerge);
    var finalResult = { result, missing };
    var frozen = context.canonizeResults ? this.canon.admit(finalResult) : maybeDeepFreeze(finalResult);
    if (frozen.result) {
      this.knownResults.set(frozen.result, selectionSet);
    }
    return frozen;
  };
  StoreReader2.prototype.execSubSelectedArrayImpl = function(_a2) {
    var _this = this;
    var field = _a2.field, array = _a2.array, enclosingRef = _a2.enclosingRef, context = _a2.context;
    var missing;
    var missingMerger = new DeepMerger();
    function handleMissing(childResult, i) {
      var _a3;
      if (childResult.missing) {
        missing = missingMerger.merge(missing, (_a3 = {}, _a3[i] = childResult.missing, _a3));
      }
      return childResult.result;
    }
    if (field.selectionSet) {
      array = array.filter(context.store.canRead);
    }
    array = array.map(function(item, i) {
      if (item === null) {
        return null;
      }
      if (isArray(item)) {
        return handleMissing(_this.executeSubSelectedArray({
          field,
          array: item,
          enclosingRef,
          context
        }), i);
      }
      if (field.selectionSet) {
        return handleMissing(_this.executeSelectionSet({
          selectionSet: field.selectionSet,
          objectOrReference: item,
          enclosingRef: isReference(item) ? item : enclosingRef,
          context
        }), i);
      }
      if (__DEV__) {
        assertSelectionSetForIdValue(context.store, field, item);
      }
      return item;
    });
    return {
      result: context.canonizeResults ? this.canon.admit(array) : array,
      missing
    };
  };
  return StoreReader2;
}();
function firstMissing(tree) {
  try {
    JSON.stringify(tree, function(_, value) {
      if (typeof value === "string")
        throw value;
      return value;
    });
  } catch (result) {
    return result;
  }
}
function assertSelectionSetForIdValue(store2, field, fieldValue) {
  if (!field.selectionSet) {
    var workSet_1 = /* @__PURE__ */ new Set([fieldValue]);
    workSet_1.forEach(function(value) {
      if (isNonNullObject(value)) {
        __DEV__ ? invariant(!isReference(value), "Missing selection set for object of type ".concat(getTypenameFromStoreObject(store2, value), " returned for query field ").concat(field.name.value)) : invariant(!isReference(value), 5);
        Object.values(value).forEach(workSet_1.add, workSet_1);
      }
    });
  }
}
var cacheSlot = new Slot();
var cacheInfoMap = /* @__PURE__ */ new WeakMap();
function getCacheInfo(cache2) {
  var info = cacheInfoMap.get(cache2);
  if (!info) {
    cacheInfoMap.set(cache2, info = {
      vars: /* @__PURE__ */ new Set(),
      dep: dep()
    });
  }
  return info;
}
function forgetCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.forgetCache(cache2);
  });
}
function recallCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.attachCache(cache2);
  });
}
function makeVar(value) {
  var caches2 = /* @__PURE__ */ new Set();
  var listeners = /* @__PURE__ */ new Set();
  var rv = function(newValue) {
    if (arguments.length > 0) {
      if (value !== newValue) {
        value = newValue;
        caches2.forEach(function(cache3) {
          getCacheInfo(cache3).dep.dirty(rv);
          broadcast(cache3);
        });
        var oldListeners = Array.from(listeners);
        listeners.clear();
        oldListeners.forEach(function(listener) {
          return listener(value);
        });
      }
    } else {
      var cache2 = cacheSlot.getValue();
      if (cache2) {
        attach(cache2);
        getCacheInfo(cache2).dep(rv);
      }
    }
    return value;
  };
  rv.onNextChange = function(listener) {
    listeners.add(listener);
    return function() {
      listeners.delete(listener);
    };
  };
  var attach = rv.attachCache = function(cache2) {
    caches2.add(cache2);
    getCacheInfo(cache2).vars.add(rv);
    return rv;
  };
  rv.forgetCache = function(cache2) {
    return caches2.delete(cache2);
  };
  return rv;
}
function broadcast(cache2) {
  if (cache2.broadcastWatches) {
    cache2.broadcastWatches();
  }
}
var specifierInfoCache = /* @__PURE__ */ Object.create(null);
function lookupSpecifierInfo(spec) {
  var cacheKey = JSON.stringify(spec);
  return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = /* @__PURE__ */ Object.create(null));
}
function keyFieldsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyFieldsFn || (info.keyFieldsFn = function(object, context) {
    var extract = function(from2, key) {
      return context.readField(key, from2);
    };
    var keyObject = context.keyObject = collectSpecifierPaths(specifier, function(schemaKeyPath) {
      var extracted = extractKeyPath(context.storeObject, schemaKeyPath, extract);
      if (extracted === void 0 && object !== context.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
        extracted = extractKeyPath(object, schemaKeyPath, extractKey);
      }
      __DEV__ ? invariant(extracted !== void 0, "Missing field '".concat(schemaKeyPath.join("."), "' while extracting keyFields from ").concat(JSON.stringify(object))) : invariant(extracted !== void 0, 2);
      return extracted;
    });
    return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
  });
}
function keyArgsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyArgsFn || (info.keyArgsFn = function(args, _a2) {
    var field = _a2.field, variables = _a2.variables, fieldName = _a2.fieldName;
    var collected = collectSpecifierPaths(specifier, function(keyPath) {
      var firstKey = keyPath[0];
      var firstChar = firstKey.charAt(0);
      if (firstChar === "@") {
        if (field && isNonEmptyArray(field.directives)) {
          var directiveName_1 = firstKey.slice(1);
          var d = field.directives.find(function(d2) {
            return d2.name.value === directiveName_1;
          });
          var directiveArgs = d && argumentsObjectFromField(d, variables);
          return directiveArgs && extractKeyPath(directiveArgs, keyPath.slice(1));
        }
        return;
      }
      if (firstChar === "$") {
        var variableName = firstKey.slice(1);
        if (variables && hasOwn.call(variables, variableName)) {
          var varKeyPath = keyPath.slice(0);
          varKeyPath[0] = variableName;
          return extractKeyPath(variables, varKeyPath);
        }
        return;
      }
      if (args) {
        return extractKeyPath(args, keyPath);
      }
    });
    var suffix = JSON.stringify(collected);
    if (args || suffix !== "{}") {
      fieldName += ":" + suffix;
    }
    return fieldName;
  });
}
function collectSpecifierPaths(specifier, extractor) {
  var merger = new DeepMerger();
  return getSpecifierPaths(specifier).reduce(function(collected, path) {
    var _a2;
    var toMerge = extractor(path);
    if (toMerge !== void 0) {
      for (var i = path.length - 1; i >= 0; --i) {
        toMerge = (_a2 = {}, _a2[path[i]] = toMerge, _a2);
      }
      collected = merger.merge(collected, toMerge);
    }
    return collected;
  }, /* @__PURE__ */ Object.create(null));
}
function getSpecifierPaths(spec) {
  var info = lookupSpecifierInfo(spec);
  if (!info.paths) {
    var paths_1 = info.paths = [];
    var currentPath_1 = [];
    spec.forEach(function(s, i) {
      if (isArray(s)) {
        getSpecifierPaths(s).forEach(function(p) {
          return paths_1.push(currentPath_1.concat(p));
        });
        currentPath_1.length = 0;
      } else {
        currentPath_1.push(s);
        if (!isArray(spec[i + 1])) {
          paths_1.push(currentPath_1.slice(0));
          currentPath_1.length = 0;
        }
      }
    });
  }
  return info.paths;
}
function extractKey(object, key) {
  return object[key];
}
function extractKeyPath(object, path, extract) {
  extract = extract || extractKey;
  return normalize(path.reduce(function reducer(obj, key) {
    return isArray(obj) ? obj.map(function(child) {
      return reducer(child, key);
    }) : obj && extract(obj, key);
  }, object));
}
function normalize(value) {
  if (isNonNullObject(value)) {
    if (isArray(value)) {
      return value.map(normalize);
    }
    return collectSpecifierPaths(Object.keys(value).sort(), function(path) {
      return extractKeyPath(value, path);
    });
  }
  return value;
}
getStoreKeyName.setStringify(canonicalStringify);
function argsFromFieldSpecifier(spec) {
  return spec.args !== void 0 ? spec.args : spec.field ? argumentsObjectFromField(spec.field, spec.variables) : null;
}
var nullKeyFieldsFn = function() {
  return void 0;
};
var simpleKeyArgsFn = function(_args, context) {
  return context.fieldName;
};
var mergeTrueFn = function(existing, incoming, _a2) {
  var mergeObjects = _a2.mergeObjects;
  return mergeObjects(existing, incoming);
};
var mergeFalseFn = function(_, incoming) {
  return incoming;
};
var Policies = function() {
  function Policies2(config2) {
    this.config = config2;
    this.typePolicies = /* @__PURE__ */ Object.create(null);
    this.toBeAdded = /* @__PURE__ */ Object.create(null);
    this.supertypeMap = /* @__PURE__ */ new Map();
    this.fuzzySubtypes = /* @__PURE__ */ new Map();
    this.rootIdsByTypename = /* @__PURE__ */ Object.create(null);
    this.rootTypenamesById = /* @__PURE__ */ Object.create(null);
    this.usingPossibleTypes = false;
    this.config = tslib.exports.__assign({ dataIdFromObject: defaultDataIdFromObject }, config2);
    this.cache = this.config.cache;
    this.setRootTypename("Query");
    this.setRootTypename("Mutation");
    this.setRootTypename("Subscription");
    if (config2.possibleTypes) {
      this.addPossibleTypes(config2.possibleTypes);
    }
    if (config2.typePolicies) {
      this.addTypePolicies(config2.typePolicies);
    }
  }
  Policies2.prototype.identify = function(object, partialContext) {
    var _a2;
    var policies = this;
    var typename = partialContext && (partialContext.typename || ((_a2 = partialContext.storeObject) === null || _a2 === void 0 ? void 0 : _a2.__typename)) || object.__typename;
    if (typename === this.rootTypenamesById.ROOT_QUERY) {
      return ["ROOT_QUERY"];
    }
    var storeObject = partialContext && partialContext.storeObject || object;
    var context = tslib.exports.__assign(tslib.exports.__assign({}, partialContext), { typename, storeObject, readField: partialContext && partialContext.readField || function() {
      var options = normalizeReadFieldOptions(arguments, storeObject);
      return policies.readField(options, {
        store: policies.cache["data"],
        variables: options.variables
      });
    } });
    var id;
    var policy = typename && this.getTypePolicy(typename);
    var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
    while (keyFn) {
      var specifierOrId = keyFn(object, context);
      if (isArray(specifierOrId)) {
        keyFn = keyFieldsFnFromSpecifier(specifierOrId);
      } else {
        id = specifierOrId;
        break;
      }
    }
    id = id ? String(id) : void 0;
    return context.keyObject ? [id, context.keyObject] : [id];
  };
  Policies2.prototype.addTypePolicies = function(typePolicies) {
    var _this = this;
    Object.keys(typePolicies).forEach(function(typename) {
      var _a2 = typePolicies[typename], queryType = _a2.queryType, mutationType = _a2.mutationType, subscriptionType = _a2.subscriptionType, incoming = tslib.exports.__rest(_a2, ["queryType", "mutationType", "subscriptionType"]);
      if (queryType)
        _this.setRootTypename("Query", typename);
      if (mutationType)
        _this.setRootTypename("Mutation", typename);
      if (subscriptionType)
        _this.setRootTypename("Subscription", typename);
      if (hasOwn.call(_this.toBeAdded, typename)) {
        _this.toBeAdded[typename].push(incoming);
      } else {
        _this.toBeAdded[typename] = [incoming];
      }
    });
  };
  Policies2.prototype.updateTypePolicy = function(typename, incoming) {
    var _this = this;
    var existing = this.getTypePolicy(typename);
    var keyFields = incoming.keyFields, fields = incoming.fields;
    function setMerge(existing2, merge) {
      existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
    }
    setMerge(existing, incoming.merge);
    existing.keyFn = keyFields === false ? nullKeyFieldsFn : isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
    if (fields) {
      Object.keys(fields).forEach(function(fieldName) {
        var existing2 = _this.getFieldPolicy(typename, fieldName, true);
        var incoming2 = fields[fieldName];
        if (typeof incoming2 === "function") {
          existing2.read = incoming2;
        } else {
          var keyArgs = incoming2.keyArgs, read = incoming2.read, merge = incoming2.merge;
          existing2.keyFn = keyArgs === false ? simpleKeyArgsFn : isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
          if (typeof read === "function") {
            existing2.read = read;
          }
          setMerge(existing2, merge);
        }
        if (existing2.read && existing2.merge) {
          existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
        }
      });
    }
  };
  Policies2.prototype.setRootTypename = function(which, typename) {
    if (typename === void 0) {
      typename = which;
    }
    var rootId = "ROOT_" + which.toUpperCase();
    var old = this.rootTypenamesById[rootId];
    if (typename !== old) {
      __DEV__ ? invariant(!old || old === which, "Cannot change root ".concat(which, " __typename more than once")) : invariant(!old || old === which, 3);
      if (old)
        delete this.rootIdsByTypename[old];
      this.rootIdsByTypename[typename] = rootId;
      this.rootTypenamesById[rootId] = typename;
    }
  };
  Policies2.prototype.addPossibleTypes = function(possibleTypes) {
    var _this = this;
    this.usingPossibleTypes = true;
    Object.keys(possibleTypes).forEach(function(supertype) {
      _this.getSupertypeSet(supertype, true);
      possibleTypes[supertype].forEach(function(subtype) {
        _this.getSupertypeSet(subtype, true).add(supertype);
        var match = subtype.match(TypeOrFieldNameRegExp);
        if (!match || match[0] !== subtype) {
          _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
        }
      });
    });
  };
  Policies2.prototype.getTypePolicy = function(typename) {
    var _this = this;
    if (!hasOwn.call(this.typePolicies, typename)) {
      var policy_1 = this.typePolicies[typename] = /* @__PURE__ */ Object.create(null);
      policy_1.fields = /* @__PURE__ */ Object.create(null);
      var supertypes = this.supertypeMap.get(typename);
      if (supertypes && supertypes.size) {
        supertypes.forEach(function(supertype) {
          var _a2 = _this.getTypePolicy(supertype), fields = _a2.fields, rest = tslib.exports.__rest(_a2, ["fields"]);
          Object.assign(policy_1, rest);
          Object.assign(policy_1.fields, fields);
        });
      }
    }
    var inbox = this.toBeAdded[typename];
    if (inbox && inbox.length) {
      inbox.splice(0).forEach(function(policy) {
        _this.updateTypePolicy(typename, policy);
      });
    }
    return this.typePolicies[typename];
  };
  Policies2.prototype.getFieldPolicy = function(typename, fieldName, createIfMissing) {
    if (typename) {
      var fieldPolicies = this.getTypePolicy(typename).fields;
      return fieldPolicies[fieldName] || createIfMissing && (fieldPolicies[fieldName] = /* @__PURE__ */ Object.create(null));
    }
  };
  Policies2.prototype.getSupertypeSet = function(subtype, createIfMissing) {
    var supertypeSet = this.supertypeMap.get(subtype);
    if (!supertypeSet && createIfMissing) {
      this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
    }
    return supertypeSet;
  };
  Policies2.prototype.fragmentMatches = function(fragment, typename, result, variables) {
    var _this = this;
    if (!fragment.typeCondition)
      return true;
    if (!typename)
      return false;
    var supertype = fragment.typeCondition.name.value;
    if (typename === supertype)
      return true;
    if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
      var typenameSupertypeSet = this.getSupertypeSet(typename, true);
      var workQueue_1 = [typenameSupertypeSet];
      var maybeEnqueue_1 = function(subtype) {
        var supertypeSet2 = _this.getSupertypeSet(subtype, false);
        if (supertypeSet2 && supertypeSet2.size && workQueue_1.indexOf(supertypeSet2) < 0) {
          workQueue_1.push(supertypeSet2);
        }
      };
      var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
      var checkingFuzzySubtypes = false;
      for (var i = 0; i < workQueue_1.length; ++i) {
        var supertypeSet = workQueue_1[i];
        if (supertypeSet.has(supertype)) {
          if (!typenameSupertypeSet.has(supertype)) {
            if (checkingFuzzySubtypes) {
              __DEV__ && invariant.warn("Inferring subtype ".concat(typename, " of supertype ").concat(supertype));
            }
            typenameSupertypeSet.add(supertype);
          }
          return true;
        }
        supertypeSet.forEach(maybeEnqueue_1);
        if (needToCheckFuzzySubtypes && i === workQueue_1.length - 1 && selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
          needToCheckFuzzySubtypes = false;
          checkingFuzzySubtypes = true;
          this.fuzzySubtypes.forEach(function(regExp, fuzzyString) {
            var match = typename.match(regExp);
            if (match && match[0] === typename) {
              maybeEnqueue_1(fuzzyString);
            }
          });
        }
      }
    }
    return false;
  };
  Policies2.prototype.hasKeyArgs = function(typename, fieldName) {
    var policy = this.getFieldPolicy(typename, fieldName, false);
    return !!(policy && policy.keyFn);
  };
  Policies2.prototype.getStoreFieldName = function(fieldSpec) {
    var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
    var policy = this.getFieldPolicy(typename, fieldName, false);
    var storeFieldName;
    var keyFn = policy && policy.keyFn;
    if (keyFn && typename) {
      var context = {
        typename,
        fieldName,
        field: fieldSpec.field || null,
        variables: fieldSpec.variables
      };
      var args = argsFromFieldSpecifier(fieldSpec);
      while (keyFn) {
        var specifierOrString = keyFn(args, context);
        if (isArray(specifierOrString)) {
          keyFn = keyArgsFnFromSpecifier(specifierOrString);
        } else {
          storeFieldName = specifierOrString || fieldName;
          break;
        }
      }
    }
    if (storeFieldName === void 0) {
      storeFieldName = fieldSpec.field ? storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
    }
    if (storeFieldName === false) {
      return fieldName;
    }
    return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
  };
  Policies2.prototype.readField = function(options, context) {
    var objectOrReference = options.from;
    if (!objectOrReference)
      return;
    var nameOrField = options.field || options.fieldName;
    if (!nameOrField)
      return;
    if (options.typename === void 0) {
      var typename = context.store.getFieldValue(objectOrReference, "__typename");
      if (typename)
        options.typename = typename;
    }
    var storeFieldName = this.getStoreFieldName(options);
    var fieldName = fieldNameFromStoreName(storeFieldName);
    var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
    var policy = this.getFieldPolicy(options.typename, fieldName, false);
    var read = policy && policy.read;
    if (read) {
      var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
      return cacheSlot.withValue(this.cache, read, [existing, readOptions]);
    }
    return existing;
  };
  Policies2.prototype.getReadFunction = function(typename, fieldName) {
    var policy = this.getFieldPolicy(typename, fieldName, false);
    return policy && policy.read;
  };
  Policies2.prototype.getMergeFunction = function(parentTypename, fieldName, childTypename) {
    var policy = this.getFieldPolicy(parentTypename, fieldName, false);
    var merge = policy && policy.merge;
    if (!merge && childTypename) {
      policy = this.getTypePolicy(childTypename);
      merge = policy && policy.merge;
    }
    return merge;
  };
  Policies2.prototype.runMergeFunction = function(existing, incoming, _a2, context, storage) {
    var field = _a2.field, typename = _a2.typename, merge = _a2.merge;
    if (merge === mergeTrueFn) {
      return makeMergeObjectsFunction(context.store)(existing, incoming);
    }
    if (merge === mergeFalseFn) {
      return incoming;
    }
    if (context.overwrite) {
      existing = void 0;
    }
    return merge(existing, incoming, makeFieldFunctionOptions(this, void 0, { typename, fieldName: field.name.value, field, variables: context.variables }, context, storage || /* @__PURE__ */ Object.create(null)));
  };
  return Policies2;
}();
function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
  var storeFieldName = policies.getStoreFieldName(fieldSpec);
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var variables = fieldSpec.variables || context.variables;
  var _a2 = context.store, toReference = _a2.toReference, canRead = _a2.canRead;
  return {
    args: argsFromFieldSpecifier(fieldSpec),
    field: fieldSpec.field || null,
    fieldName,
    storeFieldName,
    variables,
    isReference,
    toReference,
    storage,
    cache: policies.cache,
    canRead,
    readField: function() {
      return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
    },
    mergeObjects: makeMergeObjectsFunction(context.store)
  };
}
function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
  var fieldNameOrOptions = readFieldArgs[0], from2 = readFieldArgs[1], argc = readFieldArgs.length;
  var options;
  if (typeof fieldNameOrOptions === "string") {
    options = {
      fieldName: fieldNameOrOptions,
      from: argc > 1 ? from2 : objectOrReference
    };
  } else {
    options = tslib.exports.__assign({}, fieldNameOrOptions);
    if (!hasOwn.call(options, "from")) {
      options.from = objectOrReference;
    }
  }
  if (__DEV__ && options.from === void 0) {
    __DEV__ && invariant.warn("Undefined 'from' passed to readField with arguments ".concat(stringifyForDisplay(Array.from(readFieldArgs))));
  }
  if (options.variables === void 0) {
    options.variables = variables;
  }
  return options;
}
function makeMergeObjectsFunction(store2) {
  return function mergeObjects(existing, incoming) {
    if (isArray(existing) || isArray(incoming)) {
      throw __DEV__ ? new InvariantError("Cannot automatically merge arrays") : new InvariantError(4);
    }
    if (isNonNullObject(existing) && isNonNullObject(incoming)) {
      var eType = store2.getFieldValue(existing, "__typename");
      var iType = store2.getFieldValue(incoming, "__typename");
      var typesDiffer = eType && iType && eType !== iType;
      if (typesDiffer) {
        return incoming;
      }
      if (isReference(existing) && storeValueIsStoreObject(incoming)) {
        store2.merge(existing.__ref, incoming);
        return existing;
      }
      if (storeValueIsStoreObject(existing) && isReference(incoming)) {
        store2.merge(existing, incoming.__ref);
        return incoming;
      }
      if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
        return tslib.exports.__assign(tslib.exports.__assign({}, existing), incoming);
      }
    }
    return incoming;
  };
}
function getContextFlavor(context, clientOnly, deferred) {
  var key = "".concat(clientOnly).concat(deferred);
  var flavored = context.flavors.get(key);
  if (!flavored) {
    context.flavors.set(key, flavored = context.clientOnly === clientOnly && context.deferred === deferred ? context : tslib.exports.__assign(tslib.exports.__assign({}, context), { clientOnly, deferred }));
  }
  return flavored;
}
var StoreWriter = function() {
  function StoreWriter2(cache2, reader) {
    this.cache = cache2;
    this.reader = reader;
  }
  StoreWriter2.prototype.writeToStore = function(store2, _a2) {
    var _this = this;
    var query2 = _a2.query, result = _a2.result, dataId = _a2.dataId, variables = _a2.variables, overwrite = _a2.overwrite;
    var operationDefinition = getOperationDefinition(query2);
    var merger = makeProcessedFieldsMerger();
    variables = tslib.exports.__assign(tslib.exports.__assign({}, getDefaultValues(operationDefinition)), variables);
    var context = {
      store: store2,
      written: /* @__PURE__ */ Object.create(null),
      merge: function(existing, incoming) {
        return merger.merge(existing, incoming);
      },
      variables,
      varString: canonicalStringify(variables),
      fragmentMap: createFragmentMap(getFragmentDefinitions(query2)),
      overwrite: !!overwrite,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: false,
      deferred: false,
      flavors: /* @__PURE__ */ new Map()
    };
    var ref = this.processSelectionSet({
      result: result || /* @__PURE__ */ Object.create(null),
      dataId,
      selectionSet: operationDefinition.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context
    });
    if (!isReference(ref)) {
      throw __DEV__ ? new InvariantError("Could not identify object ".concat(JSON.stringify(result))) : new InvariantError(6);
    }
    context.incomingById.forEach(function(_a3, dataId2) {
      var storeObject = _a3.storeObject, mergeTree = _a3.mergeTree, fieldNodeSet = _a3.fieldNodeSet;
      var entityRef = makeReference(dataId2);
      if (mergeTree && mergeTree.map.size) {
        var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
        if (isReference(applied)) {
          return;
        }
        storeObject = applied;
      }
      if (__DEV__ && !context.overwrite) {
        var fieldsWithSelectionSets_1 = /* @__PURE__ */ Object.create(null);
        fieldNodeSet.forEach(function(field) {
          if (field.selectionSet) {
            fieldsWithSelectionSets_1[field.name.value] = true;
          }
        });
        var hasSelectionSet_1 = function(storeFieldName) {
          return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
        };
        var hasMergeFunction_1 = function(storeFieldName) {
          var childTree = mergeTree && mergeTree.map.get(storeFieldName);
          return Boolean(childTree && childTree.info && childTree.info.merge);
        };
        Object.keys(storeObject).forEach(function(storeFieldName) {
          if (hasSelectionSet_1(storeFieldName) && !hasMergeFunction_1(storeFieldName)) {
            warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
          }
        });
      }
      store2.merge(dataId2, storeObject);
    });
    store2.retain(ref.__ref);
    return ref;
  };
  StoreWriter2.prototype.processSelectionSet = function(_a2) {
    var _this = this;
    var dataId = _a2.dataId, result = _a2.result, selectionSet = _a2.selectionSet, context = _a2.context, mergeTree = _a2.mergeTree;
    var policies = this.cache.policies;
    var incoming = /* @__PURE__ */ Object.create(null);
    var typename = dataId && policies.rootTypenamesById[dataId] || getTypenameFromResult(result, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");
    if (typeof typename === "string") {
      incoming.__typename = typename;
    }
    var readField = function() {
      var options = normalizeReadFieldOptions(arguments, incoming, context.variables);
      if (isReference(options.from)) {
        var info = context.incomingById.get(options.from.__ref);
        if (info) {
          var result_1 = policies.readField(tslib.exports.__assign(tslib.exports.__assign({}, options), { from: info.storeObject }), context);
          if (result_1 !== void 0) {
            return result_1;
          }
        }
      }
      return policies.readField(options, context);
    };
    var fieldNodeSet = /* @__PURE__ */ new Set();
    this.flattenFields(selectionSet, result, context, typename).forEach(function(context2, field) {
      var _a3;
      var resultFieldKey = resultKeyNameFromField(field);
      var value = result[resultFieldKey];
      fieldNodeSet.add(field);
      if (value !== void 0) {
        var storeFieldName = policies.getStoreFieldName({
          typename,
          fieldName: field.name.value,
          field,
          variables: context2.variables
        });
        var childTree = getChildMergeTree(mergeTree, storeFieldName);
        var incomingValue = _this.processFieldValue(value, field, field.selectionSet ? getContextFlavor(context2, false, false) : context2, childTree);
        var childTypename = void 0;
        if (field.selectionSet && (isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
          childTypename = readField("__typename", incomingValue);
        }
        var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
        if (merge) {
          childTree.info = {
            field,
            typename,
            merge
          };
        } else {
          maybeRecycleChildMergeTree(mergeTree, storeFieldName);
        }
        incoming = context2.merge(incoming, (_a3 = {}, _a3[storeFieldName] = incomingValue, _a3));
      } else if (__DEV__ && !context2.clientOnly && !context2.deferred && !addTypenameToDocument.added(field) && !policies.getReadFunction(typename, field.name.value)) {
        __DEV__ && invariant.error("Missing field '".concat(resultKeyNameFromField(field), "' while writing result ").concat(JSON.stringify(result, null, 2)).substring(0, 1e3));
      }
    });
    try {
      var _b = policies.identify(result, {
        typename,
        selectionSet,
        fragmentMap: context.fragmentMap,
        storeObject: incoming,
        readField
      }), id = _b[0], keyObject = _b[1];
      dataId = dataId || id;
      if (keyObject) {
        incoming = context.merge(incoming, keyObject);
      }
    } catch (e) {
      if (!dataId)
        throw e;
    }
    if (typeof dataId === "string") {
      var dataRef = makeReference(dataId);
      var sets = context.written[dataId] || (context.written[dataId] = []);
      if (sets.indexOf(selectionSet) >= 0)
        return dataRef;
      sets.push(selectionSet);
      if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context)) {
        return dataRef;
      }
      var previous_1 = context.incomingById.get(dataId);
      if (previous_1) {
        previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
        previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
        fieldNodeSet.forEach(function(field) {
          return previous_1.fieldNodeSet.add(field);
        });
      } else {
        context.incomingById.set(dataId, {
          storeObject: incoming,
          mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
          fieldNodeSet
        });
      }
      return dataRef;
    }
    return incoming;
  };
  StoreWriter2.prototype.processFieldValue = function(value, field, context, mergeTree) {
    var _this = this;
    if (!field.selectionSet || value === null) {
      return __DEV__ ? cloneDeep(value) : value;
    }
    if (isArray(value)) {
      return value.map(function(item, i) {
        var value2 = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
        maybeRecycleChildMergeTree(mergeTree, i);
        return value2;
      });
    }
    return this.processSelectionSet({
      result: value,
      selectionSet: field.selectionSet,
      context,
      mergeTree
    });
  };
  StoreWriter2.prototype.flattenFields = function(selectionSet, result, context, typename) {
    if (typename === void 0) {
      typename = getTypenameFromResult(result, selectionSet, context.fragmentMap);
    }
    var fieldMap = /* @__PURE__ */ new Map();
    var policies = this.cache.policies;
    var limitingTrie = new Trie(false);
    (function flatten(selectionSet2, inheritedContext) {
      var visitedNode = limitingTrie.lookup(selectionSet2, inheritedContext.clientOnly, inheritedContext.deferred);
      if (visitedNode.visited)
        return;
      visitedNode.visited = true;
      selectionSet2.selections.forEach(function(selection) {
        if (!shouldInclude(selection, context.variables))
          return;
        var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
        if (!(clientOnly && deferred) && isNonEmptyArray(selection.directives)) {
          selection.directives.forEach(function(dir) {
            var name = dir.name.value;
            if (name === "client")
              clientOnly = true;
            if (name === "defer") {
              var args = argumentsObjectFromField(dir, context.variables);
              if (!args || args.if !== false) {
                deferred = true;
              }
            }
          });
        }
        if (isField(selection)) {
          var existing = fieldMap.get(selection);
          if (existing) {
            clientOnly = clientOnly && existing.clientOnly;
            deferred = deferred && existing.deferred;
          }
          fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
        } else {
          var fragment = getFragmentFromSelection(selection, context.fragmentMap);
          if (fragment && policies.fragmentMatches(fragment, typename, result, context.variables)) {
            flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
          }
        }
      });
    })(selectionSet, context);
    return fieldMap;
  };
  StoreWriter2.prototype.applyMerges = function(mergeTree, existing, incoming, context, getStorageArgs) {
    var _a2;
    var _this = this;
    if (mergeTree.map.size && !isReference(incoming)) {
      var e_1 = !isArray(incoming) && (isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0;
      var i_1 = incoming;
      if (e_1 && !getStorageArgs) {
        getStorageArgs = [isReference(e_1) ? e_1.__ref : e_1];
      }
      var changedFields_1;
      var getValue_1 = function(from2, name) {
        return isArray(from2) ? typeof name === "number" ? from2[name] : void 0 : context.store.getFieldValue(from2, String(name));
      };
      mergeTree.map.forEach(function(childTree, storeFieldName) {
        var eVal = getValue_1(e_1, storeFieldName);
        var iVal = getValue_1(i_1, storeFieldName);
        if (iVal === void 0)
          return;
        if (getStorageArgs) {
          getStorageArgs.push(storeFieldName);
        }
        var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
        if (aVal !== iVal) {
          changedFields_1 = changedFields_1 || /* @__PURE__ */ new Map();
          changedFields_1.set(storeFieldName, aVal);
        }
        if (getStorageArgs) {
          invariant(getStorageArgs.pop() === storeFieldName);
        }
      });
      if (changedFields_1) {
        incoming = isArray(i_1) ? i_1.slice(0) : tslib.exports.__assign({}, i_1);
        changedFields_1.forEach(function(value, name) {
          incoming[name] = value;
        });
      }
    }
    if (mergeTree.info) {
      return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a2 = context.store).getStorage.apply(_a2, getStorageArgs));
    }
    return incoming;
  };
  return StoreWriter2;
}();
var emptyMergeTreePool = [];
function getChildMergeTree(_a2, name) {
  var map = _a2.map;
  if (!map.has(name)) {
    map.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
  }
  return map.get(name);
}
function mergeMergeTrees(left, right) {
  if (left === right || !right || mergeTreeIsEmpty(right))
    return left;
  if (!left || mergeTreeIsEmpty(left))
    return right;
  var info = left.info && right.info ? tslib.exports.__assign(tslib.exports.__assign({}, left.info), right.info) : left.info || right.info;
  var needToMergeMaps = left.map.size && right.map.size;
  var map = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
  var merged = { info, map };
  if (needToMergeMaps) {
    var remainingRightKeys_1 = new Set(right.map.keys());
    left.map.forEach(function(leftTree, key) {
      merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
      remainingRightKeys_1.delete(key);
    });
    remainingRightKeys_1.forEach(function(key) {
      merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
    });
  }
  return merged;
}
function mergeTreeIsEmpty(tree) {
  return !tree || !(tree.info || tree.map.size);
}
function maybeRecycleChildMergeTree(_a2, name) {
  var map = _a2.map;
  var childTree = map.get(name);
  if (childTree && mergeTreeIsEmpty(childTree)) {
    emptyMergeTreePool.push(childTree);
    map.delete(name);
  }
}
var warnings = /* @__PURE__ */ new Set();
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store2) {
  var getChild = function(objOrRef) {
    var child = store2.getFieldValue(objOrRef, storeFieldName);
    return typeof child === "object" && child;
  };
  var existing = getChild(existingRef);
  if (!existing)
    return;
  var incoming = getChild(incomingObj);
  if (!incoming)
    return;
  if (isReference(existing))
    return;
  if (equal(existing, incoming))
    return;
  if (Object.keys(existing).every(function(key) {
    return store2.getFieldValue(incoming, key) !== void 0;
  })) {
    return;
  }
  var parentType = store2.getFieldValue(existingRef, "__typename") || store2.getFieldValue(incomingObj, "__typename");
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var typeDotName = "".concat(parentType, ".").concat(fieldName);
  if (warnings.has(typeDotName))
    return;
  warnings.add(typeDotName);
  var childTypenames = [];
  if (!isArray(existing) && !isArray(incoming)) {
    [existing, incoming].forEach(function(child) {
      var typename = store2.getFieldValue(child, "__typename");
      if (typeof typename === "string" && !childTypenames.includes(typename)) {
        childTypenames.push(typename);
      }
    });
  }
  __DEV__ && invariant.warn("Cache data may be lost when replacing the ".concat(fieldName, " field of a ").concat(parentType, " object.\n\nTo address this problem (which is not a bug in Apollo Client), ").concat(childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", "define a custom merge function for the ").concat(typeDotName, " field, so InMemoryCache can safely merge these objects:\n\n  existing: ").concat(JSON.stringify(existing).slice(0, 1e3), "\n  incoming: ").concat(JSON.stringify(incoming).slice(0, 1e3), "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n"));
}
var InMemoryCache$1 = function(_super) {
  tslib.exports.__extends(InMemoryCache2, _super);
  function InMemoryCache2(config2) {
    if (config2 === void 0) {
      config2 = {};
    }
    var _this = _super.call(this) || this;
    _this.watches = /* @__PURE__ */ new Set();
    _this.typenameDocumentCache = /* @__PURE__ */ new Map();
    _this.makeVar = makeVar;
    _this.txCount = 0;
    _this.config = normalizeConfig(config2);
    _this.addTypename = !!_this.config.addTypename;
    _this.policies = new Policies({
      cache: _this,
      dataIdFromObject: _this.config.dataIdFromObject,
      possibleTypes: _this.config.possibleTypes,
      typePolicies: _this.config.typePolicies
    });
    _this.init();
    return _this;
  }
  InMemoryCache2.prototype.init = function() {
    var rootStore = this.data = new EntityStore.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = rootStore.stump;
    this.resetResultCache();
  };
  InMemoryCache2.prototype.resetResultCache = function(resetResultIdentities) {
    var _this = this;
    var previousReader = this.storeReader;
    this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
      cache: this,
      addTypename: this.addTypename,
      resultCacheMaxSize: this.config.resultCacheMaxSize,
      canonizeResults: shouldCanonizeResults(this.config),
      canon: resetResultIdentities ? void 0 : previousReader && previousReader.canon
    }));
    this.maybeBroadcastWatch = wrap(function(c, options) {
      return _this.broadcastWatch(c, options);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(c) {
        var store2 = c.optimistic ? _this.optimisticData : _this.data;
        if (supportsResultCaching(store2)) {
          var optimistic = c.optimistic, rootId = c.rootId, variables = c.variables;
          return store2.makeCacheKey(c.query, c.callback, canonicalStringify({ optimistic, rootId, variables }));
        }
      }
    });
    (/* @__PURE__ */ new Set([
      this.data.group,
      this.optimisticData.group
    ])).forEach(function(group) {
      return group.resetCaching();
    });
  };
  InMemoryCache2.prototype.restore = function(data) {
    this.init();
    if (data)
      this.data.replace(data);
    return this;
  };
  InMemoryCache2.prototype.extract = function(optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }
    return (optimistic ? this.optimisticData : this.data).extract();
  };
  InMemoryCache2.prototype.read = function(options) {
    var _a2 = options.returnPartialData, returnPartialData = _a2 === void 0 ? false : _a2;
    try {
      return this.storeReader.diffQueryAgainstStore(tslib.exports.__assign(tslib.exports.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData })).result || null;
    } catch (e) {
      if (e instanceof MissingFieldError) {
        return null;
      }
      throw e;
    }
  };
  InMemoryCache2.prototype.write = function(options) {
    try {
      ++this.txCount;
      return this.storeWriter.writeToStore(this.data, options);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.modify = function(options) {
    if (hasOwn.call(options, "id") && !options.id) {
      return false;
    }
    var store2 = options.optimistic ? this.optimisticData : this.data;
    try {
      ++this.txCount;
      return store2.modify(options.id || "ROOT_QUERY", options.fields);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.diff = function(options) {
    return this.storeReader.diffQueryAgainstStore(tslib.exports.__assign(tslib.exports.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
  };
  InMemoryCache2.prototype.watch = function(watch) {
    var _this = this;
    if (!this.watches.size) {
      recallCache(this);
    }
    this.watches.add(watch);
    if (watch.immediate) {
      this.maybeBroadcastWatch(watch);
    }
    return function() {
      if (_this.watches.delete(watch) && !_this.watches.size) {
        forgetCache(_this);
      }
      _this.maybeBroadcastWatch.forget(watch);
    };
  };
  InMemoryCache2.prototype.gc = function(options) {
    canonicalStringify.reset();
    var ids = this.optimisticData.gc();
    if (options && !this.txCount) {
      if (options.resetResultCache) {
        this.resetResultCache(options.resetResultIdentities);
      } else if (options.resetResultIdentities) {
        this.storeReader.resetCanon();
      }
    }
    return ids;
  };
  InMemoryCache2.prototype.retain = function(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).retain(rootId);
  };
  InMemoryCache2.prototype.release = function(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).release(rootId);
  };
  InMemoryCache2.prototype.identify = function(object) {
    if (isReference(object))
      return object.__ref;
    try {
      return this.policies.identify(object)[0];
    } catch (e) {
      __DEV__ && invariant.warn(e);
    }
  };
  InMemoryCache2.prototype.evict = function(options) {
    if (!options.id) {
      if (hasOwn.call(options, "id")) {
        return false;
      }
      options = tslib.exports.__assign(tslib.exports.__assign({}, options), { id: "ROOT_QUERY" });
    }
    try {
      ++this.txCount;
      return this.optimisticData.evict(options, this.data);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.reset = function(options) {
    var _this = this;
    this.init();
    canonicalStringify.reset();
    if (options && options.discardWatches) {
      this.watches.forEach(function(watch) {
        return _this.maybeBroadcastWatch.forget(watch);
      });
      this.watches.clear();
      forgetCache(this);
    } else {
      this.broadcastWatches();
    }
    return Promise.resolve();
  };
  InMemoryCache2.prototype.removeOptimistic = function(idToRemove) {
    var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
    if (newOptimisticData !== this.optimisticData) {
      this.optimisticData = newOptimisticData;
      this.broadcastWatches();
    }
  };
  InMemoryCache2.prototype.batch = function(options) {
    var _this = this;
    var update = options.update, _a2 = options.optimistic, optimistic = _a2 === void 0 ? true : _a2, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
    var updateResult;
    var perform = function(layer) {
      var _a3 = _this, data = _a3.data, optimisticData = _a3.optimisticData;
      ++_this.txCount;
      if (layer) {
        _this.data = _this.optimisticData = layer;
      }
      try {
        return updateResult = update(_this);
      } finally {
        --_this.txCount;
        _this.data = data;
        _this.optimisticData = optimisticData;
      }
    };
    var alreadyDirty = /* @__PURE__ */ new Set();
    if (onWatchUpdated && !this.txCount) {
      this.broadcastWatches(tslib.exports.__assign(tslib.exports.__assign({}, options), { onWatchUpdated: function(watch) {
        alreadyDirty.add(watch);
        return false;
      } }));
    }
    if (typeof optimistic === "string") {
      this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
    } else if (optimistic === false) {
      perform(this.data);
    } else {
      perform();
    }
    if (typeof removeOptimistic === "string") {
      this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
    }
    if (onWatchUpdated && alreadyDirty.size) {
      this.broadcastWatches(tslib.exports.__assign(tslib.exports.__assign({}, options), { onWatchUpdated: function(watch, diff) {
        var result = onWatchUpdated.call(this, watch, diff);
        if (result !== false) {
          alreadyDirty.delete(watch);
        }
        return result;
      } }));
      if (alreadyDirty.size) {
        alreadyDirty.forEach(function(watch) {
          return _this.maybeBroadcastWatch.dirty(watch);
        });
      }
    } else {
      this.broadcastWatches(options);
    }
    return updateResult;
  };
  InMemoryCache2.prototype.performTransaction = function(update, optimisticId) {
    return this.batch({
      update,
      optimistic: optimisticId || optimisticId !== null
    });
  };
  InMemoryCache2.prototype.transformDocument = function(document2) {
    if (this.addTypename) {
      var result = this.typenameDocumentCache.get(document2);
      if (!result) {
        result = addTypenameToDocument(document2);
        this.typenameDocumentCache.set(document2, result);
        this.typenameDocumentCache.set(result, result);
      }
      return result;
    }
    return document2;
  };
  InMemoryCache2.prototype.broadcastWatches = function(options) {
    var _this = this;
    if (!this.txCount) {
      this.watches.forEach(function(c) {
        return _this.maybeBroadcastWatch(c, options);
      });
    }
  };
  InMemoryCache2.prototype.broadcastWatch = function(c, options) {
    var lastDiff = c.lastDiff;
    var diff = this.diff(c);
    if (options) {
      if (c.optimistic && typeof options.optimistic === "string") {
        diff.fromOptimisticTransaction = true;
      }
      if (options.onWatchUpdated && options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
        return;
      }
    }
    if (!lastDiff || !equal(lastDiff.result, diff.result)) {
      c.callback(c.lastDiff = diff, lastDiff);
    }
  };
  return InMemoryCache2;
}(ApolloCache);
var cache = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApolloCache,
  get Cache() {
    return Cache;
  },
  MissingFieldError,
  isReference,
  makeReference,
  get EntityStore() {
    return EntityStore;
  },
  fieldNameFromStoreName,
  defaultDataIdFromObject,
  InMemoryCache: InMemoryCache$1,
  makeVar,
  cacheSlot,
  Policies,
  canonicalStringify
}, Symbol.toStringTag, { value: "Module" }));
var require$$5 = /* @__PURE__ */ getAugmentedNamespace(cache);
var require$$6 = /* @__PURE__ */ getAugmentedNamespace(utilities);
function isApolloError(err) {
  return err.hasOwnProperty("graphQLErrors");
}
var generateErrorMessage = function(err) {
  var message = "";
  if (isNonEmptyArray(err.graphQLErrors) || isNonEmptyArray(err.clientErrors)) {
    var errors2 = (err.graphQLErrors || []).concat(err.clientErrors || []);
    errors2.forEach(function(error) {
      var errorMessage = error ? error.message : "Error message not found.";
      message += "".concat(errorMessage, "\n");
    });
  }
  if (err.networkError) {
    message += "".concat(err.networkError.message, "\n");
  }
  message = message.replace(/\n$/, "");
  return message;
};
var ApolloError = function(_super) {
  tslib.exports.__extends(ApolloError2, _super);
  function ApolloError2(_a2) {
    var graphQLErrors = _a2.graphQLErrors, clientErrors = _a2.clientErrors, networkError = _a2.networkError, errorMessage = _a2.errorMessage, extraInfo = _a2.extraInfo;
    var _this = _super.call(this, errorMessage) || this;
    _this.graphQLErrors = graphQLErrors || [];
    _this.clientErrors = clientErrors || [];
    _this.networkError = networkError || null;
    _this.message = errorMessage || generateErrorMessage(_this);
    _this.extraInfo = extraInfo;
    _this.__proto__ = ApolloError2.prototype;
    return _this;
  }
  return ApolloError2;
}(Error);
var errors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isApolloError,
  ApolloError
}, Symbol.toStringTag, { value: "Module" }));
var require$$7 = /* @__PURE__ */ getAugmentedNamespace(errors);
var require$$9 = /* @__PURE__ */ getAugmentedNamespace(utils);
var require$$10 = /* @__PURE__ */ getAugmentedNamespace(invariant$2);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var globals2 = require$$0;
  var tslib$1 = tslib.exports;
  var core2 = require$$2;
  var http2 = require$$3;
  var equality = require$$4;
  var cache2 = require$$5;
  var utilities2 = require$$6;
  var errors2 = require$$7;
  var graphql = require$$8;
  var utils2 = require$$9;
  var tsInvariant = require$$10;
  var graphqlTag = gql;
  var version = "3.6.9";
  exports.NetworkStatus = void 0;
  (function(NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
  })(exports.NetworkStatus || (exports.NetworkStatus = {}));
  function isNetworkRequestInFlight(networkStatus) {
    return networkStatus ? networkStatus < 7 : false;
  }
  var assign = Object.assign, hasOwnProperty$12 = Object.hasOwnProperty;
  var ObservableQuery = function(_super) {
    tslib$1.__extends(ObservableQuery2, _super);
    function ObservableQuery2(_a2) {
      var queryManager = _a2.queryManager, queryInfo = _a2.queryInfo, options = _a2.options;
      var _this = _super.call(this, function(observer) {
        try {
          var subObserver = observer._subscription._observer;
          if (subObserver && !subObserver.error) {
            subObserver.error = defaultSubscriptionObserverErrorCallback;
          }
        } catch (_a3) {
        }
        var first = !_this.observers.size;
        _this.observers.add(observer);
        var last = _this.last;
        if (last && last.error) {
          observer.error && observer.error(last.error);
        } else if (last && last.result) {
          observer.next && observer.next(last.result);
        }
        if (first) {
          _this.reobserve().catch(function() {
          });
        }
        return function() {
          if (_this.observers.delete(observer) && !_this.observers.size) {
            _this.tearDownQuery();
          }
        };
      }) || this;
      _this.observers = /* @__PURE__ */ new Set();
      _this.subscriptions = /* @__PURE__ */ new Set();
      _this.queryInfo = queryInfo;
      _this.queryManager = queryManager;
      _this.isTornDown = false;
      var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
      var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy : _f;
      _this.options = tslib$1.__assign(tslib$1.__assign({}, options), { initialFetchPolicy, fetchPolicy });
      _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
      var opDef = utilities2.getOperationDefinition(_this.query);
      _this.queryName = opDef && opDef.name && opDef.name.value;
      return _this;
    }
    Object.defineProperty(ObservableQuery2.prototype, "query", {
      get: function() {
        return this.queryManager.transform(this.options.query).document;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ObservableQuery2.prototype, "variables", {
      get: function() {
        return this.options.variables;
      },
      enumerable: false,
      configurable: true
    });
    ObservableQuery2.prototype.result = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var observer = {
          next: function(result) {
            resolve(result);
            _this.observers.delete(observer);
            if (!_this.observers.size) {
              _this.queryManager.removeQuery(_this.queryId);
            }
            setTimeout(function() {
              subscription.unsubscribe();
            }, 0);
          },
          error: reject
        };
        var subscription = _this.subscribe(observer);
      });
    };
    ObservableQuery2.prototype.getCurrentResult = function(saveAsLastResult) {
      if (saveAsLastResult === void 0) {
        saveAsLastResult = true;
      }
      var lastResult = this.getLastResult(true);
      var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || exports.NetworkStatus.ready;
      var result = tslib$1.__assign(tslib$1.__assign({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus });
      var _a2 = this.options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2;
      if (fetchPolicy === "network-only" || fetchPolicy === "no-cache" || fetchPolicy === "standby" || this.queryManager.transform(this.options.query).hasForcedResolvers)
        ;
      else {
        var diff = this.queryInfo.getDiff();
        if (diff.complete || this.options.returnPartialData) {
          result.data = diff.result;
        }
        if (equality.equal(result.data, {})) {
          result.data = void 0;
        }
        if (diff.complete) {
          delete result.partial;
          if (diff.complete && result.networkStatus === exports.NetworkStatus.loading && (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
            result.networkStatus = exports.NetworkStatus.ready;
            result.loading = false;
          }
        } else {
          result.partial = true;
        }
        if (__DEV__ && !diff.complete && !this.options.partialRefetch && !result.loading && !result.data && !result.error) {
          logMissingFieldErrors(diff.missing);
        }
      }
      if (saveAsLastResult) {
        this.updateLastResult(result);
      }
      return result;
    };
    ObservableQuery2.prototype.isDifferentFromLastResult = function(newResult) {
      return !this.last || !equality.equal(this.last.result, newResult);
    };
    ObservableQuery2.prototype.getLast = function(key, variablesMustMatch) {
      var last = this.last;
      if (last && last[key] && (!variablesMustMatch || equality.equal(last.variables, this.variables))) {
        return last[key];
      }
    };
    ObservableQuery2.prototype.getLastResult = function(variablesMustMatch) {
      return this.getLast("result", variablesMustMatch);
    };
    ObservableQuery2.prototype.getLastError = function(variablesMustMatch) {
      return this.getLast("error", variablesMustMatch);
    };
    ObservableQuery2.prototype.resetLastResults = function() {
      delete this.last;
      this.isTornDown = false;
    };
    ObservableQuery2.prototype.resetQueryStoreErrors = function() {
      this.queryManager.resetErrors(this.queryId);
    };
    ObservableQuery2.prototype.refetch = function(variables) {
      var _a2;
      var reobserveOptions = {
        pollInterval: 0
      };
      var fetchPolicy = this.options.fetchPolicy;
      if (fetchPolicy === "cache-and-network") {
        reobserveOptions.fetchPolicy = fetchPolicy;
      } else if (fetchPolicy === "no-cache") {
        reobserveOptions.fetchPolicy = "no-cache";
      } else {
        reobserveOptions.fetchPolicy = "network-only";
      }
      if (__DEV__ && variables && hasOwnProperty$12.call(variables, "variables")) {
        var queryDef = utilities2.getQueryDefinition(this.query);
        var vars = queryDef.variableDefinitions;
        if (!vars || !vars.some(function(v) {
          return v.variable.name.value === "variables";
        })) {
          __DEV__ && globals2.invariant.warn("Called refetch(".concat(JSON.stringify(variables), ") for query ").concat(((_a2 = queryDef.name) === null || _a2 === void 0 ? void 0 : _a2.value) || JSON.stringify(queryDef), ", which does not declare a $variables variable.\nDid you mean to call refetch(variables) instead of refetch({ variables })?"));
        }
      }
      if (variables && !equality.equal(this.options.variables, variables)) {
        reobserveOptions.variables = this.options.variables = tslib$1.__assign(tslib$1.__assign({}, this.options.variables), variables);
      }
      this.queryInfo.resetLastWrite();
      return this.reobserve(reobserveOptions, exports.NetworkStatus.refetch);
    };
    ObservableQuery2.prototype.fetchMore = function(fetchMoreOptions) {
      var _this = this;
      var combinedOptions = tslib$1.__assign(tslib$1.__assign({}, fetchMoreOptions.query ? fetchMoreOptions : tslib$1.__assign(tslib$1.__assign(tslib$1.__assign(tslib$1.__assign({}, this.options), { query: this.query }), fetchMoreOptions), { variables: tslib$1.__assign(tslib$1.__assign({}, this.options.variables), fetchMoreOptions.variables) })), { fetchPolicy: "no-cache" });
      var qid = this.queryManager.generateQueryId();
      var queryInfo = this.queryInfo;
      var originalNetworkStatus = queryInfo.networkStatus;
      queryInfo.networkStatus = exports.NetworkStatus.fetchMore;
      if (combinedOptions.notifyOnNetworkStatusChange) {
        this.observe();
      }
      var updatedQuerySet = /* @__PURE__ */ new Set();
      return this.queryManager.fetchQuery(qid, combinedOptions, exports.NetworkStatus.fetchMore).then(function(fetchMoreResult) {
        _this.queryManager.removeQuery(qid);
        if (queryInfo.networkStatus === exports.NetworkStatus.fetchMore) {
          queryInfo.networkStatus = originalNetworkStatus;
        }
        _this.queryManager.cache.batch({
          update: function(cache3) {
            var updateQuery = fetchMoreOptions.updateQuery;
            if (updateQuery) {
              cache3.updateQuery({
                query: _this.query,
                variables: _this.variables,
                returnPartialData: true,
                optimistic: false
              }, function(previous) {
                return updateQuery(previous, {
                  fetchMoreResult: fetchMoreResult.data,
                  variables: combinedOptions.variables
                });
              });
            } else {
              cache3.writeQuery({
                query: combinedOptions.query,
                variables: combinedOptions.variables,
                data: fetchMoreResult.data
              });
            }
          },
          onWatchUpdated: function(watch) {
            updatedQuerySet.add(watch.query);
          }
        });
        return fetchMoreResult;
      }).finally(function() {
        if (!updatedQuerySet.has(_this.query)) {
          reobserveCacheFirst(_this);
        }
      });
    };
    ObservableQuery2.prototype.subscribeToMore = function(options) {
      var _this = this;
      var subscription = this.queryManager.startGraphQLSubscription({
        query: options.document,
        variables: options.variables,
        context: options.context
      }).subscribe({
        next: function(subscriptionData) {
          var updateQuery = options.updateQuery;
          if (updateQuery) {
            _this.updateQuery(function(previous, _a2) {
              var variables = _a2.variables;
              return updateQuery(previous, {
                subscriptionData,
                variables
              });
            });
          }
        },
        error: function(err) {
          if (options.onError) {
            options.onError(err);
            return;
          }
          __DEV__ && globals2.invariant.error("Unhandled GraphQL subscription error", err);
        }
      });
      this.subscriptions.add(subscription);
      return function() {
        if (_this.subscriptions.delete(subscription)) {
          subscription.unsubscribe();
        }
      };
    };
    ObservableQuery2.prototype.setOptions = function(newOptions) {
      return this.reobserve(newOptions);
    };
    ObservableQuery2.prototype.setVariables = function(variables) {
      if (equality.equal(this.variables, variables)) {
        return this.observers.size ? this.result() : Promise.resolve();
      }
      this.options.variables = variables;
      if (!this.observers.size) {
        return Promise.resolve();
      }
      return this.reobserve({
        fetchPolicy: this.options.initialFetchPolicy,
        variables
      }, exports.NetworkStatus.setVariables);
    };
    ObservableQuery2.prototype.updateQuery = function(mapFn) {
      var queryManager = this.queryManager;
      var result = queryManager.cache.diff({
        query: this.options.query,
        variables: this.variables,
        returnPartialData: true,
        optimistic: false
      }).result;
      var newResult = mapFn(result, {
        variables: this.variables
      });
      if (newResult) {
        queryManager.cache.writeQuery({
          query: this.options.query,
          data: newResult,
          variables: this.variables
        });
        queryManager.broadcastQueries();
      }
    };
    ObservableQuery2.prototype.startPolling = function(pollInterval) {
      this.options.pollInterval = pollInterval;
      this.updatePolling();
    };
    ObservableQuery2.prototype.stopPolling = function() {
      this.options.pollInterval = 0;
      this.updatePolling();
    };
    ObservableQuery2.prototype.applyNextFetchPolicy = function(reason, options) {
      if (options.nextFetchPolicy) {
        var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
        if (fetchPolicy === "standby")
          ;
        else if (typeof options.nextFetchPolicy === "function") {
          options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
            reason,
            options,
            observable: this,
            initialFetchPolicy
          });
        } else if (reason === "variables-changed") {
          options.fetchPolicy = initialFetchPolicy;
        } else {
          options.fetchPolicy = options.nextFetchPolicy;
        }
      }
      return options.fetchPolicy;
    };
    ObservableQuery2.prototype.fetch = function(options, newNetworkStatus) {
      this.queryManager.setObservableQuery(this);
      return this.queryManager.fetchQueryObservable(this.queryId, options, newNetworkStatus);
    };
    ObservableQuery2.prototype.updatePolling = function() {
      var _this = this;
      if (this.queryManager.ssrMode) {
        return;
      }
      var _a2 = this, pollingInfo = _a2.pollingInfo, pollInterval = _a2.options.pollInterval;
      if (!pollInterval) {
        if (pollingInfo) {
          clearTimeout(pollingInfo.timeout);
          delete this.pollingInfo;
        }
        return;
      }
      if (pollingInfo && pollingInfo.interval === pollInterval) {
        return;
      }
      __DEV__ ? globals2.invariant(pollInterval, "Attempted to start a polling query without a polling interval.") : globals2.invariant(pollInterval, 10);
      var info = pollingInfo || (this.pollingInfo = {});
      info.interval = pollInterval;
      var maybeFetch = function() {
        if (_this.pollingInfo) {
          if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus)) {
            _this.reobserve({
              fetchPolicy: "network-only"
            }, exports.NetworkStatus.poll).then(poll, poll);
          } else {
            poll();
          }
        }
      };
      var poll = function() {
        var info2 = _this.pollingInfo;
        if (info2) {
          clearTimeout(info2.timeout);
          info2.timeout = setTimeout(maybeFetch, info2.interval);
        }
      };
      poll();
    };
    ObservableQuery2.prototype.updateLastResult = function(newResult, variables) {
      if (variables === void 0) {
        variables = this.variables;
      }
      this.last = tslib$1.__assign(tslib$1.__assign({}, this.last), { result: this.queryManager.assumeImmutableResults ? newResult : utilities2.cloneDeep(newResult), variables });
      if (!utilities2.isNonEmptyArray(newResult.errors)) {
        delete this.last.error;
      }
      return this.last;
    };
    ObservableQuery2.prototype.reobserve = function(newOptions, newNetworkStatus) {
      var _this = this;
      this.isTornDown = false;
      var useDisposableConcast = newNetworkStatus === exports.NetworkStatus.refetch || newNetworkStatus === exports.NetworkStatus.fetchMore || newNetworkStatus === exports.NetworkStatus.poll;
      var oldVariables = this.options.variables;
      var oldFetchPolicy = this.options.fetchPolicy;
      var mergedOptions = utilities2.compact(this.options, newOptions || {});
      var options = useDisposableConcast ? mergedOptions : assign(this.options, mergedOptions);
      if (!useDisposableConcast) {
        this.updatePolling();
        if (newOptions && newOptions.variables && !equality.equal(newOptions.variables, oldVariables) && options.fetchPolicy !== "standby" && options.fetchPolicy === oldFetchPolicy) {
          this.applyNextFetchPolicy("variables-changed", options);
          if (newNetworkStatus === void 0) {
            newNetworkStatus = exports.NetworkStatus.setVariables;
          }
        }
      }
      var variables = options.variables && tslib$1.__assign({}, options.variables);
      var concast = this.fetch(options, newNetworkStatus);
      var observer = {
        next: function(result) {
          _this.reportResult(result, variables);
        },
        error: function(error) {
          _this.reportError(error, variables);
        }
      };
      if (!useDisposableConcast) {
        if (this.concast && this.observer) {
          this.concast.removeObserver(this.observer);
        }
        this.concast = concast;
        this.observer = observer;
      }
      concast.addObserver(observer);
      return concast.promise;
    };
    ObservableQuery2.prototype.observe = function() {
      this.reportResult(this.getCurrentResult(false), this.variables);
    };
    ObservableQuery2.prototype.reportResult = function(result, variables) {
      var lastError = this.getLastError();
      if (lastError || this.isDifferentFromLastResult(result)) {
        if (lastError || !result.partial || this.options.returnPartialData) {
          this.updateLastResult(result, variables);
        }
        utilities2.iterateObserversSafely(this.observers, "next", result);
      }
    };
    ObservableQuery2.prototype.reportError = function(error, variables) {
      var errorResult = tslib$1.__assign(tslib$1.__assign({}, this.getLastResult()), { error, errors: error.graphQLErrors, networkStatus: exports.NetworkStatus.error, loading: false });
      this.updateLastResult(errorResult, variables);
      utilities2.iterateObserversSafely(this.observers, "error", this.last.error = error);
    };
    ObservableQuery2.prototype.hasObservers = function() {
      return this.observers.size > 0;
    };
    ObservableQuery2.prototype.tearDownQuery = function() {
      if (this.isTornDown)
        return;
      if (this.concast && this.observer) {
        this.concast.removeObserver(this.observer);
        delete this.concast;
        delete this.observer;
      }
      this.stopPolling();
      this.subscriptions.forEach(function(sub) {
        return sub.unsubscribe();
      });
      this.subscriptions.clear();
      this.queryManager.stopQuery(this.queryId);
      this.observers.clear();
      this.isTornDown = true;
    };
    return ObservableQuery2;
  }(utilities2.Observable);
  utilities2.fixObservableSubclass(ObservableQuery);
  function reobserveCacheFirst(obsQuery) {
    var _a2 = obsQuery.options, fetchPolicy = _a2.fetchPolicy, nextFetchPolicy = _a2.nextFetchPolicy;
    if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
      return obsQuery.reobserve({
        fetchPolicy: "cache-first",
        nextFetchPolicy: function() {
          this.nextFetchPolicy = nextFetchPolicy;
          if (typeof nextFetchPolicy === "function") {
            return nextFetchPolicy.apply(this, arguments);
          }
          return fetchPolicy;
        }
      });
    }
    return obsQuery.reobserve();
  }
  function defaultSubscriptionObserverErrorCallback(error) {
    __DEV__ && globals2.invariant.error("Unhandled error", error.message, error.stack);
  }
  function logMissingFieldErrors(missing) {
    if (__DEV__ && missing) {
      __DEV__ && globals2.invariant.debug("Missing cache result fields: ".concat(JSON.stringify(missing)), missing);
    }
  }
  var LocalState = function() {
    function LocalState2(_a2) {
      var cache3 = _a2.cache, client = _a2.client, resolvers = _a2.resolvers, fragmentMatcher = _a2.fragmentMatcher;
      this.cache = cache3;
      if (client) {
        this.client = client;
      }
      if (resolvers) {
        this.addResolvers(resolvers);
      }
      if (fragmentMatcher) {
        this.setFragmentMatcher(fragmentMatcher);
      }
    }
    LocalState2.prototype.addResolvers = function(resolvers) {
      var _this = this;
      this.resolvers = this.resolvers || {};
      if (Array.isArray(resolvers)) {
        resolvers.forEach(function(resolverGroup) {
          _this.resolvers = utilities2.mergeDeep(_this.resolvers, resolverGroup);
        });
      } else {
        this.resolvers = utilities2.mergeDeep(this.resolvers, resolvers);
      }
    };
    LocalState2.prototype.setResolvers = function(resolvers) {
      this.resolvers = {};
      this.addResolvers(resolvers);
    };
    LocalState2.prototype.getResolvers = function() {
      return this.resolvers || {};
    };
    LocalState2.prototype.runResolvers = function(_a2) {
      var document2 = _a2.document, remoteResult = _a2.remoteResult, context = _a2.context, variables = _a2.variables, _b = _a2.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        return tslib$1.__generator(this, function(_c) {
          if (document2) {
            return [2, this.resolveDocument(document2, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function(localResult) {
              return tslib$1.__assign(tslib$1.__assign({}, remoteResult), { data: localResult.result });
            })];
          }
          return [2, remoteResult];
        });
      });
    };
    LocalState2.prototype.setFragmentMatcher = function(fragmentMatcher) {
      this.fragmentMatcher = fragmentMatcher;
    };
    LocalState2.prototype.getFragmentMatcher = function() {
      return this.fragmentMatcher;
    };
    LocalState2.prototype.clientQuery = function(document2) {
      if (utilities2.hasDirectives(["client"], document2)) {
        if (this.resolvers) {
          return document2;
        }
      }
      return null;
    };
    LocalState2.prototype.serverQuery = function(document2) {
      return utilities2.removeClientSetsFromDocument(document2);
    };
    LocalState2.prototype.prepareContext = function(context) {
      var cache3 = this.cache;
      return tslib$1.__assign(tslib$1.__assign({}, context), { cache: cache3, getCacheKey: function(obj) {
        return cache3.identify(obj);
      } });
    };
    LocalState2.prototype.addExportedVariables = function(document2, variables, context) {
      if (variables === void 0) {
        variables = {};
      }
      if (context === void 0) {
        context = {};
      }
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        return tslib$1.__generator(this, function(_a2) {
          if (document2) {
            return [2, this.resolveDocument(document2, this.buildRootValueFromCache(document2, variables) || {}, this.prepareContext(context), variables).then(function(data) {
              return tslib$1.__assign(tslib$1.__assign({}, variables), data.exportedVariables);
            })];
          }
          return [2, tslib$1.__assign({}, variables)];
        });
      });
    };
    LocalState2.prototype.shouldForceResolvers = function(document2) {
      var forceResolvers = false;
      graphql.visit(document2, {
        Directive: {
          enter: function(node) {
            if (node.name.value === "client" && node.arguments) {
              forceResolvers = node.arguments.some(function(arg) {
                return arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true;
              });
              if (forceResolvers) {
                return graphql.BREAK;
              }
            }
          }
        }
      });
      return forceResolvers;
    };
    LocalState2.prototype.buildRootValueFromCache = function(document2, variables) {
      return this.cache.diff({
        query: utilities2.buildQueryFromSelectionSet(document2),
        variables,
        returnPartialData: true,
        optimistic: false
      }).result;
    };
    LocalState2.prototype.resolveDocument = function(document2, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
      if (context === void 0) {
        context = {};
      }
      if (variables === void 0) {
        variables = {};
      }
      if (fragmentMatcher === void 0) {
        fragmentMatcher = function() {
          return true;
        };
      }
      if (onlyRunForcedResolvers === void 0) {
        onlyRunForcedResolvers = false;
      }
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a2, cache3, client, execContext;
        return tslib$1.__generator(this, function(_b) {
          mainDefinition = utilities2.getMainDefinition(document2);
          fragments = utilities2.getFragmentDefinitions(document2);
          fragmentMap = utilities2.createFragmentMap(fragments);
          definitionOperation = mainDefinition.operation;
          defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : "Query";
          _a2 = this, cache3 = _a2.cache, client = _a2.client;
          execContext = {
            fragmentMap,
            context: tslib$1.__assign(tslib$1.__assign({}, context), { cache: cache3, client }),
            variables,
            fragmentMatcher,
            defaultOperationType,
            exportedVariables: {},
            onlyRunForcedResolvers
          };
          return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function(result) {
            return {
              result,
              exportedVariables: execContext.exportedVariables
            };
          })];
        });
      });
    };
    LocalState2.prototype.resolveSelectionSet = function(selectionSet, rootValue, execContext) {
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        var fragmentMap, context, variables, resultsToMerge, execute2;
        var _this = this;
        return tslib$1.__generator(this, function(_a2) {
          fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
          resultsToMerge = [rootValue];
          execute2 = function(selection) {
            return tslib$1.__awaiter(_this, void 0, void 0, function() {
              var fragment, typeCondition;
              return tslib$1.__generator(this, function(_a3) {
                if (!utilities2.shouldInclude(selection, variables)) {
                  return [2];
                }
                if (utilities2.isField(selection)) {
                  return [2, this.resolveField(selection, rootValue, execContext).then(function(fieldResult) {
                    var _a4;
                    if (typeof fieldResult !== "undefined") {
                      resultsToMerge.push((_a4 = {}, _a4[utilities2.resultKeyNameFromField(selection)] = fieldResult, _a4));
                    }
                  })];
                }
                if (utilities2.isInlineFragment(selection)) {
                  fragment = selection;
                } else {
                  fragment = fragmentMap[selection.name.value];
                  __DEV__ ? globals2.invariant(fragment, "No fragment named ".concat(selection.name.value)) : globals2.invariant(fragment, 9);
                }
                if (fragment && fragment.typeCondition) {
                  typeCondition = fragment.typeCondition.name.value;
                  if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                    return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function(fragmentResult) {
                      resultsToMerge.push(fragmentResult);
                    })];
                  }
                }
                return [2];
              });
            });
          };
          return [2, Promise.all(selectionSet.selections.map(execute2)).then(function() {
            return utilities2.mergeDeepArray(resultsToMerge);
          })];
        });
      });
    };
    LocalState2.prototype.resolveField = function(field, rootValue, execContext) {
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
        var _this = this;
        return tslib$1.__generator(this, function(_a2) {
          variables = execContext.variables;
          fieldName = field.name.value;
          aliasedFieldName = utilities2.resultKeyNameFromField(field);
          aliasUsed = fieldName !== aliasedFieldName;
          defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
          resultPromise = Promise.resolve(defaultResult);
          if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
            resolverType = rootValue.__typename || execContext.defaultOperationType;
            resolverMap = this.resolvers && this.resolvers[resolverType];
            if (resolverMap) {
              resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
              if (resolve) {
                resultPromise = Promise.resolve(cache2.cacheSlot.withValue(this.cache, resolve, [
                  rootValue,
                  utilities2.argumentsObjectFromField(field, variables),
                  execContext.context,
                  { field, fragmentMap: execContext.fragmentMap }
                ]));
              }
            }
          }
          return [2, resultPromise.then(function(result) {
            if (result === void 0) {
              result = defaultResult;
            }
            if (field.directives) {
              field.directives.forEach(function(directive) {
                if (directive.name.value === "export" && directive.arguments) {
                  directive.arguments.forEach(function(arg) {
                    if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                      execContext.exportedVariables[arg.value.value] = result;
                    }
                  });
                }
              });
            }
            if (!field.selectionSet) {
              return result;
            }
            if (result == null) {
              return result;
            }
            if (Array.isArray(result)) {
              return _this.resolveSubSelectedArray(field, result, execContext);
            }
            if (field.selectionSet) {
              return _this.resolveSelectionSet(field.selectionSet, result, execContext);
            }
          })];
        });
      });
    };
    LocalState2.prototype.resolveSubSelectedArray = function(field, result, execContext) {
      var _this = this;
      return Promise.all(result.map(function(item) {
        if (item === null) {
          return null;
        }
        if (Array.isArray(item)) {
          return _this.resolveSubSelectedArray(field, item, execContext);
        }
        if (field.selectionSet) {
          return _this.resolveSelectionSet(field.selectionSet, item, execContext);
        }
      }));
    };
    return LocalState2;
  }();
  var destructiveMethodCounts = new (utilities2.canUseWeakMap ? WeakMap : Map)();
  function wrapDestructiveCacheMethod(cache3, methodName) {
    var original = cache3[methodName];
    if (typeof original === "function") {
      cache3[methodName] = function() {
        destructiveMethodCounts.set(cache3, (destructiveMethodCounts.get(cache3) + 1) % 1e15);
        return original.apply(this, arguments);
      };
    }
  }
  function cancelNotifyTimeout(info) {
    if (info["notifyTimeout"]) {
      clearTimeout(info["notifyTimeout"]);
      info["notifyTimeout"] = void 0;
    }
  }
  var QueryInfo = function() {
    function QueryInfo2(queryManager, queryId) {
      if (queryId === void 0) {
        queryId = queryManager.generateQueryId();
      }
      this.queryId = queryId;
      this.listeners = /* @__PURE__ */ new Set();
      this.document = null;
      this.lastRequestId = 1;
      this.subscriptions = /* @__PURE__ */ new Set();
      this.stopped = false;
      this.dirty = false;
      this.observableQuery = null;
      var cache3 = this.cache = queryManager.cache;
      if (!destructiveMethodCounts.has(cache3)) {
        destructiveMethodCounts.set(cache3, 0);
        wrapDestructiveCacheMethod(cache3, "evict");
        wrapDestructiveCacheMethod(cache3, "modify");
        wrapDestructiveCacheMethod(cache3, "reset");
      }
    }
    QueryInfo2.prototype.init = function(query2) {
      var networkStatus = query2.networkStatus || exports.NetworkStatus.loading;
      if (this.variables && this.networkStatus !== exports.NetworkStatus.loading && !equality.equal(this.variables, query2.variables)) {
        networkStatus = exports.NetworkStatus.setVariables;
      }
      if (!equality.equal(query2.variables, this.variables)) {
        this.lastDiff = void 0;
      }
      Object.assign(this, {
        document: query2.document,
        variables: query2.variables,
        networkError: null,
        graphQLErrors: this.graphQLErrors || [],
        networkStatus
      });
      if (query2.observableQuery) {
        this.setObservableQuery(query2.observableQuery);
      }
      if (query2.lastRequestId) {
        this.lastRequestId = query2.lastRequestId;
      }
      return this;
    };
    QueryInfo2.prototype.reset = function() {
      cancelNotifyTimeout(this);
      this.lastDiff = void 0;
      this.dirty = false;
    };
    QueryInfo2.prototype.getDiff = function(variables) {
      if (variables === void 0) {
        variables = this.variables;
      }
      var options = this.getDiffOptions(variables);
      if (this.lastDiff && equality.equal(options, this.lastDiff.options)) {
        return this.lastDiff.diff;
      }
      this.updateWatch(this.variables = variables);
      var oq = this.observableQuery;
      if (oq && oq.options.fetchPolicy === "no-cache") {
        return { complete: false };
      }
      var diff = this.cache.diff(options);
      this.updateLastDiff(diff, options);
      return diff;
    };
    QueryInfo2.prototype.updateLastDiff = function(diff, options) {
      this.lastDiff = diff ? {
        diff,
        options: options || this.getDiffOptions()
      } : void 0;
    };
    QueryInfo2.prototype.getDiffOptions = function(variables) {
      var _a2;
      if (variables === void 0) {
        variables = this.variables;
      }
      return {
        query: this.document,
        variables,
        returnPartialData: true,
        optimistic: true,
        canonizeResults: (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2.options.canonizeResults
      };
    };
    QueryInfo2.prototype.setDiff = function(diff) {
      var _this = this;
      var oldDiff = this.lastDiff && this.lastDiff.diff;
      this.updateLastDiff(diff);
      if (!this.dirty && !equality.equal(oldDiff && oldDiff.result, diff && diff.result)) {
        this.dirty = true;
        if (!this.notifyTimeout) {
          this.notifyTimeout = setTimeout(function() {
            return _this.notify();
          }, 0);
        }
      }
    };
    QueryInfo2.prototype.setObservableQuery = function(oq) {
      var _this = this;
      if (oq === this.observableQuery)
        return;
      if (this.oqListener) {
        this.listeners.delete(this.oqListener);
      }
      this.observableQuery = oq;
      if (oq) {
        oq["queryInfo"] = this;
        this.listeners.add(this.oqListener = function() {
          var diff = _this.getDiff();
          if (diff.fromOptimisticTransaction) {
            oq["observe"]();
          } else {
            reobserveCacheFirst(oq);
          }
        });
      } else {
        delete this.oqListener;
      }
    };
    QueryInfo2.prototype.notify = function() {
      var _this = this;
      cancelNotifyTimeout(this);
      if (this.shouldNotify()) {
        this.listeners.forEach(function(listener) {
          return listener(_this);
        });
      }
      this.dirty = false;
    };
    QueryInfo2.prototype.shouldNotify = function() {
      if (!this.dirty || !this.listeners.size) {
        return false;
      }
      if (isNetworkRequestInFlight(this.networkStatus) && this.observableQuery) {
        var fetchPolicy = this.observableQuery.options.fetchPolicy;
        if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
          return false;
        }
      }
      return true;
    };
    QueryInfo2.prototype.stop = function() {
      if (!this.stopped) {
        this.stopped = true;
        this.reset();
        this.cancel();
        this.cancel = QueryInfo2.prototype.cancel;
        this.subscriptions.forEach(function(sub) {
          return sub.unsubscribe();
        });
        var oq = this.observableQuery;
        if (oq)
          oq.stopPolling();
      }
    };
    QueryInfo2.prototype.cancel = function() {
    };
    QueryInfo2.prototype.updateWatch = function(variables) {
      var _this = this;
      if (variables === void 0) {
        variables = this.variables;
      }
      var oq = this.observableQuery;
      if (oq && oq.options.fetchPolicy === "no-cache") {
        return;
      }
      var watchOptions = tslib$1.__assign(tslib$1.__assign({}, this.getDiffOptions(variables)), { watcher: this, callback: function(diff) {
        return _this.setDiff(diff);
      } });
      if (!this.lastWatch || !equality.equal(watchOptions, this.lastWatch)) {
        this.cancel();
        this.cancel = this.cache.watch(this.lastWatch = watchOptions);
      }
    };
    QueryInfo2.prototype.resetLastWrite = function() {
      this.lastWrite = void 0;
    };
    QueryInfo2.prototype.shouldWrite = function(result, variables) {
      var lastWrite = this.lastWrite;
      return !(lastWrite && lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equality.equal(variables, lastWrite.variables) && equality.equal(result.data, lastWrite.result.data));
    };
    QueryInfo2.prototype.markResult = function(result, options, cacheWriteBehavior) {
      var _this = this;
      this.graphQLErrors = utilities2.isNonEmptyArray(result.errors) ? result.errors : [];
      this.reset();
      if (options.fetchPolicy === "no-cache") {
        this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
      } else if (cacheWriteBehavior !== 0) {
        if (shouldWriteResult(result, options.errorPolicy)) {
          this.cache.performTransaction(function(cache3) {
            if (_this.shouldWrite(result, options.variables)) {
              cache3.writeQuery({
                query: _this.document,
                data: result.data,
                variables: options.variables,
                overwrite: cacheWriteBehavior === 1
              });
              _this.lastWrite = {
                result,
                variables: options.variables,
                dmCount: destructiveMethodCounts.get(_this.cache)
              };
            } else {
              if (_this.lastDiff && _this.lastDiff.diff.complete) {
                result.data = _this.lastDiff.diff.result;
                return;
              }
            }
            var diffOptions = _this.getDiffOptions(options.variables);
            var diff = cache3.diff(diffOptions);
            if (!_this.stopped) {
              _this.updateWatch(options.variables);
            }
            _this.updateLastDiff(diff, diffOptions);
            if (diff.complete) {
              result.data = diff.result;
            }
          });
        } else {
          this.lastWrite = void 0;
        }
      }
    };
    QueryInfo2.prototype.markReady = function() {
      this.networkError = null;
      return this.networkStatus = exports.NetworkStatus.ready;
    };
    QueryInfo2.prototype.markError = function(error) {
      this.networkStatus = exports.NetworkStatus.error;
      this.lastWrite = void 0;
      this.reset();
      if (error.graphQLErrors) {
        this.graphQLErrors = error.graphQLErrors;
      }
      if (error.networkError) {
        this.networkError = error.networkError;
      }
      return error;
    };
    return QueryInfo2;
  }();
  function shouldWriteResult(result, errorPolicy) {
    if (errorPolicy === void 0) {
      errorPolicy = "none";
    }
    var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
    var writeWithErrors = !utilities2.graphQLResultHasError(result);
    if (!writeWithErrors && ignoreErrors && result.data) {
      writeWithErrors = true;
    }
    return writeWithErrors;
  }
  var hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var QueryManager = function() {
    function QueryManager2(_a2) {
      var cache3 = _a2.cache, link = _a2.link, defaultOptions2 = _a2.defaultOptions, _b = _a2.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, onBroadcast = _a2.onBroadcast, _c = _a2.ssrMode, ssrMode = _c === void 0 ? false : _c, _d = _a2.clientAwareness, clientAwareness = _d === void 0 ? {} : _d, localState = _a2.localState, assumeImmutableResults = _a2.assumeImmutableResults;
      this.clientAwareness = {};
      this.queries = /* @__PURE__ */ new Map();
      this.fetchCancelFns = /* @__PURE__ */ new Map();
      this.transformCache = new (utilities2.canUseWeakMap ? WeakMap : Map)();
      this.queryIdCounter = 1;
      this.requestIdCounter = 1;
      this.mutationIdCounter = 1;
      this.inFlightLinkObservables = /* @__PURE__ */ new Map();
      this.cache = cache3;
      this.link = link;
      this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
      this.queryDeduplication = queryDeduplication;
      this.clientAwareness = clientAwareness;
      this.localState = localState || new LocalState({ cache: cache3 });
      this.ssrMode = ssrMode;
      this.assumeImmutableResults = !!assumeImmutableResults;
      if (this.onBroadcast = onBroadcast) {
        this.mutationStore = /* @__PURE__ */ Object.create(null);
      }
    }
    QueryManager2.prototype.stop = function() {
      var _this = this;
      this.queries.forEach(function(_info, queryId) {
        _this.stopQueryNoBroadcast(queryId);
      });
      this.cancelPendingFetches(__DEV__ ? new globals2.InvariantError("QueryManager stopped while query was in flight") : new globals2.InvariantError(11));
    };
    QueryManager2.prototype.cancelPendingFetches = function(error) {
      this.fetchCancelFns.forEach(function(cancel) {
        return cancel(error);
      });
      this.fetchCancelFns.clear();
    };
    QueryManager2.prototype.mutate = function(_a2) {
      var _b, _c;
      var mutation = _a2.mutation, variables = _a2.variables, optimisticResponse = _a2.optimisticResponse, updateQueries = _a2.updateQueries, _d = _a2.refetchQueries, refetchQueries = _d === void 0 ? [] : _d, _e = _a2.awaitRefetchQueries, awaitRefetchQueries = _e === void 0 ? false : _e, updateWithProxyFn = _a2.update, onQueryUpdated = _a2.onQueryUpdated, _f = _a2.fetchPolicy, fetchPolicy = _f === void 0 ? ((_b = this.defaultOptions.mutate) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "network-only" : _f, _g = _a2.errorPolicy, errorPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.errorPolicy) || "none" : _g, keepRootFields = _a2.keepRootFields, context = _a2.context;
      return tslib$1.__awaiter(this, void 0, void 0, function() {
        var mutationId, mutationStoreValue, self2;
        return tslib$1.__generator(this, function(_h) {
          switch (_h.label) {
            case 0:
              __DEV__ ? globals2.invariant(mutation, "mutation option is required. You must specify your GraphQL document in the mutation option.") : globals2.invariant(mutation, 12);
              __DEV__ ? globals2.invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write.") : globals2.invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 13);
              mutationId = this.generateMutationId();
              mutation = this.transform(mutation).document;
              variables = this.getVariables(mutation, variables);
              if (!this.transform(mutation).hasClientExports)
                return [3, 2];
              return [4, this.localState.addExportedVariables(mutation, variables, context)];
            case 1:
              variables = _h.sent();
              _h.label = 2;
            case 2:
              mutationStoreValue = this.mutationStore && (this.mutationStore[mutationId] = {
                mutation,
                variables,
                loading: true,
                error: null
              });
              if (optimisticResponse) {
                this.markMutationOptimistic(optimisticResponse, {
                  mutationId,
                  document: mutation,
                  variables,
                  fetchPolicy,
                  errorPolicy,
                  context,
                  updateQueries,
                  update: updateWithProxyFn,
                  keepRootFields
                });
              }
              this.broadcastQueries();
              self2 = this;
              return [2, new Promise(function(resolve, reject) {
                return utilities2.asyncMap(self2.getObservableFromLink(mutation, tslib$1.__assign(tslib$1.__assign({}, context), { optimisticResponse }), variables, false), function(result) {
                  if (utilities2.graphQLResultHasError(result) && errorPolicy === "none") {
                    throw new errors2.ApolloError({
                      graphQLErrors: result.errors
                    });
                  }
                  if (mutationStoreValue) {
                    mutationStoreValue.loading = false;
                    mutationStoreValue.error = null;
                  }
                  var storeResult = tslib$1.__assign({}, result);
                  if (typeof refetchQueries === "function") {
                    refetchQueries = refetchQueries(storeResult);
                  }
                  if (errorPolicy === "ignore" && utilities2.graphQLResultHasError(storeResult)) {
                    delete storeResult.errors;
                  }
                  return self2.markMutationResult({
                    mutationId,
                    result: storeResult,
                    document: mutation,
                    variables,
                    fetchPolicy,
                    errorPolicy,
                    context,
                    update: updateWithProxyFn,
                    updateQueries,
                    awaitRefetchQueries,
                    refetchQueries,
                    removeOptimistic: optimisticResponse ? mutationId : void 0,
                    onQueryUpdated,
                    keepRootFields
                  });
                }).subscribe({
                  next: function(storeResult) {
                    self2.broadcastQueries();
                    resolve(storeResult);
                  },
                  error: function(err) {
                    if (mutationStoreValue) {
                      mutationStoreValue.loading = false;
                      mutationStoreValue.error = err;
                    }
                    if (optimisticResponse) {
                      self2.cache.removeOptimistic(mutationId);
                    }
                    self2.broadcastQueries();
                    reject(err instanceof errors2.ApolloError ? err : new errors2.ApolloError({
                      networkError: err
                    }));
                  }
                });
              })];
          }
        });
      });
    };
    QueryManager2.prototype.markMutationResult = function(mutation, cache3) {
      var _this = this;
      if (cache3 === void 0) {
        cache3 = this.cache;
      }
      var result = mutation.result;
      var cacheWrites = [];
      var skipCache = mutation.fetchPolicy === "no-cache";
      if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
        cacheWrites.push({
          result: result.data,
          dataId: "ROOT_MUTATION",
          query: mutation.document,
          variables: mutation.variables
        });
        var updateQueries_1 = mutation.updateQueries;
        if (updateQueries_1) {
          this.queries.forEach(function(_a2, queryId) {
            var observableQuery = _a2.observableQuery;
            var queryName = observableQuery && observableQuery.queryName;
            if (!queryName || !hasOwnProperty2.call(updateQueries_1, queryName)) {
              return;
            }
            var updater = updateQueries_1[queryName];
            var _b = _this.queries.get(queryId), document2 = _b.document, variables = _b.variables;
            var _c = cache3.diff({
              query: document2,
              variables,
              returnPartialData: true,
              optimistic: false
            }), currentQueryResult = _c.result, complete = _c.complete;
            if (complete && currentQueryResult) {
              var nextQueryResult = updater(currentQueryResult, {
                mutationResult: result,
                queryName: document2 && utilities2.getOperationName(document2) || void 0,
                queryVariables: variables
              });
              if (nextQueryResult) {
                cacheWrites.push({
                  result: nextQueryResult,
                  dataId: "ROOT_QUERY",
                  query: document2,
                  variables
                });
              }
            }
          });
        }
      }
      if (cacheWrites.length > 0 || mutation.refetchQueries || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
        var results_1 = [];
        this.refetchQueries({
          updateCache: function(cache4) {
            if (!skipCache) {
              cacheWrites.forEach(function(write) {
                return cache4.write(write);
              });
            }
            var update = mutation.update;
            if (update) {
              if (!skipCache) {
                var diff = cache4.diff({
                  id: "ROOT_MUTATION",
                  query: _this.transform(mutation.document).asQuery,
                  variables: mutation.variables,
                  optimistic: false,
                  returnPartialData: true
                });
                if (diff.complete) {
                  result = tslib$1.__assign(tslib$1.__assign({}, result), { data: diff.result });
                }
              }
              update(cache4, result, {
                context: mutation.context,
                variables: mutation.variables
              });
            }
            if (!skipCache && !mutation.keepRootFields) {
              cache4.modify({
                id: "ROOT_MUTATION",
                fields: function(value, _a2) {
                  var fieldName = _a2.fieldName, DELETE2 = _a2.DELETE;
                  return fieldName === "__typename" ? value : DELETE2;
                }
              });
            }
          },
          include: mutation.refetchQueries,
          optimistic: false,
          removeOptimistic: mutation.removeOptimistic,
          onQueryUpdated: mutation.onQueryUpdated || null
        }).forEach(function(result2) {
          return results_1.push(result2);
        });
        if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
          return Promise.all(results_1).then(function() {
            return result;
          });
        }
      }
      return Promise.resolve(result);
    };
    QueryManager2.prototype.markMutationOptimistic = function(optimisticResponse, mutation) {
      var _this = this;
      var data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables) : optimisticResponse;
      return this.cache.recordOptimisticTransaction(function(cache3) {
        try {
          _this.markMutationResult(tslib$1.__assign(tslib$1.__assign({}, mutation), { result: { data } }), cache3);
        } catch (error) {
          __DEV__ && globals2.invariant.error(error);
        }
      }, mutation.mutationId);
    };
    QueryManager2.prototype.fetchQuery = function(queryId, options, networkStatus) {
      return this.fetchQueryObservable(queryId, options, networkStatus).promise;
    };
    QueryManager2.prototype.getQueryStore = function() {
      var store2 = /* @__PURE__ */ Object.create(null);
      this.queries.forEach(function(info, queryId) {
        store2[queryId] = {
          variables: info.variables,
          networkStatus: info.networkStatus,
          networkError: info.networkError,
          graphQLErrors: info.graphQLErrors
        };
      });
      return store2;
    };
    QueryManager2.prototype.resetErrors = function(queryId) {
      var queryInfo = this.queries.get(queryId);
      if (queryInfo) {
        queryInfo.networkError = void 0;
        queryInfo.graphQLErrors = [];
      }
    };
    QueryManager2.prototype.transform = function(document2) {
      var transformCache = this.transformCache;
      if (!transformCache.has(document2)) {
        var transformed = this.cache.transformDocument(document2);
        var forLink = utilities2.removeConnectionDirectiveFromDocument(this.cache.transformForLink(transformed));
        var clientQuery = this.localState.clientQuery(transformed);
        var serverQuery = forLink && this.localState.serverQuery(forLink);
        var cacheEntry_1 = {
          document: transformed,
          hasClientExports: utilities2.hasClientExports(transformed),
          hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
          clientQuery,
          serverQuery,
          defaultVars: utilities2.getDefaultValues(utilities2.getOperationDefinition(transformed)),
          asQuery: tslib$1.__assign(tslib$1.__assign({}, transformed), { definitions: transformed.definitions.map(function(def) {
            if (def.kind === "OperationDefinition" && def.operation !== "query") {
              return tslib$1.__assign(tslib$1.__assign({}, def), { operation: "query" });
            }
            return def;
          }) })
        };
        var add = function(doc) {
          if (doc && !transformCache.has(doc)) {
            transformCache.set(doc, cacheEntry_1);
          }
        };
        add(document2);
        add(transformed);
        add(clientQuery);
        add(serverQuery);
      }
      return transformCache.get(document2);
    };
    QueryManager2.prototype.getVariables = function(document2, variables) {
      return tslib$1.__assign(tslib$1.__assign({}, this.transform(document2).defaultVars), variables);
    };
    QueryManager2.prototype.watchQuery = function(options) {
      options = tslib$1.__assign(tslib$1.__assign({}, options), { variables: this.getVariables(options.query, options.variables) });
      if (typeof options.notifyOnNetworkStatusChange === "undefined") {
        options.notifyOnNetworkStatusChange = false;
      }
      var queryInfo = new QueryInfo(this);
      var observable = new ObservableQuery({
        queryManager: this,
        queryInfo,
        options
      });
      this.queries.set(observable.queryId, queryInfo);
      queryInfo.init({
        document: observable.query,
        observableQuery: observable,
        variables: observable.variables
      });
      return observable;
    };
    QueryManager2.prototype.query = function(options, queryId) {
      var _this = this;
      if (queryId === void 0) {
        queryId = this.generateQueryId();
      }
      __DEV__ ? globals2.invariant(options.query, "query option is required. You must specify your GraphQL document in the query option.") : globals2.invariant(options.query, 14);
      __DEV__ ? globals2.invariant(options.query.kind === "Document", 'You must wrap the query string in a "gql" tag.') : globals2.invariant(options.query.kind === "Document", 15);
      __DEV__ ? globals2.invariant(!options.returnPartialData, "returnPartialData option only supported on watchQuery.") : globals2.invariant(!options.returnPartialData, 16);
      __DEV__ ? globals2.invariant(!options.pollInterval, "pollInterval option only supported on watchQuery.") : globals2.invariant(!options.pollInterval, 17);
      return this.fetchQuery(queryId, options).finally(function() {
        return _this.stopQuery(queryId);
      });
    };
    QueryManager2.prototype.generateQueryId = function() {
      return String(this.queryIdCounter++);
    };
    QueryManager2.prototype.generateRequestId = function() {
      return this.requestIdCounter++;
    };
    QueryManager2.prototype.generateMutationId = function() {
      return String(this.mutationIdCounter++);
    };
    QueryManager2.prototype.stopQueryInStore = function(queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.broadcastQueries();
    };
    QueryManager2.prototype.stopQueryInStoreNoBroadcast = function(queryId) {
      var queryInfo = this.queries.get(queryId);
      if (queryInfo)
        queryInfo.stop();
    };
    QueryManager2.prototype.clearStore = function(options) {
      if (options === void 0) {
        options = {
          discardWatches: true
        };
      }
      this.cancelPendingFetches(__DEV__ ? new globals2.InvariantError("Store reset while query was in flight (not completed in link chain)") : new globals2.InvariantError(18));
      this.queries.forEach(function(queryInfo) {
        if (queryInfo.observableQuery) {
          queryInfo.networkStatus = exports.NetworkStatus.loading;
        } else {
          queryInfo.stop();
        }
      });
      if (this.mutationStore) {
        this.mutationStore = /* @__PURE__ */ Object.create(null);
      }
      return this.cache.reset(options);
    };
    QueryManager2.prototype.getObservableQueries = function(include) {
      var _this = this;
      if (include === void 0) {
        include = "active";
      }
      var queries = /* @__PURE__ */ new Map();
      var queryNamesAndDocs = /* @__PURE__ */ new Map();
      var legacyQueryOptions = /* @__PURE__ */ new Set();
      if (Array.isArray(include)) {
        include.forEach(function(desc) {
          if (typeof desc === "string") {
            queryNamesAndDocs.set(desc, false);
          } else if (utilities2.isDocumentNode(desc)) {
            queryNamesAndDocs.set(_this.transform(desc).document, false);
          } else if (utilities2.isNonNullObject(desc) && desc.query) {
            legacyQueryOptions.add(desc);
          }
        });
      }
      this.queries.forEach(function(_a2, queryId) {
        var oq = _a2.observableQuery, document2 = _a2.document;
        if (oq) {
          if (include === "all") {
            queries.set(queryId, oq);
            return;
          }
          var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
          if (fetchPolicy === "standby" || include === "active" && !oq.hasObservers()) {
            return;
          }
          if (include === "active" || queryName && queryNamesAndDocs.has(queryName) || document2 && queryNamesAndDocs.has(document2)) {
            queries.set(queryId, oq);
            if (queryName)
              queryNamesAndDocs.set(queryName, true);
            if (document2)
              queryNamesAndDocs.set(document2, true);
          }
        }
      });
      if (legacyQueryOptions.size) {
        legacyQueryOptions.forEach(function(options) {
          var queryId = utilities2.makeUniqueId("legacyOneTimeQuery");
          var queryInfo = _this.getQuery(queryId).init({
            document: options.query,
            variables: options.variables
          });
          var oq = new ObservableQuery({
            queryManager: _this,
            queryInfo,
            options: tslib$1.__assign(tslib$1.__assign({}, options), { fetchPolicy: "network-only" })
          });
          globals2.invariant(oq.queryId === queryId);
          queryInfo.setObservableQuery(oq);
          queries.set(queryId, oq);
        });
      }
      if (__DEV__ && queryNamesAndDocs.size) {
        queryNamesAndDocs.forEach(function(included, nameOrDoc) {
          if (!included) {
            __DEV__ && globals2.invariant.warn("Unknown query ".concat(typeof nameOrDoc === "string" ? "named " : "").concat(JSON.stringify(nameOrDoc, null, 2), " requested in refetchQueries options.include array"));
          }
        });
      }
      return queries;
    };
    QueryManager2.prototype.reFetchObservableQueries = function(includeStandby) {
      var _this = this;
      if (includeStandby === void 0) {
        includeStandby = false;
      }
      var observableQueryPromises = [];
      this.getObservableQueries(includeStandby ? "all" : "active").forEach(function(observableQuery, queryId) {
        var fetchPolicy = observableQuery.options.fetchPolicy;
        observableQuery.resetLastResults();
        if (includeStandby || fetchPolicy !== "standby" && fetchPolicy !== "cache-only") {
          observableQueryPromises.push(observableQuery.refetch());
        }
        _this.getQuery(queryId).setDiff(null);
      });
      this.broadcastQueries();
      return Promise.all(observableQueryPromises);
    };
    QueryManager2.prototype.setObservableQuery = function(observableQuery) {
      this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
    };
    QueryManager2.prototype.startGraphQLSubscription = function(_a2) {
      var _this = this;
      var query2 = _a2.query, fetchPolicy = _a2.fetchPolicy, errorPolicy = _a2.errorPolicy, variables = _a2.variables, _b = _a2.context, context = _b === void 0 ? {} : _b;
      query2 = this.transform(query2).document;
      variables = this.getVariables(query2, variables);
      var makeObservable = function(variables2) {
        return _this.getObservableFromLink(query2, context, variables2).map(function(result) {
          if (fetchPolicy !== "no-cache") {
            if (shouldWriteResult(result, errorPolicy)) {
              _this.cache.write({
                query: query2,
                result: result.data,
                dataId: "ROOT_SUBSCRIPTION",
                variables: variables2
              });
            }
            _this.broadcastQueries();
          }
          if (utilities2.graphQLResultHasError(result)) {
            throw new errors2.ApolloError({
              graphQLErrors: result.errors
            });
          }
          return result;
        });
      };
      if (this.transform(query2).hasClientExports) {
        var observablePromise_1 = this.localState.addExportedVariables(query2, variables, context).then(makeObservable);
        return new utilities2.Observable(function(observer) {
          var sub = null;
          observablePromise_1.then(function(observable) {
            return sub = observable.subscribe(observer);
          }, observer.error);
          return function() {
            return sub && sub.unsubscribe();
          };
        });
      }
      return makeObservable(variables);
    };
    QueryManager2.prototype.stopQuery = function(queryId) {
      this.stopQueryNoBroadcast(queryId);
      this.broadcastQueries();
    };
    QueryManager2.prototype.stopQueryNoBroadcast = function(queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.removeQuery(queryId);
    };
    QueryManager2.prototype.removeQuery = function(queryId) {
      this.fetchCancelFns.delete(queryId);
      if (this.queries.has(queryId)) {
        this.getQuery(queryId).stop();
        this.queries.delete(queryId);
      }
    };
    QueryManager2.prototype.broadcastQueries = function() {
      if (this.onBroadcast)
        this.onBroadcast();
      this.queries.forEach(function(info) {
        return info.notify();
      });
    };
    QueryManager2.prototype.getLocalState = function() {
      return this.localState;
    };
    QueryManager2.prototype.getObservableFromLink = function(query2, context, variables, deduplication) {
      var _this = this;
      var _a2;
      if (deduplication === void 0) {
        deduplication = (_a2 = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a2 !== void 0 ? _a2 : this.queryDeduplication;
      }
      var observable;
      var serverQuery = this.transform(query2).serverQuery;
      if (serverQuery) {
        var _b = this, inFlightLinkObservables_1 = _b.inFlightLinkObservables, link = _b.link;
        var operation = {
          query: serverQuery,
          variables,
          operationName: utilities2.getOperationName(serverQuery) || void 0,
          context: this.prepareContext(tslib$1.__assign(tslib$1.__assign({}, context), { forceFetch: !deduplication }))
        };
        context = operation.context;
        if (deduplication) {
          var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || /* @__PURE__ */ new Map();
          inFlightLinkObservables_1.set(serverQuery, byVariables_1);
          var varJson_1 = cache2.canonicalStringify(variables);
          observable = byVariables_1.get(varJson_1);
          if (!observable) {
            var concast = new utilities2.Concast([
              core2.execute(link, operation)
            ]);
            byVariables_1.set(varJson_1, observable = concast);
            concast.cleanup(function() {
              if (byVariables_1.delete(varJson_1) && byVariables_1.size < 1) {
                inFlightLinkObservables_1.delete(serverQuery);
              }
            });
          }
        } else {
          observable = new utilities2.Concast([
            core2.execute(link, operation)
          ]);
        }
      } else {
        observable = new utilities2.Concast([
          utilities2.Observable.of({ data: {} })
        ]);
        context = this.prepareContext(context);
      }
      var clientQuery = this.transform(query2).clientQuery;
      if (clientQuery) {
        observable = utilities2.asyncMap(observable, function(result) {
          return _this.localState.runResolvers({
            document: clientQuery,
            remoteResult: result,
            context,
            variables
          });
        });
      }
      return observable;
    };
    QueryManager2.prototype.getResultsFromLink = function(queryInfo, cacheWriteBehavior, options) {
      var requestId = queryInfo.lastRequestId = this.generateRequestId();
      return utilities2.asyncMap(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function(result) {
        var hasErrors = utilities2.isNonEmptyArray(result.errors);
        if (requestId >= queryInfo.lastRequestId) {
          if (hasErrors && options.errorPolicy === "none") {
            throw queryInfo.markError(new errors2.ApolloError({
              graphQLErrors: result.errors
            }));
          }
          queryInfo.markResult(result, options, cacheWriteBehavior);
          queryInfo.markReady();
        }
        var aqr = {
          data: result.data,
          loading: false,
          networkStatus: exports.NetworkStatus.ready
        };
        if (hasErrors && options.errorPolicy !== "ignore") {
          aqr.errors = result.errors;
          aqr.networkStatus = exports.NetworkStatus.error;
        }
        return aqr;
      }, function(networkError) {
        var error = errors2.isApolloError(networkError) ? networkError : new errors2.ApolloError({ networkError });
        if (requestId >= queryInfo.lastRequestId) {
          queryInfo.markError(error);
        }
        throw error;
      });
    };
    QueryManager2.prototype.fetchQueryObservable = function(queryId, options, networkStatus) {
      var _this = this;
      if (networkStatus === void 0) {
        networkStatus = exports.NetworkStatus.loading;
      }
      var query2 = this.transform(options.query).document;
      var variables = this.getVariables(query2, options.variables);
      var queryInfo = this.getQuery(queryId);
      var defaults = this.defaultOptions.watchQuery;
      var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a2, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
      var normalized = Object.assign({}, options, {
        query: query2,
        variables,
        fetchPolicy,
        errorPolicy,
        returnPartialData,
        notifyOnNetworkStatusChange,
        context
      });
      var fromVariables = function(variables2) {
        normalized.variables = variables2;
        var concastSources = _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
        if (normalized.fetchPolicy !== "standby" && concastSources.length > 0 && queryInfo.observableQuery) {
          queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
        }
        return concastSources;
      };
      var cleanupCancelFn = function() {
        return _this.fetchCancelFns.delete(queryId);
      };
      this.fetchCancelFns.set(queryId, function(reason) {
        cleanupCancelFn();
        setTimeout(function() {
          return concast.cancel(reason);
        });
      });
      var concast = new utilities2.Concast(this.transform(normalized.query).hasClientExports ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables) : fromVariables(normalized.variables));
      concast.promise.then(cleanupCancelFn, cleanupCancelFn);
      return concast;
    };
    QueryManager2.prototype.refetchQueries = function(_a2) {
      var _this = this;
      var updateCache = _a2.updateCache, include = _a2.include, _b = _a2.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a2.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? utilities2.makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a2.onQueryUpdated;
      var includedQueriesById = /* @__PURE__ */ new Map();
      if (include) {
        this.getObservableQueries(include).forEach(function(oq, queryId) {
          includedQueriesById.set(queryId, {
            oq,
            lastDiff: _this.getQuery(queryId).getDiff()
          });
        });
      }
      var results = /* @__PURE__ */ new Map();
      if (updateCache) {
        this.cache.batch({
          update: updateCache,
          optimistic: optimistic && removeOptimistic || false,
          removeOptimistic,
          onWatchUpdated: function(watch, diff, lastDiff) {
            var oq = watch.watcher instanceof QueryInfo && watch.watcher.observableQuery;
            if (oq) {
              if (onQueryUpdated) {
                includedQueriesById.delete(oq.queryId);
                var result = onQueryUpdated(oq, diff, lastDiff);
                if (result === true) {
                  result = oq.refetch();
                }
                if (result !== false) {
                  results.set(oq, result);
                }
                return result;
              }
              if (onQueryUpdated !== null) {
                includedQueriesById.set(oq.queryId, { oq, lastDiff, diff });
              }
            }
          }
        });
      }
      if (includedQueriesById.size) {
        includedQueriesById.forEach(function(_a3, queryId) {
          var oq = _a3.oq, lastDiff = _a3.lastDiff, diff = _a3.diff;
          var result;
          if (onQueryUpdated) {
            if (!diff) {
              var info = oq["queryInfo"];
              info.reset();
              diff = info.getDiff();
            }
            result = onQueryUpdated(oq, diff, lastDiff);
          }
          if (!onQueryUpdated || result === true) {
            result = oq.refetch();
          }
          if (result !== false) {
            results.set(oq, result);
          }
          if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
            _this.stopQueryNoBroadcast(queryId);
          }
        });
      }
      if (removeOptimistic) {
        this.cache.removeOptimistic(removeOptimistic);
      }
      return results;
    };
    QueryManager2.prototype.fetchQueryByPolicy = function(queryInfo, _a2, networkStatus) {
      var _this = this;
      var query2 = _a2.query, variables = _a2.variables, fetchPolicy = _a2.fetchPolicy, refetchWritePolicy = _a2.refetchWritePolicy, errorPolicy = _a2.errorPolicy, returnPartialData = _a2.returnPartialData, context = _a2.context, notifyOnNetworkStatusChange = _a2.notifyOnNetworkStatusChange;
      var oldNetworkStatus = queryInfo.networkStatus;
      queryInfo.init({
        document: this.transform(query2).document,
        variables,
        networkStatus
      });
      var readCache = function() {
        return queryInfo.getDiff(variables);
      };
      var resultsFromCache = function(diff2, networkStatus2) {
        if (networkStatus2 === void 0) {
          networkStatus2 = queryInfo.networkStatus || exports.NetworkStatus.loading;
        }
        var data = diff2.result;
        if (__DEV__ && !returnPartialData && !equality.equal(data, {})) {
          logMissingFieldErrors(diff2.missing);
        }
        var fromData = function(data2) {
          return utilities2.Observable.of(tslib$1.__assign({ data: data2, loading: isNetworkRequestInFlight(networkStatus2), networkStatus: networkStatus2 }, diff2.complete ? null : { partial: true }));
        };
        if (data && _this.transform(query2).hasForcedResolvers) {
          return _this.localState.runResolvers({
            document: query2,
            remoteResult: { data },
            context,
            variables,
            onlyRunForcedResolvers: true
          }).then(function(resolved) {
            return fromData(resolved.data || void 0);
          });
        }
        return fromData(data);
      };
      var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === exports.NetworkStatus.refetch && refetchWritePolicy !== "merge" ? 1 : 2;
      var resultsFromLink = function() {
        return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
          variables,
          context,
          fetchPolicy,
          errorPolicy
        });
      };
      var shouldNotify = notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus);
      switch (fetchPolicy) {
        default:
        case "cache-first": {
          var diff = readCache();
          if (diff.complete) {
            return [
              resultsFromCache(diff, queryInfo.markReady())
            ];
          }
          if (returnPartialData || shouldNotify) {
            return [
              resultsFromCache(diff),
              resultsFromLink()
            ];
          }
          return [
            resultsFromLink()
          ];
        }
        case "cache-and-network": {
          var diff = readCache();
          if (diff.complete || returnPartialData || shouldNotify) {
            return [
              resultsFromCache(diff),
              resultsFromLink()
            ];
          }
          return [
            resultsFromLink()
          ];
        }
        case "cache-only":
          return [
            resultsFromCache(readCache(), queryInfo.markReady())
          ];
        case "network-only":
          if (shouldNotify) {
            return [
              resultsFromCache(readCache()),
              resultsFromLink()
            ];
          }
          return [resultsFromLink()];
        case "no-cache":
          if (shouldNotify) {
            return [
              resultsFromCache(queryInfo.getDiff()),
              resultsFromLink()
            ];
          }
          return [resultsFromLink()];
        case "standby":
          return [];
      }
    };
    QueryManager2.prototype.getQuery = function(queryId) {
      if (queryId && !this.queries.has(queryId)) {
        this.queries.set(queryId, new QueryInfo(this, queryId));
      }
      return this.queries.get(queryId);
    };
    QueryManager2.prototype.prepareContext = function(context) {
      if (context === void 0) {
        context = {};
      }
      var newContext = this.localState.prepareContext(context);
      return tslib$1.__assign(tslib$1.__assign({}, newContext), { clientAwareness: this.clientAwareness });
    };
    return QueryManager2;
  }();
  var hasSuggestedDevtools = false;
  var ApolloClient2 = function() {
    function ApolloClient3(options) {
      var _this = this;
      this.resetStoreCallbacks = [];
      this.clearStoreCallbacks = [];
      var uri2 = options.uri, credentials = options.credentials, headers = options.headers, cache3 = options.cache, _a2 = options.ssrMode, ssrMode = _a2 === void 0 ? false : _a2, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.connectToDevTools, connectToDevTools = _c === void 0 ? typeof window === "object" && !window.__APOLLO_CLIENT__ && __DEV__ : _c, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d, defaultOptions2 = options.defaultOptions, _e = options.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? false : _e, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
      var link = options.link;
      if (!link) {
        link = uri2 ? new http2.HttpLink({ uri: uri2, credentials, headers }) : core2.ApolloLink.empty();
      }
      if (!cache3) {
        throw __DEV__ ? new globals2.InvariantError("To initialize Apollo Client, you must specify a 'cache' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs") : new globals2.InvariantError(7);
      }
      this.link = link;
      this.cache = cache3;
      this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
      this.queryDeduplication = queryDeduplication;
      this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
      this.typeDefs = typeDefs;
      if (ssrForceFetchDelay) {
        setTimeout(function() {
          return _this.disableNetworkFetches = false;
        }, ssrForceFetchDelay);
      }
      this.watchQuery = this.watchQuery.bind(this);
      this.query = this.query.bind(this);
      this.mutate = this.mutate.bind(this);
      this.resetStore = this.resetStore.bind(this);
      this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
      if (connectToDevTools && typeof window === "object") {
        window.__APOLLO_CLIENT__ = this;
      }
      if (!hasSuggestedDevtools && __DEV__) {
        hasSuggestedDevtools = true;
        if (typeof window !== "undefined" && window.document && window.top === window.self && !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
          var nav = window.navigator;
          var ua = nav && nav.userAgent;
          var url = void 0;
          if (typeof ua === "string") {
            if (ua.indexOf("Chrome/") > -1) {
              url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
            } else if (ua.indexOf("Firefox/") > -1) {
              url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
            }
          }
          if (url) {
            __DEV__ && globals2.invariant.log("Download the Apollo DevTools for a better development experience: " + url);
          }
        }
      }
      this.version = version;
      this.localState = new LocalState({
        cache: cache3,
        client: this,
        resolvers,
        fragmentMatcher
      });
      this.queryManager = new QueryManager({
        cache: this.cache,
        link: this.link,
        defaultOptions: this.defaultOptions,
        queryDeduplication,
        ssrMode,
        clientAwareness: {
          name: clientAwarenessName,
          version: clientAwarenessVersion
        },
        localState: this.localState,
        assumeImmutableResults,
        onBroadcast: connectToDevTools ? function() {
          if (_this.devToolsHookCb) {
            _this.devToolsHookCb({
              action: {},
              state: {
                queries: _this.queryManager.getQueryStore(),
                mutations: _this.queryManager.mutationStore || {}
              },
              dataWithOptimisticResults: _this.cache.extract(true)
            });
          }
        } : void 0
      });
    }
    ApolloClient3.prototype.stop = function() {
      this.queryManager.stop();
    };
    ApolloClient3.prototype.watchQuery = function(options) {
      if (this.defaultOptions.watchQuery) {
        options = utilities2.mergeOptions(this.defaultOptions.watchQuery, options);
      }
      if (this.disableNetworkFetches && (options.fetchPolicy === "network-only" || options.fetchPolicy === "cache-and-network")) {
        options = tslib$1.__assign(tslib$1.__assign({}, options), { fetchPolicy: "cache-first" });
      }
      return this.queryManager.watchQuery(options);
    };
    ApolloClient3.prototype.query = function(options) {
      if (this.defaultOptions.query) {
        options = utilities2.mergeOptions(this.defaultOptions.query, options);
      }
      __DEV__ ? globals2.invariant(options.fetchPolicy !== "cache-and-network", "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only.") : globals2.invariant(options.fetchPolicy !== "cache-and-network", 8);
      if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
        options = tslib$1.__assign(tslib$1.__assign({}, options), { fetchPolicy: "cache-first" });
      }
      return this.queryManager.query(options);
    };
    ApolloClient3.prototype.mutate = function(options) {
      if (this.defaultOptions.mutate) {
        options = utilities2.mergeOptions(this.defaultOptions.mutate, options);
      }
      return this.queryManager.mutate(options);
    };
    ApolloClient3.prototype.subscribe = function(options) {
      return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient3.prototype.readQuery = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }
      return this.cache.readQuery(options, optimistic);
    };
    ApolloClient3.prototype.readFragment = function(options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }
      return this.cache.readFragment(options, optimistic);
    };
    ApolloClient3.prototype.writeQuery = function(options) {
      this.cache.writeQuery(options);
      this.queryManager.broadcastQueries();
    };
    ApolloClient3.prototype.writeFragment = function(options) {
      this.cache.writeFragment(options);
      this.queryManager.broadcastQueries();
    };
    ApolloClient3.prototype.__actionHookForDevTools = function(cb) {
      this.devToolsHookCb = cb;
    };
    ApolloClient3.prototype.__requestRaw = function(payload) {
      return core2.execute(this.link, payload);
    };
    ApolloClient3.prototype.resetStore = function() {
      var _this = this;
      return Promise.resolve().then(function() {
        return _this.queryManager.clearStore({
          discardWatches: false
        });
      }).then(function() {
        return Promise.all(_this.resetStoreCallbacks.map(function(fn) {
          return fn();
        }));
      }).then(function() {
        return _this.reFetchObservableQueries();
      });
    };
    ApolloClient3.prototype.clearStore = function() {
      var _this = this;
      return Promise.resolve().then(function() {
        return _this.queryManager.clearStore({
          discardWatches: true
        });
      }).then(function() {
        return Promise.all(_this.clearStoreCallbacks.map(function(fn) {
          return fn();
        }));
      });
    };
    ApolloClient3.prototype.onResetStore = function(cb) {
      var _this = this;
      this.resetStoreCallbacks.push(cb);
      return function() {
        _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function(c) {
          return c !== cb;
        });
      };
    };
    ApolloClient3.prototype.onClearStore = function(cb) {
      var _this = this;
      this.clearStoreCallbacks.push(cb);
      return function() {
        _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function(c) {
          return c !== cb;
        });
      };
    };
    ApolloClient3.prototype.reFetchObservableQueries = function(includeStandby) {
      return this.queryManager.reFetchObservableQueries(includeStandby);
    };
    ApolloClient3.prototype.refetchQueries = function(options) {
      var map = this.queryManager.refetchQueries(options);
      var queries = [];
      var results = [];
      map.forEach(function(result2, obsQuery) {
        queries.push(obsQuery);
        results.push(result2);
      });
      var result = Promise.all(results);
      result.queries = queries;
      result.results = results;
      result.catch(function(error) {
        __DEV__ && globals2.invariant.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(error));
      });
      return result;
    };
    ApolloClient3.prototype.getObservableQueries = function(include) {
      if (include === void 0) {
        include = "active";
      }
      return this.queryManager.getObservableQueries(include);
    };
    ApolloClient3.prototype.extract = function(optimistic) {
      return this.cache.extract(optimistic);
    };
    ApolloClient3.prototype.restore = function(serializedState) {
      return this.cache.restore(serializedState);
    };
    ApolloClient3.prototype.addResolvers = function(resolvers) {
      this.localState.addResolvers(resolvers);
    };
    ApolloClient3.prototype.setResolvers = function(resolvers) {
      this.localState.setResolvers(resolvers);
    };
    ApolloClient3.prototype.getResolvers = function() {
      return this.localState.getResolvers();
    };
    ApolloClient3.prototype.setLocalStateFragmentMatcher = function(fragmentMatcher) {
      this.localState.setFragmentMatcher(fragmentMatcher);
    };
    ApolloClient3.prototype.setLink = function(newLink) {
      this.link = this.queryManager.link = newLink;
    };
    return ApolloClient3;
  }();
  tsInvariant.setVerbosity(globals2.DEV ? "log" : "silent");
  exports.ApolloCache = cache2.ApolloCache;
  exports.Cache = cache2.Cache;
  exports.InMemoryCache = cache2.InMemoryCache;
  exports.MissingFieldError = cache2.MissingFieldError;
  exports.defaultDataIdFromObject = cache2.defaultDataIdFromObject;
  exports.makeVar = cache2.makeVar;
  exports.Observable = utilities2.Observable;
  exports.isReference = utilities2.isReference;
  exports.makeReference = utilities2.makeReference;
  exports.mergeOptions = utilities2.mergeOptions;
  exports.ApolloError = errors2.ApolloError;
  exports.isApolloError = errors2.isApolloError;
  exports.fromError = utils2.fromError;
  exports.fromPromise = utils2.fromPromise;
  exports.throwServerError = utils2.throwServerError;
  exports.toPromise = utils2.toPromise;
  exports.setLogVerbosity = tsInvariant.setVerbosity;
  exports.disableExperimentalFragmentVariables = graphqlTag.disableExperimentalFragmentVariables;
  exports.disableFragmentWarnings = graphqlTag.disableFragmentWarnings;
  exports.enableExperimentalFragmentVariables = graphqlTag.enableExperimentalFragmentVariables;
  exports.gql = graphqlTag.gql;
  exports.resetCaches = graphqlTag.resetCaches;
  exports.ApolloClient = ApolloClient2;
  exports.ObservableQuery = ObservableQuery;
  for (var k in core2) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      exports[k] = core2[k];
  }
  for (var k in http2) {
    if (k !== "default" && !exports.hasOwnProperty(k))
      exports[k] = http2[k];
  }
})(core$1);
var ApolloClientCore = /* @__PURE__ */ getDefaultExportFromCjs(core$1);
const { ApolloClient, ApolloLink, createHttpLink, HttpLink, InMemoryCache } = ApolloClientCore;
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
