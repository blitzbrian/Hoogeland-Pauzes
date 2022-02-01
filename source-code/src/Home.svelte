<script>
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';
    import Subject from './Subject.svelte';
    import { Accordion, AccordionItem } from 'sveltestrap';
    let days = [];
    onMount(async () => {
        if (
            !localStorage.getItem('username') ||
            !localStorage.getItem('password')
        )
            document.querySelector('.login').click();
        days = JSON.parse(localStorage.getItem('days'));
        if (!navigator.onLine) return;
        let res = await fetch('https://hoogeland-pauzes.glitch.me/get', {
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }),
        });
        let text = await res.text();
        if (text == 'failed') {
            document.querySelector('.login').click();
            return;
        }
        let parsing = JSON.parse(text);
        parsing.map((day) => {
            day.subjects.map((subject) => {
                let subjects = day.subjects;
                let lesuur = parseInt(subject.classhour);
                let location = parseInt(subject.location);
                let stroom1locatie =
                    location == 7 ||
                    location == 8 ||
                    subject.description == 'lichamelijke opvoeding' ||
                    (location >= 104 && location <= 127) ||
                    (location >= 228 && location <= 258);
                let stroom2locatie =
                    (location >= 51 && location <= 88) ||
                    (location >= 201 && location <= 227) ||
                    (location >= 301 && location <= 330);
                let stroom1tijd = lesuur == 4 || lesuur == 8;
                let stroom2tijd = lesuur == 5 || lesuur == 9;
                let stroom1 = stroom1tijd && stroom1locatie;
                let stroom2 =
                    stroom2tijd && stroom2locatie && !subject.dontAllowStroom2;
                let grotePauze1 = stroom1locatie && lesuur == 6;
                let grotePauze2 =
                    stroom2locatie && lesuur == 7 && !subject.dontAllowStroom2;
                let start = new Date(subject.start);
                let end = new Date(subject.end);
                let minirooster =
                    (start.getMinutes() == end.getMinutes() &&
                        start.getHours() + 1 == end.getHours()) ||
                    60 * start.getHours() + start.getMinutes() + 30 ==
                        60 * end.getHours() + end.getMinutes();
                        let minirooster1locatie = (location >= 51 && location <= 88) || (location >= 104 && location <= 127) || (location >= 228 && location <= 258);
                        let minirooster2locatie = subject.description == 'lichamelijke opvoeding' || (location >= 201 && location <= 227) || (location >= 301 && location <= 330)
                let miniroosterPauze1 =
                    lesuur == 6 &&
                    minirooster1locatie &&
                    minirooster;
                let miniroosterPauze2 =
                    lesuur == 7 &&
                    minirooster2locatie &&
                    minirooster && !subject.dontAllowStroom2;
                if (stroom1 && !minirooster) subject.start += 900000;
                else if (grotePauze1 || miniroosterPauze1)
                    subject.start += 1800000;
                else if (stroom2 && !minirooster)
                    subjects[subjects.indexOf(subject) - 1].end -= 900000;
                else if (grotePauze2 || miniroosterPauze2)
                    subjects[subjects.indexOf(subject) - 1].end -= 1800000;
                subject.stroom1 = stroom1;
                subject.stroom2 = stroom2;
                subject.grotePauze1 = grotePauze1;
                subject.grotePauze2 = grotePauze2;
                subject.minirooster = minirooster;
                subject.miniroosterPauze1 = miniroosterPauze1;
                subject.miniroosterPauze2 = miniroosterPauze2;
                console.log(miniroosterPauze1, miniroosterPauze2);
                if (
                    (((grotePauze1 || stroom1) && !minirooster) || miniroosterPauze1) &&
                    subjects[subjects.indexOf(subject) + 1]
                )
                    subjects[
                        subjects.indexOf(subject) + 1
                    ].dontAllowStroom2 = true;
                if (!subject.dontAllowStroom2 && lesuur == 8 && subjects[subjects.indexOf(subject) + 1] == null && !minirooster)
                    subject.end -= 900000;
                console.log(subject);
                return subject;
            });
            day.subjects.forEach(
                (subject) => {
                    subject.dontAllowStroom2 = undefined;
                }
            );
            return day;
        });
        localStorage.setItem('days', JSON.stringify(parsing));
        days = null;
        days = parsing;
    });
</script>

<Link to="login" class="login" style={{ visibility: 'hidden' }} />
<Accordion>
    {#if days}
        {#each days as day}
            <AccordionItem
                active={new Date(day.day).toLocaleDateString() ==
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
    {:else}
        <div class="text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {/if}
</Accordion>
