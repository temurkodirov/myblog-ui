<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";

export const upperCase = value => /[A-Z]/.test(value);
export default {
  name: "register",
  data() {
    return {
      auth: {
        ism: "",
        familiya: "",
        login: "",
        parol: ""
      },

      isJobsLoaded: false,
      showPassword: false,
      toasts: []
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

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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
        firstName: this.auth.ism,
        lastName: this.auth.familiya,
        email: this.auth.login,
        password: this.auth.parol
      }
      try {
        const result = await axios.post('auth/register', newUser);
        if (result.status === 200) {
          const res = await  axios.post('auth/register/send-code?mail='+ newUser.email);
         if (res.status === 200)
         {
           localStorage.setItem('tempMail', newUser.email);
           this.$router.push('/auth/register-verify');
         }
        }
      } catch (e) {
        console.error(e.message);
        this.errorToast();
      }
    }
  },
  async mounted() {

  },
  validations: {
    auth: {
      ism: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
      familiya: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      },
      login: {
        required: helpers.withMessage('Yozilishi shart', required),
        email: helpers.withMessage('Email manzilingiz noto\'g\'ri', email)
      },
      parol: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('6 ta belgidan ko\'p  bo\'lishi kerak', minLength(6)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100)),
        upperCase: helpers.withMessage("Kamida bir dona katta harf ishtirok etishi kerak", upperCase)
      }
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
            <p class="mb-2">Ro'yhatdan o'ting</p>


            <div class="mb-2 ">
              <label for="username" class="form-label">Ism</label>

              <input v-model="auth.ism" type="text" class="form-control" id="username"
                     :class="{'invalid-input': v$.auth.ism.$error}"
                     name="username" placeholder="Ismingizni kiriting" autofocus/>

              <div v-if="v$.auth.ism.$error" class="invalid-input-text">
                {{ v$.auth.ism.$errors[0].$message }}
              </div>

            </div>
            <div class="mb-2 ">
              <label for="username" class="form-label">Familiya</label>

              <input v-model="auth.familiya" type="text" class="form-control" id="username"
                     :class="{'invalid-input': v$.auth.familiya.$error}"
                     name="username" placeholder="Ismingizni kiriting" autofocus/>

              <div v-if="v$.auth.familiya.$error" class="invalid-input-text">
                {{ v$.auth.familiya.$errors[0].$message }}
              </div>

            </div>
            <div class="mb-2">
              <label for="email" class="form-label">Elektron pochta</label>
              <input v-model="auth.login" type="email" class="form-control"
                     :class="{'invalid-input': v$.auth.login.$error}"
                     id="email" name="email" placeholder="example@mail.ru"/>
              <div v-if="v$.auth.login.$error" class="invalid-input-text">
                {{ v$.auth.login.$errors[0].$message }}
              </div>
            </div>
            <div class="mb-3 form-password-toggle">
              <label class="form-label" for="password">Parol</label>
              <div class="input-group input-group-merge">
                <input v-model="auth.parol" :type="showPassword ? 'text' : 'password'"
                       id="password" class="form-control" name="password"
                       placeholder="******" aria-describedby="password"
                       :class="{'invalid-input-password': v$.auth.parol.$error}"/>
                <span @click="togglePasswordVisibility" class="input-group-text cursor-pointer">
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                  </span>
                <div v-if="v$.auth.parol.$error" class="invalid-input-text">
                  {{ v$.auth.parol.$errors[0].$message }}
                </div>
              </div>
            </div>

            <button @click="registerUser" class="btn btn-primary d-grid w-100">Davom etish...</button>

          </div>
        <p class="text-center mb-0">
          <span class="me-2">Akkauntingiz bormi?</span>
          <router-link to="/auth/login">
            <span>Sahifangizga kiring</span>
          </router-link>
        </p>
          <p class="text-center">
            <router-link to="/">
              <span>Ro'yhatdan o'tmasdan foydalanish</span>
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>