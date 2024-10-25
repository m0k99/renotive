<template>
  <canvas ref="canvas" class="confetti-canvas" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import confetti from 'canvas-confetti';

export default {
  name: 'Confetti',
  setup() {
    const canvas = ref(null);

    const launchConfetti = () => {
      const resizeCanvas = () => {
        const ctx = canvas.value.getContext('2d');
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;

        const launch = () => {
          confetti({
            particleCount: 300,
            angle: 90,
            spread: 200,
            startVelocity: 30,
            decay: 0.9,
            scalar: 1.2,
            origin: { x: 0.5, y: 0 }, // Start from center positions at the top
          });

          if (Math.random() < 0.3) {
            requestAnimationFrame(launch);
          }
        };

        launch();
      };

      resizeCanvas();

      // Handle window resize
      window.addEventListener('resize', resizeCanvas);

      // Clean up event listener when the component is destroyed
      onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeCanvas);
      });
    };

    onMounted(() => {
      launchConfetti();
    });

    return {
      canvas,
    };
  },
};
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>
