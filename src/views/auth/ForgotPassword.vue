<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { requiredRule, requiredTypeRule } from "../../utils/index";

interface FormForgotPassword {
  email: string;
}

const formForgotPassword = reactive<FormForgotPassword>({
  email: "",
});

const route = useRouter();
const onFinish = (values: any) => {
  route.push({ name: "reset-password" });
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div
    class="forgot-password w-full background-white-half sm:w-3/5 md:w-1/2 lg:w-2/5 shadow-form rounded-md"
  >
    <div class="wrapper">
      <div class="flex flex-col justify-center items-center">
        <div class="text-3xl font-semibold my-5">Forgot password</div>

        <img
          src="../../assets/images/myLogo.svg"
          alt="logo"
          class="w-28 mb-5"
        />

        <div class="text-stone-400 mb-5">
          Enter the email address you use to login to "My journal" account and
          we'll send you instructions for how to reset your password.
        </div>

        <a-form
          :model="formForgotPassword"
          name="forgot-password"
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
            <label for="forgot-password-email">
              Email address <span class="text-red-500">*</span>
            </label>
            <a-input
              v-model:value="formForgotPassword.email"
              placeholder="Enter your email address..."
            />
          </a-form-item>

          <a-form-item class="text-right">
            <a-button
              type="primary"
              html-type="submit"
              class="w-full mt-2"
            >
              Send
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
