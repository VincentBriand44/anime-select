<script lang="ts">
import Jikan from 'jikan4.js';
import { onMount } from 'svelte';

const client = new Jikan.Client();

let season: Jikan.Anime[] = [];
let index = 0;
let episode: Jikan.Anime | null = null;
let error: string | null = null;

onMount(async () => {
  try {
    const clientSeason = await client.seasons.getNow(); // getUpcoming()
    season = clientSeason.sort((a, b) => b.popularity - a.popularity);

    episode = getEpisode();
  } catch (err) {
    error = 'Un problème est survenu lors de la récupération des données';
  }
});

const getEpisode = () => {
  if (index >= season.length || index < 0) {
    return null;
  }

  console.log(season[index]);

  return season[index];
};

const nextEpisode = () => {
  if (index < season.length - 1) {
    index += 1;
    episode = getEpisode();
  }
};

const previousEpisode = () => {
  if (index > 0) {
    index -= 1;
    episode = getEpisode();
  }
};
</script>

<div class="bg-secondary rounded-3xl h-full w-full p-4 flex justify-between flex-col shadow-2xl text-secondary">
  {#if error}
    <p>{error}</p>
  {:else if season.length > 0 && episode}
    <div class="rounded-2xl w-full h-full shadow-xl overflow-hidden">
      {#if episode.trailer}
        <iframe class="w-full h-full" src={episode.trailer.embedUrl.toString()} title={episode.title.toString()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {:else}
        <p>Aucun trailer n'est disponible</p>
      {/if}
    </div>
    
    <div class="w-full box h-full py-4 flex flex-col gap-1 text-sm">
      <h2 class="text-xl font-bold text-primary">{episode.title}</h2>
      
      <div>
        <h3>Autres titres:</h3>
        {#if episode.titles.length > 0}
          <p>{episode.titles.map((title) => title.title).join(', ')}</p>
        {:else}
          <p>Aucun genre n'est disponible pour cet animé</p>
        {/if}
      </div>
      
      <div>
        <h3>Catégories:</h3>
        {#each episode.demographics as demographic}
          <span>{demographic.name}</span>
        {:else}
          <p>Aucun genre n'est disponible pour cet animé</p>
        {/each}
      </div>

      <div>
        <h3>Genre:</h3>

        {#each episode.genres as genre}
          <span>{genre.name}</span>
        {:else}
          <p>Aucun genre n'est disponible pour cet animé</p>
        {/each}
      </div>
     
      <div>
        <h3>Themes:</h3>

        {#each episode.themes as theme}
          <span>{theme.name}</span>
        {:else}
          <p>Aucun theme n'est disponible pour cet animé</p>
        {/each}
      </div>
     
      <div>
        <h3>Studios:</h3>

        {#each episode.studios as studio}
          <span>{studio.name}</span>
        {:else}
          <p>Aucun theme n'est disponible pour cet animé</p>
        {/each}
      </div>
     
      <div>
        <h3>Nombre d'épisodes:</h3>
        {#if episode.episodes}
          <p>{episode.episodes}</p>
        {:else}
          <p>Le nombre d'épisodes n'est pas disponible pour cet animé</p>
        {/if}
      </div>
      
      <div>
        <h3>Source:</h3>
        {#if episode.source}
          <p>{episode.source}</p>
        {:else}
          <p>Aucun synopsis n'est disponible pour cet animé</p>
        {/if}
      </div>
      
      <div id="synopsis">
        <h3>Synopsis:</h3>
        {#if episode.synopsis}
          <p class="px-2">{episode.synopsis}</p>
        {:else}
          <p>Aucun synopsis n'est disponible pour cet animé</p>
        {/if}
      </div>
    </div>
    
    <div class="w-full flex justify-center gap-2 items-center">
      <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === 0} on:click={previousEpisode} disabled={index === 0}>
        Épisode Précédent
      </button>
      <span class="text-primary font-bold">{index + 1} / {season.length}</span>
      <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === season.length - 1} on:click={nextEpisode} disabled={index === season.length - 1}>
        Épisode Suivant
      </button>
    </div>
  {:else}
    <p>Chargement des données...</p>
  {/if}
</div>

<style lang="postcss">
  .box h3 {
    @apply text-primary font-bold min-w-fit
  }
  
  .box p {
    @apply text-xs text-secondary
  }
  
  .box span {
    @apply bg-fourth rounded-md px-2 text-xs font-bold text-fourth
  }

  .box > div:not(#synopsis) {
    @apply flex gap-2
  }
</style>
