const User = require('../models/User');

const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    return res.json(user);
  },

  async login (req, res) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send(
        'email e password não podem ser vazios!'
      );
    }
    const user = await User.findOne({ where: { username: username, password: password } });
    if(user !== null){ 
      //auth ok 
      const id = 1; //esse id viria do banco de dados 
      var token = jwt.sign({ id }, process.env.SECRET, { 
          expiresIn: 300 // 5min 
      }); 
      
      console.log("Fez login e gerou token!");
      return res.status(200).send({ auth: true, token: token }); 
    }
    
    return res.status(401).send('Login inválido!'); 
  },
  
  async logout (req, res) {
  
    const { user, cookies: { auth_token: authToken } } = req
  
    if (user && authToken) {
      console.log("Fez logout e cancelou o token!");
      res.status(200).send({ auth: false, token: null }); 
    }
  
    return res.status(400).send(
      { errors: [{ message: 'Não autenticado' }] }
    );
  },

};
