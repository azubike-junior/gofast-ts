import { Table } from './../table';
import { Schema } from './../schema';
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex
      .transaction(async (trx: Knex.Transaction) => trx.schema
      .createSchemaIfNotExists(Schema.gopai)
      .then(() => trx.schema.hasTable(Table.business)
        .then((tableExists: boolean) => {
          if (!tableExists) {
            return trx.schema
              .withSchema(Schema.gopai)
              .createTable(Table.business, (tableBuilder: Knex.CreateTableBuilder) => {
                tableBuilder
                  .uuid('id')
                  .unique()
                  .notNullable()
                  .defaultTo(knex.raw('gen_random_uuid()'))
                  .primary(`${Table.business}_id`);
                tableBuilder
                  .string('business_name')
                  .notNullable();
                tableBuilder
                  .string('slug')
                  .notNullable();
                tableBuilder
                  .string('business_email')
                  .unique()
                  .notNullable();
                tableBuilder
                  .string('tax_identification_number');
                tableBuilder
                  .string('rc_number');
                tableBuilder
                  .boolean('is_verified');
                tableBuilder
                  .string('website_address');
                tableBuilder
                  .string('office_address');
                tableBuilder
                  .string('business_info');
                tableBuilder
                  .string('currency');
                tableBuilder
                  .string('cac');
                tableBuilder
                  .uuid('user_id')
                  .notNullable();
                tableBuilder
                  .enum('business_type',['registered', 'non_registered'])
                  .defaultTo('non_registered');
                tableBuilder
                  .binary('certification_memorandum');
                tableBuilder
                  .timestamps(true, true);

                // Foreign Key Constraints
                tableBuilder
                  .foreign('user_id')
                  .references('id')
                  .inTable(`${Schema.gopai}.${Table.users}`);
              });
          }
        }))
      .catch((e) => console.error('MIGRATION_ERROR', e)));
}

export async function down(knex: Knex): Promise<void> {
   return knex.schema.withSchema(Schema.gopai).dropTableIfExists(Table.business)
}

