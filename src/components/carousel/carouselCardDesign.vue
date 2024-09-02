<script>
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import '@/assets/css/carouselCardDesign.css'
import {imagePathfixer} from "@/utilities/imagePathfixer.js";

export default {
  name: "carouselCardDesign",
  components: {
    Carousel, Slide, Pagination, Navigation,
  },
  props: {
    imgList: []
  },
  methods: {
    imagePathfixer,
    showNavigation(event) {
      const navigationNext = event.currentTarget.querySelector('.carousel__next');
      const navigationPrev = event.currentTarget.querySelector('.carousel__prev');
      if (navigationNext || navigationPrev) {
        navigationNext.style.opacity = 1;
        navigationPrev.style.opacity = 1;
      }
    },
    hideNavigation(event) {
      const navigationNext = event.currentTarget.querySelector('.carousel__next');
      const navigationPrev = event.currentTarget.querySelector('.carousel__prev');
      if (navigationNext || navigationPrev) {
        navigationNext.style.opacity = 0;
        navigationPrev.style.opacity = 0;
      }
    },
  },
}
</script>

<template>
  <Carousel :autoplay="4000" pause-autoplay-on-hover :transition="1000"
            :wrap-around="true" style="padding: 0"
            @mouseover="showNavigation" @mouseleave="hideNavigation">
    <Slide v-for="(img,index) in imgList" :key="index">
      <div  class="carousel__item">
        <div>
          <img :src="imagePathfixer(img.imagePath)" class="rounded-3 img-fluid img-size" alt="" />
        </div>
      </div>
    </Slide>
    <template #addons>
      <navigation >
        <template #next>
          <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12" viewBox="0 0 448 512"
               fill="#FFFFFF"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3
                                    0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7
                                     0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </template>
        <template #prev>
          <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12" viewBox="0 0 448 512"
               fill="#FFFFFF"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5
                                 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7
                                 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
          </svg>
        </template>
      </navigation>
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.img-size {
  object-fit: cover;
  width: 410px;
  height: 230.375px;
}
</style>