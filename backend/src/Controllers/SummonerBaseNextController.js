
class SummonerBaseNextController {
  async handle(request, response){
    return response.json([
      { login: "ZarackWF" },
      { login: "aaaa" },
      { login: "Liginha" },
      { login: "rih21" }
    ]);
  }
};

module.exports = { SummonerBaseNextController }