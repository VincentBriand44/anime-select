<script lang="ts">
import type { PageData } from './$houdini';

export let data: PageData;
$: ({ GetNews } = data);

$: news = $GetNews.data?.Page?.News ?? [];

let step = 0;
const regex = new RegExp(/<\/p>.*/s);
</script>

<h1>Actualités</h1>
<div class="flex gap-x-2 gap-y-4 overflow-x-scroll flex-wrap">
  {#each news as item, index}
    {#if index < 10 + step * 10}
      <article class="max-w-full w-60">
        <h1 class="font-bold">{item?.title}</h1>
        <p>{@html item?.text?.replace(regex, '')}</p>
        <img src={item?.images?.image} alt={item?.title}>
      </article>
    {/if}
  {:else}
    <p>Il n'y a aucune actualité</p>
  {/each}
</div>
