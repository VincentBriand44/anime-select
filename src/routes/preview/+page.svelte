<script lang="ts">
import PreviewEach from '$lib/components/PreviewEach.svelte';
import PreviewIf from '$lib/components/PreviewIf.svelte';
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

const changeEpisode = (newIndex: number) => {
  if (newIndex >= 0 && newIndex < season.length) {
    index = newIndex;
    episode = season[index];
  }
};
</script>


{#if error}
  <p>{error}</p>
{:else if season.length > 0 && episode}
  <div class="rounded-2xl w-full h-full min-h-1/2 shadow-xl overflow-hidden">
    {#if episode.trailer}
      <iframe class="w-full h-full" src={episode.trailer.embedUrl.toString()} title={episode.title.toString()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    {:else}
      <p>Aucun trailer n'est disponible</p>
    {/if}
  </div>
  
  <div class="w-full box h-full py-4 flex flex-col gap-1 text-sm overflow-y-scroll">
    <h2 class="text-xl font-bold text-primary">{episode.title}</h2>
    
    <PreviewIf data={episode.titles.map(({title}) => title).join(',  ')} title="Autres titres" error="Aucun autre titre n'est disponible pour cet animé" />   
    <PreviewEach data={episode.demographics} title="Catégories" error="Aucune catégorie n'est disponible pour cet animé" />
    <PreviewEach data={episode.genres} title="Genres" error="Aucun genre n'est disponible pour cet animé" />
    <PreviewEach data={episode.themes} title="Thèmes" error="Aucun thème n'est disponible pour cet animé" />
    <PreviewEach data={episode.studios} title="Studios" error="Aucun studio n'est disponible pour cet animé" />
    <PreviewIf data={episode.episodes} title="Nombre d'épisodes" error="Le nombre d'épisodes n'est pas disponible pour cet animé" />
    <PreviewIf data={episode.source} title="Source" error="Aucune source n'est disponible pour cet animé" />
    <PreviewIf data={episode.synopsis} title="Synopsis" error="Aucun synopsis n'est disponible pour cet animé" synopsis />
  </div>
  
  <div class="w-full flex justify-center gap-2 items-center">
    <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === 0} on:click={() => changeEpisode(index - 1)} disabled={index === 0}>
      Épisode Précédent
    </button>
    <span class="text-primary font-bold">{index + 1} / {season.length}</span>
    <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === season.length - 1} on:click={() => changeEpisode(index + 1)} disabled={index === season.length - 1}>
      Épisode Suivant
    </button>
  </div>
{:else}
  <p>Chargement des données...</p>
{/if}
