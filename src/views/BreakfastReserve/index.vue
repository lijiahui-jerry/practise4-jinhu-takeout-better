<template>
  <div class="breakfast-reserve">
    <Header class="header" title="早餐预订" left=true></Header>
    <div class="content">
      <img src="./image/no-built.png" alt="not built already">
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name: "BreakfastReserve",
  components: {Header},
}
</script>

<style scoped lang="less">
.breakfast-reserve {
  width: 100vw;
  height: 100vh;
  position: relative;

  .content {
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;

  }
}
</style>
