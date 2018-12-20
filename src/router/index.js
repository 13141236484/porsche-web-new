import Vue from 'vue';
import Router from 'vue-router';
import Cont from '@/components/content/cont.vue';
import PorscheHome from '@/routePage/porsche-home/index.vue';
import PorscheEnjoyActivity from '@/routePage/porsche-enjoyActivity/index.vue';
import PorscheEnjoyFm from '@/routePage/porsche-enjoyFm/index.vue';
import PorscheEnjoyShadow from '@/routePage/porsche-enjoyFm/shadow.vue';
import PorscheEnjoyShadowlist from '@/routePage/porsche-enjoyFm/shadowlist.vue';
import PorscheEnjoyEmotionlist from '@/routePage/porsche-enjoyFm/emotionlist.vue';
import PorscheEnjoyEmotion from '@/routePage/porsche-enjoyFm/emotion.vue';
import PorscheEnjoyModule from '@/routePage/porsche-enjoyFm/model.vue';
import PorscheEnjoyModellist from '@/routePage/porsche-enjoyFm/modellist.vue';
import PorscheEnjoyDream from '@/routePage/porsche-enjoyFm/dream.vue';
import PorscheEnjoyDreamlist from '@/routePage/porsche-enjoyFm/dreamlist.vue';
import PorscheOffline from '@/routePage/porsche-offline/index.vue';
import PorscheOfflinehui from '@/routePage/porsche-offline/indexhui.vue';
import PorscheDrive from '@/routePage/porsche-drive/index.vue';
import PorschePersonal from '@/routePage/porsche-personal/index.vue';
import PorscheLogin from '@/containers/login/index.vue';
import PorscheRegistered from '@/containers/registered/index.vue';
import PorscheArticle from '@/basecom/article.vue';
import PorscherRecruit from '@/basecom/recruit.vue';
import PorscherGather from '@/basecom/gather.vue';


import PorscheDealer from '@/routePage/porsche-reserve/dealer.vue';
import PorscheTestdrive from '@/routePage/porsche-reserve/testdrive.vue';
import PorscheDrivearticle from '@/routePage/porsche-drive/article.vue';
import PorscheEnjoyUpload from '@/routePage/porsche-enjoyFm/upload.vue';
import PorscheEnjoyUploadgy from '@/routePage/porsche-enjoyFm/uploadgy.vue';
import CONFIG from '../common/js/config.js';
import Login from '@/containers/logandreg.vue';
import PorscheReserve from '@/routePage/porsche-reserve/index.vue';
Vue.use(Router);

export default new Router({
      // mode: 'history',
      // base:CONFIG.PUPLIC_DIR,
      routes: [
        {
          path: '/',
          name: 'Cont',
          component: Cont,
          redirect:'/home',
          children: [
            {
              path: '/home',
              name: 'PorscheHome',
              component: PorscheHome,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/login',
              name: 'Login',
              component: Login,
            },
            // {
            //   path: '/registered',
            //   name: 'PorscheRegistered',
            //   component: PorscheRegistered
            // },
            {
              path: '/enjoyActivity',
              name: 'PorscheEnjoyActivity',
              component: PorscheEnjoyActivity
            },
            {
              path: '/enjoyFm',
              name: 'PorscheEnjoyFm',
              component: PorscheEnjoyFm
            },
            {
              path: '/shadow',
              name: '/PorscheEnjoyShadow',
              component: PorscheEnjoyShadow
            },
            {
              path: '/shadowlist/:num',
              name: '/PorscheEnjoyShadowlist',
              component: PorscheEnjoyShadowlist
            },
            {
              path: '/emotion',
              name: 'PorscheEnjoyEmotion',
              component: PorscheEnjoyEmotion
            },
            {
              path: '/emotionlist/:num',
              name: 'PorscheEnjoyEmotionlist',
              component: PorscheEnjoyEmotionlist
            },
            {
              path: '/module',
              name: 'PorscheEnjoyModule',
              component: PorscheEnjoyModule
            },
            {
              path: '/modulelist/:num',
              name: 'PorscheEnjoyModellist',
              component: PorscheEnjoyModellist
            },
              {
                  path: '/dream',
                  name: 'PorscheEnjoyDream',
                  component: PorscheEnjoyDream
              },
              {
                  path: '/dreamlist/:num',
                  name: 'PorscheEnjoyDreamlist',
                  component: PorscheEnjoyDreamlist
              },
            {
              path: '/offline',
              name: 'PorscheOffline',
              component: PorscheOffline
            },
            {
              path: '/drive',
              name: 'PorscheDrive',
              component: PorscheDrive
            },
            {
              path: '/personal/:num',
              name: 'PorschePersonal',
              component: PorschePersonal
            },
            {
              path: '/article/:num',
              name: 'PorscheArticle',
              component: PorscheArticle
            },
              {
                  path: '/recruit/:num',
                  name: 'PorscherRecruit',
                  component: PorscherRecruit
              },
              {
                  path: '/gather/:num',
                  name: 'PorscherGather',
                  component: PorscherGather
              },


            {
              path: '/dealer',
              name: 'PorscheDealer',
              component: PorscheDealer
            },
            {
              path: '/dealerarticle/:num',
              name: 'PorscheDrivearticle',
              component: PorscheDrivearticle
            },
            {
              path: '/testdrive',
              name: 'PorscheTestdrive',
              component: PorscheTestdrive
            },
            {
              path: '/upload/:num',
              name: 'PorscheEnjoyUpload',
              component: PorscheEnjoyUpload
            },
            {
              path: '/uploadgy/:num',
              name: 'PorscheEnjoyUploadgy',
              component: PorscheEnjoyUploadgy
            },
            {
              path: '/offlinehui',
              name: 'PorscheOfflinehui',
              component: PorscheOfflinehui
            },

              {
                  path: '/reserve',
                  name: 'PorscheReserve',
                  component: PorscheReserve
              },
          ]
        }
        ]
      });
