<script lang="ts">
import type Jikan from 'jikan4.js';

type Data = Extract<Jikan.Anime[keyof Jikan.Anime], string | number | null>;

export let data: Data;
export let title: string;
export let error: string;
export let synopsis = false;
</script>

<div class="flex gap-2" class:flex-col={synopsis}>
  <h3 class="text-primary font-bold min-w-fit">{title}:</h3>
  {#if data}
    <span class="rounded-md text-xs font-bold leading-5" class:px-4={synopsis}>{data.toString()}</span>
  {:else}
    <p class="text-xs text-secondary leading-5">{error}</p>
  {/if}
</div>
