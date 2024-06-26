"use server"

// Imports
// =================================
import { z } from "zod";
import { generateId } from "lucia";
import * as argon2 from "argon2";
import db from "@/lib/db/index";
import { userTable } from "@/lib/db/schema";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { FormSchemaSignUp } from "@/components/FormSignUp";

// Main Action
// =================================
export const signUp = async (values: z.infer<typeof FormSchemaSignUp>) => {
  console.log({ values });

  const hashedPassword = await argon2.hash(values.password)

  try {
    const user = await db
      .insert(userTable)
      .values({
        username: values.email,
        password: hashedPassword,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });

    const userId = user?.[0].id;

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    }
  };
}