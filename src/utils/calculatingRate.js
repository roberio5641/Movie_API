const calculateAvarageRate = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));

};

module.exports = {calculateAvarageRate};