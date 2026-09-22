# Aula 03: Anotações Java e Decorators TypeScript

Esta aula traduz o projeto Java `03-Anotacao` para TypeScript executado no
Node.js. O objetivo é mostrar que decorators não são apenas uma forma de
“enfeitar” classes: eles podem registrar metadados que serão lidos depois por
um código reflexivo.

## Correspondência entre os projetos

| Java | TypeScript |
| --- | --- |
| `@Campo(...)` em um atributo | `@Campo({...})` em uma propriedade |
| `@Retention(RUNTIME)` | metadado armazenado por `reflect-metadata` |
| `Field.getAnnotation(Campo.class)` | `Reflect.getMetadata(...)` |
| `SuperTabela<TypePK>` | `SuperTabela<TypePK>` |
| `ReflexaoTabela.getPkValue` | `ReflexaoTabela.getPkValue` |
| `Method.invoke(...)` | `objeto[nomeMetodo].apply(objeto, args)` |

## Execução

```bash
pnpm aula03:anotacoes
```

O exemplo cria `Pessoa` e `Profissional`, consulta os metadados de seus
campos, identifica a chave primária, lê o valor pelo getter e altera esse
valor pelo setter encontrado dinamicamente.

## Observação importante

O TypeScript apaga interfaces e generics ao compilar. Por isso, o generic da
`SuperTabela` ajuda o editor e o compilador, mas a identificação da PK em
runtime depende do decorator `@Campo` e dos metadados registrados.

