import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

//TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  return (
    <>
      <Card className="min-w-[90%] rounded-xl">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-3 pl-3">
            <Badge
              variant={isConfirmed ? "destructive" : "secondary"}
              className="w-fit text-sm font-normal"
            >
              {isConfirmed ? "confirmado" : "finalizado"}
            </Badge>
            <h3>{booking.service.name}</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm font-normal text-gray-400">
                {booking.service.barbershop.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-3">
            <p className="px-3 text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="px-5 text-2xl">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-lg">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
