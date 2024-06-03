"use server"

// Imports
// =================================
import { z } from "zod";
import * as argon2 from "argon2";
import db from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { FormSchemaSignIn } from "@/components/FormSignIn";

// Main Action
// =================================
export const signIn = async (values: z.infer<typeof FormSchemaSignIn>) => {
  // @TODO: refactor
  // try {
  //   FormSchemaSignIn.parse(values);
  // } catch (error: any) {
  //   return {
  //     error: error.message,
  //   }
  // }

  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.username, values.email),
  })

  if (!existingUser) {
    return {
      error: "User not found",
    }
  }

  if (!existingUser.password) {
    return {
      error: "User not found",
    }
  }

  const isValidPassword = await argon2.verify(
    existingUser.password,
    values.password
  )

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password.",
    }
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  })

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return {
    success: "Logged in successfully.",
  }
}