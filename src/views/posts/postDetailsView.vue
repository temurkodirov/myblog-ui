<script>
import PostDetailCarousel from "@/components/carousel/postDetailCarousel.vue";
import axios from "axios";
import {formatDate} from "../../utilities/formateDate.js";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";

export default {
  name: "postDetailsView",
  components: {PostDetailCarousel},
  props: ['blogId'],
  data() {
    return {
      post: {
        id: 0,
        title: "",
        content: "",
        userId: 0,
        categoryId: 0,
        images: [],
        updatedAt: "",
        createdAt: ""
      },
      categories: [],
      user: {
        id : 0,
        firstName : "",
        lastName : "",
        isMale : false,
        email : "",
        phoneNumber : "",
        imagePath : "",
        createdAt : "2024-08-29T07:13:50.993016Z",
        updatedAt : "2024-08-29T07:13:50.993016Z"
      },
      coment: {
        postId: 0,
        content: ""
      },
      postComents: []
    }
  },
  methods: {
    formatDate,
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
    async fetPost() {
      try {
        let result = await axios.get('post/get/' + this.blogId);
        if (result.status === 200) {
          this.post = {...result.data}
        }
      } catch (e) {
        console.error(e.message)
      }
    },
    async fetchUser() {
      let result = await axios.get("people/get/"+this.post.userId);
      if (result.status === 200) {
        this.user = {...result.data}
      }
    },
    async fetchComents() {
      let result = await axios.get("coment/get-all?PostId="+this.blogId);
      if (result.status === 200) {
        this.postComents = result.data.items;
      }
    },successToast() {
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
    async createComent() {
      this.v$.coment.$touch();
      if (this.v$.coment.$invalid) {

        return;
      }
      this.coment.postId = this.blogId;
      let cfg = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`}
      }
      let result = await axios.post("coment/create", this.coment, cfg);
      if (result.status === 200) {
        this.successToast();
        this.coment.content = ''
        await this.fetchComents();
        this.v$.$reset()
      }
    }
  },
  async mounted() {
    await this.fetPost();
    await this.fetchCategory();
    await this.fetchUser();
    await this.fetchComents();
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
  validations: {
    coment: {
      content: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('1 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("9900 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
    }
  },

}
</script>

<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-md-6 col-lg-3 col-xl-3 order-0 mb-4">
        <div class="card">
          <div class="card-body">
            <ul class="p-0 m-0">
              <li class="d-flex  pb-1">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-dark">
                    <i class='bx bx-category'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <span style="font-size: 14px;" class="mb-0 text-muted">Blog turi:</span>
                    <template v-for="item in categories">
                      <router-link :to="{ path: '/blogs', query: { CategoryId: item.id }}">
                        <h6 class="text-primary" v-if="post.categoryId === item.id">{{ item.name }}</h6>
                      </router-link>
                    </template>
                  </div>
                </div>
              </li>

              <li class="d-flex pb-1">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-dark">
                    <i class='bx bx-user'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <span style="font-size: 14px;" class="mb-0 text-muted"> Muallif </span>
                    <h6 class="text-primary">{{user.firstName }}  {{user.lastName}}</h6>
                  </div>
                </div>
              </li>

              <li class="d-flex pb-1">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-dark">
                    <i class='bx bx-calendar' ></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <span style="font-size: 14px;" class="mb-0 text-muted">Yaratilgan sana</span>
                      <h6 class="text-primary" > {{ formatDate(post.createdAt)}} </h6>
                  </div>
                </div>
              </li>

              <li class="d-flex pb-1">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-dark">
               <i class='bx bx-time-five'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <span style="font-size: 14px;" class="mb-0 text-muted">O'qish vaqti</span>
                    <h6 class="text-primary" > 5 minut </h6>
                  </div>
                </div>
              </li>

              <li class="d-flex">
                <div class="avatar flex-shrink-0 me-3">
                  <span class="avatar-initial rounded bg-label-dark">
                    <i class='bx bx-brain'></i>
                  </span>
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                  <div class="me-2">
                    <span style="font-size: 14px;" class="mb-0 text-muted">Tushunish darajasi</span>
                    <h6 class="text-primary" > ⭐️⭐️⭐️ </h6>
                  </div>
                </div>
              </li>


            </ul>
          </div>
        </div>
          <div class="card mt-3">
            <div class="card-body">
              <h6>Izohlar</h6>
              <ul class="p-0 m-0" style="list-style: none">

                <li class="d-flex mb-3 pb-1 border-bottom" v-for="coment in postComents">
                  <div class="avatar flex-shrink-0 me-3">
                    <span class="avatar-initial rounded bg-label-dark"><i class='bx bx-user'></i></span>
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                      <h6 class="mb-0"> {{coment.authorModel.firstName}} {{coment.authorModel.lastName}} </h6>
                      <span style="font-size: 14px;">
                        {{coment.content}}
                      </span>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>


      </div>
      <div class="col-lg-9 ">
        <div class="card px-5 py-3">
          <div class="blog-header d-flex justify-content-between">
            <h3 class="">{{ post.title }}</h3>
          </div>
        </div>

        <div class="card  my-3 py-3">
          <div class="col-lg-8 mx-auto">
          <post-detail-carousel :listImagesDetail="post.images"></post-detail-carousel>

          </div>

        </div>

        <div class="card p-5 mt-3">
          <div class="blog-body">
            <p class="fs-6">{{ post.content }}</p>
          </div>
        </div>

        <div class="card p-5 mt-3">
          <div>
            <label for="exampleFormControlTextarea1" class="form-label">Izoh qoldirish</label>
            <textarea v-model="coment.content" class="form-control"
                      :class="{'invalid-input' : v$.coment.content.$error}"
                      id="exampleFormControlTextarea1" rows="3"></textarea>
            <div v-if="v$.coment.content.$error" class="invalid-input-text">
              {{ v$.coment.content.$errors[0].$message }}
            </div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <button type="button" @click="createComent" class="btn btn-primary">Izoh qoldirish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>