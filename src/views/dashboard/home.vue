<script>
import axios from "axios";
import PostCarousel from "@/components/carousel/postCarousel.vue";
import { textCutter } from "@/utilities/textCutter.js";
import {formatDate} from "@/utilities/formateDate.js";
import PostSkeleton from "@/components/skeletons/postSkeleton.vue";
import CarouselCardDesign from "@/components/carousel/carouselCardDesign.vue";
import {imagePathfixer} from "@/utilities/imagePathfixer.js";

export default {
  name: "home",
  components: {CarouselCardDesign, PostSkeleton, PostCarousel },
  data() {
    return {
      metaData: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 4,
        totalCount: 0,
        order: "desc",
        hasPrevious: false,
        hasNext: false
      },
      params: {
        SearchText: null,
        CategoryId: null,
        UserId: null,
        PageNumber: 1,
        PageSize: 4,
        Order: null
      },
      postImages: ['@/assets/img/elements/18.jpg', '@/assets/img/elements/18.jpg'],
      posts: [],
      categories: [],
      categoryLoaded: false,
      postsLoaded: false,
      post1: { id: 0, title: "", content: "", userId: 0, categoryId: 0, images: [], updatedAt: "", createdAt: "" },
      post2: { id: 0, title: "", content: "", userId: 0, categoryId: 0, images: [], updatedAt: "", createdAt: "" },
      post3: { id: 0, title: "", content: "", userId: 0, categoryId: 0, images: [], updatedAt: "", createdAt: "" },

      isBannerPostsLoaded: false,
    };
  },
  methods: {
    imagePathfixer,
    formatDate,
    textCutter,
    async fetchBannerPosts() {
      try {
        let result1 = await axios.get('post/get/17');
        if (result1.status === 200) this.post1 = result1.data;

        let result2 = await axios.get('post/get/24');
        if (result1.status === 200) this.post2 = result2.data;

        let result3 = await axios.get('post/get/20');
        if (result1.status === 200) this.post3 = result3.data;

        this.isBannerPostsLoaded = true
      } catch (e) {
        console.error(e.message);
      }
    },
    async fetchPosts() {
      try {
          let result = await axios.get('post/get-all?PageSize=6');


        if (result.status === 200) {
          this.posts = result.data.items;
          this.metaData = { ...result.data.metaData };
          this.params.PageNumber = this.metaData.currentPage;
          this.postsLoaded = true;
        }

      } catch (e) {
        console.log(e.message);
      }
    },
    async fetchCategory() {
      try {
        let result = await axios.get('category/get-all?PageSize=50');
        if (result.status === 200) {
          this.categories = result.data.items;
          this.categoryLoaded = true;
        }
      }catch (e) {
        console.error(e.message)
      }
    },
  },
  async mounted() {
    this.lokalUser = await JSON.parse(localStorage.getItem('lokalUser'));
    await this.fetchBannerPosts();
    await this.fetchPosts();
    await this.fetchCategory();
  }
};
</script>

<template>
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="row" >
        <div v-if="categoryLoaded" class="col-lg-9 mb-3  mx-auto  d-flex justify-content-center flex-wrap gap-3">
          <div class="card p-2" v-for="item in categories">
            <button class="btn fw-semibold text-gray">
                <router-link :to="{ path: '/blogs', query: { CategoryId: item.id } }">
                {{item.name}}</router-link>
            </button>
          </div>
        </div>

      </div>
  <div class="row">
    <div class="d-flex justify-content-center">
      <div class="col-lg-8 mb-3">
        <div class="card">
          <div class="d-flex align-items-end row">
            <div class="col-sm-7">
              <div class="card-body">
                <h4 class="card-title text-primary">"MyBlog.uz"ga Hush kelibsiz 🎉</h4>
                <p class="mb-3">
                  Bloglar sizlarga manzur keladi degan umiddamiz!
                  Siz ham ro'yhatdan o'tib o'z blogingizni yuritish imkoniyatingiz bor
                </p>

              </div>
            </div>
            <div class="col-sm-5 text-center text-sm-left">
              <div class="card-body pb-0 px-0 px-md-4">
                <img src="@/assets/img/illustrations/man-with-laptop-light.png" height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <div class="row ">

        <div class="d-flex justify-content-center">
          <div class="col-lg-5" v-if="isBannerPostsLoaded">
            <div class="card bg-dark border-0 text-white">
              <img class="card-img banner-img" :src="imagePathfixer(post1.images[0].imagePath)"
                   alt="Card image">
              <div class="card-img-overlay">
                <h5 class="card-title">
                  <router-link :to="{name:'blogDetails',
                              params:{blogId: post1.id}}" class="text-white">
                  {{ textCutter(post1.title, 60) }}
                  </router-link>
                </h5>
                <p class="card-text">
                  <router-link :to="{name:'blogDetails',
                              params:{blogId: post1.id}}" class="text-white" >
                  {{ textCutter(post1.content, 150) }}
                  </router-link>
                </p>
                <p class="card-text"> {{formatDate(post1.createdAt)}} </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">

            <div class="row g-0 " v-if="isBannerPostsLoaded">
              <div class="col-md-8 ">
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link :to="{name:'blogDetails',
                              params:{blogId: post2.id}}" class="text-gray">
                    {{ textCutter(post2.title, 30) }}
                    </router-link>
                  </h5>
                  <p class="card-text">
                    <router-link :to="{name:'blogDetails',
                              params:{blogId: post2.id}}" class="text-gray">
                    {{ textCutter(post2.content, 110) }}
                    </router-link>
                  </p>
                  <p class="card-text"><small class="text-muted"> {{formatDate(post2.createdAt)}} </small></p>
                </div>
              </div>
              <div class="col-md-4">
                <router-link :to="{name:'blogDetails',
                              params:{blogId: post2.id}}" class="text-gray">
                <img class="card-img card-img-right banner-img-right"
                     :src="imagePathfixer(post2.images[0].imagePath)" alt="Card image">
                </router-link>
              </div>
            </div>

            <div class="row g-0 " v-if="isBannerPostsLoaded">
              <div class="col-md-8 ">
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link :to="{name:'blogDetails',
                              params:{blogId: post3.id}}" class="text-gray">
                      {{ textCutter(post3.title, 30) }}
                    </router-link>
                  </h5>
                  <p class="card-text">
                    <router-link :to="{name:'blogDetails',
                              params:{blogId: post3.id}}" class="text-gray">
                      {{ textCutter(post3.content, 110) }}
                    </router-link>
                  </p>
                  <p class="card-text"><small class="text-muted"> {{formatDate(post3.createdAt)}} </small></p>
                </div>
              </div>
              <div class="col-md-4">
                <router-link :to="{name:'blogDetails',
                              params:{blogId: post3.id}}" class="text-gray">
                  <img class="card-img card-img-right banner-img-right"
                       :src="imagePathfixer(post3.images[0].imagePath)" alt="Card image">
                </router-link>
              </div>
            </div>

          </div>
        </div>

      </div>

    <div class="row d-flex justify-content-center">




      <div class="col-lg-10 mt-4">

        <!--        Skeleton  -->
        <div class="row mb-5 m-auto " v-if="!postsLoaded">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4" v-for="i in 6">
            <post-skeleton>

            </post-skeleton>
          </div>
        </div>
        <!--        Posts     -->
        <div class="row mb-5 m-auto" v-if="postsLoaded">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-4" v-for="(post, index) in posts" :key="index">
            <div class="card">
              <div class="d-flex justify-content-center pt-3 px-3">
                <carousel-card-design :img-list="post.images"></carousel-card-design>
              </div>
              <div class="card-body">
                <router-link :to="{name:'blogDetails',
                              params:{blogId: post.id}}" >
                  <h5 class="card-title mb-0">{{ textCutter(post.title, 30) }}</h5>
                </router-link>
                <template v-for="cat in categories">
                  <span v-if="cat.id === post.categoryId" class="badge bg-label-dark my-1">{{ cat.name }}</span>
                </template>
                <router-link :to="{name:'blogDetails',
                              params:{blogId: post.id}}" >
                  <p class="card-text text-dark">
                    {{ textCutter(post.content, 100) }}
                  </p>
                </router-link>
                <span class="d-flex mt-2 align-items-center justify-content-between">
                  <span>
                    <i class='bx bx-calendar'></i> {{formatDate(post.createdAt)}}
                  </span>
                   <router-link :to="{name:'blogDetails',
                              params:{blogId: post.id}}" >
                     Davomini o'qish ->
                   </router-link>
                </span>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.banner-img-right {
  height: 154px;
  width: 154px;
  object-fit: cover;
  aspect-ratio: 1/1;
}
.banner-img {
  object-fit: cover;
  aspect-ratio: 5/3;
}
</style>
