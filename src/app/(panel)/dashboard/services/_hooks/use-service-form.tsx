import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface UseServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export type ServiceFormData = z.infer<typeof formSchema>;

export function useServiceForm({ initialValues }: UseServiceFormProps) {
  return useForm<ServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
