import messages from "./messages/yo.json"

export default defineI18nConfig(() => {
    return {
      legacy: false,
      locale: 'fa',
      messages
    }
})