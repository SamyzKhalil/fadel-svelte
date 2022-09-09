<script>
  export let fields

  function share() {
    const url = `${location.origin}?fields=${btoa(JSON.stringify(fields))}`

    prompt('Copy to clipboard: Ctrl+C', url)
  }
</script>

<button
  on:click={share}
  type="button"
  class="text-black  bg-[#fbef5c] hover:bg-[#f5d909] focus:ring-4 focus:ring-[#fbfad0] rounded-lg font-bold text-sm px-5 py-2.5 h-16"
>
  SHARE
</button>
