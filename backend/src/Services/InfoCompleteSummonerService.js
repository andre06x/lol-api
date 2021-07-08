const axios = require("axios");

class InfoComleteSummonerService {
  async execute(summonerName){

    const summonerResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: { 'X-Riot-Token': process.env.LOL_KEY }
    });

    const { profileIconId, summonerLevel, puuid,id } = summonerResponse.data;

    const responseRanked = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
    { headers: { 'X-Riot-Token': process.env.LOL_KEY } 
  });

  let l0, l1;
  if (responseRanked.data[0]) {
    if (responseRanked.data.find(f => f.queueType === 'RANKED_SOLO_5x5')) {
      l0 = [];
      l0.push(responseRanked.data.find(f => f.queueType === 'RANKED_SOLO_5x5'));
    };
    if (responseRanked.data.find(f => f.queueType === 'RANKED_FLEX_SR')) {
      l1 = [];
      l1.push(responseRanked.data.find(f => f.queueType === 'RANKED_FLEX_SR'));
    };
  }

    const responseMatchIds = await axios.get(`${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
      { headers: { 'X-Riot-Token': process.env.LOL_KEY } }
    )

    let dadosPartida = [];
    let vitoria = 0;
    try {
      for (let i = 0; i < responseMatchIds.data.length; i++) {
        const responseLastMatchs = await axios.get(`${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[i]}`,
          { headers: { 'X-Riot-Token': process.env.LOL_KEY } 
        });

        const { gameMode, gameDuration } = responseLastMatchs.data.info;

        let gameMinuteDuration = (gameDuration / 60) + "";
        gameMinuteDuration = gameMinuteDuration.substring(0, 2) + "m";

        const particpant = responseLastMatchs.data.info.participants.filter(p => p.puuid === puuid)

        const {
          win,
          championName,
          assists,
          deaths,
          kills,
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          totalMinionsKilled,
          champLevel } = particpant[0];
        if (win) {
          vitoria++;
        }

        let itens = [];
        itens.push(
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item0}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item1}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item2}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item3}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item4}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item5}.png` },
          { item: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item6}.png` }
        );
        
        dadosPartida.push({
          // gameDuration: gameDuration[0] + gameDuration [1] +"s",
          totalMinionsKilled,
          champLevel,
          gameMode,
          gameMinuteDuration,
          win,
          championName,
          championIcon: `https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${championName}.png`,
          kills,
          deaths,
          assists,
          itens
        })
      }
    } catch (err) {
      res.send(err)
    }

    let mediaDeaths = dadosPartida.reduce((total, d) => total + d.deaths, 0) / 10;
    let mediaKills = dadosPartida.reduce((total, d) => total + d.kills, 0) / 10;
    let mediaAssists = dadosPartida.reduce((total, d) => total + d.assists, 0) / 10;
    let kda10 = ((mediaKills + mediaAssists) / mediaDeaths).toFixed(2);

    return {
      l0, l1,
      mediaDeaths,
      mediaKills,
      mediaAssists,
      kda10,
      vitoria,
      summonerLevel,
      iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
      dadosPartida,
    }
  }
};

module.exports = InfoComleteSummonerService;