const { Router } = require("express");
const { SummonerBaseNextController } = require("./Controllers/SummonerBaseNextController");
const { InfoBaseSummonerController } = require("./Controllers/InfoBaseSummonerController");
const { InfoComleteSummonerController } = require ('./Controllers/InfoCompleteSummonerController');

const router = Router();

const summonerBaseNextController = new SummonerBaseNextController();
const infoBaseSummonerController = new InfoBaseSummonerController();
const infoComleteSummonerController = new InfoComleteSummonerController();

router.get("/summoner/", summonerBaseNextController.handle);
router.get("/summonner/:summonerName", infoBaseSummonerController.handle);
router.get("/summoner/:summonerName", infoComleteSummonerController.handle);

module.exports = router;