exports.seed = knex =>
  knex('entries')
    .truncate()
    .then(() =>
      knex('entries').insert([
        {
          title: 'first entry',
          text: 'this is quite awesome right.',
          user_id: 1,
        },
        {
          title: 'second entry',
          text: 'keep hacking and never look back.',
          user_id: 2,
        },
        {
          title: 'third entry',
          text: 'go, and may the codes be with you.',
          user_id: 3,
        },
        {
          title: 'fourth entry',
          text: 'fourth time lucky?',
          user_id: 4,
        },
        {
          title: 'fifth entry',
          text: 'the dark forces will never prevail while the server is up.',
          user_id: 5,
        },
      ]),
    );
