const axios = require('axios');

class SummonerBaseService {
  async execute(summonerName) {

    const summonerResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: { 'X-Riot-Token': process.env.LOL_KEY }
    });

    const { id, profileIconId, summonerLevel, puuid, name } = summonerResponse.data;

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

    return {
      l0,
      l1,
      puuid,
      summonerLevel,
      iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`
    };
  }
}

module.exports = SummonerBaseService;