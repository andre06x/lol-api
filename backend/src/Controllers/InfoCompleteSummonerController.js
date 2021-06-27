const InfoComleteSummoneService = require('../Services/InfoCompleteSummonerService');

class InfoComleteSummonerController {
  async handle(request, response) {
    const { summonerName } = request.params;

    const infoComleteSummoneService = new InfoComleteSummoneService();

    const { ...summonerComplete } = await infoComleteSummoneService.execute(summonerName);

    return response.json(summonerComplete);
  }
}

module.exports = { InfoComleteSummonerController }