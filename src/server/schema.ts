import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// export const usersTable = pgTable('users_table', {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     age: integer('age').notNull(),
//     email: text('email').notNull().unique(),
// });

export const posts = pgTable('posts', {
    id: serial('id').primaryKey().notNull(),
    title: text('title').notNull(),
})
