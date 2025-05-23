import { Migration } from '@mikro-orm/migrations';

export class Migration20250312115957 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop index if exists "IDX_vendor_handle_unique";`);
  }

  override async down(): Promise<void> {
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_vendor_handle_unique" ON "vendor" (handle) WHERE deleted_at IS NULL;`);
  }

}
