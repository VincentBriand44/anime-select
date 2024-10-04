<script lang="ts">
import type { PageData } from './$houdini';

export let data: PageData;
$: ({ GetNews } = data);

$: news = $GetNews.data?.Page?.News ?? [];

let step = 0;
const regex = new RegExp(/<\/p>.*/s);
</script>

<h1 class="text-center font-bold text-2xl mb-4">Actualités</h1>
<div class="flex flex-col overflow-x-scroll gap-4 relative">
  {#each news as item, index}
    {#if index < 10 + step * 10}
      <article class="max-w-full w-full md:grid md:grid-cols-2 flex flex-col gap-2 md:h-80 md:max-h-64 md:min-h-64">
        <img src={item?.images?.image} alt={item?.title} class="w-full object-cover h-full min-h-40 rounded">
        <div class="flex flex-col justify-between h-full">
          <div class="flex gap-2 flex-col">
            <h1 class="font-bold md:text-lg">{item?.title}</h1>
            <p>{@html item?.text?.replace(regex, '')}</p>
          </div>
          <a href={item?.url} class="place-self-end m-4" target="_blank">
            <button class="bg-third rounded px-2 py-1 text-third font-bold hover:bg-fourth">En savoir plus</button>
          </a>
        </div>
      </article>
    {/if}
  {:else}
    <p>Il n'y a aucune actualité</p>
  {/each}
</div>
