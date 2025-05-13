"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png";
import { ProfileFormData, useProfileForm } from "../_hooks/use-profile-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import { Subscription, User } from "@/generated/prisma";
import { formatPhone } from "@/utils/formatPhone";
import { useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "../_actions/update-profile";

export type UserWithSubscription = User & {
  subscription: Subscription;
};

interface ProfileContentProps {
  user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user.times ?? []
  );
  const [isOpen, setIsOpen] = useState(false);

  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone,
  });

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        timeSlots.push(`${hour}:${minute}`);
      }
    }
    return timeSlots;
  };

  const hours = generateTimeSlots();

  const toggleHour = (hour: string) => {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    );
  };

  const timeZones = Intl.supportedValuesOf("timeZone").filter((tz) =>
    tz.includes("America")
  );

  async function onSubmit(data: ProfileFormData) {
    const response = await updateProfile({
      name: data.name,
      address: data.address,
      phone: data.phone,
      status: data.status === "active" ? true : false,
      timeZone: data.timeZone,
      times: selectedHours || [],
    });

    if (response.success) {
      toast.success(response.success);
    }

    if (response.error) {
      toast.error(response.error as string);
    }
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col justify-center space-y-4">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden mx-auto">
                  <Image
                    src={user.image ? user.image : imgTest}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Nome completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o nome da clínica"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Endereço completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o endereço da clínica"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite o telefone"
                            onChange={(e) => {
                              const formatedValue = formatPhone(e.target.value);
                              field.onChange(formatedValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Status da clínica
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || "active"}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o status da clínica" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">
                                Ativo (clínica aberta)
                              </SelectItem>
                              <SelectItem value="inactive">
                                Inativo (clínica fechada)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label className="font-semibold">
                      Configurar horários:
                    </Label>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          Clique aqui para selecionar horários{" "}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Horários da clínica</DialogTitle>
                          <DialogDescription>
                            Selecione os horários que sua clinica está aberta
                            atendendo.
                          </DialogDescription>
                        </DialogHeader>

                        <section className="py-4">
                          <div className="grid grid-cols-5 gap-2">
                            {hours.map((hour) => (
                              <Button
                                key={hour}
                                variant="outline"
                                className={cn(
                                  "w-full h-10",
                                  selectedHours.includes(hour) &&
                                    "border-emerald-500 text-primary border-2"
                                )}
                                onClick={() => toggleHour(hour)}
                              >
                                {hour}
                              </Button>
                            ))}
                          </div>
                        </section>

                        <Button
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          Fechar modal
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Selecione o fuso horário
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || "active"}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o seu fuso horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeZones.map((tz) => (
                                <SelectItem key={tz} value={tz}>
                                  {tz
                                    .replaceAll("_", " ")
                                    .replace("America/", "")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400"
                  >
                    Dalvar alterações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
