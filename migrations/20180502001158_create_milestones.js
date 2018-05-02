
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.string('description');
      table.date('date_achieved');
      table.integer('id').notNullable().primary();
      table.integer('famous_person',11).unsigned().inTable('milestones').references('famous_person');
    })
  ])

};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('milestones')
  ])

};
