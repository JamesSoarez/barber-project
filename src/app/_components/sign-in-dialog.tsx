import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle className="my-2 font-medium">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="text-sm font-normal text-gray-400">
          Conecte-se usando sua conta Google
        </DialogDescription>
      </DialogHeader>
      <Button
        variant={"secondary"}
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
    </>
  )
}

export default SignInDialog
