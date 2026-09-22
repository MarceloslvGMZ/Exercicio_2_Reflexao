import { Campo } from "../anotacao/Campo";
import { Tabela } from "../anotacao/Tabela";
import { SuperTabela } from "./SuperTabela";

@Tabela({ nome: "tb_aluno" })
export class Aluno extends SuperTabela<string> {
    constructor(matricula: string, nome: string, telefone: string) {
        super();
        this.matricula = matricula;
        this.nome = nome;
        this.telefone = telefone;
    }
    @Campo({ colunaNome: "matricula", isPk: true, isObrigatorio: true })
    private matricula!: string;

    @Campo({ colunaNome: "txt_nome", isObrigatorio: true })
    private nome!: string;

    @Campo({ colunaNome: "telefone" })
    private telefone = '222222';


    public getMatricula(): string {
        return this.matricula;
    }

    public setMatricula(mat: string): void {
        this.matricula = mat;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(tel: string): void {
        this.telefone = tel;
    }
}

