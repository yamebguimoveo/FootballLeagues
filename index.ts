
const leaguesUrl:string  = "https://www.thesportsdb.com/api/v1/json/2/all_leagues.php"; 
const teamsUrl:string ="https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l="
const leaguesDiv = document.getElementById("leagues");
const teamsDiv = document.getElementById("teams");

//this function gets element type and attributes list and return DOM element 
const createElementWithAtri= (elementName:string, attributesArray:Attribute[]) =>{
    const newElement = document.createElement(elementName);
    attributesArray.forEach((atri:Attribute)=>{
        newElement.setAttribute(atri.atriName,atri.atriValue);
    })
    return newElement;

} 
//this function return five soccer leagues from the leagues the API give us
const getFiveFootballLeagues= async ()=>{
    const response = await fetch(leaguesUrl);
    const data = await response.json();
    const fiveLeagues:League[]= data.leagues.filter((league: { strSport: string; }) =>league.strSport==="Soccer").slice(0,5);
    console.log(fiveLeagues);
    return fiveLeagues;
} 

//this function gets list of leagues and create buttons in the DOM for them
const showLeagues = (leaguesElem:HTMLElement, leagues:League[] ) =>{
    if(leaguesElem!== null){
        leagues.forEach((league)=>{
            const newElement = document.createElement("button");
            newElement.innerText= league.strLeague.toUpperCase();
            newElement.className="leagueButton";
            newElement.onclick= function(e) {clickHandler(e,league.strLeague)};
            leaguesElem.append(newElement);
        })
    }
}

//this function get league name and return the teams that exist in this team 
const getTeamsFromLeague = async (leagueName:string):Promise<Team[]> =>{
    const response = await fetch(teamsUrl+leagueName);
    const data = await response.json();
    const teams:Team[]= data.teams;
    return teams;
} 

//this function gets list of teams and show their data
const showTeams = async (listOfTeams:Team[])=>{
    listOfTeams.forEach((team:any)=>{
        const newTeamElement = createElementWithAtri("div",[{atriName:"id" , atriValue:team.strTeam},{atriName:"class" , atriValue:"team"}]);
        const logoElement = createElementWithAtri("img",[{atriName:"src" , atriValue:team.strTeamBadge}]);
        const teamNameElement = document.createElement("p");
        teamNameElement.innerText=team.strTeam.toUpperCase();
        newTeamElement.append(logoElement);
        newTeamElement.append(teamNameElement);
        newTeamElement.onclick = function(){window.open(`https://${team.strWebsite}`)}
        teamsDiv?.appendChild(newTeamElement);
    })
}

//handler function for click on league button => replace the the teams the DOM show
const clickHandler = async (e:MouseEvent, leagueName:string) =>{
    e.preventDefault
    console.log(leagueName);
    console.log(teamsDiv?.childNodes);
    if(teamsDiv){
        teamsDiv.innerHTML="";
    }
    showTeams(await getTeamsFromLeague(leagueName));
}

//the main function request 5 leagues from the api show the first league teams
async function main(){
    if(leaguesDiv!== null && teamsDiv){
        const leaguesObjects = await getFiveFootballLeagues();
        getTeamsFromLeague(leaguesObjects[0].strLeague)
        showTeams(await getTeamsFromLeague(leaguesObjects[0].strLeague));
        console.log(leaguesObjects);
        showLeagues(leaguesDiv,leaguesObjects);
    }
}

main();