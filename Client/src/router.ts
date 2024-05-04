import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import HomePage from "./pages/homepage/HomePage.vue";
import LoginPage from "./pages/login/LoginPage.vue";
import CustomerPage from "./pages/customer/CustomerPage.vue";
import RegisterPage from "./pages/register/RegisterPage.vue";
import ChangePassword from "./pages/change-password/ChangePassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      name: "Trang chủ",
      component: HomePage,
    },
    {
      path: "/login",
      name: "Đăng nhập",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Đăng ký",
      component: RegisterPage,
    },
    {
      path: "/change-password",
      name: "Đổi mật khẩu",
      component: ChangePassword,
    },
    {
      path: "/customer",
      name: "Trang cá nhân",
      component: CustomerPage,
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});
router.afterEach((to) => {
  nextTick(() => {
    document.title = (to.meta.title || to.name) + " | " + "Hệ quản trị CSDL";
  });
});

export default router;
