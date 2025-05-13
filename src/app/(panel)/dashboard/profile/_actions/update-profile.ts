"use server";

import auth from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { extractPhoneNumber } from "@/utils/formatPhone";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "o nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: extractPhoneNumber(formData.phone || ""),
        status: formData.status,
        timeZone: formData.timeZone,
        times: formData.times,
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      success: "Perfil atualizado com sucesso",
    };
  } catch (error) {
    return {
      error: "Erro ao atualizar o perfil",
    };
  }
}
