class HomeController{

    async index(req, res){
        res.send("Teste");
    }

}

module.exports = new HomeController();