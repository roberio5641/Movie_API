const jwt  = require('jsonwebtoken');
const User = require('../models/user');

const protect  = async (req, res, next) => {
    try{
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];    
        }

        if (!token) {
            return res.status(401).json({ message: "Não Autorizado, token não encontrado" });

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if(!req.user){
            return res.status(401).json({ message: "Token Invalido" });
        }

        next();
    }catch(error){
        res.status(401).json({ message: "Token Invalido" });
    }
};

module.exports = { protect };