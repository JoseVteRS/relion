import React from "react";

export const NewPresentAdded = ({
  userName,
  listName,
  linkList,
}: {
  userName: string;
  listName: string;
  linkList: string;
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "0.375rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "1.125rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        ¡Nuevo regalo añadido!
      </h1>
      <p style={{ marginBottom: "1rem" }}>Hola,</p>
      <p style={{ marginBottom: "1rem" }}>
        {userName} ha añadido un nuevo regalo a la lista {" "}
        <span style={{ fontWeight: "600" }}>&ldquo;{listName}&rdquo;</span>. ¡Échale un
        vistazo y no te lo pierdas!
      </p>
      <a
        href={linkList}
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "0.375rem",
          textDecoration: "none",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Ver lista
      </a>
      <p style={{ marginBottom: "1rem" }}>
        Saludos,
        <br />
        <span style={{ fontWeight: "600" }}>Relion</span>
      </p>
    </div>
  );
};
