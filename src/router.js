import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Locations from "@/components/Locations.vue";
import AddLocation from "@/components/AddLocation.vue";
import LocationDetails from "@/components/LocationDetails.vue";
import EditLocation from "@/components/EditLocation.vue";

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "Login", component: Login },
    { path: '/register', name: "Register", component: Register },

    { path: '/locations', name: "Locations", component: Locations, beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token')) {
                next();
            } else {
                next('login');
            }
        }},
    { path: '/addLocation',component: AddLocation },
    { path: '/locationDetails/:locationId', component: LocationDetails },
    { path: '/editLocation/:locationId', component: EditLocation },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;