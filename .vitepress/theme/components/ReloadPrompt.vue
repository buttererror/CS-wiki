<script setup lang="ts">
import { onMounted, ref } from 'vue'

const offlineReady = ref(false)
const needRefresh = ref(false)

let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | undefined

onMounted(async () => {
    const { registerSW } = await import('virtual:pwa-register')

    updateServiceWorker = registerSW({
        immediate: true,
        onOfflineReady() {
            offlineReady.value = true
        },
        onNeedRefresh() {
            needRefresh.value = true
        },
        onRegisterError(error) {
            console.error('Unable to register the CS Wiki service worker.', error)
        },
    })
})

function closePrompt() {
    offlineReady.value = false
    needRefresh.value = false
}

async function reloadForUpdate() {
    await updateServiceWorker?.(true)
}
</script>

<template>
    <aside
        v-if="offlineReady || needRefresh"
        class="reload-prompt"
        aria-live="polite"
        aria-atomic="true"
        role="status"
    >
        <p>{{ needRefresh ? 'New wiki content is available.' : 'The CS Wiki is ready to use offline.' }}</p>
        <div class="reload-prompt__actions">
            <button v-if="needRefresh" type="button" @click="reloadForUpdate">Reload</button>
            <button type="button" class="reload-prompt__close" @click="closePrompt">Close</button>
        </div>
    </aside>
</template>

<style scoped>
.reload-prompt {
    position: fixed;
    z-index: 100;
    right: 1rem;
    bottom: 1rem;
    max-width: min(24rem, calc(100vw - 2rem));
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.5rem;
    background: var(--vp-c-bg-soft);
    box-shadow: var(--vp-shadow-3);
}

.reload-prompt p { margin: 0 0 0.75rem; }

.reload-prompt__actions { display: flex; justify-content: flex-end; gap: 0.5rem; }

button {
    padding: 0.4rem 0.7rem;
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 0.25rem;
    background: var(--vp-c-brand-1);
    color: var(--vp-c-white);
    font: inherit;
    cursor: pointer;
}

.reload-prompt__close { border-color: var(--vp-c-divider); background: transparent; color: var(--vp-c-text-1); }
</style>
