import { createRouter, createWebHistory } from 'vue-router';
import routes from "@/router/routes.js";
import axios from "axios";

axios.defaults.baseURL = "http://104.248.88.55:4040/api/";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
});


router.beforeEach(async (to, from, next) => {

    const token = localStorage.getItem('token');


    try {
        let cfg = { headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json'
            } }
        const response = await axios.get('auth/identity',cfg);


        console.log(response.data)
        if (response.data.userId !== 0) {
            localStorage.setItem('lokalUser', JSON.stringify(response.data));

        } else if (response.data.userId === 0) {
            const tempMail = localStorage.getItem('tempMail');
            // localStorage.clear();
            if (tempMail) localStorage.setItem('tempMail', tempMail);

        }
    } catch (e) {
        console.log(e.message)
    }


    const protectedRoutes = ['/rooms', '/profile', '/settings']; // Example protected routes

    // Check if the target route requires authentication
    const requiresAuth = protectedRoutes.includes(to.path);

    // If the route requires authentication and the user is not authenticated, redirect to login
    if (requiresAuth && !user.userId) {
        return next('/auth/login');
    }

    // Allow the navigation to proceed
    next();
});

export default router;
