<script setup lang="ts">
import { ref, reactive } from "vue";
import { message, Form } from "ant-design-vue";
import {
  requiredRule,
  minLengthRule,
  confirmPassword,
} from "../../utils/index";

// Handle Change Password
interface ChangePassFormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePassFormState = reactive<ChangePassFormState>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const onFinish = (values: any) => {
  message.success("Change password successfully", 3);
  visible.value = false;
  resetModal();
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  message.error("Đổi mật khẩu thất bại", 3);
  console.log("Failed:", errorInfo);
};

// Handle modal
const visible = ref<boolean>(false);
const showModalChangePassword = () => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
  resetModal();
};

defineExpose({
  showModalChangePassword,
});

// Reset modal
const formRef = ref<InstanceType<typeof Form> | null>(null);
const resetModal = () => {
  changePassFormState.oldPassword = "";
  changePassFormState.newPassword = "";
  changePassFormState.confirmPassword = "";
  if (formRef.value) {
    (formRef.value as any).clearValidate();
  }
};
</script>

<template>
  <a-modal
    v-model:open="visible"
    title="Change password"
    :okButtonProps="{ hidden: true }"
    :cancelButtonProps="{ hidden: true }"
    @cancel="resetModal"
    :footer="null"
  >
    <a-form
      :model="changePassFormState"
      ref="formRef"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="oldPassword"
        :rules="[requiredRule('old password', 'blur', 'string', false, true)]"
      >
        <label
          for="basic_oldPassword"
          class="font-medium inline-block my-1"
        >
          Old password <span class="text-red-500">*</span>
        </label>
        <a-input-password
          v-model:value="changePassFormState.oldPassword"
          placeholder="Old password..."
        />
      </a-form-item>

      <a-form-item
        name="newPassword"
        :rules="[
          requiredRule('new password', 'blur', 'string', false, true),
          minLengthRule('new password', 6, 'blur'),
        ]"
      >
        <label
          for="basic_newPassword"
          class="font-medium inline-block my-1"
        >
          New password <span class="text-red-500">*</span>
        </label>
        <a-input-password
          v-model:value="changePassFormState.newPassword"
          placeholder="New password..."
        />
      </a-form-item>

      <a-form-item
        name="confirmPassword"
        :rules="[
          confirmPassword(
            changePassFormState.newPassword,
            changePassFormState.confirmPassword,
            'blur',
          ),
        ]"
      >
        <label
          for="basic_confirmPassword"
          class="font-medium inline-block my-1"
        >
          Confirm new password <span class="text-red-500">*</span>
        </label>
        <a-input-password
          v-model:value="changePassFormState.confirmPassword"
          placeholder="Re-enter new password..."
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="w-full mt-5"
        >
          Save password
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="scss"></style>
