<script>
    import { Modal, ModalHeader, ModalBody, Badge } from 'sveltestrap';
    import anchorme from 'anchorme';
    let pauzeOpen = false;
    let togglePauze = () => (pauzeOpen = !pauzeOpen);
    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);
    export let subject;
    export let subjects;
</script>

<Modal isOpen={pauzeOpen} toggle={togglePauze} destroyOnHide={false}>
    <ModalHeader
        >{subject.stroom1 || subject.stroom2
            ? 'Pauze'
            : 'Grote pauze'}</ModalHeader
    >
    <ModalBody>
        Deze pauze begint om {new Date(
            subjects[subjects.indexOf(subject) - 1]
                ? subjects[subjects.indexOf(subject) - 1].end
                : null || subject.stroom1 || subject.stroom2
                ? subject.start - 900000
                : subject.start - 1800000
        )
            .toLocaleTimeString()
            .substring(0, 5)}, <br />
        En eindigt om {new Date(subject.start)
            .toLocaleTimeString()
            .substring(0, 5)}
    </ModalBody>
</Modal>
{#if ((subject.grotePauze1 || subject.grotePauze2) && !subject.minirooster) || subject.miniroosterPauze1 || subject.miniroosterPauze2}
    <li class="list-group-item" on:click={togglePauze}>Grote pauze</li>
{:else if (subject.stroom1 || subject.stroom2) && !subject.minirooster}
    <li class="list-group-item" on:click={togglePauze}>Pauze</li>
{/if}
<li on:click={toggle} class="list-group-item">
    <Badge pill color="primary">{subject.classhour}</Badge>
    {subject.title}
    {#if subject.homework && !subject.toets}
        <Badge pill color="info">Huiswerk</Badge>
    {/if}
    {#if subject.toets}
        <Badge pill color="info">Toets</Badge>
    {/if}
</li>
<Modal {isOpen} {toggle} destroyOnHide={false}>
    <ModalHeader>
        <Badge pill color="primary">{subject.classhour}</Badge>
        {subject.title}
        {#if subject.homework && !subject.toets}
            <Badge pill color="info">Huiswerk</Badge>
        {/if}
        {#if subject.toets}
            <Badge pill color="info">Toets</Badge>
        {/if}
    </ModalHeader>
    <ModalBody
        >{subject.description ? `Het vak ${subject.description}` : 'Dit vak'} begint
        om {new Date(subject.start).toLocaleTimeString().substring(0, 5)},
        <br />
        En eindigt om {new Date(subject.end)
            .toLocaleTimeString()
            .substring(0, 5)}.<br />
        {#if subject.location}Het vak is te vinden in lokaal {subject.location}<br
            />{/if}
        {#if subject.docent}De docent is {subject.docent}.<br />{/if}
        Dit vak heeft {subject.toets ? 'een' : 'geen'} toets.<br />
        {#if subject.homework && !subject.toets}Het huiswerk is: <br/>{@html anchorme(subject.homework)}{:else if !subject.toets}Dit vak heeft geen opgegeven huiswerk.{/if}{#if subject.toets && subject.homework}De beschrijving van de toets is: <br/>{@html anchorme(subject.homework)}{/if}
    </ModalBody>
</Modal>
