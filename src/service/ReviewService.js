const reviewsRepository = require("../repositories/ReviewRepository");

class ReviewService {
    async GetAll() {
        return await reviewsRepository.GetAll();
    }

    async GetDetailedById(serviceId ) {
        return await reviewsRepository.GetDetailedById(serviceId);
    }

    async CreateOne(review) {
        return await reviewsRepository.Create(review);
    }

    async EditById(reviewId, review) {
        return await reviewsRepository.EditById(reviewId, review);
    }

    async DeleteById(reviewId) {
        return await reviewsRepository.DeleteById(reviewId);
    }
}

module.exports = new ReviewService();
