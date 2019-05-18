<script>
  export let movieDetails;
</script>

<div class="container mx-auto">
  {#await movieDetails}
    <p>...waiting</p>
  {:then detail}
    <div class="leading-loose">
      <h3 class="text-2xl mb-4">{detail.title}</h3>
      <p>
        <span class="font-semibold">Trama:</span>
         {detail.plot}
      </p>
      <p>
        <span class="font-semibold">Director:</span>
         {detail.director}
      </p>
      <p>
        <span class="font-semibold">Género:</span>
         {detail.genre}
      </p>
      <p>
        <span class="font-semibold">Estreno:</span>
         {detail.released}
      </p>
      <p>
        <span class="font-semibold">Idioma:</span>
         {detail.language}
      </p>
      <p>
        <span class="font-semibold">Duración:</span>
         {detail.runtime}
      </p>
      <p>
        <span class="font-semibold">Puntuación:</span>
         {detail.imdbrating}
      </p>
      <p>
        <span class="font-semibold">País:</span>
         {detail.country}
      </p>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
