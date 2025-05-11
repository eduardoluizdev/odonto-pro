import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import fotoImage from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Professionals() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Clínicas disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div>
                <div className="relative h-48 w-full">
                  <Image
                    src={fotoImage}
                    alt="Foto da clínica"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-cneter justify-between">
                    <div>
                      <h3 className="font-semibold">Clinica centro</h3>
                      <p className="text-sm text-gray-500">Rua 123, 123</p>
                    </div>

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>

                  <Link
                    href="/clinica/123"
                    className="w-full bg-emerald-500 hover:bg-emerald-500 text-white flex items-center justify-center py-2 rounded-md text-sm font-medium md:text-base"
                  >
                    Agendar horário <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
