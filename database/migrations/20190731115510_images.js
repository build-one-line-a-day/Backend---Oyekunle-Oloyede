exports.up = knex =>
  knex.schema.createTable('images', tbl => {
    tbl.increments();
    tbl.string('url').notNullable();
    tbl.string('public_id').notNullable();
    tbl
      .integer('entry_id')
      .notNullable()
      .unique()
      .unsigned()
      .references('id')
      .inTable('entries')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('images');
