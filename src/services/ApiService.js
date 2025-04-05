import { app } from '@/main'

function showToast(responseCode, type, route) {
    responseCode = Number(responseCode)
    switch (true) {
        case responseCode >= 200 && responseCode < 300:
            app.config.globalProperties.$toast.add({
                severity: 'success',
                summary: 'Request Succeeded',
                detail: type + ' request to ' + route + ' succeeded',
                life: 3000
            })

            break
        case responseCode >= 500:
            app.config.globalProperties.$toast.add({
                severity: 'warn',
                summary: 'Backend Error',
                detail: responseCode + ' error occurred at ' + route,
                life: 5000
            })
            break
        case responseCode >= 400 && responseCode < 500 && responseCode !== 401:
            app.config.globalProperties.$toast.add({
                severity: 'error',
                summary: 'Frontend Error',
                detail: responseCode + ' error occurred at ' + route,
                life: 5000
            })
            break
        case responseCode === 401:
            app.config.globalProperties.$toast.add({
                severity: 'error',
                summary: 'Unauthorized',
                detail: 'Please log in to continue',
                life: 5000
            })
            break
    }
}

export const ApiService = {
    async request(route, options, ignoreToast = false) {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT + route, options)
        if (!ignoreToast) {
            showToast(response.status, options.method, route)
        }
        return response
    },
    async requestWithAuth(route, options, ignoreToast = false) {
        options.credentials = 'include'
        return await this.request(route, options, ignoreToast)
    }
}