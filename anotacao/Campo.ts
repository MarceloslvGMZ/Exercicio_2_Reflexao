import "reflect-metadata";

export const CAMPOS_METADATA_KEY = Symbol("campos");

export interface CampoOpcoes {
    colunaNome: string;
    isPk?: boolean;
    isObrigatorio?: boolean;
}

export interface CampoMetadata extends Required<CampoOpcoes> {
    propriedade: string;
}

/**
 * Equivalente TypeScript da anotação Java @Campo.
 *
 * O decorator é executado quando a classe é declarada. Nesse momento ele
 * registra os dados do campo no construtor da classe para consulta posterior. (ClassDecorator para tabela)
 */
export function Campo(opcoes: CampoOpcoes): PropertyDecorator {

    return (target, propertyKey) => {
        const construtor = target.constructor;

        if (!opcoes.colunaNome?.trim()) {
            throw new Error(`O decorator @Campo exige uma colunaNome não vazio.
Classe: ${construtor.name}\n Propriedade: ${String(propertyKey)}`);
        }

        const metadata: Omit<CampoMetadata, "propriedade"> = {
            colunaNome: opcoes.colunaNome,
            isPk: opcoes.isPk ?? false,
            isObrigatorio: opcoes.isObrigatorio ?? false,
        };


        const campos =
            (Reflect.getOwnMetadata(CAMPOS_METADATA_KEY, construtor) as Map<string, CampoMetadata> | undefined)
            ?? new Map<string, CampoMetadata>();

        campos.set(String(propertyKey), {
            ...metadata,
            propriedade: String(propertyKey),
        });

        Reflect.defineMetadata(CAMPOS_METADATA_KEY, campos, construtor);
    };
}

