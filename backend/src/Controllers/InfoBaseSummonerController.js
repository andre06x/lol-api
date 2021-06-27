const InfoBaseSummonerService  = require('../Services/InfoBaseSummonerService');

class InfoBaseSummonerController {
  async handle(request, response){
    const { summonerName } = request.params;

    const infoBaseSummonerService = new InfoBaseSummonerService();
    
    const { ...summonerBase } = await infoBaseSummonerService.execute(
      summonerName
    );

    return response.json( summonerBase );
  }
}

module.exports = { InfoBaseSummonerController }