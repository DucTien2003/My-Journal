<script setup lang="ts">
import {
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ChangePassword from "./modals/ChangePassword.vue";

const route = useRouter();
const signOut = () => {
  route.push({ name: "login" });
};

//Handle show modal change password
const changePasswordComponentRef = ref<InstanceType<
  typeof ChangePassword
> | null>(null);
const showChangePassword = () => {
  if (changePasswordComponentRef.value !== null) {
    changePasswordComponentRef.value.showModalChangePassword();
  }
};
</script>

<template>
  <div class="header-comp px-4 py-3 background-white-half shadow">
    <div class="flex items-center justify-between">
      <router-link
        :to="{ name: 'home' }"
        class="flex items-center cursor-pointer"
      >
        <img
          src="../assets/images/myLogo.svg"
          alt="logo"
          class="w-12 mr-1"
        />
        <span class="text-xl font-semibold md:hidden">My jounal</span>
      </router-link>

      <span class="text-xl font-semibold hidden md:inline-block">
        My jounal
      </span>

      <!-- Options -->
      <a-dropdown placement="bottomRight">
        <span class="block text-center flex items-center cursor-pointer">
          <div class="flex items-center cursor-pointer">
            <img
              src="../assets/icons/avatar.svg"
              alt="avatar"
              class="w-7 rounded-full mr-1 bg-red-50"
            />
            <span class="font-medium">Duc Tien</span>
          </div>
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div class="flex items-center">
                <user-outlined />
                <span class="ml-2">Hồ sơ</span>
              </div>
            </a-menu-item>

            <a-menu-item @click="showChangePassword">
              <div class="flex items-center">
                <lock-outlined />
                <span class="ml-2">Đổi mật khẩu</span>
              </div>
            </a-menu-item>

            <a-menu-item @click="signOut">
              <div class="flex items-center">
                <logout-outlined />
                <span class="ml-2">Đăng xuất</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <ChangePassword ref="changePasswordComponentRef" />
</template>

<style scoped lang="scss"></style>
