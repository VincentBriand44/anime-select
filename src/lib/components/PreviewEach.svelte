<script lang="ts">
import type Jikan from 'jikan4.js';

type Data = Extract<Jikan.Anime[keyof Jikan.Anime], { name: string }[]>;

export let data: Data;
export let title: string;
export let error: string;
</script>

<div class="flex gap-2">
  <h3 class="text-primary font-bold min-w-fit">{title}:</h3>
  {#each data as item}
    <span class="bg-fourth rounded-md px-2 text-xs font-bold text-fourth leading-5">{item.name}</span>
  {:else}
    <p class="text-xs text-secondary leading-5">{error}</p>
  {/each}
</div>
