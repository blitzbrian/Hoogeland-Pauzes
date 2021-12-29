<script>
    import { Modal, ModalBody } from 'sveltestrap';
    import { Link } from 'svelte-routing';
    let warning = navigator.userAgentData.mobile;
    const done = () => {
        if ((warning = true)) {
            warning = false;
            document.querySelector('.home').click();
        } else warning = true;
    };
</script>

<div hidden={navigator.userAgentData.mobile}>
    <div class="mt-3 d-flex justify-content-center">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
            href="javascript:(function()%7Blet%20username%20%3D%20'{localStorage.getItem('username')}'%3Blet%20password%20%3D%20'{localStorage.getItem('password')}'%3Blet%20startInterval%20%3D%20setInterval(()%20%3D%3E%20%7Bif%20(document.querySelector('%23afsprakenLijst%20%3E%20div.k-grid-content%20%3E%20table%20%3E%20tbody%20%3E%20tr')%20%26%26location.host%20%3D%3D%20'isw.magister.net')%20%7BclearInterval(startInterval)%3Bfunction%20getDays()%20%7Blet%20days%20%3D%20%5B%5D%3Blet%20tbody%20%3D%20document.querySelector('%23afsprakenLijst%20%3E%20div.k-grid-content%20%3E%20table%20%3E%20tbody')%3Blet%20trDays%20%3D%20tbody.querySelectorAll('tr.k-grouping-row.ng-scope')%3BtrDays.forEach((day)%20%3D%3E%20%7BdataItem%20%3D%20angular.element(day).scope().dataItem%3BdataItem.elements%20%3D%20%24(day).nextUntil('.k-grouping-row.ng-scope')%3Bdays.push(dataItem)%3B%7D)%3Breturn%20days%3B%7Dfunction%20isSelectedDayToday()%20%7Blet%20date%20%3D%20new%20Date()%3Blet%20currentDate%20%3D''%20%2B%20date.getDate()%20%2B%20date.getMonth()%20%2B%20date.getYear()%3Blet%20date2%20%3D%20new%20Date(getDays()%5B0%5D.value)%3Blet%20anyDate%20%3D''%20%2B%20date2.getDate()%20%2B%20date2.getMonth()%20%2B%20date2.getYear()%3Breturn%20((new%20Date().getDay()%20%3D%3D%200%20%26%26new%20Date(new%20Date().setDate(new%20Date().getDate()%20%2B%201)).getDate()%20%3D%3D%20date2.getDate())%20%7C%7C(new%20Date().getDay()%20%3D%3D%206%20%26%26new%20Date(new%20Date().setDate(new%20Date().getDate()%20%2B%202)).getDate()%20%3D%3D%20date2.getDate())%20%7C%7CcurrentDate%20%3D%3D%3D%20anyDate)%3B%7Dfunction%20parseDays()%20%7Blet%20data%20%3D%20getDays()%3Bdata%20%3D%20data.map((day)%20%3D%3E%20%7Blet%20parsedDay%20%3D%20%7Bsubjects%3A%20day.items%2Cday%3A%20new%20Date(day.value).getTime()%2C%7D%3BparsedDay.subjects%20%3D%20parsedDay.subjects.map((subject)%20%3D%3E%20(%7Bstart%3A%20new%20Date(subject.beginString).getTime()%2Cend%3A%20new%20Date(subject.eindString).getTime()%2Cclasshour%3A%20subject.lesuur%2Ctitle%3Asubject.title.split('-').splice(0%2C%202).join('-')%20%2B'-%20'%20%2Bsubject.locatie%2Clocation%3A%20subject.locatie%2Cdescription%3A%20subject.vak%2Cdocent%3A%20subject.docent%2Ctoets%3A%20subject.isToets%2Chomework%3A%20subject.huiswerk%2C%7D))%3Breturn%20parsedDay%3B%7D)%3Breturn%20data%3B%7Dlet%20selectedDay%3Blet%20startDate%20%3D%20''%3BsetInterval(()%20%3D%3E%20%7Blet%20selected%20%3D%20angular.element(document.querySelector('%23afsprakenlijst-container%20%3E%20aside')).scope()%3F.ctrl%3F.view%3Bif%20(selectedDay%20!%3D%20selected%3F.startDate%20%26%26selected%20%26%26startDate%20!%3D%20getDays()%5B0%5D.value)%20%7Bif%20(isSelectedDayToday())%20%7Bdocument.querySelector('%23afsprakenlijst-container%20%3E%20div%20%3E%20h1').innerText%20%3D%20'Afsprakenlijst%20(Loading)'%3Blet%20iframe%20%3D%20document.createElement('iframe')%3Biframe.src%20%3D%20'https%3A%2F%2Fhoogeland-pauzes.ml%2FpostIframe.html'%3Biframe.style.visibility%20%3D%20'hidden'%3Biframe.onload%20%3D%20()%20%3D%3E%20%7Biframe.contentWindow.postMessage(%7B%20username%2C%20password%2C%20days%3A%20parseDays()%20%7D%2C'*')%3B%7D%3Bwindow.onmessage%20%3D%20(data)%20%3D%3E%20%7Bif%20(!data.origin%20%3D%3D%20'https%3A%2F%2Fhoogeland-pauzes.ml')return%3Bif%20(data.data%20%3D%3D%20'failed')document.querySelector('%23afsprakenlijst-container%20%3E%20div%20%3E%20h1').innerText%20%3D%20'Afsprakenlijst%20(Failed)'%3Belse%20if%20(data.data%20%3D%3D%20'success')%20%7Bdocument.querySelector('%23afsprakenlijst-container%20%3E%20div%20%3E%20h1').innerText%20%3D%20'Afsprakenlijst%20(Success)'%3BsetTimeout(()%20%3D%3E(document.querySelector('%23afsprakenlijst-container%20%3E%20div%20%3E%20h1').innerText%20%3D%20'Afsprakenlijst')%2C5000)%3B%7D%7D%3Bdocument.body.appendChild(iframe)%3B%7DselectedDay%20%3D%20selected.startDate%3Blet%20days%20%3D%20getDays()%3Bdays.forEach((day)%20%3D%3E%20%7Blet%20miniroosters%20%3D%200%3Bday.items.forEach((subject)%20%3D%3E%20%7Blet%20start%20%3D%20new%20Date(subject.beginString)%3Blet%20end%20%3D%20new%20Date(subject.eindString)%3Bif%20(60%20*%20start.getHours()%20%2B%20start.getMinutes()%20%2B%2030%20%3D%3D60%20*%20end.getHours()%20%2B%20end.getMinutes()%20%7C%7C60%20*%20start.getHours()%20%2B%20start.getMinutes()%20%2B%2060%20%3D%3D60%20*%20end.getHours()%20%2B%20end.getMinutes())%20%7Bminiroosters%20%2B%3D%201%3B%7D%7D)%3Blet%20minirooster%20%3D%20day.items.length%20%3D%3D%20miniroosters%3Bday.items.forEach((subject)%20%3D%3E%20%7Blet%20lesuur%20%3D%20parseInt(subject.lesuur)%3Blet%20location%20%3D%20parseInt(subject.locatie)%3Blet%20stroom1locatie%20%3Dlocation%20%3D%3D%207%20%7C%7Clocation%20%3D%3D%208%20%7C%7Csubject.vak%20%3D%3D%20'lichamelijke%20opvoeding'%20%7C%7C(location%20%3E%3D%20104%20%26%26%20location%20%3C%3D%20127)%20%7C%7C(location%20%3E%3D%20228%20%26%26%20location%20%3C%3D%20258)%3Blet%20stroom2locatie%20%3D(location%20%3E%3D%2051%20%26%26%20location%20%3C%3D%2088)%20%7C%7C(location%20%3E%3D%20201%20%26%26%20location%20%3C%3D%20227)%20%7C%7C(location%20%3E%3D%20301%20%26%26%20location%20%3C%3D%20330)%3Blet%20stroom1tijd%20%3D%20lesuur%20%3D%3D%204%20%7C%7C%20lesuur%20%3D%3D%208%3Bif%20(stroom1tijd%20%26%26stroom1locatie%20%26%26day.items%5Bday.items.indexOf(subject)%20%2B%201%5D)day.items%5Bday.items.indexOf(subject)%20%2B%201%5D.dontAllowStroom2%20%3D%20true%3Blet%20stroom2tijd%20%3D%20lesuur%20%3D%3D%205%20%7C%7C%20lesuur%20%3D%3D%209%3Blet%20stroom1%20%3D%20stroom1tijd%20%26%26%20stroom1locatie%3Blet%20stroom2%20%3Dstroom2tijd%20%26%26stroom2locatie%20%26%26!subject.dontAllowStroom2%3Blet%20grotePauze1%20%3D%20stroom1locatie%20%26%26%20lesuur%20%3D%3D%206%3Blet%20grotePauze2%20%3Dstroom2locatie%20%26%26lesuur%20%3D%3D%207%20%26%26!subject.dontAllowStroom2%3Blet%20miniroosterPauze1%20%3Dlesuur%20%3D%3D%206%20%26%26new%20Date(subject.beginString).toLocaleTimeString()%20%3D%3D%20'10%3A50%3A00'%20%26%26stroom1locatie%3Blet%20miniroosterPauze2%20%3Dlesuur%20%3D%3D%207%20%26%26new%20Date(subject.beginString).toLocaleTimeString()%20%3D%3D%20'11%3A20%3A00'%20%26%26stroom2locatie%3B%7D)%3B%7D)%3BstartDate%20%3D%20getDays()%5B0%5D.value%3B%7D%20else%20if%20(!selected)%20selectedDay%20%3D%20null%3B%7D%2C%20100)%3B%7D%7D%2C%20100)%7D)()"
        class="btn btn-secondary">Hoogeland Pauzes</a
        >
    </div>
    <div class="mt-3 d-flex justify-content-center">
        <h6>Sleep deze knop hierboven op je bookmark balk om te instaleeren</h6>
    </div>
    <div class="mt-3 d-flex justify-content-center">
        <h6>
            Als je dat gedaan hebt kun je naar je agenda (op magister) en kan je klikken op Hoogeland Pauzes,
        </h6>
    </div>
    <div class="d-flex justify-content-center">
        <h6>Dan worden de pauzes opgeslagen.</h6>
    </div>
    <div class="mt-3 d-flex justify-content-center">
        <Link class="btn btn-secondary" to="/">Klaar</Link>
    </div>
</div>
<Link to="/" class="home" style={{ visibility: 'hidden' }} />
<Modal isOpen={warning} toggle={done}>
    <ModalBody>
        Als je wilt dat er dagen en vakken tevoorschijn komen, <br />
        Moet je de app op je chromebook instaleeren
    </ModalBody>
</Modal>
