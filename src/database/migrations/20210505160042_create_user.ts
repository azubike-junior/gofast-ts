import { Table } from './../table';
import { Schema } from './../schema';
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex
       .transaction(async (trx: Knex.Transaction) => trx.schema
      .createSchemaIfNotExists(Schema.gopai)
      .then(() => trx.schema.hasTable(Table.users)
        .then((tableExists: boolean) => {
          if (!tableExists) {
            return trx.schema
              .withSchema(Schema.gopai)
              .createTable(Table.users, (tableBuilder: Knex.CreateTableBuilder) => {
                tableBuilder
                  .uuid('id')
                  .unique()
                  .notNullable()
                  .defaultTo(knex.raw('gen_random_uuid()'))
                  .primary(`${Table.users}_id`);
                tableBuilder
                  .string('first_name')
                  .notNullable();
                tableBuilder
                  .string('last_name')
                  .notNullable();
                tableBuilder
                  .string('email')
                  .unique()
                  .notNullable();
                tableBuilder
                  .dateTime('last_login');
                tableBuilder
                  .dateTime('dob');
                tableBuilder
                  .enum('role', ['admin', 'user', 'merchant'])
                  .defaultTo('merchant')
                  .notNullable();
                tableBuilder
                  .string('phone')
                  .unique()
                  .notNullable();
                tableBuilder
                  .string('password')
                  .notNullable();
                tableBuilder
                  .enum('gender', ['male', 'female', 'other'])
                tableBuilder
                  .string('state');
                tableBuilder
                  .string('country');
                tableBuilder
                  .boolean('status')
                  .defaultTo(true)
                  .notNullable();
                tableBuilder
                  .uuid('url_id');
                tableBuilder
                  .uuid('wallet_id')
                  .unique()
                  .notNullable();
                tableBuilder
                  .text('secret_key')
                  .unique()
                  .notNullable();
                tableBuilder
                  .text('public_key')
                  .unique()
                  .notNullable();
                tableBuilder
                  .text('api_key')
                  .unique()
                  .notNullable();
                tableBuilder
                  .string('deleted_at');
                tableBuilder
                  .timestamps(true, true);


                // Foreign Key Constraint
              });
          }
        }))
      .catch((e) => console.error('MIGRATION_ERROR', e)));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema(Schema.gopai).dropTableIfExists(Table.users)
}

