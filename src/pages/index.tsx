import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import { useState } from "react";

export default function Home() {
  const clientes = [
    new Cliente("Ana", 22, "1"),
    new Cliente("João", 32, "2"),
    new Cliente("Maria", 22, "3"),
    new Cliente("Pedro", 18, "4"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    console.log(cliente);
  }
  function clienteExcluido(cliente: Cliente) {
    console.log(cliente);
  }

  function salvarCliente(cliente: Cliente) {
    console.log(cliente);
  }
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout titulo="Cadastro simples">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end">
              <Botao
                onClick={() => setVisivel("form")}
                className="mb-4 bg-gradient-to-r from-green-400 to-green-700"
              >
                Novo Cliente
              </Botao>
            </div>

            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            ></Tabela>
          </>
        ) : (
          <Formulario
            cliente={clientes[0]}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </div>
  );
}
