import { db } from '../index.ts';
import { InsertPost, InsertUser, postsTable, usersTable } from '../schema.ts';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(postsTable).values(data);
}