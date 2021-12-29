import App from './App.svelte';

const app = new App({
    target: document.body,
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
export default app;
