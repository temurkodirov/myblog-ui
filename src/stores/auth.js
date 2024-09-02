import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            firstName: '',
            lastName: '',
            email: '',
            userId: 0,
            imagePath: '',
            identityRole: ''
        }
    }),

    getters: {
        isAuthenticated: (state) => !!state.user.userId,
        getUser: (state) => state.user
    },

    actions: {
        setUser(userData) {
            this.user = userData;
        },
        clearUser() {
            this.user = {
                firstName: '',
                lastName: '',
                email: '',
                userId: 0,
                imagePath: '',
                identityRole: ''
            };
        }
    }
});