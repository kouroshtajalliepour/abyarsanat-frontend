<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import { useNotificationStore } from "@/store/notification";
import ReusableMyInputsText from "@/components/reusable/myInputs/text.vue";

// * props and emits
const props = defineProps<{
  user: any;
}>();
const emit = defineEmits(["submit"]);

// * composables
const userStore = useUserAuthStore();
const notificationStore = useNotificationStore();
const { validateEmail } = useValidators();
const { t } = useI18n();

// * store data
const { notifyClass, notifyTitle } = storeToRefs(notificationStore);

// * functions
async function update() {
  try {
    if (!props.user.first_name || !props.user.last_name) {
      notifyClass.value = "error";
      notifyTitle.value = "useCases.errors.general.allFieldsAreRequired";
      return;
    }

    if (props.user.email) {
      try {
        validateEmail(props.user.email);
      } catch (error) {
        notifyClass.value = "error";
        notifyTitle.value = "useCases.errors.general.invalidEmail";
        return;
      }
    }

    await userStore.update({
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
    });

    emit("submit");

    notifyClass.value = "success";
    notifyTitle.value = "pages.notifications.user.updated";
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
  }
}
</script>

<template>
  <form
    @submit.prevent="update"
    v-if="user"
    :state="user"
    class="user-update-basic-fields-form-wrapper"
  >
    <div class="form-fields">
      <label for="first_name">{{ t("entities.fields.first_name") }}</label>
      <ReusableMyInputsText
        type="text"
        id="first_name"
        autocomplete="given-name"
        inputmode="text"
        v-model="user.first_name"
      />
    </div>
    <div class="form-fields">
      <label for="last_name">{{ t("entities.fields.last_name") }}</label>
      <ReusableMyInputsText
        type="text"
        id="last_name"
        autocomplete="family-name"
        inputmode="text"
        v-model="user.last_name"
      />
    </div>
    <div class="form-fields">
      <label for="email">{{ t("entities.fields.email") }}</label>
      <ReusableMyInputsText
        type="text"
        id="email"
        dir="ltr"
        autocomplete="email"
        inputmode="email"
        v-model="user.email"
      />
    </div>
    <div class="form-submit-wrapper">
      <input
        class="form-submit-button"
        :value="t('entities.fields.submit_info')"
        type="submit"
      />
    </div>
  </form>
</template>
