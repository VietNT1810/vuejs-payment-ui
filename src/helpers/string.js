import moment from 'moment/moment';

export const formatDate = (date) => {
    const thisMoment = moment(date).format('ll');
    return thisMoment;
};

export const getProductName = (product) => {
    let productsName = {
        'html-js-bundle': 'HTML / JS Course Bundle',
        'digital-marketing': 'Digital Marketing',
    };
    return productsName[product] || [];
};
