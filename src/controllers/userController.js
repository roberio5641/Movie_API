const User = require('../models/user');
const getMe => async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').populate('favorites', 'title genre year director averageRating');
        res.json(user);


    } catch (error) {
        res.status(400).json({ message: 'Erro do Servidor' });
    }
}

const getFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');

        res.json(user.favorites);
    } catch (error) {
        res.status(400).json({ message: 'Erro do Servidor' });
    }
}

module.exports = { getMe, getFavorite };