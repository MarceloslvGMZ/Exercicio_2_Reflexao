import { Campo } from "../anotacao/Campo";
import { SuperTabela } from "./SuperTabela";

export class Produto extends SuperTabela<number> {

    @Campo({ colunaNome: "id", isObrigatorio: true, isPk: true })
    private id: number;

    @Campo({ colunaNome: "nome", isObrigatorio: true, isPk: false })
    private nome: String;

    constructor(id: number, nome: String) {
        super();
        this.id = id;
        this.nome = nome;

    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public setNome(nome: String): void {
        this.nome = nome;
    }

    public getNome(): String {
        return this.nome;
    }
}