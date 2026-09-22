import "reflect-metadata";
import { CAMPOS_METADATA_KEY, CampoMetadata } from "../anotacao/Campo";
import { SuperTabela } from "../modelo/SuperTabela";

type ObjetoTabela = SuperTabela<unknown>;

/**
 * Utilitário que concentra as operações reflexivas da aula.
 * A API pública procura os metadados registrados pelos decorators e depois
 * invoca getters/setters por nome, reproduzindo a ideia do exemplo Java.
 */
export class ReflexaoTabela {
    public static getCampos(objeto: ObjetoTabela): CampoMetadata[] {
        this.validarObjeto(objeto);

        const campos = Reflect.getMetadata(
            CAMPOS_METADATA_KEY,
            objeto.constructor,
        ) as Map<string, CampoMetadata> | undefined;

        return campos ? [...campos.values()] : [];
    }

    public static getPkName(objeto: ObjetoTabela): string {
        return this.getPkCampo(objeto).colunaNome;
    }

    public static getPkValue(objeto: ObjetoTabela): unknown {
        const campo = this.getPkCampo(objeto);
        return this.invokeGetter(objeto, campo.propriedade);
    }

    public static setPkValue(objeto: ObjetoTabela, valor: unknown): void {
        const campo = this.getPkCampo(objeto);
        this.invokeSetter(objeto, campo.propriedade, valor);
    }

    public static getTableName(objeto: ObjetoTabela): string {
        this.validarObjeto(objeto);
        const nomeAnotado = objeto.getPkName();
        return nomeAnotado ?? objeto.constructor.name.toLowerCase();
    }

    public static isCamposObrigatoriosPreenchidos(objeto: ObjetoTabela): boolean {
        return this.getCampos(objeto)
            .filter((campo) => campo.isObrigatorio)
            .every((campo) => {
                const valor = this.getValue(objeto, campo.propriedade);
                return valor !== null && valor !== undefined && valor !== "";
            });
    }

    private static getPkCampo(objeto: ObjetoTabela): CampoMetadata {
        const camposPk = this.getCampos(objeto).filter((campo) => campo.isPk);
        const nomeClasse = objeto.constructor.name;

        if (camposPk.length === 0) {
            throw new Error(`Classe ${nomeClasse} não possui um campo @Campo({ isPk: true }).`);
        }
        if (camposPk.length > 1) {
            throw new Error(`Classe ${nomeClasse} possui mais de um campo @Campo({ isPk: true }).`);
        }
        return camposPk[0];
    }

    private static getValue(objeto: ObjetoTabela, propriedade: string): unknown {
        const getter = `get${this.ucFirst(propriedade)}`;
        if (typeof (objeto as unknown as Record<string, unknown>)[getter] === "function") {
            return this.invokeMethod(objeto, getter);
        }
        return (objeto as unknown as Record<string, unknown>)[propriedade];
    }

    private static invokeGetter(objeto: ObjetoTabela, propriedade: string): unknown {
        return this.invokeMethod(objeto, `get${this.ucFirst(propriedade)}`);
    }

    private static invokeSetter(objeto: ObjetoTabela, propriedade: string, valor: unknown): void {
        this.invokeMethod(objeto, `set${this.ucFirst(propriedade)}`, valor);
    }

    private static invokeMethod(objeto: ObjetoTabela, nomeMetodo: string, ...args: unknown[]): unknown {
        const metodo = (objeto as unknown as Record<string, unknown>)[nomeMetodo];
        if (typeof metodo !== "function") {
            throw new Error(`A classe ${objeto.constructor.name} não possui o método público ${nomeMetodo}().`);
        }
        return metodo.apply(objeto, args);
    }

    private static validarObjeto(objeto: ObjetoTabela): void {
        if (objeto === null || objeto === undefined) {
            throw new Error("A reflexão exige uma instância não nula de SuperTabela.");
        }
    }

    private static ucFirst(nome: string): string {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }
}
