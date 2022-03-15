import Home from "@/views/Home";

export default [
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: {showFooter: true},
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: {showFooter: true},
  },
  {
    name: 'Order',
    path: '/order',
    component: () => import('@/views/Order'),
    meta: {showFooter: true},
  },
  {
    name: 'Me',
    path: '/me',
    component: () => import('@/views/Me'),
    meta: {showFooter: true},
  },
  // {
  //   name: 'Login',
  //   path: '/login',
  //   component: () => import('@/pages/Login'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'Shop',
  //   path: '/shop',
  //   component: () => import('@/pages/Shop'),
  //   meta: {showFooter: false},
  //   children: [
  //     {
  //       path: '/shop/goods',
  //       component: () => import('@/pages/Shop/ShopGoods'),
  //       meta: {showFooter: false},
  //     },
  //     {
  //       path: '/shop/info',
  //       component: () => import('@/pages/Shop/ShopInfo'),
  //       meta: {showFooter: false},
  //     },
  //     {
  //       path: '/shop/ratings',
  //       component: () => import('@/pages/Shop/ShopRatings'),
  //       meta: {showFooter: false},
  //     },
  //     //重定向
  //     {
  //       path: '/shop',
  //       redirect: '/shop/goods',
  //     },
  //   ],
  // },
  // {
  //   name: 'BreakfastReserve',
  //   path: '/breakfastReserve',
  //   component: () => import('@/pages/BreakfastReserve'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'CommunityActivities',
  //   path: '/communityActivities',
  //   component: () => import('@/pages/CommunityActivities'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'EducationSupermarket',
  //   path: '/educationSupermarket',
  //   component: () => import('@/pages/EducationSupermarket'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'Errand',
  //   path: '/errand',
  //   component: () => import('@/pages/Errand'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'HelpEachOther',
  //   path: '/helpEachOther',
  //   component: () => import('@/pages/HelpEachOther'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'LibraryReserve',
  //   path: '/libraryReserve',
  //   component: () => import('@/pages/LibraryReserve'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'LostAndFound',
  //   path: '/lostAndFound',
  //   component: () => import('@/pages/LostAndFound'),
  //   meta: {showFooter: false},
  // },
  // {
  //   name: 'PrintService',
  //   path: '/printService',
  //   component: () => import('@/pages/PrintService'),
  //   meta: {showFooter: false},
  // },

  //重定向
  {
    path: '/',
    redirect: '/home',
  },
]
