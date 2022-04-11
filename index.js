"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const leaguesUrl = "https://www.thesportsdb.com/api/v1/json/2/all_leagues.php";
const leaguesDiv = document.getElementById("leagues");
console.log(document);
const getFiveFootballLeagues = () => __awaiter(void 0, void 0, void 0, function* () {
    //async function getFiveFootballLeagues(){
    const response = yield fetch(leaguesUrl);
    const data = yield response.json();
    const fiveLeagues = data.leagues.filter((league) => league.strSport === "Soccer").slice(0, 5);
    console.log(fiveLeagues);
    console.log(leaguesDiv);
    return fiveLeagues;
});
const showLeagues = (leaguesElem, leagues) => {
    if (leaguesElem !== null) {
        leagues.forEach((league) => {
            const newElement = document.createElement("button");
            newElement.innerText = league.strLeague;
            newElement.className = "leagueButton";
            leaguesElem.append(newElement);
        });
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const leaguesObjects = yield getFiveFootballLeagues();
        console.log(leaguesObjects);
        showLeagues(leaguesDiv, leaguesObjects);
    });
}
main();
