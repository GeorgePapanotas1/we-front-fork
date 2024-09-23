import { AuthService } from '~/utils/services/AuthService';
import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { useStorage } from "@vueuse/core";
import type {LoginResponse, User} from "~/utils/types/types";



export const useAuthStore = defineStore('authStore', () => {

    const authService: AuthService = new AuthService();

    const user = useStorage<User>('user', {
        id: null,
        name: null,
        surname: null,
        email: null,
        language: null,
        avatar: null,
        points: null
    }, localStorage);

    // Sync the token with localStorage
    const token = useStorage<string | null>('token', null, localStorage);

    const login = (email: string, password: string) => {
        return authService
            .login(email, password)
            .then((response: LoginResponse): void => {
                token.value = response.access_token;

                setupUser(token.value)

            })
            .catch((e) => {
                throw e;
            });
    };

    const updateUser = (params: object) => {
        return authService.update(user.value.id, params, token.value).then((response) => {
            token.value = response.access_token;

            setupUser(token.value)
        })
    }

    const setupUser = (token: string) => {
        const decoded = jwtDecode(token) as User;

        user.value = {
            name: decoded.name,
            surname: decoded.surname,
            email: decoded.email,
            language: decoded.language,
            avatar: decoded.avatar,
            id: decoded.sub
        };

        me().catch(e => {
            throw e
        })
    }

    const isAuthenticated = computed(() => {
        return token.value !== null;
    });

    const logout = () => {
        user.value = {
            name: null,
            surname: null,
            email: null,
            language: null,
            avatar: null,
            points: null
        };

        token.value = null
    }

    const register = (registrationForm: object) => {
        return authService
            .register(registrationForm)
            .catch((e) => {
                console.log(e)
                throw e;
            });
    };

    const me = () => {
        return authService.me(token.value)
            .then((response: MeResponse) => {

                user.value = {
                    name: user.value.name,
                    surname: user.value.surname,
                    email: user.value.email,
                    language: user.value.language,
                    avatar: user.value.avatar,
                    id: user.value.id,
                    points: response.points
                };
            })
            .catch((e) => {
                console.log(e)
                throw e;
            });
    }

    const deleteProfile = () => {
        return authService.deleteProfile(user.value.id, token.value)
    }

    const changePassword = (params: object) => {
        return authService.changePassword(user.value.id, token.value, params).then(r=>{
            token.value = r.access_token
            setupUser(token.value)
        })
    }


    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        me,
        deleteProfile,
        changePassword
    };
});
