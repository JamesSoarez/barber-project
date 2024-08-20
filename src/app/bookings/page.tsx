import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    //TODO: mostrar pop-up de login, caso usuário não esteja logado
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()

  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="text-lg font-normal">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="pt-6 text-sm text-gray-400">
            Você não possui agendamentos.
          </p>
        )}
        {confirmedBookings.length === 0 && concludedBookings.length > 0 && (
          <p className="pt-6 text-sm text-gray-400">
            Você não possui agendamentos confirmados.
          </p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <div className="space-y-3 pt-6">
              <h2 className="mb-3 mt-6 text-sm font-medium uppercase text-gray-400">
                Confirmados
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <div className="space-y-3 pt-6">
              <h2 className="mb-3 mt-6 text-sm font-medium uppercase text-gray-400">
                Finalizados
              </h2>
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
