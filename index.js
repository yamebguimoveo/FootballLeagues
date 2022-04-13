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
const teamsUrl = "https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=";
const leaguesDiv = document.getElementById("leagues");
const teamsDiv = document.getElementById("teams");
//this function gets element type and attributes list and return DOM element 
const createElementWithAtri = (elementName, attributesArray) => {
    const newElement = document.createElement(elementName);
    attributesArray.forEach((atri) => {
        newElement.setAttribute(atri.atriName, atri.atriValue);
    });
    return newElement;
};
//this function return five soccer leagues from the leagues the API give us
const getFiveFootballLeagues = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(leaguesUrl);
    const data = yield response.json();
    const fiveLeagues = data.leagues.filter((league) => league.strSport === "Soccer").slice(0, 5);
    console.log(fiveLeagues);
    return fiveLeagues;
});
//this function gets list of leagues and create buttons in the DOM for them
const showLeagues = (leaguesElem, leagues) => {
    if (leaguesElem !== null) {
        leagues.forEach((league) => {
            const newElement = document.createElement("button");
            newElement.innerText = league.strLeague.toUpperCase();
            newElement.className = "leagueButton";
            newElement.onclick = function (e) { clickHandler(e, league.strLeague); };
            leaguesElem.append(newElement);
        });
    }
};
//this function get league name and return the teams that exist in this team 
const getTeamsFromLeague = (leagueName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(teamsUrl + leagueName);
    const data = yield response.json();
    const teams = data.teams;
    return teams;
});
//this function gets list of teams and show their data
const showTeams = (listOfTeams) => __awaiter(void 0, void 0, void 0, function* () {
    listOfTeams.forEach((team) => {
        const newTeamElement = createElementWithAtri("div", [{ atriName: "id", atriValue: team.strTeam }, { atriName: "class", atriValue: "team" }]);
        const logoElement = createElementWithAtri("img", [{ atriName: "src", atriValue: team.strTeamBadge }]);
        const teamNameElement = document.createElement("p");
        teamNameElement.innerText = team.strTeam.toUpperCase();
        newTeamElement.append(logoElement);
        newTeamElement.append(teamNameElement);
        newTeamElement.onclick = function () { window.open(`https://${team.strWebsite}`); };
        teamsDiv === null || teamsDiv === void 0 ? void 0 : teamsDiv.appendChild(newTeamElement);
    });
});
//handler function for click on league button => replace the the teams the DOM show
const clickHandler = (e, leagueName) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault;
    console.log(leagueName);
    console.log(teamsDiv === null || teamsDiv === void 0 ? void 0 : teamsDiv.childNodes);
    if (teamsDiv) {
        teamsDiv.innerHTML = "";
    }
    showTeams(yield getTeamsFromLeague(leagueName));
});
//the main function request 5 leagues from the api show the first league teams
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (leaguesDiv !== null && teamsDiv) {
            const leaguesObjects = yield getFiveFootballLeagues();
            getTeamsFromLeague(leaguesObjects[0].strLeague);
            showTeams(yield getTeamsFromLeague(leaguesObjects[0].strLeague));
            console.log(leaguesObjects);
            showLeagues(leaguesDiv, leaguesObjects);
        }
    });
}
main();
