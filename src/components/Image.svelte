<script lang="ts">
  let isLoading = true
  const img = new Image(0, 0)

  $: {
    img.src = imageurl
    img.addEventListener('load', () => {
      isLoading = false
    })
  }

  export let imageurl: string
  export let clipTop = 0
  export let clipRight = 0
  export let clipBottom = 0
  export let clipLeft = 0
</script>

{#if imageurl}
  {#if isLoading}
    <div
      class="bg-gray-500 text-white w-full h-full min-w-[50vw] min-h-[50vh] m-auto grid place-content-center"
      style={`grid-area: 1 / 1 / 3 / 3; clip-path: inset(${clipTop}% ${clipRight}% ${clipBottom}% ${clipLeft}%);`}
    >
      Loading...
    </div>
  {:else}
    <img
      class="object-contain w-full h-full"
      style={`grid-area: 1 / 1 / 3 / 3; clip-path: inset(${clipTop}% ${clipRight}% ${clipBottom}% ${clipLeft}%);`}
      src={imageurl}
      alt=""
      draggable="false"
    />
  {/if}
{/if}
