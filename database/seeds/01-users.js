exports.seed = knex =>
  knex.schema.raw('TRUNCATE TABLE users, entries CASCADE').then(() =>
    knex('users').insert([
      {
        firstname: 'John',
        lastname: 'Doe',
        username: 'jhdoe',
        email: 'jh@john.com',
        password: '12345',
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        username: 'jndoe',
        email: 'jn@john.com',
        password: '12345',
      },
      {
        firstname: 'Will',
        lastname: 'Smith',
        username: 'freshPrince',
        email: 'fresh@prince.com',
        password: '12345',
      },
      {
        firstname: 'Vin',
        lastname: 'Diesel',
        username: 'diesel',
        email: 'vin@diesel.com',
        password: '12345',
      },
      {
        firstname: 'Van',
        lastname: 'Damme',
        username: 'van-damn',
        email: 'van@damme.com',
        password: '12345',
      },
    ]),
  );
