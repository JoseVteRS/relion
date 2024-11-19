"use client";

import Link from "next/link";

export default function BannerCTA() {
  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-4 my-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">¡Crea tu lista de regalos!</h2>
        <p className="text-gray-100">
          Comparte tus deseos con amigos y familiares de forma fácil y organizada.
        </p>
      </div>
      <Link 
        href="/es/sign-up"
        className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
      >
        Crear cuenta
      </Link>
    </div>
  )
}
