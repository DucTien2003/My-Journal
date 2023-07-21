<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import {
  requiredRule,
  confirmPassword,
  minLengthRule,
} from "../../utils/index";

interface FormResetPassword {
  password: string;
  confirmPassword: string;
}

const formResetPassword = reactive<FormResetPassword>({
  password: "",
  confirmPassword: "",
});

const route = useRouter();
const onFinish = (values: any) => {
  message.success("Set new password successfully.", 3);
  route.push({ name: "login" });
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div
    class="reset-password w-full background-white-half sm:w-3/5 md:w-1/2 lg:w-2/5 shadow-form rounded-md"
  >
    <div class="wrapper">
      <div class="flex flex-col justify-center items-center">
        <div class="text-3xl font-semibold my-5">Set new password</div>

        <img
          src="../../assets/images/myLogo.svg"
          alt="logo"
          class="w-28 mb-5"
        />

        <div class="text-stone-400 mb-5">
          Enter a new password and you'll be all set!
        </div>

        <a-form
          :model="formResetPassword"
          name="reset-password"
          autocomplete="on"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="w-full"
        >
          <a-form-item
            name="password"
            :rules="[
              requiredRule('password', 'blur', 'string', false, true),
              minLengthRule('password', 6, 'blur'),
            ]"
            class="mb-7"
          >
            <label for="reset-password-password">
              Password <span class="text-red-500">*</span>
            </label>
            <a-input-password
              v-model:value="formResetPassword.password"
              placeholder="Enter your password..."
            />
          </a-form-item>

          <a-form-item
            name="confirmPassword"
            :rules="[
              confirmPassword(
                formResetPassword.password,
                formResetPassword.confirmPassword,
                'blur',
              ),
            ]"
            class="mb-7"
          >
            <label for="reset-password-confirmPassword">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <a-input-password
              v-model:value="formResetPassword.confirmPassword"
              placeholder="Re-enter your password..."
            />
          </a-form-item>

          <a-form-item class="text-right">
            <a-button
              type="primary"
              html-type="submit"
              class="w-full"
            >
              Confirm
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
