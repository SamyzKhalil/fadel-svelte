<script lang="ts">
  export let offset: { x: number; y: number }
  export let showVertical: boolean
  export let height = null
  export let isDragging = false
</script>

<!-- Dot -->
<span
  class="w-3 h-3 absolute z-20 bg-black bg-opacity-50 border border-white rounded-full transition-[scale] ease-linear duration-75"
  class:isDragging
  style={`translate: -50% -50%; left: ${offset.x}% ; top: ${offset.y}%;`}
/>

<!-- Cursor -->
<span
  class:height
  class={`absolute bg-black bg-opacity-50 z-10 ring-1 ring-white ring-opacity-25 default`}
  style={`translate: -50%; --offset: ${offset.x}%; --height: ${height}%`}
/>

{#if showVertical}
  <span
    class={`absolute bg-black bg-opacity-50 z-10 ring-1 ring-white ring-opacity-25 vertical`}
    style={`translate: 0 -50%;--offset: ${offset.y}%; --height: ${height}%`}
  />
{/if}

<style>
  .default {
    width: 2px;
    height: 100%;
    left: var(--offset);
  }

  .height {
    height: var(--height);
  }

  .vertical {
    width: 100%;
    height: 2px;
    top: var(--offset);
  }

  .isDragging {
    scale: 1.3;
  }
</style>
