const sql = require('../db-con');

async function routes (fastify, options) {
    fastify.get('/categories', async (request, reply) => {
        sql.query(
            `
            SELECT id, tag_name,
               (SELECT Group_concat(id, '__', tag_name, '__', parent_id)
                FROM   tag_list tl
                WHERE  tl.parent_id = ptl.id) AS sub_tag
            FROM   tag_list AS ptl where parent_id = 0;
            `,
            (err, rows) => {
            if(err) throw err;

            console.log('Data received from Db:');

            let res = [];
            rows.forEach((row) => {
                let id = row.id;
                let tagName = row.tag_name;
                let tagSub = row.sub_tag;

                let subcategories = tagSub.split(',');
                let subs = [];

                subcategories.forEach((subRow) => {
                    let subby = subRow.split('__');
                    subs.push({'id': subby[0], 'name': subby[1], 'parent': subby[2]});
                });

                res.push({'id': id, 'tag_name': tagName, 'subcats': subs});
            });

            reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ hello: 'world people', results: res });
        });
    });
}

module.exports = routes;
