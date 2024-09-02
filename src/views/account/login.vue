<script>
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useToast} from "vue-toastification";
import axios from "axios";


export default {
  name: "login",
  data() {
    return {
      showPassword: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    errorToast() {
      this.toast.error("Login yoki parol xato", {
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

    async loginFunction() {

      this.v$.user.$touch();
      if (this.v$.user.$invalid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      try {
        const result = await axios.post('auth/login', this.user);

        if (result.status === 200) {

          localStorage.setItem('token', result.data.token);
          this.$router.push('/')

        } else {
          this.errorToast();
        }
      } catch (e) {
        this.errorToast();
        console.error(e.message);
      }

    }
  },
  validations: {
    user: {
      email: {
        required: helpers.withMessage('Yozilishi shart', required),
        email: helpers.withMessage('Email manzilingiz noto\'g\'ri', email)
      },
      password: {
        required: helpers.withMessage('Yozilishi shart', required),
        minLength: helpers.withMessage('3 ta belgidan ko\'p  bo\'lishi kerak', minLength(3)),
        maxLength: helpers.withMessage("100 ta belgidan kam bo'lishi kerak", maxLength(100))
      }
    }
  },
  setup() {
    const v$ = useVuelidate();
    const toast = useToast();
    return {v$, toast}
  },
}
</script>

<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner">
        <!-- Register -->
        <div class="card">
          <div class="card-body">
            <!-- Logo -->
            <div class="app-brand justify-content-center">
              <span class="app-brand-text demo text-body fw-bolder">MyBlog.uz</span>
            </div>
            <!-- /Logo -->
            <h4 class="mb-2">"Myblog.uz" ga Hush kelibsiz! 👋</h4>
            <p class="mb-2">Barcha foydalik ma'lumotlar shu yerda</p>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email-username"
                       v-model="user.email"
                       :class="{'invalid-input': v$.user.email.$error}"
                       placeholder="Enter your email or username" autofocus
                       />
                <div v-if="v$.user.email.$error" class="invalid-input-text">
                  {{ v$.user.email.$errors[0].$message }}
                </div>
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Parol</label>

                </div>
                <div class="input-group input-group-merge">
                  <input v-model="user.password" :type="showPassword ? 'text' : 'password'"
                         id="password" class="form-control" name="password"
                         placeholder="******" aria-describedby="password"
                         :class="{'invalid-input-password': v$.user.password.$error}"/>
                  <span @click="togglePasswordVisibility" class="input-group-text cursor-pointer">
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                  </span>
                  <div v-if="v$.user.password.$error" class="invalid-input-text">
                    {{ v$.user.password.$errors[0].$message }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <button @click="loginFunction" class="btn btn-primary d-grid w-100" type="submit">Kirish</button>
                <router-link to="/"  class="btn btn-dark d-grid w-100 mt-2" type="submit">Ro'yhatdan o'tmasdan davom etish</router-link>
              </div>

            <p class="text-center">
              <span class="me-2">Akkauntingiz yo'qmi?</span>
              <router-link to="/auth/register">
                <span>Ro'yhatdan o'ting</span>
              </router-link>
            </p>
          </div>
        </div>
        <!-- /Register -->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>