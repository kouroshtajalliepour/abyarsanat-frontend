import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore('userAuthStore', () => {

    const {public: {baseURL}} = useRuntimeConfig()


    const user = ref(null) as any;
    const authToken = ref(null) as any;
    const alreadyRunning = ref(false);
    const loginToken = ref(null) as any
    const otpToken = ref(null) as any;
    const userNavBarIsOpen = ref(true) as any;

    function setUser (User:any){
        user.value = User
    }
    function setAuthToken (token:any){
        authToken.value = token
    }


    async function checkAuthStatus() {
        try {

            const url = 'user/me'
            
            const res:any = await $fetch(`/fa/${url}`, {
                method: 'get',
                baseURL,
                withCredentials: true,
                credentials: 'include',
            });
            setAuthToken(res.authToken)
            setUser(res._user)
            setTimeout(async() =>{
                
                await checkAuthStatus()
            }, 1000 * 60 * 14)


        } catch (error:any) {
            throw error
        }
    }
    
    
    async function triggerCheckAuthStatus(){
        try {
            if (!alreadyRunning.value) {
                await checkAuthStatus();
                alreadyRunning.value = true
            }
        } catch (error:any) {
           throw error
            
        }
    }

    async function login({phone_number}:any){
        try {
            const loginUrl = 'user/auth/login'

            const body = {
                phone_number,
                platform: navigator.userAgent,
                ip: "testIp",
            }

            const res:any = await $fetch(`/fa/${loginUrl}`, {
                method: 'post',
                body,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            });
            

            loginToken.value = `Bearer ${res.loginToken}`
        } catch (error:any) {
            throw error
            
        }
    }


    async function authenticate({otp}:any) {
        const url = 'user/auth/authenticate/validateOtp'
        const res = await $fetch(`/fa/${url}`, {
            method: 'post',
            body: {
                loginToken: loginToken.value,
                tokens: {
                    otpToken: otpToken.value,
                },
                otp
            },
            baseURL,
            withCredentials: true,
            credentials: 'include',
        }) as any

        setUser(res._user)
        setAuthToken(res.authToken)
    }
    async function askForOtp() {
        const url = 'user/auth/authenticate/askForOtp'
        const res = await $fetch(`/fa/${url}`, {
            method: 'post',
            body: {
                loginToken: loginToken.value,
            },
            baseURL,
            withCredentials: true,
            credentials: 'include',
        }) as any

        otpToken.value = `Bearer ${res.tokens?.otpToken}`
    }

    async function signUp({phone_number}:any){
        try {
            const url = 'user/signup'

            const body = {
                phone_number,
                platform: navigator.userAgent,
            }

            const res:any = await $fetch(`/fa/${url}`, {
                method: 'post',
                body,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            });
        } catch (error:any) {
            throw error
            
        }
    }
    async function updateBasicFields({email, first_name, last_name}:any){
        try {
            const url = 'user/me'

            const body = {
                email, first_name, last_name
            }
            const headers = {
                authorization: `Bearer ${authToken.value}`
            } as any

            const res:any = await $fetch(`/fa/${url}`, {
                method: 'put',
                headers,
                body,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            });


            setUser({...user.value, email, first_name, last_name})

        } catch (error:any) {
            throw error
            
        }
    }
    async function logout(){
        try {
            const url = 'user/auth/logout'


            const headers = {
            } as any

            const res:any = await $fetch(`/fa/${url}`, {
                method: 'delete',
                headers,
                baseURL,
                withCredentials: true,
                credentials: 'include',
            });
            user.value = null
            authToken.value = null
            
        } catch (error:any) {
            throw error
            
        }
    }

    async function update({
        first_name,
        last_name,
        email,
    }:any) {

        try {
            const url = `/user/me`

            const headers = {
                authorization: `Bearer ${authToken.value}`
            }

            const body = {
                first_name,
                last_name,
            } as any

            if (email) {
                body.email = email
            }

            const res:any = await $fetch(`/fa${url}`, {
                method: 'put',
                headers,
                body,
                baseURL,
            });

            user.value.first_name = first_name;
            user.value.last_name = last_name;
            user.value.email = email ? email : "";

        } catch (error:any) {
            throw error
            
        }
    }

    return {
        user,
        userNavBarIsOpen,
        authToken,
        signUp,
        setUser,
        logout,
        authenticate,
        update,
        updateBasicFields,
        askForOtp,
        setAuthToken,
        checkAuthStatus,
        triggerCheckAuthStatus,
        login
    }

})
  