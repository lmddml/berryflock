import { eq } from 'drizzle-orm';
import { db } from '../index.ts';
import { SelectUser, usersTable } from '../schema.ts';

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
