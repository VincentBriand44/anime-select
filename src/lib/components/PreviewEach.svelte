<script lang="ts">
// type Data = Extract<Jikan.Anime[keyof Jikan.Anime], { name: string }[]>;

export let data: any;
export let title: string;
</script>

<div class="flex gap-2">
  <h3 class="text-primary font-bold min-w-fit">{title}:</h3>
  {#each data as item}
    <span class="bg-fourth rounded-md px-2 text-xs font-bold text-fourth leading-5">{item}</span>
  {:else}
    <p class="text-xs text-secondary leading-5">Inconnue</p>
  {/each}
</div>
