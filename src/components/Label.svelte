<script lang="ts">
  export let posX: 'left' | 'center' | 'right'
  export let posY: 'top' | 'center' | 'bottom'

  const styles = {
    x: {
      left: 'left: 1rem;',
      right: 'right: 1rem;',
      center: 'left: 50%; transform: translateX(-50%);',
    },
    y: {
      top: 'top: 1rem;',
      bottom: 'bottom: 1rem;',
      center: 'top: 50%; transform: translateY(-50%);',
    },
  }

  let classList = ''
  export { classList as class }
</script>

<span
  class={`absolute text-white z-20 text-sm ${classList}`}
  style={`text-shadow: 1px 1px 1px rgba(0,0,0); ${styles.x[posX]} ${styles.y[posY]}`}
>
  <slot />
</span>
