const Review = require("../models/Review");
const jwt = require("jwt-simple");
const AuthConfig = require("../config/AuthConfig.json");

class ReviewRepository {
    async GetAll() {
        return await Review.findAll();
    }

    async GetDetailedById(serviceId) {

        /*console.log(await Review.findAll({
            where: {
                ServiceId: serviceId,
            },
        }));*/

        return await Review.findAll({
            where: {
                ServiceId: serviceId,
            },
        });
    }

    async Create(review) {
        return Review.create(review);
    }

    async EditById(reviewId, review) {
        await Review.update(review, {
            where: {
                id: reviewId,
            },
        });

        return await this.GetDetailedById(reviewId);
    }

    async DeleteById(reviewId) {
        await Review.destroy({
            where: {
                id: reviewId,
            },
        });
    }
}

module.exports = new ReviewRepository();
