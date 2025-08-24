import { defineStore } from 'pinia'


export const useNotificationStore = defineStore('notificationStore', () => {
    const notifyTitle = ref('')
    const notifyClass = ref('')
    return { 
        notifyTitle, notifyClass
    }
});