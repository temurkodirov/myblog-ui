export default [
    {
        path: "/",
        component: () => import("@/layouts/defaultLayout.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/dashboard/home.vue")
            },
            {
                path: "/blog-create",
                name: "blogCreate",
                component: () => import ("@/views/posts/postCreate.vue")
            },
            {
                path: "/blog/:blogId",
                name: "blogDetails",
                props: true,
                component: () => import("@/views/posts/postDetailsView.vue")
            },
            {
                path: "/blogs",
                name: "blogs",
                component: () => import("@/views/posts/postsView.vue")
            },
            {
                path: "/blogs/my-blogs",
                name: "myBlogsView",
                component: () => import("@/views/posts/myBlogsView.vue")
            },
            {
                path: "/blog/update/:updateId",
                name: "blogUpdate",
                props: true,
                component: () => import("@/views/posts/postUpdate.vue")
            },
            {
                path: "/user/update",
                name: "userUpdate",
                component: () => import("@/views/user/userUpdate.vue")
            }

        ],
        redirect: '/'
    },
    {
        path: "/auth",
        component: () => import("@/layouts/authLayout.vue"),
        children: [
            {
                path: "/auth/login",
                name: "login",
                component: () => import("@/views/account/login.vue")
            },
            {
                path: "/auth/register",
                name: "register",
                component: () => import("@/views/account/register.vue")
            },
            {
                path: "/auth/register-verify",
                name: "registerVerify",
                component: () => import("@/views/account/registerVerify.vue")
            }
        ],
        redirect: '/auth/login'
    }

];
