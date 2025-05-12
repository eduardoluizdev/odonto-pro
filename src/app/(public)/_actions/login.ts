"use server";

import { signIn } from "@/lib/auth";

export async function handleRegister(Provider: string) {
  await signIn(Provider, {
    redirectTo: "/dashboard",
  });
}
