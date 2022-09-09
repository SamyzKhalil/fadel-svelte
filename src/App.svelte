<script lang="ts">
  import Image from './components/Image.svelte'
  import Input from './components/Input.svelte'
  import ShareButton from './components/ShareButton.svelte'
  import Viewer from './components/Viewer.svelte'

  const params = new URLSearchParams(location.search)

  let fields = {
    topLeft: {
      name: 'Top Left',
      label: '',
      imagesrc: null,
    },
    topRight: {
      name: 'Top Right',
      label: '',
      imagesrc: null,
    },
    bottomLeft: {
      name: 'Bottom Left',
      label: '',
      imagesrc: null,
    },
    bottomRight: {
      name: 'Bottom Right',
      label: '',
      imagesrc: null,
    },
  }

  if (params.get('fields')) {
    fields = JSON.parse(atob(params.get('fields')))
  }
</script>

<div class="flex flex-row">
  <div
    class="container flex flex-col justify-between p-4 w-[350px] overflow-auto h-screen"
  >
    <div class="grid gap-8 md:grid-rows-5">
      <Input bind:field={fields.topLeft}>
        <img
          slot="icon"
          class="mr-1 w-6 h-6"
          src="icons/top-left.svg"
          width="24"
          alt=""
        />
      </Input>
      <Input bind:field={fields.topRight}>
        <img
          slot="icon"
          class="mr-1 w-6 h-6"
          src="icons/top-right.svg"
          width="24"
          alt=""
        />
      </Input>
      <Input bind:field={fields.bottomLeft}>
        <img
          slot="icon"
          class="mr-1 w-6 h-6"
          src="icons/bottom-left.svg"
          width="24"
          alt=""
        />
      </Input>
      <Input bind:field={fields.bottomRight}>
        <img
          slot="icon"
          class="mr-1 w-6 h-6"
          src="icons/bottom-right.svg"
          width="24"
          alt=""
        />
      </Input>

      <ShareButton {fields} />
    </div>

    <div class="text-xs text-gray-400 text-center">
      Created by
      <a
        href="https://github.com/SamyzKhalil"
        target="_blank"
        class="underline underline-offset-4"
      >
        Abdelrahman Khalil
      </a>
    </div>
  </div>

  <Viewer bind:fields>
    <Image slot="topLeft" imageurl={fields.topLeft.imagesrc} />

    <Image
      slot="topRight"
      let:clipLeft
      {clipLeft}
      imageurl={fields.topRight.imagesrc}
    />

    <Image
      slot="bottomLeft"
      let:clipTop
      {clipTop}
      imageurl={fields.bottomLeft.imagesrc}
    />

    <Image
      slot="bottomRight"
      let:clipTop
      let:clipLeft
      {clipTop}
      {clipLeft}
      imageurl={fields.bottomRight.imagesrc}
    />
  </Viewer>
</div>

<style>
  :global(body) {
    background-color: #151518;
  }
</style>
