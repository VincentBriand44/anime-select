<script lang="ts">
import { goto } from '$app/navigation';

const year = new Date().getFullYear();
const start = 2010;

type Season = 'hiver' | 'printemps' | 'été' | 'automne';

const seasons: Season[] = ['hiver', 'printemps', 'été', 'automne'];

let selectedYear: number = year;
let selectedSeason: Season = seasons[0];

const handleSubmit = (e: SubmitEvent) => {
  goto(`/preview/season/${selectedSeason} ${selectedYear}`);
};
</script>

<div class="flex justify-center items-center h-full w-full">
  <form
    method="post"
    class="flex w-16 gap-2"
    on:submit|preventDefault={handleSubmit}>
    
    <select name="season" bind:value={selectedSeason}>
      {#each seasons as season}
        <option value={season}>{season}</option>
      {/each}
    </select>

    <select name="year" bind:value={selectedYear}>
      {#each Array(year - start + 1) as _, index}
        <option value={start + index}>{start + index}</option>
      {/each}
    </select>

    <button type="submit">Valider</button>
  </form>
</div>
