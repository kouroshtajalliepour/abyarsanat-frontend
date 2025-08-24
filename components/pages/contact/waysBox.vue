<script lang="ts" setup>
// * imports
import SvgContactAddress from "@/components/Svg/contact/address.vue";
import SvgContactPostalCode from "@/components/Svg/contact/postalCode.vue";
import SvgContactPhone from "@/components/Svg/contact/phone.vue";
import SvgContactEmail from "@/components/Svg/contact/email.vue";
import SvgContactClock from "@/components/Svg/contact/clock.vue";
import PagesContactMap from "./map.vue";
// * props
defineProps<{
  address?: string;
  postalCode?: string;
  salesNumber?: string;
  supportNumber?: string;
  contactNumber?: string;
  email?: string;
  workingHour?: string;
}>();
// * composables
const { t } = useI18n();
</script>

<template>
  <div class="contact-ways-box-wrapper">
    <div class="contact-ways-box">
      <div v-if="address" class="contact-way address">
        <SvgContactAddress class="contact-icon" />
        <p class="contact-way-label">{{ address }}</p>
      </div>

      <div class="contact-way postal-code">
        <SvgContactPostalCode class="contact-icon" />
        <p class="contact-way-label">
          {{ t("entities.fields.postal_code") }}: {{ postalCode }}
        </p>
      </div>

      <div class="contact-way numbers">
        <SvgContactPhone class="contact-icon" />
        <a
          class="contact-way-link"
          :href="`tel:${salesNumber}`"
          :aria-label="t('pages.links.tel_sale')"
          >{{ t("pages.contact.labels.sales") }}: {{ salesNumber }}</a
        >
        <a
          class="contact-way-link"
          :href="`tel:${supportNumber}`"
          :aria-label="t('pages.links.tel_support')"
          >{{ t("pages.contact.labels.support") }}: {{ supportNumber }}</a
        >
        <a
          class="contact-way-link"
          :href="`tel:${contactNumber}`"
          :aria-label="t('pages.contact.labels.contact')"
        >
          {{ t("pages.contact.labels.contact") }}: {{ contactNumber }}
        </a>
      </div>

      <div class="contact-way email">
        <SvgContactEmail class="contact-icon" />
        <a
          class="contact-way-link"
          :href="`mailto:${email}`"
          :aria-label="t('pages.links.email')"
          >{{ email }}</a
        >
      </div>

      <div class="contact-way working-hour">
        <SvgContactClock class="contact-icon" />
        <p class="contact-way-label">
          {{ t("pages.contact.workingHour") }}: {{ workingHour }}
        </p>
      </div>
    </div>
    <PagesContactMap />
  </div>
</template>

<style lang="scss">
.contact-ways-box-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  .contact-ways-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid $primary;
    border-radius: 12px;
    padding: 40px 50px;
    text-align: center;
    height: 600px;

    .contact-way {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;

      .contact-icon {
        margin-bottom: 20px;
        path {
          fill: $primary;
        }
      }

      &:last-child {
        margin-bottom: 0px;
      }
      .contact-way-label {
        font-size: 15px;
      }
      .contact-way-link {
        font-size: 15px;
        color: black;
        font-weight: 400;
        text-decoration: underline;
      }
    }
  }

  .numbers {
    & a:nth-child(3) {
      margin: 20px 0px;
    }
  }
  @include lg {
    flex-direction: row;
    .contact-ways-box {
      width: 48%;
      padding: 30px 100px;
      .contact-way {
        margin-bottom: 30px;
        .contact-way-label {
          font-size: 18px;
        }
        .contact-way-link {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
