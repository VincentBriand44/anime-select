<script lang="ts">
import { Bars3, Icon } from 'svelte-hero-icons';

interface Nav {
  name: string;
  href: string;
}

const nav: Nav[] = [
  {
    name: 'Accueil',
    href: '/',
  },
  {
    name: 'Animés de la saison',
    href: '/preview',
  },
];

let open = true;
</script>

<div class="absolute left-8 top-8 h-10 w-10 flex justify-end items-end xl:bg-transparent bg-secondary rounded-br-full z-10" class:bg-secondary={!open}>
  <button
    class="absolute -left-4 -top-4 rounded-full bg-primary saturate-150 h-10 w-10 shadow-xl hover:shadow-sm p-2"
    on:click={()=>{open = !open}}
  >
    <Icon src="{Bars3}" class="text-primary" />
  </button>
</div>

{#if open}
  <nav class="fixed w-64 h-screen pt-20 p-6 xl:relative left-0 top-0 bg-primary self-start">
    <ul>
      {#each nav as { name, href }}
      <li class="text-primary font-bold"><a {href}>{name}</a></li>
      {/each}
    </ul>
  </nav>
{/if}

<!-- Créer une animation d'ouverture avec un cercle (visible en version fixed) -->
