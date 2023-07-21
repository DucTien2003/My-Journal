<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import {
  requiredRule,
  requiredTypeRule,
  confirmPassword,
  minLengthRule,
} from "../../utils/index";

interface FormRegister {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formRegister = reactive<FormRegister>({
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const route = useRouter();
const onFinish = (values: any) => {
  message.success("Sign up successfully.", 3);
  route.push({ name: "login" });
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div
    class="register w-full background-white-half sm:w-3/5 md:w-1/2 lg:w-2/5 shadow-form rounded-md"
  >
    <div class="wrapper">
      <div class="flex flex-col justify-center items-center">
        <div class="text-3xl font-semibold my-5">Sign up</div>

        <img
          src="../../assets/images/myLogo.svg"
          alt="logo"
          class="w-28 mb-5"
        />

        <div class="text-stone-400 mb-5 text-center">
          Welcome to My journal!
          <br />
          Let's create your free account.
        </div>

        <a-form
          :model="formRegister"
          name="register"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="w-full"
        >
          <a-form-item
            name="userName"
            :rules="[requiredRule('user name', 'blur', 'string', false, true)]"
            class="mb-7"
          >
            <label for="register-userName">
              User name <span class="text-red-500">*</span>
            </label>
            <a-input
              v-model:value="formRegister.userName"
              placeholder="Enter your user name..."
            />
          </a-form-item>

          <a-form-item
            name="email"
            :rules="[
              requiredRule('email address', 'blur', 'string', false, true),
              requiredTypeRule('Email', 'email', 'blur'),
            ]"
            class="mb-7"
          >
            <label for="register-email">
              Email address <span class="text-red-500">*</span>
            </label>
            <a-input
              v-model:value="formRegister.email"
              placeholder="Enter your email address..."
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              requiredRule('password', 'blur', 'string', false, true),
              minLengthRule('password', 6, 'blur'),
            ]"
            class="mb-7"
          >
            <label for="register-password">
              Password <span class="text-red-500">*</span>
            </label>
            <a-input-password
              v-model:value="formRegister.password"
              placeholder="Enter your password..."
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              confirmPassword(
                formRegister.password,
                formRegister.confirmPassword,
                'blur',
              ),
            ]"
            class="mb-7"
          >
            <label for="register-password">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <a-input-password
              v-model:value="formRegister.confirmPassword"
              placeholder="Re-enter your password..."
            />
          </a-form-item>

          <a-form-item class="text-right">
            <a-button
              type="primary"
              html-type="submit"
              class="w-full"
            >
              Sign up
            </a-button>
          </a-form-item>
        </a-form>

        <!-- direction -->
        <div class="mt-1 mb-5 text-stone-400">
          <router-link
            :to="{ name: 'login' }"
            class="flex items-center ml-1 cursor-pointer hover:underline"
          >
            <img
              src="../../assets/icons/left-arrow.svg"
              alt="icon"
              class="w-5 mr-2"
            />
            Return to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
