import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center gap-2 p-2">
        <div className="relative max-h-[115px] min-h-[115px] min-w-[115px] max-w-[115px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="space-y-0">
          <h3 className="text-base">{service.name}</h3>
          <p className="text-base text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl px-5 py-5"
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
