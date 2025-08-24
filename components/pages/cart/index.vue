<script lang="ts" setup>
// * imports
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/user/cart";
import { useUserAuthStore } from "@/store/user/auth";
import { useUserAddressStore } from "@/store/user/address";
import { usePageStore } from "@/store/page";
import { useNotificationStore } from "@/store/notification";
import ModalGroupsAddressManagement from "@/components/modalGroups/addressManagement.vue";
import ReusableMyModal from "@/components/reusable/myModal/index.vue";
import ReusableMyModalHeaderDefault from "@/components/reusable/myModal/header/default.vue";
import ReusableMyModalHeaderNavigation from "@/components/reusable/myModal/header/navigation.vue";
import ReusableMyModalBodyDefault from "@/components/reusable/myModal/body/default.vue";
import ReusableMyModalFooterSubmitButton from "@/components/reusable/myModal/footer/submitButton.vue";
import SvgActiveEdit from "@/components/Svg/activeEdit.vue";
import SvgEdit from "@/components/Svg/edit.vue";
import SvgPlus from "@/components/Svg/plus.vue";
import SvgArrowRight from "@/components/Svg/arrowRight.vue";
import LayoutsCartNav from "@/components/layouts/cartNav.vue";
import ReusableMyCurrency from "@/components/reusable/myCurrency.vue";
// import PagesUserModulesAddressManagementPageNoAddressFound from "@/components/pages/user/modules/addressManagementPage/noAddressFound.vue";
import PagesCartItems from "./items.vue";
import PagesCartEmptyCart from "./emptyCart.vue";
// * composables
const { t, locale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserAuthStore();
const cartStore = useCartStore();
const pageStore = usePageStore();
const userAddressStore = useUserAddressStore();
const notificationStore = useNotificationStore();
const { calculateShipmentPrice } = useSend();
const { sanitizePrice } = useProduct();
const {
  public: { useShipmentMethod },
} = useRuntimeConfig();

// * store data
const {
  cartItems,
  fetchedCartItems,
  appliedPromotion,
  promotionSlug,
  cartData,
} = storeToRefs(cartStore);
const { user, authToken } = storeToRefs(userStore);
const { info } = storeToRefs(pageStore);
const { multiData: userAddresses } = storeToRefs(userAddressStore);
const { notifyClass, notifyTitle } = storeToRefs(notificationStore);

// * page data
const addressSelection = ref(false);
const selectedAddress = ref("");
const shipmentInfoModalIsOpen = ref(false);
const modalPageLoading = ref(false);
const submitModalIsOpen = ref(false);
const addressesModalRef = ref(null) as any;
const addressManagement = ref(null) as any;
const cartStageTitles = ref([t("pages.cart.choose_address")]);
if (useShipmentMethod) {
  cartStageTitles.value.push(t("pages.cart.choose_shipment"));
}
const cartStage = ref(0);
const fullSelectedAddress = ref({}) as any;
const selectedShipment = ref("iranPost");

// * computed data

const unavailableIndexes = computed(() => {
  if (selectedAddress.value) {
    return [];
  } else {
    return [1];
  }
});
const selectedAddressInfo = computed(() => {
  if (fullSelectedAddress.value?.name) {
    return t("pages.cart.selectedAddressPreview", {
      name: fullSelectedAddress.value?.name,
      full_address: fullSelectedAddress.value?.full_address,
      city_name: fullSelectedAddress.value?.city_name,
    });
  } else {
    return "";
  }
});

// const shipmentInfo = computed(() => {
//   if (!useShipmentMethod) return null;
//   return fullSelectedAddress.value?.province_id
//     ? calculateShipmentPrice({
//         province_id: fullSelectedAddress.value?.province_id,
//         city_id: fullSelectedAddress.value?.city_id,
//         totalWeight: cartData.value?.total_weight,
//       })
//     : null;
// });

// * watchers
watch(
  () => submitModalIsOpen.value,
  () => {
    if (submitModalIsOpen.value) {
      fetchUserAddresses();
    } else {
      selectedAddress.value = "";
    }
  }
);
watch(
  () => selectedAddress.value,
  () => {
    try {
      if (selectedAddress.value) {
        const address = userAddresses.value.filter((address: any) => {
          return address.id === selectedAddress.value;
        })[0];
        fullSelectedAddress.value = address;
        if (address) {
          if (!address?.city_id || !address?.province_id) {
            addressManagement.value.triggerAddressUpdate(address);
            selectedAddress.value = "";
            notifyClass.value = "error";
            notifyTitle.value = "pages.notifications.cart.invalidCity";
          } else {
            if (useShipmentMethod) {
              navigateToShipment();
              return;
            }
          }
        }
      }
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
    }
  }
);

// * hooks

onMounted(() => {
  cartStage.value = 0;
});
onUpdated(() => {
  cartStage.value = 0;
});

// * cart functions
function increase(model_id: string) {
  cartStore.increaseItemQuantityFromCart(model_id);
}
function decay(model_id: string) {
  cartStore.decayItemQuantityFromCart(model_id);
}
function updateQuantity(data: any) {
  cartStore.updateQuantity(data);
}

// * user address functions
function triggerAddressUpdate(event: any, address: any) {
  event.preventDefault();
  addressManagement.value?.triggerAddressUpdate(address);
}

async function fetchUserAddresses() {
  try {
    notifyClass.value = "warning";
    notifyTitle.value = "pages.cart.shipmentHint3";
    modalPageLoading.value = true;
    if (!authToken.value || !user.value) {
      navigateTo(localePath("/user/login?callBack=/cart"));
      return;
    }
    await userAddressStore.getMultiData({
      lang: locale.value,
      dataResult: "result",
      dataCountResult: "totalCount",
      preDefined: {},
      url: "/user/address",
      query: {},
      pageSize: 20,
      keepOldData: false,
    });
    addressSelection.value = true;
  } catch (error) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
  } finally {
    modalPageLoading.value = false;
  }
}

// * checkout function
async function goToCheckoutPage() {
  try {
    if (addressSelection.value) {
      if (!selectedAddress.value) {
        notifyClass.value = "error";
        notifyTitle.value = "pages.cart.address_error";
        return;
      } else if (cartStage.value == 0 && useShipmentMethod) {
        navigateToShipment();
        return;
      }

      if (!selectedShipment.value && useShipmentMethod) {
        notifyClass.value = "error";
        notifyTitle.value = "pages.cart.shipment_error";
        return;
      }

      await cartStore.checkout({
        selectedAddress: selectedAddress.value,
        selectedShipment: selectedShipment.value,
        promotion_code:
          appliedPromotion.value && promotionSlug.value
            ? promotionSlug.value.toLowerCase()
            : undefined,
      });
    }
  } catch (error: any) {
    submitModalIsOpen.value = false;
    if (error.message == "useCases.errors.payment.invalidCartItem") {
      await pageStore.getData({
        url: "cart",
        query: "",
        lang: "fa",
        dataResult: "",
      });
      notifyClass.value = "error";
      notifyTitle.value = "pages.notifications.cart.updated";
    } else {
      notifyClass.value = "error";
      notifyTitle.value = error.message;
    }
  }
}
function navigateIfAlreadySelected(addressId: string) {
  if (selectedAddress.value === addressId && useShipmentMethod) {
    navigateToShipment();
  }
}
function selectNewAddress() {
  addressesModalRef.value.$el.scrollTop = 0;
  selectedAddress.value = userAddresses.value[0].id;
}
async function navigateToShipment() {
  try {
    modalPageLoading.value = true;
    await cartStore.fetchShipmentInfo({
      provinceId: fullSelectedAddress.value?.province_id,
      cityId: fullSelectedAddress.value?.city_id,
      locale: locale.value,
    });
    cartStage.value++;
  } catch (error: any) {
    notifyClass.value = "error";
    notifyTitle.value = "useCases.errors.general.unExpected";
  } finally {
    modalPageLoading.value = false;
  }
}
</script>

<template>
  <!-- modals -->
  <ModalGroupsAddressManagement
    :user="user"
    @afterAddressCreated="selectNewAddress"
    ref="addressManagement"
  />
  <ReusableMyModal
    v-model="shipmentInfoModalIsOpen"
    class="app-default-modal-wrapper info-modal"
  >
    <ReusableMyModalHeaderDefault
      :title="t('pages.cart.shipmentPrice')"
      @close="shipmentInfoModalIsOpen = false"
    />
    <ReusableMyModalBodyDefault>
      <div class="shipment-info">{{ info.shipment_description }}</div>
    </ReusableMyModalBodyDefault>
  </ReusableMyModal>
  <ReusableMyModal
    v-model="submitModalIsOpen"
    class="app-default-modal-wrapper cart-address-management-modal-wrapper"
  >
    <ReusableMyModalHeaderNavigation
      :titles="cartStageTitles"
      :unavailableIndexes="unavailableIndexes"
      v-model="cartStage"
      @close="submitModalIsOpen = false"
    />
    <!-- <ReusableMyModalHeaderDefault
      :title="t('pages.cart.choose_address')"
      @close="submitModalIsOpen = false"
    >
      <button
        class="add-address-button"
        :disabled="userAddresses && userAddresses.length > 19 ? true : false"
        @click="addressManagement.openCreateModal()"
        type="button"
        :name="t('pages.cart.addAddress')"
      >
        {{ t("pages.cart.addAddress") }}
      </button>
    </ReusableMyModalHeaderDefault> -->
    <div class="modal-page-wrapper">
      <div
        :class="[
          'modal-page default-modal-page',
          cartStage != 0 ? 'close-modal-page' : '',
        ]"
      >
        <ReusableMyModalBodyDefault :loading="modalPageLoading" ref="addressesModalRef">
          <button
            :disabled="userAddresses && userAddresses.length > 19 ? true : false"
            @click="addressManagement.openCreateModal()"
            type="button"
            :name="t('pages.cart.addAddress')"
            class="user-address-input"
          >
            <div :class="['user-address-radio-input-element']"></div>
            <div class="user-address-input-data">
              <p>{{ t("pages.cart.addAddress") }}</p>
              <div class="user-address-input-controls-wrapper plus-icon">
                <SvgPlus class="active-icon" />
                <SvgPlus class="passive-icon" />
              </div>
            </div>
          </button>
          <div v-if="userAddresses && userAddresses.length">
            <label
              v-for="address in userAddresses"
              :key="address.id"
              :class="[
                'user-address-input',
                address.id === selectedAddress ? 'active' : '',
              ]"
              @click.self="navigateIfAlreadySelected(address.id)"
            >
              <input
                class="user-address-radio-input-element-hidden"
                type="radio"
                :value="address.id"
                v-model="selectedAddress"
              />
              <div
                :class="[
                  'user-address-radio-input-element',
                  address.id === selectedAddress ? 'active' : '',
                ]"
                @click="navigateIfAlreadySelected(address.id)"
              ></div>
              <div
                class="user-address-input-data"
                @click="navigateIfAlreadySelected(address.id)"
              >
                <p>
                  <span>{{ t("entities.fields.title") }}:</span>{{ address.name }}
                </p>
                <p>{{ address.full_address }}</p>
                <p>
                  <span>{{ t("entities.fields.city_name") }}:</span
                  >{{ address.city_name }}
                </p>
                <p>
                  <span>{{ t("entities.fields.postal_code") }}:</span
                  >{{ address.postal_code }}
                </p>
                <p>
                  <span>{{ t("entities.fields.phone_number") }}:</span
                  >{{ address.recipient_phone_number }}
                </p>
                <p>
                  <span>{{ t("pages.user.receiver") }}:</span
                  >{{ address.recipient_first_name }} {{ address.recipient_last_name }}
                </p>
              </div>
              <div
                @click="triggerAddressUpdate($event, address)"
                class="user-address-input-controls-wrapper"
              >
                <SvgActiveEdit class="active-icon" />
                <SvgEdit class="passive-icon" />
              </div>
            </label>
          </div>
          <!-- <PagesUserModulesAddressManagementPageNoAddressFound v-else /> -->
        </ReusableMyModalBodyDefault>
      </div>
      <div :class="['modal-page address-page', cartStage == 1 ? 'open-modal-page' : '']">
        <ReusableMyModalBodyDefault>
          <div class="back-input" @click="cartStage--">
            <SvgArrowRight />
            <p>{{ t("pages.cart.changeAddress") }}</p>
          </div>

          <div class="selected-address-preview">
            <p>{{ selectedAddressInfo }}</p>
          </div>
          <div
            v-if="cartData?.shipmentInfo && Object.keys(cartData.shipmentInfo).length"
            class="shipment-address-inputs-wrapper"
          >
            <label
              v-for="shipmentType in Object.keys(cartData.shipmentInfo)"
              :class="[
                'shipment-address-input',
                selectedShipment === shipmentType ? 'active' : '',
                cartData.shipmentInfo[shipmentType] == 0 ||
                cartData.shipmentInfo[shipmentType]
                  ? ''
                  : 'disabled',
              ]"
              :for="shipmentType"
            >
              <input
                class="shipment-address-radio-input-element-hidden"
                type="radio"
                :value="shipmentType"
                :id="shipmentType"
                v-model="selectedShipment"
                :disabled="
                  !cartData.shipmentInfo[shipmentType] &&
                  cartData.shipmentInfo[shipmentType] != 0
                "
              />
              <div class="shipment-address-input-data">
                <div class="shipment-address-radio-input-element"></div>
                <div class="content-wrapper">
                  <div class="image-wrapper">
                    <img :src="`/images/${shipmentType}.png`" class="image-element" />
                  </div>
                  <h3 class="content-title">
                    {{ t(`pages.cart.shipmentMethods.${shipmentType}.title`) }}
                  </h3>
                  <p class="content-description">
                    {{ t(`pages.cart.shipmentMethods.${shipmentType}.description`) }}
                  </p>
                </div>

                <div
                  v-if="cartData.shipmentInfo[shipmentType]"
                  class="shipment-final-price-wrapper"
                >
                  {{ sanitizePrice(cartData.shipmentInfo[shipmentType]) }}
                  <ReusableMyCurrency />
                </div>
                <div
                  v-else-if="cartData.shipmentInfo[shipmentType] == 0"
                  class="shipment-final-price-wrapper"
                >
                  {{ t("pages.products.postShipment") }}
                </div>
                <div v-else class="shipment-final-price-wrapper">
                  {{ t("pages.products.unavailable") }}
                </div>
              </div>
            </label>
            <!-- <label
              :class="[
                'shipment-address-input',
                selectedShipment === 'chapar' ? 'active' : '',
                cartData.shipmentInfo?.chapar ? '' : 'disabled',
              ]"
              for="chapar"
            >
              <input
                class="shipment-address-radio-input-element-hidden"
                type="radio"
                value="chapar"
                id="chapar"
                v-model="selectedShipment"
                :disabled="!cartData.shipmentInfo?.chapar"
              />
              <div class="shipment-address-input-data">
                <div class="shipment-address-radio-input-element"></div>
                <div class="content-wrapper">
                  <div class="image-wrapper">
                    <img src="/images/chapar.png" class="image-element" />
                  </div>
                  <h3 class="content-title">
                    {{ t("pages.cart.shipmentMethods.chapar.title") }}
                  </h3>
                  <p class="content-description">
                    {{ t("pages.cart.shipmentMethods.chapar.description") }}
                  </p>
                </div>
                <div
                  v-if="cartData.shipmentInfo?.chapar"
                  class="shipment-final-price-wrapper"
                >
                  {{ sanitizePrice(cartData.shipmentInfo?.chapar) }}
                  <ReusableMyCurrency />
                </div>
                <div
                  v-else-if="cartData.shipmentInfo?.chapar == 0"
                  class="shipment-final-price-wrapper"
                >
                  {{ t("pages.products.postShipment") }}
                </div>
                <div v-else class="shipment-final-price-wrapper">
                  {{ t("pages.products.unavailable") }}
                </div>
              </div>
            </label> -->
          </div>

          <p class="hint-for-shipment">
            {{ t("pages.cart.shipmentHint1") }}
          </p>
          <p class="hint-for-shipment red">
            {{ t("pages.cart.shipmentHint2") }}
          </p>
        </ReusableMyModalBodyDefault>
      </div>
    </div>
    <ReusableMyModalFooterSubmitButton
      :title="t('pages.cart.checkout')"
      error="test"
      :disabled="!selectedAddress"
      @submit="goToCheckoutPage()"
    />
  </ReusableMyModal>

  <!-- page -->
  <div v-if="cartItems && cartItems?.length" class="cart-page-wrapper">
    <LayoutsCartNav
      @toggleShipmentInfo="shipmentInfoModalIsOpen = true"
      @submit="submitModalIsOpen = true"
    />
    <div class="cart-main-page-wrapper">
      <!-- <header class="cart-page-header">
        <ul class="cart-page-header-list">
          <li class="cart-page-header-list-item name">
            {{ t("entities.fields.product_name") }}
          </li>
          <li class="cart-page-header-list-item price">
            {{ t("entities.fields.price") }}
          </li>
          <li class="cart-page-header-list-item price-and-quantity">
            {{ t("entities.fields.price_quantity") }}
          </li>
          <li class="cart-page-header-list-item quantity">
            {{ t("entities.fields.quantity") }}
          </li>
          <li class="cart-page-header-list-item total">
            {{ t("entities.fields.total") }}
          </li>
        </ul>
      </header> -->
      <PagesCartItems
        :cartItems="fetchedCartItems"
        @increase="increase"
        @decay="decay"
        @updateQuantity="updateQuantity"
      />
    </div>
  </div>
  <PagesCartEmptyCart v-else />
</template>

<style lang="scss">
.cart-main-page-wrapper {
  width: 100%;
  .cart-page-header {
    padding: 0 20px;
    margin: 20px 0;
    position: sticky;
    border: 1px solid $border-color;
    border-radius: 10px;
    top: $top-of-the-window-xs;
    background-color: white;
    z-index: 2;
    .cart-page-header-list {
      display: flex;
      .cart-page-header-list-item {
        padding: 10px 8px;
        font-size: 0.9em;
        &.name {
          flex-basis: 35%;
        }
        &.price-and-quantity {
          flex-basis: 40%;
        }
        &.total {
          flex-basis: 25%;
        }
        &.price {
          display: none;
        }
        &.quantity {
          display: none;
        }
      }
    }
  }

  @include lg {
    .cart-page-header {
      top: calc($top-of-the-window-lg + 5px);
      padding: 0 30px;
      margin-top: 0;
      &::before {
        content: "";
        top: -6px;
        width: 100%;
        height: 5px;
        background-color: white;
        position: absolute;
        right: 0;
      }
      .cart-page-header-list {
        .cart-page-header-list-item {
          text-align: center;
          &.name {
            flex-basis: 30%;
            text-align: start;
          }
          &.price-and-quantity {
            display: none;
          }
          &.total {
            flex-basis: 20%;
          }
          &.price {
            display: block;
            flex-basis: 24%;
          }
          &.quantity {
            display: block;
            flex-basis: 26%;
          }
        }
      }
    }
  }
}
.cart-page-wrapper {
  overflow: revert;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  min-height: $full-window-lg;

  @include lg {
    padding-top: 10px;
    padding: 25px;
    flex-direction: row;
    gap: 20px;
  }
}
.cart-address-management-modal-wrapper {
  .modal-page-wrapper {
    height: calc(100% - 62px - 62px);
    position: relative;
    overflow: hidden;
    .modal-page {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      width: 100%;
      height: 100%;
      transform: translateX(calc(-100% - 125px));
      transition: transform 0.3s ease-out;
      position: absolute;
      top: 0px;
      &.default-modal-page {
        transform: translateX(0%);
      }
      &.close-modal-page {
        transform: translateX(calc(100% + 125px));
      }
      &.open-modal-page {
        transform: translateX(0%);
      }
      .back-input {
        display: flex;
        align-items: center;
        font-size: 0.8em;
        cursor: pointer;
        svg {
          margin-left: 5px;
          width: 18px;
          height: 18px;
        }
      }
      .selected-address-preview {
        margin: 10px;
        font-size: 0.9em;
      }
    }
  }
  .modal-body {
    height: 100%;
  }
  .add-address-button {
    padding: 5px;
    border: 1px solid $secondary;
    margin: 0 10px;
    border-radius: 5px;
    color: $secondary;
    background: white;
    cursor: pointer;
    &:hover {
      color: white;
      background: $secondary;
    }
    &:disabled {
      color: white;
      background-color: $gray-bg;
      border-color: $gray-bg;
    }
  }
  .shipment-address-inputs-wrapper {
    margin: 40px 10px;
    .shipment-address-input {
      width: 100%;
      display: flex;
      gap: 15px;
      padding: 10px;
      position: relative;
      justify-content: center;
      margin: 5px 0;
      cursor: pointer;
      .passive-icon,
      .active-icon {
        color: black;
        height: 24px;
        width: 24px;
        cursor: pointer;
      }
      .active-icon {
        display: none;
      }
      .shipment-address-radio-input-element-hidden {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .shipment-address-radio-input-element {
        width: 20px !important;
        height: 20px !important;
        border: 2.5px solid #e0e0e2;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 10px);
        // top: 50%;
        right: -25px;
        @include md {
          right: -30px;
        }
      }
      .shipment-address-input-controls-wrapper {
        width: 24px;
        position: absolute;
        top: 25px;
        left: 25px;
        cursor: pointer;
        &:hover {
          .passive-icon {
            display: none;
          }
          .active-icon {
            display: block;
            color: $primary;
          }
        }
      }

      .shipment-address-input-data {
        display: flex;
        width: 100%;
        // flex-direction: column;
        align-items: flex-start;
        // padding: 10px 15px;
        border: 3.5px solid #e0e0e2;
        border-radius: 0 40px 40px 0;
        gap: 10px;
        height: 110px;
        position: relative;
        max-width: 500px;

        .content-wrapper {
          width: 70%;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 25px;
          position: relative;
          .image-wrapper {
            width: 40%;
            display: flex;
            justify-content: center;
            height: 50px;
            .image-element {
              height: auto;
              width: 100%;
            }
          }
          .shipment-icon {
            height: auto;
            width: 25%;
            margin-left: 10px;
          }
          .content-title {
            position: absolute;
            right: 50%;
            font-size: 1.1em;
          }
          .content-description {
            font-size: 0.7em;
            color: $primary;
            position: absolute;
            right: 50%;
            bottom: 5px;
          }
          // height: 100%;
        }
        .shipment-final-price-wrapper {
          width: 30%;
          height: 100%;
          border-right: 3px solid #e0e0e2;
          display: flex;
          font-size: 0.9em;
          justify-content: center;
          align-items: center;
          position: relative;
          .currency {
            position: absolute;
            right: calc(50% - 17px);
            top: calc(50% + 12px);
          }
          &.has-price {
            font-size: 1.3em;
            .shipment-currency {
              position: static;
              // bottom: 20px;
              // left: calc(50% - 3);
              // width: 30px;
            }
          }
          @include md {
            font-size: 1em;
            .currency {
              position: static;
            }
          }
        }
        &.main-box {
          // background-color: $primary !important;
          border-color: black;
          .shipment-final-price-wrapper {
            border-color: black;
          }
        }
        // p {
        //   font-size: 15px;
        //   display: flex;
        //   gap: 5px;
        //   span {
        //     font-size: 13px;
        //     color: $gray-title;
        //   }
        // }
      }
      &.active,
      &:hover {
        border-radius: 10px;
        .shipment-address-input-data {
          background-color: #fafaff !important;
          border-color: $primary !important;
          .shipment-final-price-wrapper {
            border-color: $primary !important;
          }
        }
        .shipment-address-input-controls-wrapper {
          .shipment-address-radio-input-element {
            border-color: $primary;
          }
        }
        .shipment-address-radio-input-element {
          background-color: $primary !important;
          width: 20px;
          height: 20px;
        }
        .shipment-address-input-data {
          background: $gray-bg;
          // svg {
          //   // fill: $primary;

          // }
        }
      }
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        .shipment-address-input-data {
          background-color: #fafaff !important;
          border-color: #fafaff !important;
          .shipment-final-price-wrapper {
            border-color: #fafaff !important;
          }
        }
        .shipment-address-input-controls-wrapper {
          .shipment-address-radio-input-element {
            border-color: #fafaff;
          }
        }
        .shipment-address-radio-input-element {
          background-color: #fafaff !important;
          width: 20px;
          height: 20px;
        }
        .shipment-address-input-data {
          background: $gray-bg;
          // svg {
          //   // fill: $primary;

          // }
        }
      }
    }
  }

  .hint-for-shipment {
    font-size: 0.9em;
    // right: 50%;
    // width: 100%;
    text-align: center;
    margin: 10px 20px;
    bottom: 15%;
    &.red {
      bottom: calc(15% - 50px);
      color: red;
    }
  }
}
.upper-level-modal {
  z-index: 10;
}

.user-address-input {
  width: 100%;
  display: flex;
  // gap: 15px;
  padding: 10px;
  position: relative;
  margin: 5px 0;
  cursor: pointer;
  .passive-icon,
  .active-icon {
    color: black;
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
  .active-icon {
    display: none;
  }
  &.active,
  &:hover {
    background: $gray-bg;
    border-radius: 10px;
  }
  .user-address-radio-input-element-hidden {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .user-address-radio-input-element {
    width: 20px;
    height: 20px;
    border: 2px solid $border-color;
    margin-left: 15px;
    border-radius: 50%;
    position: relative;
    // &::after {
    //   content: "";
    //   position: absolute;
    //   top: 1px;
    //   right: 1px;
    //   width: 16px !important;
    //   height: 16px !important;
    //   // border-radius: 50%;
    // }
    &.active {
      background-color: $primary;
      // &::after {
      //   width: 20px;
      //   height: 20px;
      // }
    }
  }
  .user-address-input-controls-wrapper {
    width: 24px;
    position: absolute;
    top: 25px;
    left: 25px;
    cursor: pointer;
    &.plus-icon {
      top: calc(50% - 12px);
      left: 25px;
    }
    &:hover {
      .passive-icon {
        display: none;
      }
      .active-icon {
        display: block;
        color: $primary;
      }
    }
  }
  .user-address-input-data {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 15px;
    border: 1px solid $border-color;
    border-radius: 10px;
    gap: 10px;
    p {
      font-size: 15px;
      display: flex;
      gap: 5px;
      span {
        font-size: 13px;
        color: $gray-title;
      }
    }
  }
}

// .addressError {
//   padding: 0 20px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   height: 41px;
//   width: 100%;
//   p {
//     color: $danger;
//     font-size: 14px;
//   }
// }
</style>
