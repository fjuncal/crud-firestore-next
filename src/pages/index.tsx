import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCLiente from "@/firebase/db/ColecaoCliente";
import { useEffect, useState } from "react";

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCLiente();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      setVisivel("tabela");
    });
  }
  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel("form");
  }
  function clienteExcluido(cliente: Cliente) {
    console.log(cliente);
  }

  function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel("form");
  }
  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente);
    obterTodos();
  }
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
                onClick={novoCliente}
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
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </div>
  );
}
