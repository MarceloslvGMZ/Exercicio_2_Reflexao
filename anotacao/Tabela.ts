import 'reflect-metadata';

export const TABELA_METADATA_KEY = Symbol("tabela");

export interface TabelaOpcoes {
    nome: string;
}

export function Tabela(opcoes: Function | TabelaOpcoes): any {
    if (typeof opcoes === "function") {
        const nome = opcoes.name.toLowerCase();
        Reflect.defineMetadata(TABELA_METADATA_KEY, nome, opcoes);
        return opcoes;
    }
    return (constructor: Function) => {
        Reflect.defineMetadata(TABELA_METADATA_KEY, opcoes.nome, constructor);
    };
}