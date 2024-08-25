import {boolean, integer, pgEnum, pgTable, primaryKey, real, serial, text, timestamp} from 'drizzle-orm/pg-core';
import {AdapterAccountType} from "@auth/core/adapters";
import {createId} from "@paralleldrive/cuid2";
import {relations} from "drizzle-orm";

// export const usersTable = pgTable('users_table', {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     age: integer('age').notNull(),
//     email: text('email').notNull().unique(),
// });

export const RoleEnum = pgEnum('role', ['user', 'admin']);

export const posts = pgTable('posts', {
    id: serial('id').primaryKey().notNull(),
    title: text('title').notNull(),
})

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").notNull(),
    password: text("password"),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    twoFactorEnabled: boolean("twoFactorEnabled").default(false),
    role: RoleEnum("role").default("user"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)


export const emailTokens = pgTable(
    "email_tokens",
    {
        id: text("id").notNull().$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
        email: text("email").notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({
            columns: [vt.id, vt.token],
        }),
    })
)


export const passwordResetTokens = pgTable(
    "password_reset_tokens",
    {
        id: text("id")
            .notNull()
            .$defaultFn(() => createId()),
        token: text("token").notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
        email: text("email").notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({
            columns: [vt.id, vt.token],
        })
    })
)

export const twoFactorTokens = pgTable(
    "two_factor_tokens",
    {
        id: text("id")
            .notNull()
            .$defaultFn(() => createId()),
        token: text("token")
            .notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
        email: text("email").notNull(),
        userId: text("userId").references(() => users.id, {onDelete: "cascade"}),
    }
)

export const products = pgTable(
    "products",
    {
        id: serial('id').primaryKey(),
        title: text("title").notNull(),
        description: text("description"),
        createdAt: timestamp("createdAt").defaultNow(),
        price: real("price").notNull(),
    }
)

export const productVariants = pgTable(
  "productVariants",
  {
    id: serial("id").primaryKey(),
    color: text("color").notNull(),
    productType: text("productType").notNull(),
    updated: timestamp("updated").defaultNow(),
    productId: serial("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" })
  }
)

export const variantImages = pgTable(
  "variantImages",
  {
    id: serial("id").primaryKey(),
    url: text("url").notNull(),
    size: text("size").notNull(),
    name: text("name").notNull(),
    order: real("order").notNull(),
    variantId: serial("variantId")
      .notNull()
      .references(() => productVariants.id, {onDelete: "cascade"})
  }
)

export const variantTags = pgTable(
  "variantTags",
  {
    id: serial("id").primaryKey(),
    tag: text("tag").notNull(),
    variantId: serial("variantId")
      .notNull()
      .references(() => productVariants.id, {onDelete: "cascade"})
  }
)

export const productRelations = relations(products, ({many}) => ({
    productVariants: many(productVariants, {
        relationName: "productVariants",
    })
}))

export const productVariantRelations = relations(productVariants,
    ({many, one}) => ({
        product: one(products, {
            fields: [productVariants.productId],
            references: [products.id],
            relationName: "productVariants"
        }),
        variantImages: many(variantImages, {
            relationName: "variantImages",
        }),
        variantTags: many(variantTags, {relationName: "variantTags"})
    })
)

export const variantImagesRelations = relations(variantImages,
    ({one}) => ({
        productVariants: one(productVariants, {
            fields: [variantImages.variantId],
            references: [productVariants.id],
            relationName: "variantImages",
        })
    })
)


export const variantTagsRelations = relations(variantTags,
    ({one}) => ({
        productVariants: one(productVariants, {
            fields: [variantTags.variantId],
            references: [productVariants.id],
            relationName: "variantTags",
        })
    })
)
