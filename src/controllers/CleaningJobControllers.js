const CleaningJobService = require("../service/CleaningJobService");

class CleaningJobController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await CleaningJobService.GetAll());
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await CleaningJobService.GetDetailedById(req.params.id));
    }

    async Create(req, res) {
        let CleaningJob = {
            comment: req.body.comment,
            rate: req.body.rate,
            date: req.body.date,
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await CleaningJobService.CreateOne(CleaningJob));
    }

    async EditById(req, res) {
        let CleaningJob = {
            comment: req.body.comment,
            rate: req.body.rate,
            date: req.body.date,
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await CleaningJobService.EditById(req.params.id, CleaningJob));
    }

    async DeleteById(req, res) {
        await CleaningJobService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send("Ok");
    }
}

module.exports = new CleaningJobController();
