<template>
  <section style="padding: 200px 0">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center" style="">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p class="lead fw-normal mb-0 mr-3">Sign in with</p>
              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </button>

              <button type="button" class="btn btn-primary btn-floating mx-1">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </button>
            </div>

            <div class="divider d-flex align-items-center my-4">
              <!-- <p class="text-center fw-bold mx-3 mb-0">Or</p> -->
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                v-model="username"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter username"
              />
              <!-- <label class="form-label" for="form3Example3">Email address</label> -->
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input
                v-model="password"
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Enter password"
              />
              <!-- <label class="form-label" for="form3Example4">Password</label> -->
            </div>
            <div class="form-outline mb-3">
              <input
                v-model="newPassword"
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Enter new password"
              />
              <!-- <label class="form-label" for="form3Example4">Password</label> -->
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                @click="onChangePassword"
                type="button"
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Đổi mật khẩu
              </button>
              <p class="fw-bold mt-5 pt-1 mb-0">
                Về trang

                <router-link to="/login" class="text-primary">Đăng nhập</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { HOST_USER_SERVICE } from "@/services/getAPI";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export default {
  setup() {
    const router = useRouter();
    const toast = useToast();

    const username = ref("");
    const password = ref("");
    const newPassword = ref("");

    const onChangePassword = async () => {
      try {
        const response = await fetch(`${HOST_USER_SERVICE}/api/account/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            newPassword: newPassword.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        console.log(data);
        toast.success("Đổi mật khẩu thành công");
        router.push("/login");
      } catch (error) {
        toast.error("Lỗi đổi mật khẩu");
        console.log(error);
      }
    };
    return { onChangePassword, username, password, newPassword };
  },
};
</script>

<style scoped>
input {
  padding: 0.5em;
}
</style>
