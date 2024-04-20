<template>
  <LoaderComponent />
  <AppBarComponent :language="lang" :multilang="multilang" @langchange="languageChange" @logout="logOut" />
  <aside class="main-sidebar sidebar-light-primary elevation-4">
    <a class="brand-link">
      <img src="../../assets/images/pera.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
        style="opacity: .8">
      <span class="brand-text font-weight-light" style="font-size: 1.13rem;">{{ 'Master' }}
      </span>

    </a>

    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column nav-flat" data-widget="treeview" role="menu"
          data-accordion="false">
          <li class="nav-item menu-open">
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a class="nav-link" :class="$route.path == '/home' ? 'active' : ''">
                  <router-link to="/home">
                    <i class="fas fa-home"></i>
                    <p class="page-item">{{ $t(buildKey('Home')) }}</p>
                  </router-link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="$route.path == '/page-manage' ? 'active' : ''">
                  <router-link to="/page-manage">
                    <i class="fas fa-file-alt"></i>
                    <p class="page-item">{{ 'Page Manage' }}</p>
                  </router-link>
                </a>
              </li>
              <!-- <template v-for="(page, idx) in data" :key="idx">
                <li class="nav-item" v-if="page.childs && page.childs.length == 0">
                  <a class="nav-link" :class="$route.path == page.pageUrl ? 'active' : ''">
                    <router-link :to="page.pageUrl">
                      <i :class="page.pageIcon"></i>
                      <p class="page-item">{{ $t(buildKey(page.pageName)) }}</p>
                    </router-link>
                  </a>
                </li>
                <li class="nav-item" v-else>
                  <a href="#" class="nav-link">
                    <i :class="page.pageIcon"></i>
                    <p class="page-item">
                      {{ $t(buildKey(page.pageName)) }}
                      <i class="right fas fa-angle-left"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview" style="margin-left: 20px;" v-for="(childPage, childIdx) in page.childs"
                    :key="childIdx">
                    <li class="nav-item">
                      <a class="nav-link" :class="$route.path == childPage.pageUrl ? 'active' : ''">
                        <router-link :to="childPage.pageUrl">
                          <i :class="childPage.pageIcon"></i>
                          <p class="page-item">{{ $t(buildKey(childPage.pageName)) }}</p>
                        </router-link>
                      </a>
                    </li>
                  </ul>
                </li>
              </template> -->
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppBarComponent from '../organisms/AppBarComponent.vue';
import tokenService from '@/services/tokenService';
import { UserPage } from './model';
import LoaderComponent from '../molecules/LoaderComponent.vue';
let _lang: string = "EN";
let _multilang: { se: boolean, en: boolean } = {} as { se: boolean, en: boolean };
let _userPageData: UserPage[] = [];

export default defineComponent({
  components: {
    AppBarComponent,
    LoaderComponent,
  },
  created() {
  },
  mounted() {
    this.$i18n.locale = 'en';
    this.multilang = { en: true, se: false };
    this.lang = this.$i18n.locale.toUpperCase();
    this.classAddRemove();
    this.data = tokenService.getPages();
  },
  data() {
    return {
      lang: _lang,
      multilang: _multilang,
      data: _userPageData
    }
  },
  methods: {
    logOut() {
      tokenService.removeJwtUser();
      this.$router.go(0);
    },
    buildKey(inputString: string) {
      const words = inputString.split(' ');

      const camelCasedWords = words.map((word: any, index: any) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      });

      const camelCasedString = camelCasedWords.join('');

      return camelCasedString;
    },
    languageChange(code: string) {
      this.$i18n.locale = code;
      this.lang = code.toUpperCase();
      this.multilang = { en: false, se: false };
      switch (code.toLowerCase()) {
        case 'en':
          this.multilang = { en: true, se: false };
          break;
        case 'se':
          this.multilang = { en: false, se: true };
          break;
      }
    },
    classAddRemove() {
      var bodyElement = document.body;
      var sidbarminiClass = bodyElement.classList.contains("sidebar-mini");
      var layoutfixedClass = bodyElement.classList.contains("layout-fixed");
      var registerpageClass = bodyElement.classList.contains("register-page");
      var loginpageClass = bodyElement.classList.contains("login-page");
      if (sidbarminiClass) bodyElement.classList.remove('sidebar-mini');
      if (layoutfixedClass) bodyElement.classList.remove('layout-fixed');
      if (registerpageClass) bodyElement.classList.remove('register-page');
      if (loginpageClass) bodyElement.classList.remove('login-page');
      bodyElement.classList.add("sidebar-mini");
      bodyElement.classList.add("layout-fixed");
    }
  }
});
</script>
<style>
.page-item {
  padding-left: 0.5em;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.e-grid .e-content {
  background-color: #fff;
  height: calc(100vh - 390px) !important
}
</style>

