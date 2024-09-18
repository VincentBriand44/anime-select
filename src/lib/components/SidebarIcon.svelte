<script lang="ts">
export let open: boolean;
let initialized = false;

const handleClick = () => {
  open = !open;
  initialized = true;
};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div 
  class="flex flex-col items-center justify-center w-full h-full gap-[20%] relative transition" 
  class:open
  class:initialized
  id="icon"
  on:click={handleClick}>
  {#each Array(3) as _item}
    <div class="bg-third w-full h-[20%] rounded"></div>
  {/each}
</div>


<style lang="postcss">
#icon.open > div:nth-child(1) {
  animation: first-in .5s both;
}

#icon.open > div:nth-child(2) {
  animation: second-in .125s both;
}

#icon.open > div:nth-child(3) {
  animation: third-in .5s both;
}

#icon.initialized:not(.open) > div:nth-child(1) {
  animation: first-out .5s both;
}

#icon.initialized:not(.open) > div:nth-child(2) {
  animation: second-out .125s both;
}

#icon.initialized:not(.open) > div:nth-child(3) {
  animation: third-out .5s both;
}

@keyframes first-in {
  25% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(200%) rotate(0deg);
  }
  100% {
    transform: translateY(200%) rotate(45deg);
  }
}

@keyframes second-in {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

@keyframes third-in {
  25% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200%) rotate(0deg);
  }
  100% {
    transform: translateY(-200%) rotate(-45deg);
  }
}

@keyframes first-out {
  0% {
    transform: translateY(200%) rotate(45deg);
  }
  50% {
    transform: translateY(200%) rotate(0deg);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes second-out {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes third-out {
  0% {
    transform: translateY(-200%) rotate(-45deg);
  }
  50% {
    transform: translateY(-200%) rotate(0deg);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
