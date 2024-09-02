<script>
import { imagePathfixer } from "@/utilities/imagePathfixer.js";

export default {
  name: "postDetailCarousel",
  methods: {
    imagePathfixer,
    getInterval(index) {

      if (index === 0) return 3000;
      if (index === 1) return 4000;
      return 4000;
    }
  },
  props: {
    listImagesDetail: {
      type: Array,
      required: true,
      default: () => [] // Provide a default empty array
    }
  }
};
</script>

<template>
  <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="border-3 shadow"
           v-for="(image, index) in listImagesDetail"
           :key="index"
           :class="['carousel-item', { active: index === 0 }]"
           :data-bs-interval="getInterval(index)">
        <img :src="imagePathfixer(image.imagePath)"
             class="d-block w-100 imageSize rounded" :alt="'Image ' + (index + 1)">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.imageSize {
  max-width: 850px;
  max-height: 460px;
  object-fit: cover;
  aspect-ratio: 1/1;

}
</style>
