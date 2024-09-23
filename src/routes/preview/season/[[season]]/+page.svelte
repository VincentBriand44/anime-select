<script lang="ts">
import Preview from '$lib/components/Preview.svelte';
import { Shadow } from 'svelte-loading-spinners';
import type { PageData } from './$houdini';

export let data: PageData;
$: ({ getSeason } = data);
</script>

{#if $getSeason}
  <Preview season={$getSeason.data?.Page} /> 
{:else}
  <div class="flex gap-4 m-auto items-center">
    <Shadow size="1.3" color="#181D31" unit="rem" duration="1.5s" />
    <p class="text-secondary font-bold">Chargement des données...</p>
  </div>
{/if}
