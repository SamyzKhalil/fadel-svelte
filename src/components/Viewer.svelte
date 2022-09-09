<script lang="ts">
  import Cursor from './Cursor.svelte'

  import Label from './Label.svelte'

  let view: HTMLElement
  let viewOffsetTopPerc: number
  let viewOffsetLeftPerc: number

  let content: HTMLElement
  let contentOffsetTopPerc: number
  let contentOffsetLeftPerc: number

  let zoomLevel = 1
  let lastPoint: null | { x: number; y: number }
  let isDragging = false
  let contentTranslate = {
    x: 0,
    y: 0,
  }

  function mouseMove(e: MouseEvent) {
    let viewWidth = view.clientWidth
    let viewHeight = view.clientHeight

    const {
      width: contentWidth,
      height: contentHeight,
      left: contentOffsetLeft,
      top: contentOffsetTop,
    } = content.getBoundingClientRect()

    viewOffsetTopPerc = (e.offsetY / viewHeight) * 100
    viewOffsetLeftPerc = (e.offsetX / viewWidth) * 100

    contentOffsetLeftPerc =
      ((e.screenX - contentOffsetLeft) / contentWidth) * 100

    contentOffsetTopPerc =
      ((e.offsetY - contentOffsetTop) / contentHeight) * 100

    if (isDragging) {
      if (lastPoint) {
        contentTranslate.x += (e.pageX - lastPoint.x) / zoomLevel
        contentTranslate.y += (e.pageY - lastPoint.y) / zoomLevel
      }

      lastPoint = { x: e.pageX, y: e.pageY }
    }
  }

  function zoom(e: WheelEvent) {
    e.preventDefault()

    // mouseMove(e)

    zoomLevel = Math.sign(e.deltaY) > 0 ? zoomLevel / 1.25 : zoomLevel * 1.25
  }

  function mouseDown() {
    isDragging = true
  }

  function mouseUp() {
    isDragging = false
    lastPoint = null
  }

  export let fields

  let hasFourDividers: boolean
  $: {
    hasFourDividers =
      (fields.bottomRight.imagesrc && !fields.bottomLeft.imagesrc) ||
      (fields.bottomLeft.imagesrc && !fields.bottomRight.imagesrc)
  }
</script>

<div
  class="relative flex w-screen h-screen overflow-hidden cursor-none"
  style={`background: url('/pattern.svg')`}
  bind:this={view}
  on:mousedown={mouseDown}
  on:mouseup={mouseUp}
  on:mousemove={mouseMove}
  on:wheel={zoom}
>
  <div class="contents pointer-events-none select-none">
    <!-- Labels -->
    <Label posY="bottom" posX="center" class="text-xs">
      {(zoomLevel * 100).toFixed(1)}%
    </Label>

    <Label posY="top" posX="left">
      {fields.topLeft.label}
    </Label>

    <Label posY="top" posX="right">
      {fields.topRight.label}
    </Label>

    <Label posY="bottom" posX="left">
      {fields.bottomLeft.label}
    </Label>

    <Label posY="bottom" posX="right">
      {fields.bottomRight.label}
    </Label>

    <!-- CursorY -->
    <Cursor
      offset={{ x: viewOffsetLeftPerc, y: viewOffsetTopPerc }}
      height={hasFourDividers ? viewOffsetTopPerc : 100}
      showVertical={fields.bottomLeft.imagesrc || fields.bottomRight.imagesrc}
      {isDragging}
    />

    <div
      class="grid place-items-center mx-auto transition-[scale] duration-100 ease-linear h-max m-auto grid-cols-2 grid-rows-2"
      style={`scale: ${zoomLevel}; transform: matrix(1, 0, 0, 1, ${contentTranslate.x}, ${contentTranslate.y});`}
      bind:this={content}
    >
      {#if fields.topLeft.imagesrc}
        <slot name="topLeft" />
      {/if}

      {#if fields.topRight.imagesrc}
        <slot name="topRight" clipLeft={contentOffsetLeftPerc} />
      {/if}

      {#if fields.bottomLeft.imagesrc}
        <slot name="bottomLeft" clipTop={contentOffsetTopPerc} />
      {/if}

      {#if fields.bottomRight.imagesrc}
        <slot
          name="bottomRight"
          clipTop={contentOffsetTopPerc}
          clipLeft={contentOffsetLeftPerc}
        />
      {/if}
    </div>
  </div>
</div>
