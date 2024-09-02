import { createPinia } from 'pinia';
import { useAuthStore } from './auth';

const pinia = createPinia();

export { pinia, useAuthStore };