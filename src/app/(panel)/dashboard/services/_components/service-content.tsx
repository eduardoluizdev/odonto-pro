import { Service } from "@/generated/prisma";
import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId });

  return <ServiceList services={services.data as Service[]} />;
}
