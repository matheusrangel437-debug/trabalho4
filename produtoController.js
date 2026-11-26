const produtoModel = require('../model/produtoModel.js');

async function getLivros(req, res) {
  try {
    const livros = await produtoModel.listarTodos();
    return res.status(200).json(livros);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao consultar livros no banco de dados.' });
  }
}

async function getLivroPorId(req, res) {
  try {
    const { id } = req.params;
    const livro = await produtoModel.buscarPorId(id);

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    return res.status(200).json(livro);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar o livro no banco de dados.' });
  }
}

async function postLivro(req, res) {
  try {
    const { titulo, autor, ano_publicacao, quantidade, data_cadastro } = req.body;

    const faltando = [];
    if (!titulo) faltando.push('titulo');
    if (!autor) faltando.push('autor');
    if (ano_publicacao === undefined || ano_publicacao === null) faltando.push('ano_publicacao');
    if (!data_cadastro) faltando.push('data_cadastro');

    if (faltando.length > 0) {
      return res.status(400).json({
        mensagem: `Campos obrigatórios ausentes: ${faltando.join(', ')}.`
      });
    }

    const idGerado = await produtoModel.cadastrar({
      titulo,
      autor,
      ano_publicacao,
      quantidade,
      data_cadastro
    });

    return res.status(201).json({
      mensagem: 'Livro cadastrado com sucesso!',
      id: idGerado
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao cadastrar livro no banco de dados.' });
  }
}

module.exports = { getLivros, getLivroPorId, postLivro };
