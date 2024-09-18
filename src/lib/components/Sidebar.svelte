<script lang="ts">
import SidebarIcon from './SidebarIcon.svelte';

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
let initialized = false;

const handleClick = () => {
  open = !open;
  initialized = true;
};
</script>

<div class="absolute left-8 top-8 h-10 w-10 flex justify-end items-end xl:bg-transparent bg-secondary rounded-br-full z-10 button"></div>
<button
  class="absolute left-4 top-4 rounded-full bg-primary saturate-150 h-10 w-10 shadow-xl hover:shadow-md p-3 z-30"
  on:click={handleClick}
>
  <SidebarIcon {open} />
</button>


<nav 
  class="fixed w-64 h-screen xl:h-auto xl:relative left-0 top-0 self-start overflow-hidden p-4 z-20 xl:opacity-0 xl:w-0"
  class:open
  class:initialized
  >
  <div class="bg-primary h-10 w-10 rounded-full"></div>
  <ul class="fixed p-6 pt-20 top-0 left-0 w-64 h-screen opacity-0 xl:opacity-100 flex flex-col gap-2">
    {#each nav as { name, href }}
    <li class="text-primary font-bold hover:text-secondary"><a {href}>{name}</a></li>
    {/each}
  </ul>
</nav>

<style lang="postcss">
  nav.initialized.open > div {
    animation: scale-in 1s ease-in;
  }
  nav.initialized.open > ul {
    animation: display-in 1s forwards;
  }

  nav.initialized:not(open) > div {
    animation: scale-out 1s ease-out;
  }
  nav.initialized:not(open) > ul {
    animation: display-out .5s forwards;
  }
  nav.open {
    animation: toLeft-in .5s forwards;
  }

  nav.initialized:not(.open) {
    animation: toLeft-out .5s forwards;
  }
  @media screen and (max-width: 1279px) {
    @keyframes scale-in {
      0% { 
        @apply scale-0
      }
      100% { 
        @apply scale-[50]
      }
    }
    @keyframes display-in {
      25% {
        @apply opacity-0
      }
      70% {
        @apply opacity-0 bg-transparent shadow-none
      }
      100% {
        @apply opacity-100 bg-primary shadow-2xl
      }
    }
      @keyframes scale-out {
      0% { 
        @apply scale-[50]
      }
      100% { 
        @apply scale-0
      }
    }
    
    @keyframes display-out {
      0% {
        @apply opacity-100 bg-primary shadow-2xl
      }
      100% {
        @apply opacity-0 bg-transparent shadow-none
      }
    }

  }

  @media screen and (min-width: 1280px) {
    @keyframes toLeft-in {
      0% {
        @apply w-0 opacity-0
      }
      75% {
        @apply w-64 opacity-0
      }
      100% {
        @apply w-64 opacity-100
      }
    }
    @keyframes toLeft-out {
      0% {
        @apply w-64 opacity-100
      }
      25% {
        @apply w-64 opacity-100
      }
      100% {
        @apply w-0 opacity-0
      }
    }
  }
</style>
