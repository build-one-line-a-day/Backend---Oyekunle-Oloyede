exports.up = knex =>
  knex.schema.createTable('entries', tbl => {
    tbl.increments();
    tbl.string('title', 250).notNullable();
    tbl.text('text').notNullable();
    tbl.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    tbl
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users');
  });

exports.down = knex => knex.schema.dropTableIfExists('entries');
