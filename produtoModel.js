const conexao = require('./conexao');

async function listarTodos() {
  const [linhas] = await conexao.query('SELECT * FROM livro ORDER BY titulo ASC');
  return linhas;
}

async function buscarPorId(id) {
  const [linhas] = await conexao.query('SELECT * FROM livro WHERE id = ?', [id]);
  return linhas[0];
}

async function cadastrar(livro) {
  const { titulo, autor, ano_publicacao, quantidade, data_cadastro } = livro;
  const qtdFinal = quantidade !== undefined ? quantidade : 1;

  const sql = `
    INSERT INTO livro (titulo, autor, ano_publicacao, quantidade, data_cadastro)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [resultado] = await conexao.query(sql, [
    titulo,
    autor,
    ano_publicacao,
    qtdFinal,
    data_cadastro
  ]);

  return resultado.insertId;
}

module.exports = { listarTodos, buscarPorId, cadastrar };
