<script>
import Sidebar from '$lib/components/Sidebar.svelte';
import '../app.pcss';
</script>

<div class="bg-primary h-screen w-screen p-8 flex relative">
  <Sidebar />
  <main class="max-w-screen-xl xl:max-w-screen-lg w-full mx-auto">  
    <slot />
  </main>
</div>
