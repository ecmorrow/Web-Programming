exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notes', function(table) {
      table.increments('id').primary();
      table.string('note');
      table.boolean('favorite');
      table.dateTime('created');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notes'),
  ]);
};