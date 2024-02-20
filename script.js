window.onload = () => {
    var engMonth = document.getElementById("eng-month");
    if(engMonth){
        console.log("loaded")
    engMonth.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            var splitDate = engMonth.value.toLowerCase().split(" ");
            switch (splitDate[0]) {
                case "january":
                    monthToNumber = 1;
                    break;
                case "february":
                    monthToNumber = 2;
                    break;
                case "march":
                    monthToNumber = 3;
                    break;
                case "april":
                    monthToNumber = 4;
                    break;
                case "may":
                    monthToNumber = 5;
                    break;
                case "june":
                    monthToNumber = 6;
                    break;
                case "july":
                    monthToNumber = 7;
                    break;
                case "august":
                    monthToNumber = 8;
                    break;
                case "september":
                    monthToNumber = 9;
                    break;
                case "october":
                    monthToNumber = 10;
                    break;
                case "november":
                    monthToNumber = 11;
                    break;
                case "december":
                    monthToNumber = 12;
                    break;
            }
            var yearFull = document.getElementById("eng-month").value.split(" ");
            let count = 0;
            let dayCount = 0
            const apiUrl = "https://api.aladhan.com/v1/gToHCalendar/";
            async function fetchDate() {
                const response = await fetch(apiUrl + `${monthToNumber}/${yearFull[1]}`);
                if (response.ok) {
                    var date = await response.json();
                    var inputFields = document.querySelectorAll(".time-grid input");
                    var hijriField = document.querySelector(".topLogo-div p");
                    var titleMonth = document.querySelector(".table-titles div div");

                    date.data.forEach(function() {
                        inputFields[count].value = date.data[dayCount].gregorian.day;
                        count++
                        inputFields[count].value = date.data[dayCount].gregorian.weekday.en.slice(0, 3);
                        if (inputFields[count].value == "Mon") {
                            count--;
                            for (var i = 0; i < 13; i++) {
                                inputFields[count].style.backgroundColor = "#a5d8f5";
                                count++;
                            }
                            count -= 12;
                        } else {
                            count--;
                            for (var i = 0; i < 13; i++) {
                                inputFields[count].style.backgroundColor = "#fff";
                                count++;
                            }
                            count -= 12;
                        }
                        if (inputFields[count].value == "Fri") {
                            count--;
                            for (var i = 0; i < 3; i++) {
                                inputFields[count].style.fontWeight = "900";
                                count++;
                            }
                            count -= 2;
                        } else {
                            count--;
                            for (var i = 0; i < 3; i++) {
                                inputFields[count].style.fontWeight = "400";
                                count++;
                            }
                            count -= 2;
                        }
                        count++;
                        inputFields[count].value = date.data[dayCount].hijri.day;
                        count += 11;
                        dayCount++;
                    });
                    var shortenUrl = date.data[0].hijri;
                    console.log(date.data[date.data.length - 1]);
                    if (shortenUrl.month.en == "Jumādá al-ākhirah") {
                        hijriField.innerHTML = "Jumādā ath-Thānī" + " - " + date.data[date.data.length - 1].hijri.month.en + ", " + shortenUrl.year + " AH";
                    } else if (date.data[date.data.length - 1].hijri.month.en == "Jumādá al-ākhirah") {
                        hijriField.innerHTML = shortenUrl.month.en + " - " + "Jumādā ath-Thānī" + ", " + shortenUrl.year + " AH";
                    } else {
                        hijriField.innerHTML = shortenUrl.month.en + " - " + date.data[date.data.length - 1].hijri.month.en + ", " + shortenUrl.year + " AH";
                    }

                    if (shortenUrl.month.en == "Jumādá al-ākhirah") {
                        titleMonth.innerHTML = date.data[0].gregorian.month.en + "<br />" + "Jumādā ath-Thānī" + " - " + date.data[date.data.length - 1].hijri.month.en;
                    } else if (date.data[date.data.length - 1].hijri.month.en == "Jumādá al-ākhirah") {
                        titleMonth.innerHTML = date.data[0].gregorian.month.en + "<br />" + shortenUrl.month.en + " - " + "Jumādā ath-Thānī";
                    } else {
                        titleMonth.innerHTML = date.data[0].gregorian.month.en + "<br />" + shortenUrl.month.en + " - " + date.data[date.data.length - 1].hijri.month.en;
                    }
                } else {
                    console.error('Failed to fetch data');
                }
            }

            const apiTimeUrl = "https://masjid.connextar.com/?rest_route=/dpt/v1/prayertime&filter=year";
            async function fetchTimings() {
                const response = await fetch(apiTimeUrl);
                if (response.ok) {
                    let countTime = 0;
                    let inputFieldTime = document.querySelectorAll(".time-grid input");
                    var prayerTime = await response.json();
                    console.log(prayerTime[0]);
                    console.log(prayerTime[0][5]);
                    let dateString = prayerTime[0][5].d_date;
                    let splitString = dateString.split("-");
                    console.log(splitString[1]);
                    // Do it like If it is january use it like prayertime[0][january count];
                    let monthYear = document.getElementById("eng-month").value.toLowerCase().split(" ");
                    let month = monthYear[0];
                    switch (month) {
                        case "january":
                            countTime = 0
                            break;
                        case "february":
                            countTime = 31;
                            break;
                        case "march":
                            countTime = 60;
                            break;
                        case "april":
                            countTime = 91;
                            break;
                        case "may":
                            countTime = 121;
                            break;
                        case "june":
                            countTime = 152;
                            break;
                        case "july":
                            countTime = 182;
                            break;
                        case "august":
                            countTime = 213;
                            break;
                        case "september":
                            countTime = 244;
                            break;
                        case "october":
                            countTime = 274;
                            break;
                        case "november":
                            countTime = 305;
                            break;
                        case "december":
                            countTime = 335;
                            break;
                    }
                    prayerTime.forEach(function() {
                        let i = 3;
                        for (let x = 1; x < 32; x++) {
                            for (let counter = 3; counter < 13; counter++) {
                                inputFieldTime[i].value = prayerTime[0][countTime].fajr_begins;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].fajr_jamah;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].sunrise;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].zuhr_begins;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].zuhr_jamah;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].asr_mithl_1;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].asr_jamah;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].maghrib_begins;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].isha_begins;
                                i++;
                                inputFieldTime[i].value = prayerTime[0][countTime].isha_jamah;
                                countTime++;
                                i += 4;
                            }
                        }
                    })
                }
            }

            fetchTimings();
            fetchDate();
        }
    });
}
}
