window.onload = () => {
    var engMonth = document.getElementById("eng-month");
    if (engMonth) {
        console.log("loaded")
        engMonth.addEventListener("input", () => {
            let monthToNumber;
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

            let z = 0
            let y = 13;
            let forFeb = document.querySelectorAll(".forFeb");
            let shrinkBg = document.querySelector(".time-grid")
            if (splitDate[0] === "february") {
                shrinkBg.style.height = "553px";
            } else if (splitDate[0] === "april" || splitDate[0] === "june" || splitDate[0] === "september" || splitDate[0] === "november") {
                shrinkBg.style.height = "572.1px";
            } else {
                shrinkBg.style.height = "590.81px";
            }
            forFeb.forEach(function() {
                if (splitDate[0] === "february") {
                    if (forFeb[z]) {
                        forFeb[z].style.visibility = "hidden";
                        z++;
                    }
                } else if (splitDate[0] === "april" || splitDate[0] === "june" || splitDate[0] === "september" || splitDate[0] === "november") {
                    if (forFeb[y]) {
                        forFeb[y].style.visibility = "hidden";
                        y++;
                    }
                } else {
                    if (forFeb[z]) {
                        forFeb[z].style.visibility = "visible";
                        z++;
                    }
                }
            });

            let count = 0;
            let dayCount = 0;
            var yearFull = document.getElementById("eng-month").value.split(" ");
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
                        count++;
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
                            for (var i = 0; i < 13; i++) {
                                inputFields[count].style.fontWeight = "900";
                                count++;
                            }
                            count -= 12;
                        } else {
                            count--;
                            for (var i = 0; i < 13; i++) {
                                inputFields[count].style.fontWeight = "400";
                                count++;
                            }
                            count -= 12;
                        }
                        count++;
                        inputFields[count].value = date.data[dayCount].hijri.day;
                        count += 11;
                        dayCount++;
                    });
                    var shortenUrl = date.data[0].hijri;
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

            const apiTimeUrl = "https://staging.albaseerah.com/?rest_route=/dpt/v1/prayertime&filter=year";
            async function fetchTimings() {
                const response = await fetch(apiTimeUrl);
                if (response.ok) {
                    let countTime = 0;
                    let inputFieldTime = document.querySelectorAll(".time-grid input");
                    var prayerTime = await response.json();
                    let dateString = prayerTime[0][5].d_date;
                    let splitString = dateString.split("-");
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
                        let correctTime;
                        let i = 3;
                        for (let x = 1; x < 32; x++) {
                            for (let counter = 3; counter < 13; counter++) {
                                correctTime = prayerTime[0][countTime].fajr_begins.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].fajr_jamah.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].sunrise.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].zuhr_begins.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].zuhr_jamah.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].asr_mithl_1.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].asr_jamah.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].maghrib_begins.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].isha_begins.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                i++;
                                correctTime = prayerTime[0][countTime].isha_jamah.split(":");
                                if (correctTime[0] > 12) {
                                    inputFieldTime[i].value = correctTime[0] - 12 + ":" + correctTime[1];
                                } else {
                                    inputFieldTime[i].value = correctTime[0] + ":" + correctTime[1];
                                }
                                countTime++;
                                i += 4;
                            }
                        }
                    })
                }
            }

            fetchTimings();
            fetchDate();
        });
    }
}
let colorInputs = document.querySelectorAll(".time-grid input");
colorInputs.forEach(inputs => {
    let initialValue = inputs.value;
    inputs.addEventListener('input', function() {
        if (inputs.value !== initialValue) {
            inputs.style.backgroundColor = "#ffff90";
        }
    })
})
