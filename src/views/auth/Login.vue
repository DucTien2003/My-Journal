<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import { requiredRule, requiredTypeRule, isDesktop } from "../../utils/index";

interface FormLogin {
  email: string;
  password: string;
  remember: boolean;
}

const formLogin = reactive<FormLogin>({
  email: "",
  password: "",
  remember: true,
});

const route = useRouter();
const onFinish = (values: any) => {
  message.success("sign in successfully.", 3);
  if (isDesktop.value) {
    route.push({ name: "home" });
  } else {
    route.push({ name: "entry-list" });
  }
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div
    class="login w-full background-white-half sm:w-3/5 md:w-1/2 lg:w-2/5 shadow-form rounded-md"
  >
    <div class="wrapper">
      <div class="flex flex-col justify-center items-center">
        <div class="text-3xl font-semibold my-5">Sign in</div>

        <img
          src="../../assets/images/myLogo.svg"
          alt="logo"
          class="w-28 mb-5"
        />

        <a-form
          :model="formLogin"
          name="login"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="w-full"
        >
          <a-form-item
            name="email"
            :rules="[
              requiredRule('email address', 'blur', 'string', false, true),
              requiredTypeRule('Email', 'email', 'blur'),
            ]"
            class="mb-7"
          >
            <label for="login-email">
              Email address <span class="text-red-500">*</span>
            </label>
            <a-input
              v-model:value="formLogin.email"
              placeholder="Enter your email address..."
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[requiredRule('password', 'blur', 'string', false, true)]"
            class="mb-7"
          >
            <label for="login-password">
              Password <span class="text-red-500">*</span>
            </label>
            <a-input-password
              v-model:value="formLogin.password"
              placeholder="Enter your password..."
            />
          </a-form-item>

          <div class="flex items-center justify-between">
            <a-form-item name="remember">
              <a-checkbox v-model:checked="formLogin.remember">
                Remember me
              </a-checkbox>
            </a-form-item>

            <div class="cursor-pointer font-semibold text-sky-500">
              <router-link
                :to="{ name: 'forgot-password' }"
                class="hover:underline mb-6"
              >
                Forgot password
              </router-link>
            </div>
          </div>

          <a-form-item class="text-right">
            <a-button
              type="primary"
              html-type="submit"
              class="w-full"
            >
              Sign in
            </a-button>
          </a-form-item>
        </a-form>

        <!-- direction -->
        <div class="mt-1 text-stone-400 mb-5">
          Don't have an account?
          <router-link
            :to="{ name: 'register' }"
            class="ml-1 text-sky-500 cursor-pointer hover:underline"
          >
            Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
