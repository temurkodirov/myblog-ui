<script>
export default {
  name: "sidebard",
  data() {
    return{
    lokalUser: {
      id: "0",
      ism: "",
      familiya: "",
      kasblar_id: "",
      login: "",
      token: ""
    },
    }
  },
  mounted() {
    let storage = JSON.parse(localStorage.getItem('lokalUser'));
    this.lokalUser = storage;
  }
}
</script>

<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <router-link to="/"  class="app-brand-link">

      <span class="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
      </router-link>

    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->
      <li class="menu-item" :class="this.$route.name === 'dashboard' ? 'active':''">
        <router-link to="/" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </router-link>
      </li>

      <!-- Layouts -->
      <li  class="menu-item" :class="this.$route.name === 'rooms' ? 'active':''">
        <router-link to="/rooms"  class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Xonalar</div>
        </router-link>
      </li>
      <li  class="menu-item" :class="this.$route.name === 'furniture' ? 'active':''">
        <router-link to="/furniture"  class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Jihozlar</div>
        </router-link>
      </li>
      <li  class="menu-item" :class="this.$route.name === 'orders' ? 'active':''">
        <router-link to="/orders"  class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Buyurtmalar</div>
        </router-link>
      </li>
      <li  class="menu-item" :class="this.$route.name === 'ordersAccountant' ? 'active':''">
        <router-link to="/orders-accountant"  class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Buyurtmalar</div>
        </router-link>
      </li>
      <li  class="menu-item" :class="this.$route.name === 'ordersWarehouse' ? 'active':''">
        <router-link to="/orders-warehouse"  class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Buyurtmalar</div>
        </router-link>
      </li>

    </ul>
  </aside>
</template>

<style scoped>

</style>