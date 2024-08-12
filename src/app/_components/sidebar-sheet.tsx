"use client"

import { Button } from "./ui/button"
import { LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-scroll border-none">
      <SheetHeader>
        <SheetTitle className="text-left text-base font-normal">
          Menu
        </SheetTitle>
      </SheetHeader>

      <div className="mt-2 flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? "/hh.jpg"} />
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
              <DialogContent className="w-[75%] rounded-xl border-none">
                <DialogHeader>
                  <DialogTitle className="my-2 font-medium">
                    Faça login na plataforma
                  </DialogTitle>
                  <DialogDescription className="font-light">
                    Conecte-se usando sua conta Google
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant={"outline"}
                  className="mt-3 gap-2 rounded-xl text-base"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    alt="logo Google"
                    src="/google_icon.svg"
                    width={20}
                    height={20}
                  />
                  Google
                </Button>
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

        <Button className="justify-start gap-3 font-light" variant={"ghost"}>
          <Image
            alt="ícone de calendário do agendamento"
            src="/calendar_icon.svg"
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
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18}></LogOutIcon>
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
