<script setup>
</script>

<template>
  <transition name="fade">
    <div class="modal">
      <slot />
    </div>
  </transition>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 114514;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  align-self: center;
  background-color: rgba(255, 255, 255, 0.57);
  color: #000;
  text-align: center;
  padding: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>