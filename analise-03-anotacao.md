# Análise do projeto Java `03-Anotacao`

## O que veio no arquivo anexado

O ZIP contém fontes Java, classes compiladas e arquivos de configuração do
Eclipse/IntelliJ. Os diretórios `.idea`, `.settings` e `bin` são metadados da
IDE e artefatos de compilação; não são instruções da atividade. Também não há
README ou enunciado textual dentro do ZIP.

## Fluxo do programa

1. `@Campo` é uma anotação de campo retida em runtime (`RetentionPolicy.RUNTIME`)
   e aceita somente em atributos (`ElementType.FIELD`).
2. `Pessoa` e `Profissional` marcam seus atributos com `@Campo`, informando o
   nome da coluna, se o campo é chave primária e se é obrigatório.
3. `SuperTabela` oferece uma API comum (`getPkName`, `getPk`, `setPk` e
   `getTableName`) sem conhecer o nome concreto do atributo da chave.
4. `ReflexaoTabela` consulta os `Field`s declarados pela classe, localiza o
   único `@Campo(isPk = true)` e chama o getter/setter por nome.
5. `TesteTabels` instancia as entidades e comprova que a chave pode ser lida e
   alterada pela camada reflexiva.

`@Teste` está definido como uma anotação de runtime, mas não é usado pelas
classes do fluxo demonstrado.

## Pontos de atenção encontrados

- Em `Pessoa.java`, `isPk=true` está comentado. Se o fonte for executado como
  está, `getPkName()` não encontra uma chave e lança uma exceção.
- `getDeclaredFields()` examina somente os campos declarados na classe atual;
  ele não percorre automaticamente a hierarquia de superclasses.
- `isCamposObrigatoriosPreenchidos()` ainda está como TODO e sempre retorna
  `true`.
- `Profissional.getTableName()` substitui o nome calculado por `"CoiSA"`, o que
  parece ser um teste temporário.
- O exemplo Java usa getters/setters para acessar os campos privados, embora a
  anotação esteja no atributo. Isso é importante: o decorator registra
  metadados, mas o utilitário decide como acessar o valor.

## Tradução para TypeScript

O exemplo novo em `aula03_anotacoes` mantém esse desenho. `@Campo` usa
`reflect-metadata` para registrar um `Map` no construtor da classe, e
`ReflexaoTabela` consulta esse mapa. `@Tabela` foi acrescentado como um
decorator de classe para implementar o TODO sugerido no `SuperTabela.java` e
permitir configurar o nome da tabela sem sobrescrever o método manualmente.

