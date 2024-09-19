<script lang="ts">
export let open = false;

$: className = `flex flex-col items-center justify-center w-full h-full gap-[20%] relative transition ${open ? 'open' : ''} ${open !== undefined ? 'initialized' : ''}`;

const handleClick = () => {
  open = !open;
};

const bars = Array(3).fill(null);
</script>

<div 
  class={className}
  id="icon"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
  aria-label="Toggle menu"
  aria-expanded={open}
>
  {#each bars as _item}
    <div class="bg-third w-full h-[20%] rounded"></div>
  {/each}
</div>

<style lang="postcss">
#icon > div {
  transition: transform 0.5s ease-in-out;
}

#icon.open > div:nth-child(1) {
  transform: translateY(200%) rotate(45deg);
}

#icon.open > div:nth-child(2) {
  transform: scaleX(0);
}

#icon.open > div:nth-child(3) {
  transform: translateY(-200%) rotate(-45deg);
}

#icon:not(.open) > div:nth-child(1) {
  transform: translateY(0) rotate(0);
}

#icon:not(.open) > div:nth-child(2) {
  transform: scaleX(1);
}

#icon:not(.open) > div:nth-child(3) {
  transform: translateY(0) rotate(0);
}
</style>
