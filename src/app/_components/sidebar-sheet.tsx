"use client"

import { Button } from "./ui/button"
import { LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
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
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="w-[90%] overflow-scroll border-none">
      <SheetHeader>
        <SheetTitle className="text-left text-lg font-normal">Menu</SheetTitle>
      </SheetHeader>

      <div className="mt-2 flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-normal">{data.user.name}</p>
              <p className="text-xs font-extralight">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="font-light">Olá, faça o seu login.</p>
            <Dialog>
              <DialogTrigger>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[80%] rounded-xl border-none">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
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
                src="/home_icon.svg"
                height={18}
                width={18}
              />
              Início
            </Link>
          </Button>
        </SheetClose>

        {data?.user?.name && (
          <Button
            className="justify-start gap-3 font-light"
            variant={"ghost"}
            asChild
          >
            <Link href={"/bookings"}>
              <Image
                alt="ícone de calendário do agendamento"
                src="/calendar_icon.svg"
                height={18}
                width={18}
              />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-3 font-light"
            variant={"ghost"}
            asChild
          >
            <SheetClose asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </SheetClose>
          </Button>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 pt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full justify-start gap-2 font-light"
                variant={"ghost"}
              >
                <LogOutIcon size={22} />
                Sair da conta
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[80%] space-y-5 rounded-xl border-none">
              <DialogHeader>
                <DialogTitle className="mb-5 font-medium">
                  Fazer logout
                </DialogTitle>
                <DialogDescription className="text-sm font-normal text-gray-400">
                  Deseja mesmo sair da plataforma?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row gap-3">
                <DialogClose asChild>
                  <Button variant={"secondary"} className="w-full rounded-xl">
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant={"destructive"}
                    className="w-full rounded-xl"
                    onClick={handleLogoutClick}
                  >
                    Sair
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
