<script>
import axios from "axios";
import {imagePathfixer} from "@/utilities/imagePathfixer.js";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";

export default {
  name: "userUpdate",
  data() {
    return {
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
      userId: 0,
      m_files: [],
      updating : {
        step1: false,
        step2: false,
        step3: false
      }
    }
  },
  methods: {
    imagePathfixer,
    async fetchUser() {
      let result = await axios.get("people/get/"+this.userId);
      if (result.status === 200) {
        this.user = {...result.data}
      }
    },
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
    async updateUser() {

      this.v$.user.$touch();
      if (this.v$.user.$invalid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < this.m_files.length; i++) {
        formData.append('Image', this.m_files[i].file);
      }
      formData.append('FirstName', this.user.firstName);
      formData.append('LastName', this.user.lastName);
      formData.append('IsMale', this.user.isMale);
      formData.append('PhoneNumber', this.user.phoneNumber);

      let cfg = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'}
      }
      try {
        this.updating.step1 = true;
        this.updating.step2 = true;
        const result = await axios.post('people/update', formData, cfg);

        if (result.status === 200) {
          localStorage.clear();

          setTimeout(() => {
            this.updating.step2 = false;
            this.updating.step3 = true;
          },1300)

          setTimeout(() => {
            this.successToast();
          }, 1500)

          setTimeout(() => {
            this.$router.push('/auth/login');
          }, 1500);

        }

      } catch (error) {
        this.errorToast();
        console.log(error.message)
      }

    }
  },
  async mounted() {
    let lokalUser = await JSON.parse(localStorage.getItem('lokalUser'))
    this.userId = lokalUser.userId;

    await this.fetchUser();
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
  validations: {
    user: {
      firstName: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
      lastName: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
      phoneNumber: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(9)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(10))
      },
    }
  },
}
</script>

<template>
  <div class="container" >
    <div class="row" >
      <div class="col-lg-8 mx-auto my-5" >
        <div class="card " >
        <h5 class="card-header">Mening sahifam</h5>
        <!-- Account -->
        <div class="card-body">
          <div class="d-flex align-items-start align-items-sm-center gap-4">
            <img v-if="user.imagePath === null || user.imagePath.length === 0 "
                 src="@/assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded"
                 height="100" width="100" id="uploadedAvatar">

            <img :src="imagePathfixer(user.imagePath)" class="d-block rounded" height="100" width="100" alt="avatar">

            <div class="button-wrapper">
              <p class="fw-bold m-0">{{user.firstName}}  {{user.lastName}}</p>
              <p class="fw-bold m-0">{{user.email}} </p>
              <p class="fw-bold m-0">{{user.phoneNumber}} </p>
            </div>
          </div>
        </div>
        <hr class="my-0">
        <div class="card-body">
          <form id="formAccountSettings" method="POST" onsubmit="return false" @submit.prevent>
            <div class="row">
              <div class="row mb-3">
                <div class="d-flex justify-content-center">
                  <div class=" image-container gap-2 d-flex flex-wrap">
                    <div v-for="pic in m_files" :key="pic.bb" >
                      <img :src="pic.bb" alt="Image preview" class="previewImage">
                    </div>
                  </div>
                </div>
                <label for="forimages" class="form-label">Profil uchun rasm</label>
                <div class="">
                  <input @change="filesChangeHandler" type="file" id="files" name="files[]"
                         class="form-control "
                         accept="image/x-png, image/jpeg, image/jpg"
                         required>
                  <p class="text-muted mb-0 ms-2">Jpg turdagi rasmlarni yuklay olasiz</p>
                </div>
              </div>

              <div class="mb-3 ">
                <label for="firstName" class="form-label">Ism </label>
                <input class="form-control" required
                       v-model="user.firstName"
                       :class="{'invalid-input': v$.user.firstName.$error}"
                       type="text" id="firstName" name="firstName"  autofocus="">
                    <div v-if="v$.user.firstName.$error" class="invalid-input-text">
                      {{ v$.user.firstName.$errors[0].$message }}
                    </div>
              </div>
              <div class="mb-3 ">
                <label for="lastName" class="form-label">Familiya </label>
                <input class="form-control" required
                       v-model="user.lastName"
                       :class="{'invalid-input': v$.user.lastName.$error}"
                       type="text" id="firstName" name="firstName"  autofocus="">
                <div v-if="v$.user.lastName.$error" class="invalid-input-text">
                  {{ v$.user.lastName.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3 ">
                <label for="email" class="form-label">E-mail</label>
                <input class="form-control" type="text" id="email" name="email"
                       v-model="user.email"
                       disabled placeholder="john.doe@example.com">
              </div>

              <div class="mb-3 ">
                <label class="form-label" for="phoneNumber">Phone Number</label>
                <div class="input-group input-group-merge">
                  <span class="input-group-text" >UZB (+998)</span>
                  <input type="text" id="phoneNumber" required
                         v-model="user.phoneNumber"
                         :class="{'invalid-input': v$.user.phoneNumber.$error}"
                         name="phoneNumber" class="form-control" placeholder="889997730">
                  <div v-if="v$.user.phoneNumber.$error" class="invalid-input-text">
                    {{ v$.user.phoneNumber.$errors[0].$message }}
                  </div>
                </div>
              </div>


              <div class="mb-3 ">
                <label for="language" class="form-label">Jins</label>
                <select id="language" v-model="user.isMale" class="select2 form-select">
                  <option :value="true">Erkak</option>
                  <option :value="false">Ayol</option>
                </select>
              </div>


            </div>
            <div class="mt-2 d-flex justify-content-end">
              <button type="submit" @click="updateUser" class="btn btn-primary me-2">Yangilash</button>
            </div>
          </form>
        </div>
        <!-- /Account -->
      </div>
      </div>
    </div>
  </div>

<!---->
  <div class="mt-3" v-if="updating.step1">
    <!-- Button trigger modal -->
    <div class="modal fade show  "
         id="backDropModal" data-bs-backdrop="static"
         tabindex="-1" style="display: block; padding-left: 0; background: rgba(0,0,0,0.8)" aria-modal="true"
         role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <form class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="backDropModalTitle">Profil yangilanmoqda</h5>
          </div>
          <div class="modal-body">
              <!-- loading-->
            <div v-if="updating.step2">
                <div class="d-flex justify-content-center">

                  <div class="spinner-border spinner-border-lg text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                  <div class="d-flex justify-content-center mt-1">

                    <p class="">Iltimos kuting...</p>
                  </div>
            </div>
            <!--  finished          -->
            <div v-if="updating.step3">
                <div class="d-flex justify-content-center">
                  <p class="fs-4">Muvafiqiyatlik yakunlandi</p>
                  <p class="">
                      <i class='fs-1 text-lg  bx bx-check' style="color: #3be111"></i>
                  </p>
                </div>
            </div>

          </div>

        </form>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade " id="backDropModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <form class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="backDropModalTitle">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameBackdrop" class="form-label">Name</label>
                <input type="text" id="nameBackdrop" class="form-control" placeholder="Enter Name">
              </div>
            </div>
            <div class="row g-2">
              <div class="col mb-0">
                <label for="emailBackdrop" class="form-label">Email</label>
                <input type="text" id="emailBackdrop" class="form-control" placeholder="xxxx@xxx.xx">
              </div>
              <div class="col mb-0">
                <label for="dobBackdrop" class="form-label">DOB</label>
                <input type="text" id="dobBackdrop" class="form-control" placeholder="DD / MM / YY">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </form>
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