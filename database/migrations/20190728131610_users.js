exports.up = knex =>
  knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('firstname', 30).notNullable();
    tbl.string('lastname', 30).notNullable();
    tbl
      .string('username', 30)
      .notNullable()
      .unique();
    tbl
      .string('email', 50)
      .notNullable()
      .unique();
    tbl.string('password', 30).notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('users');
