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

  delete(payload) {
    return this.Model.findOneAndDelete(payload).exec();
  }
}

module.exports = Queries;
