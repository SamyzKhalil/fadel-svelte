<script lang="ts">
  export let field

  let fileInput: HTMLInputElement
  let imageFile: string

  function openFilePicker() {
    fileInput.click()
  }

  $: {
    if (imageFile) {
      field.label = fileInput.files[0].name
      field.imagesrc = URL.createObjectURL(fileInput.files[0])
    }
  }
</script>

<div>
  <label
    for={field.name}
    class="mb-2 text-xs uppercase text-gray-300 flex items-center"
  >
    <slot name="icon" />
    {field.name}
  </label>

  <div class="relative mb-1">
    <input
      type="text"
      id={field.name}
      class="bg-[#26292b] text-white text-sm rounded-lg rounded-b-none focus:ring-4 ring-gray-500 outline-none block w-full h-14 p-3"
      placeholder="Image URL or Upload"
      bind:value={field.imagesrc}
    />

    <button
      on:click={openFilePicker}
      type="submit"
      class="text-black absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-400 font-bold rounded-lg text-xs px-3 py-2"
    >
      <img class="w-5 h-5" src="icons/upload.svg" alt="" />
    </button>
    <input bind:this={fileInput} bind:value={imageFile} type="file" hidden />
  </div>

  <input
    type="text"
    class="bg-[#26292b] text-white text-sm rounded-lg rounded-t-none focus:ring-4 ring-gray-500 outline-none block w-full h-14 p-3"
    placeholder="Label"
    bind:value={field.label}
  />
</div>
