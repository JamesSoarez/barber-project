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
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%] rounded-xl">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-3 pl-3">
              <Badge
                variant={isConfirmed ? "warning" : "secondary"}
                className="w-fit rounded-lg text-sm font-semibold"
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
      <SheetContent className="w-[80%] border-none">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-normal">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[217px] w-full items-end">
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
            className="w-fit rounded-lg text-sm font-semibold"
          >
            {isConfirmed ? "confirmado" : "finalizado"}
          </Badge>
          <Card className="mb-6 mt-3 rounded-xl">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">{booking.service.name}</h2>
                <p className="text-base font-semibold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-light text-gray-400">Data</h2>
                <p className="text-sm font-light">
                  <span>{format(booking.date, "d ", { locale: ptBR })}</span>
                  <span>de</span>
                  <span className="capitalize">
                    {format(booking.date, " MMMM", { locale: ptBR })}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-light text-gray-400">Horário</h2>
                <p className="text-sm font-light">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-light text-gray-400">Barbearia</h2>
                <p className="text-sm font-light">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-10">
          <div className="flex flex-col items-center gap-4">
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"destructive"} className="w-full rounded-xl">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%] space-y-5 rounded-xl border-none">
                  <DialogHeader>
                    <DialogTitle className="mb-5">
                      Você tem certeza que deseja cancelar?
                    </DialogTitle>
                    <DialogDescription className="text-sm font-normal text-gray-400">
                      Ao cancelar, você perderá sua reserva e não poderá
                      recuperá-la. Essa ação não pode ser desfeita.
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
