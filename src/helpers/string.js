import moment from 'moment/moment';

export const formatDate = (date) => {
    const thisMoment = moment(date).format('ll');
    return thisMoment;
};

export const formatDateFromNow = (date) => {
    // const thisMoment = moment(date, 'YYYYMMDD').fromNow();
    // return thisMoment;
    const targetDate = moment(date, 'YYYY-MM-DD h:mm:ss a');
    const diffInDays = moment().diff(targetDate, 'days');
    const formattedDate = diffInDays === 1 ? '1 day ago' : `${Math.abs(diffInDays)} days ago`;
    return formattedDate;
};

export const getProductName = (product) => {
    let productsName = {
        'html-js-bundle': 'HTML / JS Course Bundle',
        'digital-marketing': 'Digital Marketing',
    };
    return productsName[product] || [];
};

export const getHighlightSearchText = (content, searchWord) => {
    const results = [];
    const searchKeyword = searchWord.trim().toLowerCase();
    const regEsc = (str) => str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const rgxp = new RegExp('(\\S*.{0,80})?(' + regEsc(searchKeyword) + ')(.{0,80}\\S*)?', 'ig');
    content.replace(rgxp, function (match, $1, $2, $3) {
        results.push(
            `${$1 ? ($1.length < 80 ? $1 : '...' + $1) : ''}<mark>${$2}</mark>${
                $3 ? ($3.length < 80 ? $3 : $3 + '...') : ''
            }`,
        );
    });

    return results;
};
