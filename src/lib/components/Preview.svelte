<script lang="ts">
import type { getSeason$result } from '$houdini';
import PreviewEach from '$lib/components/PreviewEach.svelte';
import PreviewIf from '$lib/components/PreviewIf.svelte';

export let season: getSeason$result['Page'] | undefined;
const animes = season?.Animes ?? [];
console.log('🚀 ~ animes:', animes);

let index = 0;

const changeEpisode = (newIndex: number) => {
  if (newIndex >= 0 && newIndex < animes.length) {
    index = newIndex;
  }
};
</script>


<div class="flex w-full h-full overflow-hidden max-w-full">
  {#each animes as anime}
    <div 
    class="min-w-full max-w-full h-full max-h-full relative transition-all flex flex-col gap-2"
    style:transform="translateX({`${index * -100}`}%)">
      <div class="rounded-2xl w-full h-1/2 overflow-hidden bg-fourth flex justify-center items-center">
        {#if anime?.trailer?.youtube_embed_nc}
          <iframe
            class="w-full h-full"
            src={anime?.trailer?.youtube_embed_nc}
            title="yolo"
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
        <h2 class="text-xl font-bold text-primary">{anime?.names?.english || anime?.names?.romaji}</h2>
        
        <PreviewIf data={anime?.names?.romaji} title="Autre titre" />
        <PreviewEach data={anime?.genres} title="Genres" />
         <PreviewEach data={anime?.studios} title="Studios" />
         <PreviewIf data={anime?.episodes} title="Nombre d'épisodes" />
         <PreviewIf data={anime?.source === 'Other' ? 'Autre' : anime?.source} title="Source" />
         <PreviewIf data={anime?.startDate?.fullDate} title="Date de début" />
         <PreviewIf data={anime?.country} title="Pays" />
         <PreviewIf data={anime?.synopsis?.french} title="Synopsis" synopsis />
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
    style:appearance="textfield"
    type="number"
    on:change={(e)=>changeEpisode(parseInt(e.currentTarget.value)-1)}
    value={index + 1} />
     / {animes.length}
  </span>
  <button class="bg-third text-third font-bold py-2 px-4 rounded-2xl shadow-lg" class:opacity-20={index === animes.length - 1} on:click={() => changeEpisode(index + 1)} disabled={index === animes.length - 1}>
    Épisode Suivant
  </button>
</div>

<style> 
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
