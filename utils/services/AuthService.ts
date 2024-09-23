import { BaseClient } from "~/utils/client/BaseClient";

export class AuthService extends BaseClient {

    public constructor() {
        super();
    }
    public login (email: string, password: string) {
        try {
            return this.post('/api/v1/auth/login', {
                email: email,
                password: password
            })
        } catch (e) {
            throw e
        }
    }

    public register (registerForm: object) {
        try {
            return this.post('/api/v1/auth/register', registerForm)
        } catch (e) {
            throw e
        }
    }

    public me (token: string) {
        try {
            return this.get('/api/v1/me', undefined, token)
        } catch (e) {
            throw e
        }
    }

    public update(userId: number, params: object, token: string) {
        try {
            return this.post(`/api/v1/user/${userId}`, params, token)
        } catch (e) {
            throw e
        }
    }

    public deleteProfile(userId: number, token: string) {
        try {
            return this.delete(`/api/v1/user/${userId}`, token)
        } catch (e) {
            throw e
        }
    }

    public changePassword = (userId: number, token: string, params: object) => {
        try {
            return this.post(`/api/v1/user/${userId}/password`, params, token)
        } catch (e) {
            throw e
        }
    }


}