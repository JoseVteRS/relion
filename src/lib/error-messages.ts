export const ErrorMessage = {
  lists: {
    NotFoundLists: "No se han encontrado listas",
    NotFoundWithId: "Lista no encontrada",
    Expired: "Evento expirado",
  },
  presents: {
    NotFoundPresents: "No se han encontrado regalos",
    NotFoundWithId: "Regalo no encontrado",
    NotAvailable: "Regalo no disponible",
    AlreadyPicked: "Regalo ya elegido",
    AlreadyPickedByUser: "Ya has elegido este regalo",   
    NotPicked: "Regalo no elegido",
    NotPickedByUser: "No has elegido este regalo",
    NotAllowedToPickYourOwnPresent: "No puedes elegir tu propio regalo",
  },
  user: {
    Unauthorized: "No has iniciado sesión",
  },
  server: {
    InternalServerError: "Error interno del servidor",
  },
};

export const ServerErrorLog = {
  lists: {
    NotFoundLists: "api:get:lists:NotFoundLists",
  }
}