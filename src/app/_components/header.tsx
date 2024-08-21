import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="flex flex-row items-center justify-between px-5 py-6">
        <Link href={"/"}>
          <Image
            alt="Logo FSW Barber"
            src="/logo.svg"
            height={18}
            width={120}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-none">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
