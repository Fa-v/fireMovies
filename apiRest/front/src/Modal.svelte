<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function dispatchCloseModal() {
    dispatch("closed");
  }
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 48em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    background: #fff;
    border-radius: 0.2em;
    z-index: 1;
  }
</style>

<div class="modal-background" on:click={dispatchCloseModal} />

<div class="modal">
  <slot />
  <button
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
    hover:text-white py-1 px-2 mt-4 border border-blue-500
    hover:border-transparent rounded"
    on:click={dispatchCloseModal}>
    Close
  </button>
</div>
