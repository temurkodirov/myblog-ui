<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";

export const upperCase = value => /[A-Z]/.test(value);
export default {
  name: "registerVerify",
  data() {
    return {
      auth: {
        ism: "",
        familiya: "Familiya",
        login: "",
        parol: ""
      },


    }
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
  methods: {
    successToast() {
      this.toast.success("Muvaffaqiyatlik ro'yhatdan o'tdingiz", {
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

    async registerUser() {
      this.v$.auth.$touch();
      if (this.v$.auth.$invalid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      const newUser = {
        email: this.auth.login,
        code: this.auth.parol
      }
      try {
        const result = await axios.post('auth/register/verify', newUser);
        if (result.status === 200) {
          localStorage.setItem('token', result.data.token);
          this.successToast();
          this.$router.push('/');
        }
      } catch (e) {
        console.error(e.message);
        this.errorToast();
      }
    }
  },
  async mounted() {
    this.auth.login = localStorage.getItem('tempMail')
  },
  validations: {
    auth: {
      login: {
        required: helpers.withMessage('Yozilishi shart', required),
        email: helpers.withMessage('Email manzilingiz noto\'g\'ri', email)
      },
    }
  }
}
</script>

<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <!-- Register Card -->
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center">
              <span class="app-brand-text demo text-body fw-bolder">MyBlog.uz</span>
            </div>
            <!-- /Logo -->
            <h4 class="mb-2">"Myblog.uz" ga Hush kelibsiz! 👋</h4>
            <p class="mb-2">Elektron pochtangizga tasdiqlash kodi jo'natildi</p>

            <div class="mb-2">
              <label for="email" class="form-label">Elektron pochta</label>
              <input v-model="auth.login" type="email" class="form-control" disabled
                     :class="{'invalid-input': v$.auth.login.$error}"
                     id="email" name="email" placeholder="example@mail.ru"/>
              <div v-if="v$.auth.login.$error" class="invalid-input-text">
                {{ v$.auth.login.$errors[0].$message }}
              </div>
            </div>
            <div class="mb-2 ">
              <label for="username" class="form-label">Tasdiqlash kodi</label>
              <input v-model="auth.parol" type="number" class="form-control" id="username"
                     name="username" placeholder="Tasdiqlash kodi" autofocus/>

            </div>


            <button @click="registerUser" class="btn btn-primary d-grid w-100">Ro'yhatdan o'tish</button>

          </div>
          <p class="text-center">
            <span class="me-2">Akkauntingiz bormi?</span>
            <router-link to="/auth/login">
              <span>Sahifangizga kiring</span>
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>