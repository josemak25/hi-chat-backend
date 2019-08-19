class Queries {
  constructor(Model) {
    this.Model = Model;
  }
  create(payload) {
    return this.Model.create(payload);
  }

  getOne(payload) {
    return this.Model.findOne(payload).exec();
  }

  getAll(payload) {
    return this.Model.find(payload);
  }

  update({ payload, where }) {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  remove(payload) {
    return this.Model.delete(payload).exec();
  }
}

module.exports = Queries;
