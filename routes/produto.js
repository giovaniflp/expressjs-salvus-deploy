var express = require('express');
var router = express.Router();
const connection = require('../db');

// Endpoint: /produto

// Criando um produto 
router.post('/', (req, res) => {
    const { nome, descricao, preco } = req.body;
    const query = 'INSERT INTO Produto (nome, descricao, preco) VALUES (?, ?, ?)';
    connection.query(query, [nome, descricao, preco], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(`Produto adicionado com ID: ${results.insertId}`);
      }
    });
  });

// READ - Obter todos os produtos
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página atual, padrão 1
  const limit = 6; // Número de itens por página
  const offset = (page - 1) * limit; // Calcular offset

  connection.query('SELECT * FROM Produto LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

router.get('/allProducts', (req, res) => {
  connection.query('SELECT * FROM Produto', (err, results) => {
    if (err) {
      res.status(500).send
    } else {
      res.json(results);
    }
})
})

// READ - Obter um produto pelo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Produto WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length === 0) {
        res.status(404).send('Produto não encontrado');
      } else {
        res.json(results[0]);
      }
    });
  });

  // UPDATE - Atualizar um produto pelo ID
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    let fields = [];
    let values = [];
  
    for (const [key, value] of Object.entries(updates)) {
      // Ignorar campos nulos, undefined, vazios ("") ou zerados(0)
      if (value !== null && value !== undefined && value !== "" && value != 0) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
  
    if (fields.length > 0) {
      fields.push('data_criacao = CURRENT_TIMESTAMP');
    } else {
      return res.status(400).send('Nenhum campo válido para atualizar');
    }
  
    const query = `UPDATE Produto SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
  
    connection.query(query, values, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Produto não encontrado');
      } else {
        res.send('Produto atualizado com sucesso');
      }
    });
  });
  
  // DELETE - Remover um produto pelo ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Produto WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Produto não encontrado');
      } else {
        res.send('Produto removido com sucesso');
      }
    });
  });

module.exports = router;
