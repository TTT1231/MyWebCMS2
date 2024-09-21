import { createRouter, createWebHistory } from 'vue-router';
export const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         name: 'login',
         component: () => import('@/views/login/Login.vue'),
         children: []
      }
   ]
});
//  router.addRoute('main',{

//     path:'home/analysis',
//     name:'analysis',
//     component:()=>import('@/views/sys/home/Analysis.vue')
//  })
// console.log(router.getRoutes())
// router.getRoutes()[1].children[0].children?.push({
//     path:'analysis',
//     name:'analysis',
//     component:()=>import('@/views/sys/home/Analysis.vue')
// })
