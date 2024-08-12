import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="Logo FSW Barber" src="/logo.svg" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-none">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-scroll">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="./hh.jpg" />
              </Avatar>

              <div>
                <p className="font-normal">James Soarez</p>
                <p className="text-xs font-extralight">jamesoarez@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button
                  className="justify-start gap-3 font-light"
                  variant={"ghost"}
                  asChild
                >
                  <Link href="/">
                    <Image
                      alt="ícone de uma casa"
                      src="./home_icon.svg"
                      height={18}
                      width={18}
                    />
                    Início
                  </Link>
                </Button>
              </SheetClose>

              <Button
                className="justify-start gap-3 font-light"
                variant={"ghost"}
              >
                <Image
                  alt="ícone de calendário do agendamento"
                  src="./calendar_icon.svg"
                  height={18}
                  width={18}
                />
                Agendamento
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-3 font-light"
                  variant={"ghost"}
                >
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-8">
              <Button
                className="justify-start gap-3 font-light"
                variant={"ghost"}
              >
                <LogOutIcon size={18}></LogOutIcon>
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
