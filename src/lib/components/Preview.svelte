<script lang="ts">
import PreviewEach from '$lib/components/PreviewEach.svelte';
import PreviewIf from '$lib/components/PreviewIf.svelte';
import Jikan from 'jikan4.js';

export let season: Jikan.Anime[] = [];
let index = 0;

const changeEpisode = (newIndex: number) => {
  if (newIndex >= 0 && newIndex < season.length) {
    index = newIndex;
  }
};
</script>


<div class="flex w-full h-full overflow-hidden max-w-full">
  {#each season as episode}
    <div 
    class="min-w-full max-w-full h-full max-h-full relative transition-all flex flex-col gap-2"
    style:transform="translateX({`${index * -100}`}%)">
      <div class="rounded-2xl w-full h-1/2 overflow-hidden bg-fourth flex justify-center items-center">
        {#if episode.trailer?.id}
          <iframe
            class="w-full h-full"
            src={episode.trailer.embedUrl.toString()}
            title={episode.title.toString()}
            loading="lazy"
            frameborder="0"
            allow="accelerometer;autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        {:else}
          <p class="text-fourth font-bold">Aucun trailer n'est disponible</p>
        {/if}
      </div>
      <div class="w-full h-1/2 box py-4 flex flex-col gap-1 text-sm overflow-y-scroll">
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
    </div>
  {:else}
    <p>Il n'y aucun animé dans cette saison</p>
  {/each}
</div>
  
<div class="w-full flex justify-center gap-2 items-center pt-4">
  <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === 0} on:click={() => changeEpisode(index - 1)} disabled={index === 0}>
    Épisode Précédent
  </button>
  <span class="text-primary font-bold">
    <input
    class="w-5 bg-transparent"
    type="number"
    on:change={(e)=>changeEpisode(parseInt(e.currentTarget.value)-1)}
    value={index + 1} />
     / {season.length}
  </span>
  <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === season.length - 1} on:click={() => changeEpisode(index + 1)} disabled={index === season.length - 1}>
    Épisode Suivant
  </button>
</div>

<style>
  /* Firefox */
input[type=number] {
    appearance: textfield;
}
 
/* Chrome */
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button { 
	-webkit-appearance: none;
	margin:0;
}
 
/* Opéra*/
input::-o-inner-spin-button,
input::-o-outer-spin-button { 
	-o-appearance: none;
	margin:0
}
</style>
