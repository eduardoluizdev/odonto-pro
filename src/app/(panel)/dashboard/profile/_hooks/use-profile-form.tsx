import { formatPhone } from "@/utils/formatPhone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean | null;
  timeZone: string | null;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: "Time zone é obrigatório" }),
});

export type ProfileFormData = z.infer<typeof formSchema>;

export function useProfileForm({
  name,
  address,
  phone,
  status,
  timeZone,
}: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: formatPhone(phone || ""),
      status: status ? "active" : "inactive",
      timeZone: timeZone || "",
    },
  });
}
