"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { CheckCircle2Icon } from "lucide-react"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "20:00",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOsThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOsThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const router = useRouter()
  const { data } = useSession()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      {
        /*toast.error("Reserva realizada com sucesso!")*/
      }
    } catch (error) {
      console.log(error)
      toast.error("Erro ao reservar! Tente novamente!")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
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
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="mt-4 text-base font-normal">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size={"sm"}
                  className="mt-4 rounded-xl"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="w-[90%] overflow-auto border-none px-0 pb-16">
                  <SheetHeader className="border-b border-solid">
                    <SheetTitle className="pb-6 pl-5 text-left text-lg font-normal">
                      Faça sua reserva
                    </SheetTitle>
                  </SheetHeader>

                  <div className="px-2 pt-3">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-auto px-5 pb-8 pt-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "ghost"
                            }
                            className="rounded-xl"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="ml-3 pb-3 pt-2 text-sm font-light">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className="pt-8s px-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  {selectedTime && selectedDay && (
                    <SheetFooter className="px-5 pt-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant={"default"}
                            onClick={handleCreateBooking}
                            className="w-full rounded-xl"
                          >
                            Confirmar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[80%] rounded-xl border-none">
                          <DialogHeader>
                            <CheckCircle2Icon
                              size={"60%"}
                              className="ml-[20%] fill-primary text-[#151619]"
                            />
                            <DialogTitle className="text-xl font-medium">
                              Reserva Efetuada!
                            </DialogTitle>
                            <DialogDescription className="text-base font-normal text-gray-400">
                              Sua reserva foi agendada com sucesso.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-row gap-3">
                            <Dialog
                              open={bookingSheetIsOpen}
                              onOpenChange={handleBookingSheetOpenChange}
                            >
                              <DialogClose asChild>
                                <Button
                                  variant={"secondary"}
                                  className="w-full rounded-xl p-0"
                                >
                                  Fechar
                                </Button>
                              </DialogClose>
                            </Dialog>

                            <DialogClose asChild>
                              <Button
                                variant={"default"}
                                className="w-full rounded-xl p-0"
                                onClick={() => router.push("/bookings")}
                              >
                                Agendamentos
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[80%] rounded-xl border-none">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
