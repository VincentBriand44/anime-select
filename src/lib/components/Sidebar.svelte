<script lang="ts">
import SidebarIcon from './SidebarIcon.svelte';

interface Nav {
  name: string;
  href: string;
}

const nav: Nav[] = [
  { name: 'Accueil', href: '/' },
  { name: 'Saisons', href: '/preview' },
];

let open = false;
let initialized = false;
let delayedClose = false;

const handleClick = () => {
  if (!delayedClose) {
    delayedClose = true;
    open = !open;
    initialized = true;

    setTimeout(() => {
      delayedClose = false;
    }, 1000);
  }
};
</script>

<div class="absolute left-8 top-8 h-10 w-10 flex justify-end items-end xl:bg-transparent bg-secondary rounded-br-full z-10 button" />
<button
  class="absolute left-4 top-4 rounded-full bg-primary saturate-150 h-10 w-10 shadow-xl hover:shadow-md p-3 z-30"
  on:click={handleClick}
  aria-label="Toggle navigation"
  tabindex="0"
  aria-expanded={open}
>
  <SidebarIcon {open} />
</button>

<nav
  class="fixed w-64 h-screen xl:h-auto xl:relative left-0 top-0 self-start overflow-hidden p-4 z-20 xl:opacity-0 transition-all duration-500"
  class:open
  class:initialized
  class:!w-0={!delayedClose && !open}
>
  <div class="bg-primary h-10 w-10 rounded-full transition-transform duration-1000 ease-in-out" class:scale-50={open} />
  <ul 
    class="fixed p-6 pt-20 top-0 left-0 w-64 h-screen opacity-0 xl:opacity-100 flex flex-col gap-2 transition-all duration-500"
    class:!w-0={!delayedClose && !open}
  >
    {#each nav as { name, href }}
      <li>
        <a {href} on:click={handleClick} class="text-primary font-bold hover:text-secondary transition-colors duration-300">{name}</a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="postcss">
  nav.initialized.open > div {
    transform: scale(50);
    transition: transform 1s ease-in;
  }
  nav.initialized.open > ul {
    animation: display-in 1s forwards;
  }

  nav.initialized:not(.open) > div {
    transform: scale(1);
    transition: transform 1s ease-out;
  }

  nav.initialized:not(.open) > ul {
    animation: display-out .5s forwards;
  }
  
  nav.open {
    animation: toLeft-in .5s forwards;
  }

  nav.initialized:not(.open) {
    animation: toLeft-out .5s forwards;
  }
  @media screen and (max-width: 1279px) {
    @keyframes display-in {
      25% { @apply opacity-0 }
      70% { @apply opacity-0 bg-transparent shadow-none }
      100% { @apply opacity-100 bg-primary shadow-2xl }
    }
    
    @keyframes display-out {
      0% { @apply opacity-100 bg-primary shadow-2xl }
      100% { @apply opacity-0 bg-transparent shadow-none }
    }
  }

  @media screen and (min-width: 1280px) {
    @keyframes toLeft-in {
      0% { @apply w-0 opacity-0 }
      75% { @apply w-64 opacity-0 }
      100% { @apply w-64 opacity-100 }
    }

    @keyframes toLeft-out {
      0% { @apply w-64 opacity-100 }
      25% { @apply w-64 opacity-100 }
      100% { @apply w-0 opacity-0 }
    }
  }
</style>
