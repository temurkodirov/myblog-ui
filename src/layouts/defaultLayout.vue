<script>

import Sidebard from "@/components/dashboard/sidebard/sidebard.vue";
import Navbar from "@/components/navbar/navbar.vue";
import FooterComponent from "@/components/footer/footerComponent.vue";
import axios from "axios";

export default {
  name: "defaultLayout",
  components: {FooterComponent, Navbar, Sidebard},
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async fetchCategory() {
      try {
        let result = await axios.get('category/get-all?PageSize=50');
        if (result.status === 200) {
          this.categories = result.data.items;
          localStorage.setItem('localCategories', JSON.stringify(this.categories))
        }
      }catch (e) {
        console.error(e.message)
      }
    },
  },
  async mounted() {
    await this.fetchCategory();
  },
  computed: {

  }
}
</script>

<template>

  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
<!--      <sidebard></sidebard>-->
      <div class="layout-page">
        <navbar></navbar>
          <router-view></router-view>
        <footerComponent></footerComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>