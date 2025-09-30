const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'});
}


const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const user = await User.create({ name, email, password })
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ message: 'Erro do Servidor' });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne ({ email })
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Credenciais Inválidas' });
        }
    }catch(error){
        res.status(400).json({ message: 'Erro do Servidor' });
    }
};

module.exports = { register, login }