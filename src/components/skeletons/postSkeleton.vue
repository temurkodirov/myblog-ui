<script>
export default {
  name: "postSkeleton"
}
</script>

<template>

<div class="cardSize">

  <div class="cardx loading">
    <div class="imagex">

    </div>
    <div class="content">
      <h4></h4>
      <div class="description">

      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.cardSize {
  height: 434.250px;
  width: 318.825px;
}


.cardx {
  width: 318.825px;
  height: 434.250px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
}

.imagex {
  height: 200px;
}

.imagex img {
  display: block;
  width: 100%;
  height: inherit;
  object-fit: cover;
}

.content {
  padding: 2rem 1.8rem;
}

h4 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
}

.description {
  font-size: 1rem;
  line-height: 1.4rem;
}

.loading .imagex,
.loading h4,
.loading .description {
  background-color: #ededed;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, .5) 50%,
      rgba(255, 255, 255, 0) 60%
  ) #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading h4 {
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: .05s;
}

.loading .description {
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: .06s;
}
</style>