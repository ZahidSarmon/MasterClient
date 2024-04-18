<template>
  <div class="login-wrapper">
      <div class="login-left">
        <h1 class="main-title">Welcome To Master</h1>
      </div>

      <div class="login-right">
        <div class="login-right-content">
          <form @submit="onLogin">
            <div class="form-group" style="margin-bottom: 1rem;">
              <input name="email" placeholder="Email" type="text" class="form-control" v-model="form.email" required/>
            </div>
            <div class="form-group"  style="margin-bottom: 1rem;">
              <input type="password" name="password" placeholder="Password" class="form-control" v-model="form.password" required/>
            </div>
            <div class="row" style="margin-bottom: 1rem;">
              <div class="col" v-if="!isLoginLoader">
                <button type="submit" class="btn btn-info btn-block">Sign In</button>
              </div>
              <div class="col-12" v-if="isLoginLoader">
                <button class="btn btn-info btn-block" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Signing...
                </button>
              </div>
            </div>
          </form>
          <p class="mb-1">
            <a class="is-membership" @click="$router.push('/forget-password')">I forgot my password</a>
          </p>
          <p class="mb-0">
            <a @click="$router.push('/register')" class="text-center is-membership">I don't have a membership?</a>
          </p>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Login } from './Login.model';


let _loginForm: Login = {} as Login;

export default defineComponent({
  created() {
    this.classAddRemove();
  },
  data() {
    return {
      form: _loginForm,
      isLoginLoader: false,
    }
  },
  mounted() {
    this.form = {} as Login;
    this.RedirectTo();
  },
  methods: {
    onLogin(event:any) {
      event.preventDefault();
      this.isLoginLoader = false;
    },
    RedirectTo() {
      //const isExpired = tokenService.isExpired(tokenService.getToken());
      //if (!isExpired) router.push("/");
    },
    classAddRemove() {
      var bodyElement = document.body;
      var sidbarminiClass = bodyElement.classList.contains("sidebar-mini");
      var layoutfixedClass = bodyElement.classList.contains("layout-fixed");
      var registerpageClass = bodyElement.classList.contains("register-page");
      if (sidbarminiClass) bodyElement.classList.remove('sidebar-mini');
      if (layoutfixedClass) bodyElement.classList.remove('layout-fixed');
      if (registerpageClass) bodyElement.classList.remove('register-page');
      //bodyElement.classList.add('register-page');
    }
  }
});
</script>
<style scoped>
.is-membership {
  cursor: pointer;
}
/* login */

.login-wrapper {
  height: 100vh;
  display: flex;
}

.main-title {
  font-size: 52px;
  line-height: 1;
  font-weight: bold;
  color: #0a3370;
  text-align: center;
}

.brand-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.login-left {
  padding: 1.5rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  background: rgba(73, 199, 235, 0.1);
  position: relative;
}

.login-left:before {
  content: "";
  display: block;
  width: 80%;
  height: 300px;
  position: absolute;
  right: 0;
  top: 0;
  background: url("../../../../assets/images/Wave2.svg") left top no-repeat;
  background-size: contain;
}

.login-left:after {
  content: "";
  display: block;
  width: 80%;
  height: 300px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: url("../../../../assets/images/Wave1.svg") left bottom no-repeat;
  background-size: contain;
}

.login-right {
  padding: 1.5rem;
  width: 60%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.secondary-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: #0a3370;
}

.login-right-content {
  width: 470px;
  max-width: 470px;
}

.link {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
  color: #0a3370;
  font-weight: 500;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.primary-btn {
  background: #0a3370;
}

.primary-btn:hover {
  background: #49c7eb;
  border-color: #49c7eb;
}

@media screen and (max-width: 991px) {
  .login-left {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .login-right {
    width: 100%;
  }
}

@media screen and (max-width: 640px) {
  .login-right-content {
    width: 100%;
  }
}

.form-check-input:checked {
  background-color: #0a3370;
  border-color: #0a3370;
}
</style>