<script>
    import { Link } from 'svelte-routing';
    import {
        Modal,
        ModalFooter,
        ModalHeader,
        ModalBody,
        FormGroup,
        Input,
    } from 'sveltestrap';
    let newAccount = false;
    const newAccountToggle = () => (newAccount = !newAccount);
    const apiURL = 'https://hoogeland-pauzes.glitch.me/';
    let username;
    let password;
    let invalid = false;
    const login = () => {
        fetch(`${apiURL}getAccount`, {
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                password,
                username: username.toString(),
                days: {},
            }),
        }).then((res) => {
            res.text().then((text) => {
                if (text == 'success') {
                    fetch(`${apiURL}get`, {
                        headers: new Headers({
                            'content-type': 'application/json',
                        }),
                        mode: 'cors',
                        method: 'POST',
                        body: JSON.stringify({
                            password,
                            username: username.toString(),
                        }),
                    }).then((res) => {
                        res.text().then((text) => {
                            if (text != 'failed') {
                                localStorage.setItem('username', username);
                                localStorage.setItem('password', password);
                                invalid = false;
                                document.querySelector('.setup').click();
                            } else {
                                invalid = true;
                            }
                        });
                    });
                } else if (text == 'failed') {
                    invalid = false;
                    newAccountToggle();
                }
            });
        });
    };
    const ja = () => {
        fetch(`${apiURL}createAccount`, {
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                username: username.toString(),
                password,
                days: {},
            }),
        }).then((res) => {
            res.text().then((text) => {
                if (text == 'success') {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    if (username && password)
                        document.querySelector('.setup').click();
                } else {
                    invalid = true;
                }
            });
        });
        newAccountToggle();
    };
</script>

<p class="mt-4 justify-content-center d-flex flex-row">
    {#if navigator.userAgentData.mobile}
        Log in om door te gaan.
    {:else}
        Log in of maak een nieuw account om door te gaan
    {/if}
</p>
<FormGroup on:sumbit={login}>
    <Input
        bind:value={username}
        type="number"
        placeholder="Leerlingnummer"
        {invalid}
        feedback="Voer een geldig leerlingnummer in"
    />
    <Input
        bind:value={password}
        type="password"
        placeholder="Wachtwoord"
        {invalid}
        feedback="Voer een geldig wachtwoord in"
    />
</FormGroup>
<div class="justify-content-center d-flex flex-row mb-3">
    <button on:click={login} class="btn btn-primary">Log in</button>
</div>
<Modal isOpen={newAccount} toggle={newAccountToggle}>
    <ModalHeader toggle={newAccountToggle}
        >Weet je zeker dat je een nieuw account aan wilt maken?</ModalHeader
    >
    <ModalBody>En dat je het wachtwoord nog weet!</ModalBody>
    <ModalFooter>
        <button class="btn btn-primary" on:click={ja}>Ja</button>
        <button class="btn btn-secondary" on:click={newAccountToggle}
            >Nee</button
        >
    </ModalFooter>
</Modal>
<Link class="setup" style={{ visibility: 'hidden' }} to="setup" />

<style>
    p {
        font-size: 20px;
    }
</style>
