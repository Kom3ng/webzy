<script setup>
const props = defineProps({
  name: String,
  pic: String
})

</script>

<template>
  <div class="qst-item">
    <el-text size="large"> {{ name }} </el-text>
    <el-divider />
    <div class="img">
      <el-image :src="pic" alt="snapshot" />
    </div>
  </div>
</template>

<style scoped>
.qst-item {
  border-radius: 15px; /* 设置圆角 */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 设置阴影 */
  padding: 20px; /* 设置内边距 */
  width: 300px; /* 设置宽度 */
  height: 200px; /* 设置高度 */
}
.img {
  width: 280px;
  max-height: 120px;
  overflow: hidden;
  align-content: center;
  justify-content: center;
  border-radius: 2px;
  border-color: var(--el-border-color-light);
  display: flex;
}

.qst-item h2 {
  margin-top: 0; /* 将标题的顶部边距设置为0，使其更接近 div 的顶部 */
  font-size: 18px; /* 设置标题的字体大小 */
  color: #333; /* 设置标题的颜色 */
}



.qst-item el-image {
  width: 100%; /* 将图像的宽度设置为100%，使其填充整个 div 的宽度 */
  height: auto; /* 将图像的高度设置为自动，以保持原始图像的宽高比 */
}
</style>