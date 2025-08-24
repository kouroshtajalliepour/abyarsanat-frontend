<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useUserAuthStore } from "@/store/user/auth";
import { useNotificationStore } from "@/store/notification";
import SvgLoading from "@/components/Svg/loading.vue";
import ChangeableIconsLogo from "@/components/changeableIcons/logo.vue";
import ReusableMyInputsText from "@/components/reusable/myInputs/text.vue";

// * composables
const userStore = useUserAuthStore();
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { validateIranianPhoneNumber, validateEmail } = useValidators();
const notificationStore = useNotificationStore();

// * store data
const { user, authToken } = storeToRefs(userStore);
const { notifyClass, notifyTitle } = storeToRefs(notificationStore);

// * page data
const authStatus = ref("initial");
const phone_number = ref("");
const information = ref({
  first_name: "",
  last_name: "",
  email: "",
});
const otpValue = ref("");
const loading = ref(false);
const timer = ref(120);
const interval = ref(null) as any;

// * watchers

watch(
  () => otpValue.value,
  () => {
    if (otpValue.value.length == 6) {
      authenticate();
    }
  }
);

// * functions

function editPhoneNumber() {
  authStatus.value = "initial";
}
async function askForOtp() {
  loading.value = true;

  try {
    await userStore.askForOtp();
    startTimer();
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
    throw error;
  }
  loading.value = false;
}

function startTimer() {
  timer.value = 120;
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    if (timer.value) {
      timer.value--;
    } else {
      clearInterval(interval.value);
    }
  }, 1000);
}
function formatTimer(time: number) {
  let min = 0;
  let sec = 0;

  while (time > 59) {
    min++;
    time = time - 60;
  }

  if (time) {
    sec = time;
  }

  return `${sec > 9 ? "" : "0"}${sec} : 0${min}`;
}

async function updateInformation() {
  loading.value = true;

  const { first_name, last_name, email } = information.value;

  if (!first_name) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.allFieldsAreRequired";
    loading.value = false;
    return;
  }
  if (!last_name) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.allFieldsAreRequired";
    loading.value = false;
    return;
  }
  if (email) {
    try {
      await validateEmail(email);
    } catch (error: any) {
      notifyClass.value = "error";
      notifyTitle.value = error.message;
      loading.value = false;
      return;
    }
  }

  const url =
    route.query?.callBack && !route.query?.callBack.includes("/user")
      ? route.query.callBack
      : "/";

  try {
    await userStore.updateBasicFields({
      first_name,
      last_name,
      email,
    });
    navigateTo(localePath(url.toString()));
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
    throw error;
  }
  loading.value = false;
}

async function authenticate() {
  const url =
    route.query?.callBack && !route.query?.callBack.includes("/user")
      ? route.query.callBack
      : "/";
  loading.value = true;

  try {
    await userStore.authenticate({
      otp: otpValue.value,
    });

    if (user.value.first_name && user.value.last_name) {
      navigateTo(localePath(url.toString()));
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response.status == 403) {
        notifyClass.value = "error";
        notifyTitle.value = "useCases.errors.general.invalidOtp";
      } else {
        notifyClass.value = "error";
        notifyTitle.value = "useCases.errors.general.otpTimeout";
      }
    } else {
      notifyClass.value = "error";
      notifyTitle.value = "useCases.errors.general.unExpected";
    }
  }
  loading.value = false;
}
async function askToConfirmOtp() {
  try {
    await askForOtp();
    authStatus.value = "otpConfirmation";
  } catch (error) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
  }
}
async function login() {
  loading.value = true;

  try {
    await validateIranianPhoneNumber(phone_number.value);
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = error.message;
    loading.value = false;
    return;
  }
  try {
    await userStore.login({
      phone_number: phone_number.value,
    });
    await askToConfirmOtp();
  } catch (error: any) {
    try {
      await userStore.signUp({
        phone_number: phone_number.value,
      });
      await userStore.login({
        phone_number: phone_number.value,
      });
      await askToConfirmOtp();
    } catch (error) {
      notifyClass.value = "error";
      notifyTitle.value = "useCases.errors.general.unExpected";
    }
  }
  loading.value = false;
}
</script>

<template>
  <div class="login-page-wrapper">
    <!-- todo test -->
    <div class="login-form-container">
      <div v-if="loading" class="loading-wrapper">
        <div class="loading-inner-wrapper">
          <SvgLoading />
          <h3>{{ t("pages.loading") }}</h3>
        </div>
      </div>
      <div>
        <NuxtLink
          :to="localePath('/')"
          class="login-logo"
          :aria-label="t('pages.links.home')"
        >
          <ChangeableIconsLogo index="5" class="logo-wrapper no-max-width" />
        </NuxtLink>
      </div>
      <div class="login-signUp-title">
        <h2>{{ t("buttons.login") }}</h2>
      </div>
      <div v-if="authToken && user && (!user.first_name || !user.last_name)">
        <form @submit.prevent="updateInformation()" class="phone-number-input">
          <label for="first_name">{{ t("entities.fields.first_name") }}</label>
          <ReusableMyInputsText
            type="text"
            id="first_name"
            inputmode="text"
            autocomplete="given-name"
            v-model="information.first_name"
          />
          <label for="last_name">{{ t("entities.fields.last_name") }}</label>
          <ReusableMyInputsText
            type="text"
            id="last_name"
            inputmode="text"
            autocomplete="family-name"
            v-model="information.last_name"
          />
          <label for="email">{{ t("entities.fields.email") }}</label>
          <ReusableMyInputsText
            type="text"
            dir="ltr"
            id="email"
            inputmode="email"
            autocomplete="email"
            v-model="information.email"
          />
          <input
            :disabled="loading"
            class="submit-button"
            type="submit"
            :value="t('buttons.enter')"
          />
        </form>
      </div>
      <div v-else-if="authStatus === 'initial'">
        <form @submit.prevent="login()" class="phone-number-input">
          <label for="phone_number">{{ t("pages.loginTerms.enterPhoneNumber") }}</label>
          <ReusableMyInputsText
            type="number"
            dir="ltr"
            id="phone_number"
            autocomplete="tel"
            inputmode="tel"
            v-model="phone_number"
          />
          <input
            :disabled="loading"
            class="submit-button"
            type="submit"
            :value="t('buttons.enter')"
          />
        </form>
      </div>
      <div v-else-if="authStatus === 'otpConfirmation'">
        <form @submit.prevent="authenticate()" class="phone-number-input">
          <label>{{
            t("pages.loginTerms.confirmOtp", { phoneNumber: phone_number })
          }}</label>
          <button
            :name="t('pages.loginTerms.editPhoneNumber')"
            class="edit-phone-number-button"
            @click="editPhoneNumber"
            type="button"
          >
            {{ t("pages.loginTerms.editPhoneNumber") }}
          </button>
          <ReusableMyInputsText
            type="number"
            id="otp_value"
            dir="ltr"
            autocomplete="one-time-code"
            inputmode="numeric"
            v-model="otpValue"
          />
          <button
            :name="t('pages.loginTerms.askForNewOtp')"
            v-if="!timer"
            class="ask-for-new-otp"
            @click="askForOtp"
            type="button"
          >
            {{ t("pages.loginTerms.askForNewOtp") }}
          </button>
          <p v-else class="count-down-for-ask-for-new-otp" type="button">
            {{
              t("pages.loginTerms.countDownForAskForNewOtp", {
                countDown: formatTimer(timer),
              })
            }}
          </p>
          <input
            :disabled="loading"
            class="submit-button"
            type="submit"
            :value="t('buttons.enter')"
          />
        </form>
      </div>
      <div v-else>{{ t("buttons.loading") }}</div>
      <div class="terms-conditions">
        <p>
          {{ t("pages.loginTerms.term") }}
          <NuxtLink :to="localePath('/terms')" :aria-label="t('pages.links.terms')">{{
            t("pages.terms.title")
          }}</NuxtLink>
          {{ t("pages.loginTerms.is") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    transition: all 0.3s ease-out;
  }
}

.login-form-container {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 32px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  .loading-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    backdrop-filter: blur(5px);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .loading-inner-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      svg {
        margin-bottom: 20px;
        width: 30px;
        height: 30px;
      }
      h3 {
        font-size: 1em;
      }
    }
  }

  .logo-wrapper {
    svg {
      height: 44px !important;
    }
  }

  .edit-phone-number-button {
    align-self: flex-start;
    font-size: 10px;
    color: $primary;
  }
  .otp-input-wrapper {
    margin-bottom: 20px;
  }
  .count-down-for-ask-for-new-otp,
  .ask-for-new-otp {
    font-size: 12px;
    text-align: center;
    color: $gray-subtitle;
  }

  .ask-for-new-otp {
    color: $primary;
  }

  .login-signUp-title {
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 19px;
    }
  }
  .phone-number-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    label {
      font-size: 12px;
      color: $subTitle-color;
    }
    .inputs {
      background-color: white;
      border: 1px solid $border-color;
      border-radius: 5px;
      padding: 8px 16px;
      width: 100%;
      &.ltr {
        direction: ltr;
      }
      &.rtl {
        direction: rtl;
      }
      &:focus {
        outline: unset;
        border: 2px solid $secondary;
      }
    }
  }
  .submit-button {
    width: 100%;
    padding: 12px 16px;
    margin-top: 20px;
    display: block;
    background-color: $primary;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .terms-conditions {
    p {
      font-size: 12px;
      color: $subTitle-color;
      a {
        color: $primary;
      }
    }
  }
}
</style>
