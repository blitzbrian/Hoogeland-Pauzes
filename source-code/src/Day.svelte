<script>
    export let day = {};
    import Subject from './Subject.svelte';
    import { AccordionItem } from "sveltestrap";
</script>
{#each [day.day] as time}
<AccordionItem
                active={new Date(time).toLocaleDateString() ==
                    new Date().toLocaleDateString()}
                class="list-group"
                header={new Date(day.day)
                    .toLocaleString('nl-NL', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                    .charAt(0)
                    .toUpperCase() +
                    new Date(day.day)
                        .toLocaleString('nl-NL', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                        .slice(1)}
            >
                {#each day.subjects as subject}
                    <Subject {subject} subjects={day.subjects} />
                {/each}
            </AccordionItem>
{/each}