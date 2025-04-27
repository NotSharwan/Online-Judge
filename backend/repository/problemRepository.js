const Problem = require('../models/Problem');

class ProblemRepository {
    async findById(id) {
        return await Problem.findById(id);
    }

    async findAll() {
        return await Problem.find();
    }

    async create(problemData) {
        const problem = new Problem(problemData);
        return await problem.save();
    }

    async update(id, problemData) {
        return await Problem.findByIdAndUpdate(id, problemData, { new: true });
    }

    async delete(id) {
        return await Problem.findByIdAndDelete(id);
    }
}

module.exports = new ProblemRepository();
