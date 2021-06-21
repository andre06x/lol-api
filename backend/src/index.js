const express = require("express");
const cors = require("cors");
const { json, response } = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(json());
app.use(cors());
app.listen(3333);

app.get("/", (req, res) => {
    res.send("hello world")
});

app.get('/summoner/', (req,res) => {
    return res.json([
        {login: "ZarackWF"},
        {login: "aaaa"},
        {login: "Liginha"},
        {login: "rih21"}
    ]);
});

app.get('/summonner/:summonerName', async (req,res) => {
    const { summonerName } = req.params;

    const summonerResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: { 'X-Riot-Token': process.env.LOL_KEY }
    })

    const { id, profileIconId, summonerLevel, puuid } = summonerResponse.data;

    const responseRanked = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } }
    )

    var ligas = [];
    let l0, l1;
    if (responseRanked.data[0]) {
        const { rank, wins, losses, queueType, tier } = await responseRanked.data[0];
        console.log(responseRanked.data[0]);
        l0 = responseRanked.data.filter(f => f.queueType === 'RANKED_SOLO_5x5');
         l1 = responseRanked.data.filter(f => f.queueType === 'RANKED_FLEX_SR');
         ligas = responseRanked.data.map(r => (
            {
                queueType: r.queueType,
                tier: r.tier,
                rank: r.rank
            }
        ))        
        
    }

    return res.send({
        l0,
        l1,
        // ligas,
        summonerLevel,
        iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
    })
});

app.get('/summoner/:summonerName', async (req, res) => {
    const { summonerName } = req.params;

    const summonerResponse = await axios.get(`${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: { 'X-Riot-Token': process.env.LOL_KEY }
    })

    const { id, profileIconId, summonerLevel, puuid } = summonerResponse.data;

    const responseRanked = await axios.get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } }
    )

    var ligas = [];

    if (responseRanked.data[0]) {
        const { rank, wins, losses, queueType, tier } = await responseRanked.data[0];
         ligas = responseRanked.data.map(r => (
            {
                queueType: r.queueType,
                tier: r.tier,
                rank: r.rank
            }
        ))
    }
    // res.json(responseRanked.data.);
    //     return res.json({
    //     ligas,
    //     summonerLevel,
    //     iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
    //     // winrate: wins ? ((wins / (wins * losses)) * 100).toFixed(1) : ""
    // })
    const responseMatchIds = await axios.get(`${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        { headers: { 'X-Riot-Token': process.env.LOL_KEY } }
    )

    let dadosPartida = [];
    let vitoria = 0;
    try {

        // let URL1 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[0]}`;
        // let URL2 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[1]}`;
        // let URL3 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[2]}`;
        // let URL4 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[3]}`;
        // let URL5 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[4]}`;
        // let URL6 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[5]}`;
        // let URL7 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[6]}`;
        // let URL8 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[7]}`;
        // let URL9 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[8]}`;
        // let URL10 = `${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[9]}`;

        // const fetchURL = (url) => axios.get(url,
        //     {
        //         headers: { 'X-Riot-Token': process.env.LOL_KEY }
        //     });

        // const promiseArray = [URL1, URL2, URL3, URL4, URL5, URL6, URL7, URL8, URL9, URL10].map(fetchURL);

        // Promise.all(promiseArray)
        //     .then((data) => {
        //         console.log(data[9].data.info.participants.filter(p => p.puuid === puuid))
        //     })
        //     .catch((err) => {
        //     });


        for (let i = 0; i < 10; i++) {
            const responseLastMatchs = await axios.get(`${process.env.LOL_URL_AMERICAS}/lol/match/v5/matches/${responseMatchIds.data[i]}`,
                { headers: { 'X-Riot-Token': process.env.LOL_KEY } }
            )

            const { gameMode, gameDuration } = responseLastMatchs.data.info;

            let gameMinuteDuration = (gameDuration / 60) + "";
            gameMinuteDuration = gameMinuteDuration.substring(0, 2) + "m";

            const particpant = responseLastMatchs.data.info.participants.filter(p => p.puuid === puuid)

            if (i == 0) {
                // console.log(particpant[0]);
            }

            // console.log(particpant);
            const { win, championName, assists, deaths, kills, item0, item1, item2, item3, item4, item5, item6, totalMinionsKilled, champLevel } = particpant[0];
            if (win) {
                vitoria++;
            }

            let itens = [];
            itens.push(
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item0}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item1}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item2}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item3}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item4}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item5}.png` },
                { item: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/${item6}.png` }

            )
            dadosPartida.push({
                // gameDuration: gameDuration[0] + gameDuration [1] +"s",
                totalMinionsKilled,
                champLevel,
                gameMode,
                gameMinuteDuration,
                win,
                championName,
                championIcon: `https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${championName}.png`,
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
    let mediaAssists= dadosPartida.reduce((total, d) => total + d.assists, 0) / 10;
    let kda10 = ((mediaKills + mediaAssists) / mediaDeaths).toFixed(2);

    return res.json({
        mediaDeaths,
        mediaKills,
        mediaAssists,
        kda10,
        vitoria,
        summonerLevel,
        iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
        ligas,
        dadosPartida,
        // winrate: wins ? ((wins / (wins * losses)) * 100).toFixed(1) : ""
    })
})