const { roundUp } = require("./numbers.lib");
const moment = require('moment');
const CommonLib = {
    isEmpty(data) {
        switch (typeof data) {
            case 'string': return !data || data === "";
            case 'number': return !data;
            case 'object': return !Object.keys(data).length;
            default: return false;
        }
    },
    getPagination(page, limit, total) {
        const pagination = {
            currentPage: page,
            lastPage: 0,
            perPage: limit,
            total: 0
        };
        pagination.lastPage = Math.ceil(total / limit);
        pagination.total = total;
        return pagination;
    },
    getOffset(page, limit) {
        return (page - 1) * limit;
    },
    getSizeFormatted(size, format = "BYTES") {
        format = format.toUpperCase();
        if (size < 1024) return { size: roundUp(size), format: format };
        let size_chat = ['BYTES', 'KB', 'MB', 'GB', 'TB'];
        let index = size_chat.indexOf(format);
        if (index >= size_chat.length) return { size: roundUp(size), format: format };
        let s = size / 1024;
        return this.getSizeFormatted(s, size_chat[index + 1]);
    },
    getErrorListObj: async (_err) => {
        const _errorList = _err.errors;
        const _errorFieldList = [...new Set(_err.inner.map((x) => x.path))];

        var _errorObj = {};
        for (const [_index, _field] of _errorFieldList.entries()) {
            _errorObj[_field] = _errorList[_index];
        }
        return { errors: _errorObj };
    },
    today_date() {
        return moment().format("YYYY-MM-DD");
    },
    get_date_format(dateStr) {
        return moment(dateStr).format("YYYY-MM-DD");
    },
    maxValueOfArrayObject(objectArray, key) {
        let maxDateObject = {};
    
        if (Array.isArray(objectArray)) {
            if (key === 'maturity_date') {
                maxDateObject = { maturity_date: "" };
                maxDateObject = objectArray.reduce((max, obj) => (obj.date > max.date ? obj : max));
                console.log(maxDateObject)
                return moment(maxDateObject.maturity_date).format('MMM-YYYY');
            }
        }
        return null;
    },
    numberFormat(value, currency = 'USD', removeCurrencySign = false) {
        const currencyOpt = { style: 'currency', currency: currency };
        let formattedValue = "";
    
        if (value != null && value !== undefined) {
            if (currency === 'INR') {
                formattedValue = new Intl.NumberFormat('en-IN', currencyOpt).format(Math.round(Number(value)));
            } else {
                formattedValue = new Intl.NumberFormat('en-US', currencyOpt).format(Math.round(Number(value)));
            }
        } else {
            formattedValue = new Intl.NumberFormat('en-IN', currencyOpt).format(0);
        }
    
        if (removeCurrencySign) {
            formattedValue = formattedValue.substring(1);
        }
    
        return formattedValue.split('.').shift();
    },
};

module.exports = CommonLib;