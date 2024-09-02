<script>
import axios from "axios";
import PostCarousel from "@/components/carousel/postCarousel.vue";
import { textCutter } from "@/utilities/textCutter.js";
import {formatDate} from "@/utilities/formateDate.js";
import PostSkeleton from "@/components/skeletons/postSkeleton.vue";
import CarouselCardDesign from "@/components/carousel/carouselCardDesign.vue";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";

export default {
  name: "myBlogsView",
  components: {CarouselCardDesign, PostSkeleton, PostCarousel },
  data() {
    return {
      selectedBlogId: 0,
      metaData: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 6,
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
        PageSize: 6,
        Order: null
      },
      postImages: ['@/assets/img/elements/18.jpg', '@/assets/img/elements/18.jpg'],
      posts: [],
      categories: [],
      postsLoaded: false,
      searchQuery: ""
    };
  },
  created() {
    this.$watch(
        () => this.$route.query.CategoryId,
        async (newId, oldId) => {
          this.readParamsFromUrl();
          await this.fetchPosts(this.params);
        }
    )
  },
  computed: {
    computedPageNumber: {
      get() {
        return this.params.PageNumber;
      },
      set(newParams) {
        this.params.PageNumber = newParams;
        this.fetchPosts(this.params); // Call queryHandler whenever params change
      }
    },
  },
  methods: {
    formatDate,
    textCutter,
    async fetchPosts(givenParams) {
      let params = {...givenParams}

      const currentParams = new URLSearchParams(window.location.search);
      // Remove existing parameters
      for (const key of currentParams.keys()) {
        currentParams.delete(key);
      }
      for (const [key, value] of Object.entries(params)) {
        if (value !== null) {
          currentParams.set(key, value.toString());
        } else {
          currentParams.delete(key);
        }
      }
      if (params.PageNumber <= 1) {
        currentParams.delete('PageNumber');
        currentParams.delete('PageSize');
      }
      if (params.Order === 'desc' || params.Order === 'DESC') {
        currentParams.delete('Order');
      }
      currentParams.delete('UserId');
      const queryString = currentParams.toString();
      const updatedUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.replaceState(null, '', updatedUrl);


      try {
        this.posts = [];
        let result = null;

        result = await axios.get('post/get-all', {params});


        if (result.status === 200) {
          this.posts = result.data.items;
          this.metaData = { ...result.data.metaData };
          this.params.PageNumber = this.metaData.currentPage;
        }
        this.postsLoaded = true;
      } catch (e) {
        console.log(e.message);
      }
    },
    readParamsFromUrl() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('SearchText') !== 'null' && urlParams.has('SearchText') &&
          urlParams.get('SearchText') !== null) {
        this.params.SearchText = urlParams.get('SearchText')
      }

      if (urlParams.has('SearchText') && urlParams.get('SearchText') !== 'null') {
        this.params.SearchText = urlParams.get('SearchText');
      }

      if (urlParams.has('CategoryId') && urlParams.get('CategoryId') !== 'null') {
        this.params.CategoryId = urlParams.get('CategoryId');
      }

      if (urlParams.get('PageNumber') !== null) {
        this.params.PageNumber = parseInt(urlParams.get('PageNumber'));
      }
      if (urlParams.get('PageSize') !== null) {
        this.params.PageSize = parseInt(urlParams.get('PageSize'));
      }
      if (urlParams.get('Order') !== null) {
        this.params.Order = urlParams.get('Order');
      }
    },
    getPaginatedData() {  //Fetches new data when page changed
      this.fetchPosts(this.params);
    },
    async searchPost() {
      if (this.searchQuery.length <3 ) {
        this.params.SearchText = null
        if (this.searchQuery.length === 0) {
          await this.fetchPosts(this.params)

        }
      } else {
        this.params.SearchText = this.searchQuery;
        await this.fetchPosts(this.params)
      }
    },
    async postsByCategory(categoryId) {
      this.params.CategoryId = categoryId;
      await this.fetchPosts(this.params);
    },
    async changePage(number) {
      this.params.PageNumber = number;
      await this.fetchPosts(this.params);
    },
    successToast() {
      this.toast.success("Muvaffaqiyatlik yakunlandi", {
        position: "top-right",
        timeout: 1800,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    },
    errorToast() {
      this.toast.error("Xatolik yuz berdi", {
        position: "top-right",
        timeout: 1800,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    },
    async deleteBlog() {
      let cfg = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
      try {
        if (this.selectedBlogId === 0 ) return;
        let result = await axios.delete('post/delete/'+ this.selectedBlogId, cfg);
        if (result.status === 200) {
          this.successToast();
          await this.fetchPosts(this.params);
        }
      } catch (e) {
        console.error(e.message)
        this.errorToast();
      }
    },
    selectBlogForDelete(blogId) {
      this.selectedBlogId = blogId
    },
    async fetchCategory() {
      try {
        let result = await axios.get('category/get-all?PageSize=50');
        if (result.status === 200) {
          this.categories = result.data.items;
          this.selectedCategory = this.categories[0].id
        }
      }catch (e) {
        console.error(e.message)
      }
    },
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
  async mounted() {
    this.lokalUser = await JSON.parse(localStorage.getItem('lokalUser'));
    this.params.UserId = this.lokalUser.userId;
    await this.readParamsFromUrl();
    await this.fetchPosts(this.params);
    await this.fetchCategory();

  }
};
</script>

<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <!-- Content -->

    <div class="row">

      <div class="col-md-6 col-lg-3 col-xl-3 order-0 mb-4">
        <div class="card ">
          <div class="card-body">
            <div class="input-group input-group-merge mb-4">
              <span class="input-group-text" id="basic-addon-search31">
                <i class="bx bx-search"></i></span>
              <input type="text" class="form-control "
                     v-model="searchQuery"
                     placeholder="Search..." aria-label="Search..."
                     aria-describedby="basic-addon-search31"
                     @input="searchPost()">
            </div>
            <ul class="p-0 m-0">
              <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-primary">
                    <i class='bx bx-category'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <button style="width: 230px;"
                            @click="postsByCategory(null)"
                            class="btn btn-outline-primary mb-0 "
                            :class="{'active':params.CategoryId === null}">
                      Barcha turdagi bloglar
                    </button>
                  </div>
                </div>
              </li>
              <li class="d-flex mb-4 pb-1" v-for="item in categories">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-primary">
                    <i class='bx bx-category'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <button style="width: 230px;"
                            @click="postsByCategory(item.id)"
                            :class="{'active':params.CategoryId == item.id}"
                            class="btn btn-outline-primary mb-0">
                      {{ item.name }}
                    </button>
                  </div>
                </div>
              </li>


            </ul>
          </div>
        </div>
      </div>


      <div class="col-lg-9">

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
              <div class="card-body pb-0">
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
                <span class="d-flex align-items-center justify-content-between mt-2 mb-0">
                  <span>
                    <i class='bx bx-calendar'></i> {{formatDate(post.createdAt)}}
                  </span>
                   <router-link :to="{name:'blogDetails',
                              params:{blogId: post.id}}" >
                     Davomini o'qish ->
                   </router-link>
                </span>
              </div>
              <div class="card-footer mt-0 py-3 d-flex justify-content-between">

                <router-link :to="{name:'blogUpdate',
                              params:{updateId: post.id}}"
                              class="btn btn-warning">
                  Tahrirlash
                </router-link>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-danger"
                        @click="selectBlogForDelete(post.id)"
                        data-bs-toggle="modal" data-bs-target="#deleteBlogModal">
                  O'chirish
                </button>



              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="deleteBlogModal" tabindex="-1" style="display: none;" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Blogni o'chirish</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h6> Siz rostdan ham ushbu blogni o'chirishni hohlaysizmi?</h6>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Yo'q
                </button>
                <button type="button" @click="deleteBlog()" class="btn btn-primary" data-bs-dismiss="modal">Ha</button>
              </div>
            </div>
          </div>
        </div>
        <!--End modal    -->

        <div class="d-flex justify-content-center  ">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <!--    -1          -->
              <li class="page-item prev" >
                <button class="btn btn-icon btn-outline-primary btn-size "
                        :disabled="!metaData.hasPrevious"
                        @click="changePage(this.params.PageNumber - 1)">
                  <i class="tf-icon bx bx-chevron-left"></i> </button>
              </li>

              <!-- xxxxxxxxxxxxxxxxxxxxxxxxxx -->
              <li class="page-item" v-for="i in metaData.totalPages">
                <button class="btn btn-icon btn-outline-primary btn-size " @click="changePage(i)"
                        :class="{'active-pg-btn': this.metaData.currentPage === i}">
                  {{i}}
                </button>
              </li>
              <!-- xxxxxxxxxxxxxxxxxxxxxxxxxx -->

              <!--    +1          -->
              <li class="page-item next">
                <button class="btn btn-icon btn-outline-primary btn-size "
                        :disabled="!metaData.hasNext"
                        @click="changePage(this.params.PageNumber + 1)">
                  <i class="tf-icon bx bx-chevron-right"></i> </button>
              </li>

            </ul>
          </nav>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.btn-size {
  width: 35px;
  height: 35px;
}
.active-pg-btn {
  border-color: #696cff;
  background-color: #696cff;
  color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(105, 108, 255, 0.4);
}
</style>
