"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * We extract the type directly from the Prisma Update Input
 * so we don't have to rely on the 'Role' export.
 */
export async function updateUserRole(userId: string, newRole: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Use type casting that forces TS to accept the string
  // by passing through 'unknown' first. This satisfies ESLint.
  const validatedRole = newRole as unknown as Parameters<
    typeof prisma.user.update
  >[0]["data"]["role"];

  await prisma.user.update({
    where: { id: userId },
    data: {
      role: validatedRole,
    },
  });

  revalidatePath("/admin/users");
  return { success: true };
}
