import { sql, eq } from "drizzle-orm";
import { users } from "../db/schema";
import db from "../services/database/providers/supabase";

export const checkUserExist = (await db()).query.users
    .findFirst({
        where: (users, { eq }) => eq(users.email, sql.placeholder("email")),
        columns: {
            email: true,
        },
    })
    .prepare("checkUserExist");

export const createUser = (await db())
    .insert(users)
    .values({
        fullName: sql.placeholder("fullName"),
        email: sql.placeholder("email"),
        password: sql.placeholder("password"),
        phoneNumber: sql.placeholder("phoneNumber"),
        profilePic: sql.placeholder("profilePic"),
        // reservations: []
    })
    .prepare("createUser");

export const getUserLogin = (await db())
    .select({
        email: users.email,
        fullName: users.fullName,
        profilePic: users.profilePic,
        phoneNumber: users.phoneNumber,
        password: users.password,
    })
    .from(users)
    .where(eq(users.email, sql.placeholder("email")))
    .limit(1)
    .prepare("getUser");

export type UserLogin = Awaited<ReturnType<typeof getUserLogin.execute>>[0];
