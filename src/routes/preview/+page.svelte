<script lang="ts">
import Preview from '$lib/components/Preview.svelte';
import Jikan from 'jikan4.js';

const client = new Jikan.Client();

let error: string | null = null;
</script>

{#await client.seasons.getNow()}
  <p class="m-auto">Chargement des données...</p>
{:then value}
  <Preview season={setTimeout(()=>{}/*value.sort((a, b) => b.popularity - a.popularity)*/, 60 * 1000)} />
{:catch error}
  <p class="m-auto">Un problème est survenu lors de la récupération des données</p>
{/await}
