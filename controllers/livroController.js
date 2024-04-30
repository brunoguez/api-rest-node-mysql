const express = require('express');
const router = express.Router();
//pegamos a entidade em si dessa forma usando .Livro
const modelo = require('../models');

//Busca Livro (GET)
router.get('/', async (req, res) => {
    const teste = await modelo.sequelize.query(`select l.*, e.descricao DescricaoEditora, c.descricao DescricaoCategoria, a.nome NomeAutor
    from livros l
    inner join editoras e on e.id = l.fk_editora
    inner join categoria c on c.id = l.fk_categoria
    inner join autors a on a.id = l.fk_autor`);
    console.log('aqui',teste);

    const livros = await modelo.Livro.findAll();
    res.status(200).json(teste[0]);
});
//Cadastra Livro (POST)
router.post('/', async (req, res) => {
    const { fk_editora, fk_categoria, fk_autor, titulo } = req.body;
    const newEdit = await modelo.Livro.create({
        fk_editora, fk_categoria,
        fk_autor, titulo
    })
    res.status(200).json({ message: 'Cadastrado com sucesso' });
});
//Busca Por id o Livro (GET)
router.get('/:id', async (req, res) => {
    const id = req.params;
    const livro = await modelo.Livro.findByPk(req.params.id);
    res.status(200).json(livro);
});
//Deleta Livro por id (DELETE)
router.delete('/:id', async (req, res) => {
    await modelo.Livro.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ message: 'Excluído com sucesso' })
});
//Altera Livro por ID (PUT)
router.put('/:id', async (req, res) => {
    const { fk_editora, fk_categoria, fk_autor, titulo } = req.body;
    await modelo.Livro.update(
        { fk_editora, fk_categoria, fk_autor, titulo },
        {
            where: { id: req.params.id },
        }
    );
    res.status(200).json({ message: 'Atualizado com sucesso' });
});
module.exports = router;