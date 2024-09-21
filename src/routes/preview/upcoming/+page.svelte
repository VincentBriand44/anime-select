<script lang="ts">
import Preview from '$lib/components/Preview.svelte';
import Jikan from 'jikan4.js';
import { Shadow } from 'svelte-loading-spinners';

const client = new Jikan.Client();

let error: string | null = null;
</script>

{#await client.seasons.getUpcoming()}
  <div class="flex gap-4 m-auto items-center">
    <Shadow size="1.3" color="#181D31" unit="rem" duration="1.5s" />
    <p class="text-secondary font-bold">Chargement des données...</p>
  </div>
{:then value}
  <Preview season={value.sort((a, b) => b.popularity - a.popularity)} />
{:catch error}
  <p class="m-auto">Un problème est survenu lors de la récupération des données</p>
{/await}
