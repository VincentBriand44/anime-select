<script lang="ts">
import { Bars3, Icon, XMark } from 'svelte-hero-icons';

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

let open = false;
</script>

<div class="absolute left-8 top-8 h-10 w-10 flex justify-end items-end xl:bg-transparent bg-secondary rounded-br-full z-10" class:bg-secondary={!open}>
  <button
    class="absolute -left-4 -top-4 rounded-full bg-primary saturate-150 h-10 w-10 shadow-xl hover:shadow-md p-2"
    on:click={()=>{open = !open}}
  >
    <Icon src="{open ? XMark : Bars3}" class="text-primary" />
  </button>
</div>

{#if open}
  <nav class="fixed w-64 h-screen xl:relative left-0 top-0 self-start overflow-hidden p-4">
    <div class="bg-primary h-10 w-10 rounded-full"></div>
    <ul class="fixed p-6 pt-20 top-0 left-0 w-64 h-screen opacity-0 xl:opacity-100 flex flex-col gap-2">
      {#each nav as { name, href }}
      <li class="text-primary font-bold hover:text-secondary"><a {href}>{name}</a></li>
      {/each}
    </ul>
  </nav>
{/if}

<style lang="postcss">
  @media screen and (max-width: 1280px) {
    nav > div {
      animation: scale 1s;
    }
    nav > ul {
      animation: display 1s forwards;
    }
  }

 @keyframes scale {
  2% { 
    @apply scale-[5]
  }
  100% { 
    @apply scale-[50]
  }
 }
 @keyframes display {
  25% {
    @apply opacity-0
  }
  75% {
    @apply bg-transparent shadow-none
  }
  100% {
    @apply opacity-100 bg-primary shadow-2xl
  }
 }
</style>
