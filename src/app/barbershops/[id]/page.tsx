import Image from "next/image"
import { db } from "@/app/_lib/prisma"
import { Button } from "@/app/_components/ui/button"
import { ChevronsLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ServiceItem from "@/app/_components/service-item"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  console.log(barbershop?.services)

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronsLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      <div className="bordder-b space-y-4 border-solid p-5">
        <h2 className="text-sm font-semibold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-justify text-base font-light">
          {barbershop?.description}
        </p>
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-sm font-semibold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
