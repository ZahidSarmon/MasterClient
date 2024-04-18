<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>
        <ul class="navbar-nav navbar-right ml-auto align-items-center">
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <img class='lang-flag' v-if="props.multilang.en" src='@/assets/icons/EN.svg' />
                    <img class='lang-flag' v-if="props.multilang.se" src='@/assets/icons/SE.svg' />
                    {{ props.language }}
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item" @click="languageChangeEvent('en')">
                        <img class='lang-flag' src='@/assets/icons/EN.svg' /> English
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item" @click="languageChangeEvent('se')">
                        <img class='lang-flag' src='@/assets/icons/SE.svg' /> Swedish
                    </a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user-circle"></i> {{ author }}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                    <a class="dropdown-item" @click="changePasswordOpen()">
                        Change Password
                    </a>

                    <div class="dropdown-divider"></div>

                    <a class="dropdown-item" @click="logOut()" style="cursor: pointer;" title="Logout">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>

                </div>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">

import tokenService from '@/services/tokenService';
import { computed, defineComponent } from 'vue';
import modal from '../common/modalManage';



export default defineComponent({
    props: {
        multilang: {
            type: Object,
            default: () => ({ se: false, en: false }),
        },
        language: String
    },
    emits: ['langchange','logout'],
    setup(props, ctx) {

        const author = computed(() => {
            return tokenService.getUserEmail();
        });

        function languageChangeEvent(code:string){
            ctx.emit('langchange',code);
        }

        function logOut(){
            ctx.emit('logout');
        }

        function changePasswordOpen(){
            modal.Open('changePasswordModal');
        }

        return {
            props, ctx,languageChangeEvent,logOut,author,changePasswordOpen
        }
    },
});
</script>