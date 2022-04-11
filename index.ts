
const leaguesUrl:string  = "https://www.thesportsdb.com/api/v1/json/2/all_leagues.php"; 

const leaguesDiv = document.getElementById("leagues");
console.log(document);



type League = {
    idLeague: string, strLeague: string, strSport: string, strLeagueAlternate: string
}

const getFiveFootballLeagues= async ()=>{
//async function getFiveFootballLeagues(){
    const response = await fetch(leaguesUrl);
    const data = await response.json();
    const fiveLeagues:League[]= data.leagues.filter((league: { strSport: string; }) =>league.strSport==="Soccer").slice(0,5);
    console.log(fiveLeagues);
    console.log(leaguesDiv);
    return fiveLeagues;
} 

const showLeagues = (leaguesElem:HTMLElement| null, leagues:League[] ) =>{
    if(leaguesElem!== null){
        leagues.forEach((league)=>{
            const newElement = document.createElement("button");
            newElement.innerText= league.strLeague;
            newElement.className="leagueButton";
            leaguesElem.append(newElement);
        })
    }

}

async function main(){
    const leaguesObjects = await getFiveFootballLeagues();
    console.log(leaguesObjects);
    showLeagues(leaguesDiv,leaguesObjects);
}

main();