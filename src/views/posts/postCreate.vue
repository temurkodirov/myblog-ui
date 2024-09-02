<script>
import axios from "axios";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";

export default {
  name: "postCreate",
  data() {
    return {
      categories: [],
      post: {
        title: "",
        content: "",
        categoryId: 0,
        images: []
      },
      selectedCategory: null,
      m_files: []
    }
  },
  methods: {
    filesChangeHandler(e) {
      this.m_files = [];
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        this.m_files.push({
          bb: window.URL.createObjectURL(files[i]),
          file: files[i]
        });
      }
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
    async createPost() {
      this.v$.post.$touch();
      if (this.v$.post.$invalid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < this.m_files.length; i++) {
          formData.append('Images', this.m_files[i].file);
      }
      formData.append('Title', this.post.title);
      formData.append('Content', this.post.content);
      formData.append('CategoryId', this.selectedCategory);
      let cfg = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'}
      }
      try {
        const result = await axios.post('post/create', formData, cfg);

        if (result.status === 200) {
          this.successToast();
          this.$router.push('/blogs');
        }
      } catch (error) {
        console.log(error.message)
      }

    }
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
  validations: {
    post: {
      title: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
      content: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("150000 ta belgidan kam bo'lishi kerak", maxLength(150000))
      },
    }
  },
  async mounted() {
    await this.fetchCategory();
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">


      <div class="col-lg-8 col-xl-6 col-md-12 col-sm-12">
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Yangi blog yaratish</h5>
<!--            <small class="text-muted float-end">Default label</small>-->
          </div>
          <div class="card-body">
            <form @submit.prevent>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="basic-default-name">Sarlavha</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="post.title"
                         :class="{'invalid-input': v$.post.title.$error}"
                         id="basic-default-name" placeholder="Sarlavha">
                  <div v-if="v$.post.title.$error" class="invalid-input-text">
                    {{ v$.post.title.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-2 col-form-label" for="basic-default-message">Blog</label>
                <div class="col-sm-10">
                  <textarea id="basic-default-message" class="form-control" v-model="post.content"
                            rows="4"
                            :class="{'invalid-input': v$.post.content.$error}"
                            placeholder="Blog matnini shu yerga yozing..."
                            aria-label="Blog matnini shu yerga yozing..."
                            aria-describedby="basic-icon-default-message2"></textarea>
                  <div v-if="v$.post.content.$error" class="invalid-input-text">
                    {{ v$.post.content.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-2 form-label" for="exampleFormControlSelect1">Blog turi</label>
                <div class="col-sm-10">
                  <select class="form-select"  v-model="selectedCategory"
                          id="exampleFormControlSelect1"
                          aria-label="Default select example">
                    <option :value="item.id" v-for="item in categories">{{ item.name }}</option>

                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <label for="forimages" class="col-sm-2 col-form-label">Rasmlar</label>
                <div class="col-sm-10">
                  <input @change="filesChangeHandler" type="file" id="files" name="files[]"
                         class="form-control "
                         accept="image/x-png, image/jpeg, image/jpg"
                         multiple
                         required>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-sm-2"></label>
                <div class="col-sm-10 image-container gap-2 d-flex flex-wrap">
                  <div v-for="pic in m_files" :key="pic.bb" >
                    <img :src="pic.bb" alt="Image preview" class="previewImage">
                  </div>
                </div>
              </div>

              <div class="row justify-content-end">
                <div class="col-sm-10 ">
                  <div class="d-flex justify-content-end">
                    <button @click="createPost" type="submit" class="btn btn-primary">Yaratish</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.previewImage {
  width: 165px;
  height: 165px;
  object-fit: cover;
  aspect-ratio: 1/1;
  border-radius: .5rem;
}


</style>