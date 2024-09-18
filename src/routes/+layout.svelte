<script>
import Sidebar from '$lib/components/Sidebar.svelte';
import '../app.pcss';
</script>

<div class="bg-primary h-screen w-screen p-8 flex relative">
  <Sidebar />
  <main class="bg-secondary flex justify-between flex-col rounded-3xl max-w-screen-xl xl:max-w-screen-lg w-full mx-auto h-full p-4 shadow-2xl text-secondary">  
    <slot />
  </main>
</div>
