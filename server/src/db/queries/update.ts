import { eq } from 'drizzle-orm';
import { db } from '../index.ts';
import { SelectPost, postsTable } from '../schema.ts';

export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}
