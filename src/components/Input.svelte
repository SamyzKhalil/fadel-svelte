<script>
  export let field
</script>

<div>
  <label for="first_name" class="block mb-2 text-xs uppercase text-gray-300"
    >{field.name}</label
  >
  <input
    type="text"
    id="first_name"
    class="bg-[#26292b] text-white text-sm rounded-lg focus:ring-4 ring-gray-500 outline-none block w-full h-16 p-3 mb-2"
    placeholder="Label"
    bind:value={field.label}
  />

  <input
    type="text"
    id="first_name"
    class="bg-[#26292b] text-white text-sm rounded-lg focus:ring-4 ring-gray-500 outline-none block w-full h-16 p-3"
    placeholder="Image URL"
    bind:value={field.imagesrc}
  />
</div>
