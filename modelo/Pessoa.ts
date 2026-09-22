import { Campo } from "../anotacao/Campo";
import { Tabela } from "../anotacao/Tabela";
import { SuperTabela } from "./SuperTabela";

@Tabela
export class Pessoa extends SuperTabela<number> {
    constructor(nome: string, idade: number, telefone: string) {
        super();
        this.nome = nome;
        this.idade = idade;
    }
    @Campo({ colunaNome: "super_ID", isPk: true, isObrigatorio: true })
    private id = 0;

    @Campo({ colunaNome: "txt_nome", isObrigatorio: true })
    private nome: string;

    @Campo({ colunaNome: "idade" })
    private idade = 10;

    private transienteSave = false;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getTransienteSave(): boolean {
        return this.transienteSave;
    }

    public setTransienteSave(transienteSave: boolean): void {
        this.transienteSave = transienteSave;
    }
}

