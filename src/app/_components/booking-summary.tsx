import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="rounded-xl">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">{service.name}</h2>
          <p className="text-base font-semibold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-light text-gray-400">Data</h2>
          <p className="text-sm font-light">
            <span>{format(selectedDate, "d ", { locale: ptBR })}</span>
            <span>de</span>
            <span className="capitalize">
              {format(selectedDate, " MMMM", { locale: ptBR })}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-light text-gray-400">Horário</h2>
          <p className="text-sm font-light">{format(selectedDate, "HH:mm")}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-light text-gray-400">Barbearia</h2>
          <p className="text-sm font-light">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
