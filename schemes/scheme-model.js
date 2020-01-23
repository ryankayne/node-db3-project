const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
}

function findSteps(id) {
  return db('schemes')
    .select(
      'steps.id',
      'schemes.scheme_name',
      'steps.step_number',
      'steps.instructions'
    )
    .join('steps', 'steps.scheme_id', 'schemes.id')
    .where({ scheme_id: id })
    .orderBy('step_number');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes, '*');
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}