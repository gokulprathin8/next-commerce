DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_tokens" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "email_tokens_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "password_reset_tokens_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "productVariants" (
	"id" serial PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"productType" text NOT NULL,
	"updated" timestamp DEFAULT now(),
	"productId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"price" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "two_factor_tokens" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"emailVerified" timestamp,
	"image" text,
	"twoFactorEnabled" boolean DEFAULT false,
	"role" "role" DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variantImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" text NOT NULL,
	"name" text NOT NULL,
	"order" real NOT NULL,
	"variantId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variantTags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	"variantId" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "two_factor_tokens" ADD CONSTRAINT "two_factor_tokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantImages" ADD CONSTRAINT "variantImages_variantId_productVariants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantTags" ADD CONSTRAINT "variantTags_variantId_productVariants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
