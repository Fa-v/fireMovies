<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Detail from "./Detail.svelte";
  import Modal from "./Modal.svelte";
  import Spinner from "./Spinner.svelte";

  const dispatch = createEventDispatcher();

  function dispatchEditTitle(id) {
    dispatch("editTitle", {
      id: id
    });
  }

  let editTitleId = "";
  let movieTitle = "";
  let newMovieTitle = "";
  let movieDetails;
  let movies = [];
  let showDetailModal = false;
  let showUpdateModal = false;

  async function getAllMovies() {
    const res = await fetch("http://localhost:3000/api/movies");
    movies = await res.json();
  }
  onMount(() => {
    getAllMovies();
  });

  async function getMovieDetail(id) {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`);
    const details = await res.json();
    if (res.ok) {
      showDetailModal = true;
      return details;
    } else {
      throw new Error("getMovieDetail error");
    }
  }

  async function sumbitMovie(title) {
    if (title === "") return;
    const res = await fetch(`http://localhost:3000/api/movies`, {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const newMovie = await res.json();
    if (res.ok && newMovie) {
      getAllMovies();
      movieTitle = "";
    } else {
      throw new Error("sumbitMovie error");
    }
  }

  async function updateMovie() {
    const res = await fetch(`http://localhost:3000/api/movies`, {
      method: "PUT",
      body: JSON.stringify({ id: editTitleId, title: newMovieTitle }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const newTitle = await res.json();
    if (res.ok && newTitle) {
      getAllMovies();
      showUpdateModal = false;
      newMovieTitle = "";
    } else {
      throw new Error("sumbitMovie error");
    }
  }

  async function deleteMovie(id) {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`, {
      method: "DELETE"
    });
    const deletedMovie = await res.json();
    if (res.ok) {
      movies = movies.filter(movie => {
        return movie.id !== id;
      });
    } else {
      throw new Error("deleteMovie error");
    }
  }

  function onClickAction(event) {
    if (event.target.dataset.action === "detail") {
      let id = event.target.dataset.id;
      movieDetails = getMovieDetail(id);
    } else {
      editTitleId = event.target.dataset.id;
      showUpdateModal = true;
    }
  }

  function onClickDelete(event) {
    let id = event.target.dataset.id;
    deleteMovie(id);
  }

  function handleSubmit(id) {
    sumbitMovie(movieTitle);
  }

  const toggleModal = event => {
    if (showDetailModal) {
      showDetailModal = !showDetailModal;
    }
    if (showUpdateModal) {
      showUpdateModal = !showUpdateModal;
      newMovieTitle = "";
    }
  };
</script>

<style lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>

<!-- DETAIL -->
{#if showDetailModal}
  <Modal on:closed={toggleModal}>
    <Detail {movieDetails} />
  </Modal>
{/if}

<!-- UPDATE -->
{#if showUpdateModal}
  <Modal on:closed={toggleModal}>
    <form class="w-full max-w-sm" on:submit|preventDefault={updateMovie}>
      <div class="mb-8">
        <label
          class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
          for="title">
          Título
        </label>
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
          w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500"
          id="title"
          type="text"
          placeholder="Escribe un título nuevo"
          bind:value={newMovieTitle} />
      </div>
    </form>
  </Modal>
{/if}

<div class="container mx-auto">
  <h1 class="text-base lg:text-4xl">Firebase Movies</h1>
  <form class="w-full max-w-sm" on:submit|preventDefault={handleSubmit}>
    <div class="mb-8">
      <label
        class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
        for="title">
        Título
      </label>
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
        w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
        focus:bg-white focus:border-purple-500"
        id="title"
        type="text"
        placeholder="Escribe el título de una peli"
        bind:value={movieTitle} />
    </div>
  </form>
  <div class="flex flex-wrap">
    {#each movies as { title, plot, id, poster } (id)}
      <div class="flex max-w-xl mb-4 mr-4 bg-gray-100">
        <div class="w-1/3">
          <img src={poster} alt={title} />
        </div>
        <div class="flex flex-col justify-between w-2/3 p-4">
          <div>
            <h3 class="text-2xl">{title}</h3>
            <p>{plot}</p>
          </div>
          <div class="mt-4">
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700
              font-semibold hover:text-white py-1 px-2 border border-blue-500
              hover:border-transparent rounded"
              on:click={onClickAction}
              data-id={id}
              data-action="detail">
              Detalle
            </button>
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700
              font-semibold hover:text-white py-1 px-2 border border-blue-500
              hover:border-transparent rounded"
              on:click={onClickAction}
              data-id={id}
              data-action="edit">
              Editar
            </button>
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700
              font-semibold hover:text-white py-1 px-2 border border-blue-500
              hover:border-transparent rounded"
              on:click={onClickDelete}
              data-id={id}>
              Borrar
            </button>
          </div>
        </div>
      </div>
    {:else}
      <Spinner />
    {/each}
  </div>
</div>
