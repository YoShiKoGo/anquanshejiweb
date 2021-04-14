<template>
  <div>
    <h3>div默认从上到下排列</h3>
    <div style="background-color:#d0d0d0;height:250px;">
      <div style="background-color: red;height:50px;width:50px;">1</div>
      <div style="background-color: blue;height:50px;width:50px;">2</div>
      <div style="background-color: #ff7670;height:50px;width:50px;">3</div>
      <div style="background-color: yellow;height:50px;width:50px;">4</div>
    </div>
    <h3>盒子模型默认从左到右排列</h3>
    <div style="height: 250px;display: flex;background-color:#d0d0d0;">
      <div style="background-color: red;height:50px;width:50px;">1</div>
      <div style="background-color: blue;height:50px;width:50px;">2</div>
      <div style="background-color: #ff7670;height:50px;width:50px;">3</div>
      <div style="background-color: yellow;height:50px;width:50px;">4</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test"
}
</script>

<style scoped>

</style>