import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[169px] rounded-2xl">
      <CardContent className="p-0 px-1 pb-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="rounded-xl object-cover"
            src={barbershop.imageUrl}
          />
          <Badge
            className="absolute left-1 top-1 space-x-1 opacity-95"
            variant={"destructive"}
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="font-normal text-white">5,0</p>
          </Badge>
        </div>

        <div className="px-2 py-2">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>

          <Button
            className="mt-4 w-full rounded-xl"
            variant="secondary"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem