<script lang="ts" setup>
// * imports
import SvgActiveEdit from "@/components/Svg/activeEdit.vue";
import SvgEdit from "@/components/Svg/edit.vue";
import SvgActiveTrash from "@/components/Svg/activeTrash.vue";
import SvgTrash from "@/components/Svg/trash.vue";

// * props and emits
const props = defineProps<{
  userAddresses: any;
}>();
const emit = defineEmits(["openUpdateModal", "openDeleteModal"]);

// * composables
const { t } = useI18n();
</script>

<template>
  <div class="address-wrapper" v-for="userAddress in userAddresses">
    <div class="address-details">
      <p>
        <span>{{ t("entities.fields.title") }}:</span>{{ userAddress.name }}
      </p>
      <p>{{ userAddress.full_address }}</p>
      <p>
        <span>{{ t("entities.fields.city_name") }}:</span
        >{{ userAddress.province_name }} - {{ userAddress.city_name }}
      </p>
      <p>
        <span>{{ t("entities.fields.postal_code") }}:</span>{{ userAddress.postal_code }}
      </p>
      <p>
        <span>{{ t("entities.fields.phone_number") }}:</span
        >{{ userAddress.recipient_phone_number }}
      </p>
      <p>
        <span>{{ t("pages.user.receiver") }}:</span>{{ userAddress.recipient_first_name }}
        {{ userAddress.recipient_last_name }}
      </p>
    </div>
    <div class="address-edit-delete-wrapper">
      <div class="icon-wrapper" @click="emit('openUpdateModal', userAddress)">
        <SvgActiveEdit class="active-icon" />
        <SvgEdit class="passive-icon" />
      </div>
      <div @click="emit('openDeleteModal', userAddress)" class="icon-wrapper">
        <SvgActiveTrash class="active-icon" />
        <SvgTrash class="passive-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.address-wrapper {
  border: 1px solid $primary;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  .address-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    p {
      display: flex;
      align-items: center;
      gap: 5px;
      @include lg {
        font-size: 15px;
      }
    }
    span {
      color: $subTitle-color;
    }
    @include lg {
      padding: 20px 0;
      gap: 20px;
    }
  }
  .address-edit-delete-wrapper {
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
    .icon-wrapper {
      .active-icon,
      .passive-icon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        color: black;
      }
      .active-icon {
        display: none;
        color: $primary;
      }
      &:hover {
        .passive-icon {
          display: none;
        }
        .active-icon {
          display: block;
        }
      }
    }
  }
  @include lg {
    padding: 0 30px;
    .address-edit-delete-wrapper {
      top: 20px;
      left: 20px;
    }
  }
}
</style>
