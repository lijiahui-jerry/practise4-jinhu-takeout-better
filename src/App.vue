<template>
  <div>
    <router-view class="router-view"></router-view>
    <Footer v-if='$route.meta.showFooter'></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {Footer}
}
</script>

<style scoped lang="less">
.router-view{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
}
</style>
