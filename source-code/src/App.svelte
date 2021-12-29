<script>
    import Home from './Home.svelte';
    import Login from './Login.svelte';
    import Setup from './Setup.svelte';
    import { Router, Route } from 'svelte-routing';
    window.addEventListener('load', () => {
        document.querySelector('body').style.visibility = 'visible';
    });
</script>

<Router>
    <Route path="/">
        <Home />
    </Route>
    <Route path="/index.html">
        <Home />
    </Route>
    <Route path="login">
        <Login />
    </Route>
    <Route path="setup">
        <Setup />
    </Route>
</Router>