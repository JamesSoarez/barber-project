"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import BookingSummary from "./booking-summary"

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

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.success("Erro ao cancelar reserva. Tente novamente!")
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full cursor-pointer" asChild>
        <Card className="min-w-[90%] rounded-xl">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-3 pl-3">
              <Badge
                variant={isConfirmed ? "warning" : "newsecondary"}
                className="w-fit rounded-xl text-sm font-semibold"
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
      </SheetTrigger>
      <SheetContent className="w-[90%] overflow-auto border-none">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-normal">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da Barbearia ${booking.service.barbershop.name}`}
            src={"/map_card.svg"}
            fill
            className="rounded-lg object-cover"
          />

          <Card className="z-50 mx-3 mb-5 w-full rounded-lg">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-medium">{barbershop.name}</h3>
                <p className="text-sm font-normal text-gray-400">
                  {barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            variant={isConfirmed ? "warning" : "secondary"}
            className="w-fit rounded-xl text-sm font-semibold"
          >
            {isConfirmed ? "confirmado" : "finalizado"}
          </Badge>

          <div className="mb-6 mt-3">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-5 pb-16">
          <div className="flex flex-col items-center gap-3">
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"destructive"} className="w-full rounded-xl">
                    Cancelar
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%] space-y-5 rounded-xl border-none">
                  <DialogHeader>
                    <DialogTitle className="mb-5 font-medium">
                      Cancelar Reserva
                    </DialogTitle>
                    <DialogDescription className="text-sm font-normal text-gray-400">
                      Tem certeza que deseja cancelar esse agendamento? Essa
                      ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button
                        variant={"secondary"}
                        className="w-full rounded-xl"
                      >
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant={"destructive"}
                        className="w-full rounded-xl"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <SheetClose asChild>
              <Button variant={"secondary"} className="w-full rounded-xl">
                Voltar
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
