import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

//TODO: receber agendamento como prop
const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card className="rounded-xl">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-3 pl-3">
            <Badge
              variant="destructive"
              className="w-fit text-destructive-foreground"
            >
              Confirmado
            </Badge>
            <h3 className="text-lg">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-base font-light">Barbearia FSW</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-8">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-1xl">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
