<script lang="ts" setup>
// * imports
import ReusableMyInputsText from "@/components/reusable/myInputs/text.vue";
import ReusableMyInputsSelect from "@/components/reusable/myInputs/select.vue";
// * composables
const { t } = useI18n();
const { provinces, getCityProvinces, getProvinceName, getCityName } = useSend();

// * props & emits
const props = defineProps<{
  user: any;
  userAddress: any;
}>();
const emit = defineEmits(["formSubmit", "closeForm"]);

// * data
const provinceSelect = ref(null) as any;
const citySelect = ref(null) as any;

// * watchers
watch(
  () => provinceSelect.value?.inputSelectIsActive,
  () => {
    if (provinceSelect.value.inputSelectIsActive) {
      citySelect.value?.close();
    }
  }
);
watch(
  () => props.userAddress?.province_id,
  (newValue, oldValue) => {
    if (oldValue !== newValue) {
      props.userAddress.city_id = "";
      props.userAddress.province_name = getProvinceName(newValue);
    }
  }
);
watch(
  () => props.userAddress?.city_id,
  () => {
    props.userAddress.city_name = !props.userAddress.city_id
      ? ""
      : getCityName(props.userAddress.city_id);
  }
);

// * computed data
const recipientIsUser = computed(() => {
  return (
    props.user.first_name == props.userAddress.recipient_first_name &&
    props.user.last_name == props.userAddress.recipient_last_name &&
    props.user.phone_number == props.userAddress.recipient_phone_number
  );
});

// * functions
function makeUserRecipient() {
  props.userAddress.recipient_first_name = props.user.first_name;
  props.userAddress.recipient_last_name = props.user.last_name;
  props.userAddress.recipient_phone_number = props.user.phone_number;
}
function addRecipient() {
  props.userAddress.recipient_first_name = "";
  props.userAddress.recipient_last_name = "";
  props.userAddress.recipient_phone_number = "";
}
</script>

<template>
  <div>
    <form
      @submit.prevent="emit('formSubmit')"
      :state="userAddress"
      class="space-y-4"
      v-if="userAddress"
    >
      <div class="form-fields">
        <label for="address_name">{{ t("entities.fields.title") }}</label>
        <ReusableMyInputsText
          type="text"
          id="address_name"
          :placeholder="t('pages.userAddresses.nameExample')"
          autocomplete="off"
          inputmode="text"
          v-model="userAddress.name"
        />
      </div>
      <div class="form-fields-container">
        <div class="form-fields">
          <label for="province_name">{{ t("entities.fields.province_name") }}</label>

          <!-- <pre>{{ provinces }}</pre> -->
          <ReusableMyInputsSelect
            class="user-address-select"
            ref="provinceSelect"
            v-model="userAddress.province_id"
            :options="provinces"
            :maxHeight="220"
            searchAble
            :optionsAsObject="{
              key: 'provinceId',
              value: 'provinceName',
            }"
          />
        </div>
        <div class="form-fields">
          <label for="city_name">{{ t("entities.fields.city_name") }}</label>
          <ReusableMyInputsSelect
            class="user-address-select"
            ref="citySelect"
            v-if="userAddress.province_id"
            v-model="userAddress.city_id"
            :options="getCityProvinces(userAddress.province_id)"
            :maxHeight="220"
            searchAble
            :optionsAsObject="{
              key: 'cityId',
              value: 'cityName',
            }"
          />
        </div>
      </div>
      <div class="form-fields">
        <label for="full_address">{{ t("entities.fields.full_address") }}</label>
        <textarea
          rows=""
          cols=""
          autocomplete="off"
          id="full_address"
          v-model="userAddress.full_address"
        ></textarea>
      </div>
      <div class="form-fields-container">
        <div class="form-fields">
          <label for="building_number">{{ t("entities.fields.building_number") }}</label>
          <ReusableMyInputsText
            type="text"
            id="building_number"
            inputmode="text"
            v-model="userAddress.building_number"
          />
        </div>
        <div class="form-fields">
          <label for="building_unit">{{ t("entities.fields.building_unit") }}</label>
          <ReusableMyInputsText
            type="text"
            id="building_unit"
            autocomplete="address-level3"
            inputmode="text"
            v-model="userAddress.building_unit"
          />
        </div>
      </div>
      <div class="form-fields">
        <label for="postal_code">{{ t("entities.fields.postal_code") }}</label>
        <ReusableMyInputsText
          type="text"
          id="postal_code"
          dir="ltr"
          autocomplete="address-level4"
          inputmode="numeric"
          v-model="userAddress.postal_code"
        />
      </div>
      <div class="choose-recipient">
        <h3 class="choose-recipient-title">{{ t("entities.fields.recipient") }} :</h3>
        <button
          :name="t('pages.user.receiver_isMe')"
          class="choose-recipient-button"
          :disabled="recipientIsUser"
          @click="makeUserRecipient"
          type="button"
        >
          {{ t("pages.user.receiver_isMe") }}
        </button>
        <button
          class="choose-recipient-button"
          :name="t('pages.user.receiver_isOthers')"
          :disabled="!recipientIsUser"
          @click="addRecipient"
          type="button"
        >
          {{ t("pages.user.receiver_isOthers") }}
        </button>
      </div>
      <div class="space-y-4" v-if="!recipientIsUser">
        <div class="flex items-center justify-between form-divider">
          <h3 class="text-base font-semibold leading-6 recipient-info">
            {{ t("entities.fields.recipient_info") }}
          </h3>
        </div>
        <div class="form-fields-container">
          <div class="form-fields">
            <label for="first_name">{{ t("entities.fields.first_name") }}</label>
            <ReusableMyInputsText
              type="text"
              id="first_name"
              autocomplete="given-name"
              inputmode="text"
              v-model="userAddress.recipient_first_name"
            />
          </div>
          <div class="form-fields">
            <label for="last_name">{{ t("entities.fields.last_name") }}</label>
            <ReusableMyInputsText
              type="text"
              id="last_name"
              autocomplete="family-name"
              inputmode="text"
              v-model="userAddress.recipient_last_name"
            />
          </div>
        </div>
        <div class="form-fields">
          <label for="phone_number">{{ t("entities.fields.phone_number") }}</label>
          <ReusableMyInputsText
            type="text"
            id="phone_number"
            autocomplete="tel"
            inputmode="tel"
            v-model="userAddress.recipient_phone_number"
          />
        </div>
      </div>
      <div class="form-submit-wrapper">
        <input
          type="submit"
          class="form-submit"
          :value="t('entities.fields.submit_info')"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.form-modal {
  direction: rtl;
  max-height: calc(100vh - 35px);
  overflow: auto !important;
  position: relative;
  display: block;
  @include lg {
    max-height: calc(100vh - 100px);
  }
  form {
    padding: 0 24px;
  }
}
.form-fields-container {
  display: flex;
  width: 100%;
  .form-fields {
    width: 50%;
  }
}
.form-fields {
  padding-bottom: 5px;
  margin: 0 2.5px;
  .user-address-select {
    .input-select-title {
      background-color: $optional-bg;
      border-color: $primary;
      p {
        font-size: 0.9em;
      }
      .arrow-down-icon {
        color: $primary;
      }
    }
    .input-select-options-wrapper {
      background-color: $optional-bg;
      border-color: $primary !important;
      .input-select-option {
        border-color: $primary;
      }
    }
  }
  label {
    color: $gray-subtitle !important ;
    font-size: 15px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 0.9em;
    padding: 5px 10px;
    border: 1px solid $primary !important;
    border-radius: 10px;
    background-color: $optional-bg;
    height: 40px;
    outline: none;
    width: 100%;
    &:focus {
      border: 1px solid $primary !important;
    }
  }
  textarea {
    min-height: 70px;
  }
}
.choose-recipient {
  display: flex;
  align-items: center;
  padding-top: 10px;
  margin-top: 25px !important;
}
.choose-recipient-title {
  font-size: 16px;
  color: $gray-subtitle;
  margin-left: 10px;
}
.choose-recipient-button {
  color: $primary;
  border: 1px solid $primary;
  padding: 2px 10px;
  margin-right: 10px;
  border-radius: 10px;
  &:disabled {
    background-color: $primary;
    color: white;
    background-color: $primary;
  }
  &:enabled {
    &:hover {
      color: white;
      background-color: $primary;
    }
  }
}
.form-submit {
  background-color: $primary;
  border: 1px solid $primary;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: $primary;
  }
}
</style>
