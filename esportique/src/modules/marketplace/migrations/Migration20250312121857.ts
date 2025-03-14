import { Migration } from '@mikro-orm/migrations';

export class Migration20250312121857 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "team_admin" drop constraint if exists "team_admin_email_unique";`);
    this.addSql(`alter table if exists "team" drop constraint if exists "team_handle_unique";`);
    this.addSql(`alter table if exists "vendor_admin" drop constraint if exists "vendor_admin_vendor_id_foreign";`);

    this.addSql(`create table if not exists "team" ("id" text not null, "handle" text not null, "name" text not null, "logo" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "team_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_team_handle_unique" ON "team" (handle) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_team_deleted_at" ON "team" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "team_admin" ("id" text not null, "first_name" text null, "last_name" text null, "email" text not null, "team_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "team_admin_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_team_admin_email_unique" ON "team_admin" (email) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_team_admin_team_id" ON "team_admin" (team_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_team_admin_deleted_at" ON "team_admin" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "team_admin" add constraint "team_admin_team_id_foreign" foreign key ("team_id") references "team" ("id") on update cascade;`);

    this.addSql(`drop table if exists "vendor" cascade;`);

    this.addSql(`drop table if exists "vendor_admin" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "team_admin" drop constraint if exists "team_admin_team_id_foreign";`);

    this.addSql(`create table if not exists "vendor" ("id" text not null, "handle" text not null, "name" text not null, "logo" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vendor_deleted_at" ON "vendor" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "vendor_admin" ("id" text not null, "first_name" text null, "last_name" text null, "email" text not null, "vendor_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vendor_admin_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_admin_email_unique" ON "vendor_admin" (email) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vendor_admin_vendor_id" ON "vendor_admin" (vendor_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_vendor_admin_deleted_at" ON "vendor_admin" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "vendor_admin" add constraint "vendor_admin_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;`);

    this.addSql(`drop table if exists "team" cascade;`);

    this.addSql(`drop table if exists "team_admin" cascade;`);
  }

}
