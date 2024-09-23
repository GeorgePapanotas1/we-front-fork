export class BaseClient {

    private static backendUrl = (): string => {
        return useRuntimeConfig().public.backendUrl
    }

    protected get(url: string, params: object|undefined, token: string = '') {
        let headers = {
            'Accept': 'application/json'  // Example of another header
        }
        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`,  // Add your token here
            }
        }

        return $fetch(BaseClient.backendUrl() + url, {
            method: 'GET',
            params: params,
            headers: headers
        })
    }

    protected delete(url: string, token: string = '') {
        let headers = {
            'Accept': 'application/json'  // Example of another header
        }
        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`,  // Add your token here
            }
        }

        return $fetch(BaseClient.backendUrl() + url, {
            method: 'DELETE',
            headers: headers
        })
    }

    protected async post(url: string, body: object|null, token: string = '') {

        let headers = {
            'Accept': 'application/json'  // Example of another header
        }
        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`,  // Add your token here
            }
        }
        try {
            return $fetch(BaseClient.backendUrl() + url, {
                method: 'POST',
                body: body,
                headers: headers
            })
        } catch (e) {

            throw {
                status: e.response.status,
                message: e.data?.message || 'An error occurred',
                details: e.response._data.errors || null
            };
        }


    }
}