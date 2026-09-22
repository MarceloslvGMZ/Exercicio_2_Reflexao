import { Aluno } from "../modelo/Aluno";
import { Pessoa } from "../modelo/Pessoa";
import { SuperTabela } from "../modelo/SuperTabela";
import { ReflexaoTabela } from "../utils/ReflexaoTabela";

function imprimirDadosTabela(tabela: SuperTabela<unknown>): void {
    console.log(`Classe: ${tabela.constructor.name}`);
    console.log(`Tabela: ${tabela.getTableName()}`);
    console.log(`Campos: ${ReflexaoTabela.getCampos(tabela).map((campo) => campo.colunaNome).join(", ")}`);
    console.log(`Nome da PK: ${tabela.getPkName()}`);
    console.log(`Valor da PK: ${String(tabela.getPk())}`);
    console.log(`Obrigatórios preenchidos: ${tabela.isCamposObrigatoriosPreenchidos()}`);
    console.log("----------------------------------------");
}

const pessoa = new Pessoa("Coisa", 10, "123456");
pessoa.setId(10);
//pessoa.setNome("Coisa");
imprimirDadosTabela(pessoa);

const aluno = new Aluno("123456", "", "123456");
//aluno.setNome("Aluno");
aluno.setTelefone("999999");
imprimirDadosTabela(aluno);

// setPk() não conhece o nome do atributo: a ReflexaoTabela encontra o campo
// anotado como PK e chama seu setter dinamicamente.
pessoa.setPk(20);
console.log(`Pessoa após setPk(20): ${pessoa.getId()}`);
console.log("----------------------------------------");
