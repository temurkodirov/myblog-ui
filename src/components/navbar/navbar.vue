<script>
import axios from "axios";
import {imagePathfixer} from "@/utilities/imagePathfixer.js";

export default {
  name: "navbar",
  data() {
    return {
      lokalUser: {
        firstName: "",
        lastName: "",
        email: "",
        imagePath: "",
        userId: 0,
        identityRole: null
      }
    }
  },
  methods: {
    imagePathfixer,
    signOut() {
      localStorage.clear();
      this.lokalUser = {
        firstName: "",
        lastName: "",
        email: "",
        userId: 0,
        identityRole: null
      }
      // this.$router.push('/auth/login')
    },
    getLocalUser() {
      let user = localStorage.getItem('lokalUser');
      this.lokalUser = JSON.parse(user);
    }

  },
  mounted() {
    this.getLocalUser();
  },
  created() {

  }
}
</script>

<template>
  <nav
      class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar">

    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center justify-content-between"  id="navbar-collapse">

      <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center">

          <router-link to="/">
            <span class="app-brand-text demo menu-text fw-bolder ms-2" style="text-transform: none;">MyBlog.uz</span>
          </router-link>
        </div>
      </div>

      <div class=" ">
        <router-link to="/" class="text-gray fw-semibold me-3"
                     :class="{'text-primary': $route.path === '/'}">
                     Asosiy sahifa</router-link>

        <router-link to="/blogs"
                       class="text-gray fw-semibold"
                     :class="{'text-primary': $route.path === '/blogs'}"
        >Barcha Bloglarni ko'rish</router-link>

      </div>
      <div>
      <ul v-if="lokalUser === null || lokalUser.userId === 0"
          class="navbar-nav flex-row align-items-center ms-auto">

        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <button class="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
            <div class="">
<!--              <img src="@/assets/img/avatar.png" alt class="me-2 w-px-40 h-auto rounded-circle" />-->
              <i class='bx bx-user-circle me-1 fs-3'></i>
              <span class="fw-semibold">Kirish/Ro'yhatdan o'tish</span>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">


            <li>
              <router-link to="/auth/login" class="dropdown-item">
                <i class='bx bx-user me-2 fw-semibold'></i>
                <span class="align-middle">Kirish</span>
              </router-link>
            </li>
            <li>
              <router-link to="/auth/register" class="dropdown-item">
                <i class='bx bx-user-plus me-2 fs-3'></i>
                <span class="align-middle">Ro'yhatdan o'tish</span>
              </router-link>
            </li>

          </ul>
        </li>
        <!--/ User -->
      </ul>

      <ul v-else-if="lokalUser !== null || lokalUser.userId !== 0" class="navbar-nav flex-row align-items-center ms-auto">
        <li>
          <div>
            <router-link to="/blog-create" class="btn btn-outline-primary fw-semibold me-2"> Blog yaratish</router-link>
          </div>
        </li>
        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
            <div class="">
              <img v-if="lokalUser.imagePath" :src="imagePathfixer(lokalUser.imagePath)"
                   alt class="avatar-image "  />
              <img v-else src="@/assets/img/avatar.png" alt class="avatar-image" />
            <span class="ms-2 fw-semibold">{{lokalUser.firstName}}</span>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                      <img v-if="lokalUser.imagePath" :src="imagePathfixer(lokalUser.imagePath)"
                           alt="avatar" class=" avatar-image" />
                      <img v-else src="@/assets/img/avatar.png" alt="avatar"
                           class=" avatar-image" />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-semibold d-block">{{lokalUser.firstName}}</span>
                    <small class="text-muted">{{lokalUser.lastName}}</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>

            <li>
              <router-link to="/blogs/my-blogs"  class="dropdown-item" >
                <i class='bx bx-message-dots me-2'></i>
                <span class="align-middle">Mening bloglarim</span>
              </router-link>
            </li>
            <li>
              <router-link to="/user/update" class="dropdown-item" >
                <i class="bx bx-user me-2 "></i>
                <span class="align-middle">Mening sahifam</span>
              </router-link>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <button class="dropdown-item" @click="signOut()">
                <i class="bx bx-power-off me-2 "></i>
                <span class="align-middle">Chiqish</span>
              </button>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.avatar-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
</style>