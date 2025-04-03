const NumberLib = require("./numbers.lib");
const crypto = require('crypto');
const StringLib = {
    /**
     * 
     * @param {string} email 
     * @returns {boolean}
     */
    isEmail(email) {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test(email);
    },
    /**
     * 
     * @param {string | number} phone 
     * @returns {boolean}
     */
    isPhone(phone) {
        const regexExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
        return regexExp.test(phone);
    },
    isURL(url) {
        try {
            return Boolean(new URL(url));
        } catch (e) {
            return false;
        }
    },
    /**
     * 
     * @param {number} length 
     * @returns {string}
     */
    generateRandomStrings(length) {
        const arr = "0123456789abcdefghijklmnopqrstuvwxyz";
        let str = '';
        for (let i = length; i > 0; i--) {
            str +=
                arr[(Math.floor(Math.random() * arr.length))];
        }
        return str;
    },
    /**
     * Check to see if a string is actualy a valid JSON
     * @param {string} str 
     * @returns {boolean}
     */
    isJsonParsable(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },
    /**
     * 
     * @param {string} str 
     * @returns {string}
     */
    generateSlug(str) {
        const cleanString = str.replace(/[^\w\s]/gi, '');
        return cleanString.replace(/[_\s]/gi, '-').toLowerCase();
    },
    // Function to generate a client app key
    generateClientAppKey() {
        const keyLength = 8; // Adjust the key length as needed
        return crypto.randomBytes(keyLength).toString('hex').toUpperCase();
    },
    // Function to generate a secret key
    generateSecretKey() {
        const keyLength = 16; // Adjust the key length as needed
        return crypto.randomBytes(keyLength).toString('hex');
    },
    // Function to generate a unique 
    uuid() {
        const currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        // Convert hours and minutes to strings and add leading zeros if needed
        hours = NumberLib.appendZero(hours).toString();
        minutes = NumberLib.appendZero(minutes).toString();

        // Concatenate hours and minutes
        const timeString = hours + minutes;

        let randomStr = this.generateRandomStrings(5);
        randomStr = randomStr.toUpperCase();
        const randomNumber = NumberLib.generateRandomNumber(3);

        const uniqueID = timeString + '-' + randomNumber + randomStr;
        return uniqueID;
    },
    // Function to generate password
    password_generator(len = 8) {
        var length = (len) ? (len) : (10);
        var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
        var numeric = '0123456789';
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        var password = "";
        var character = "";
        var crunch = true;
        while (password.length < length) {
            entity1 = Math.ceil(string.length * Math.random() * Math.random());
            entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
            entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
            hold = string.charAt(entity1);
            hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
            character += hold;
            character += numeric.charAt(entity2);
            character += punctuation.charAt(entity3);
            password = character;
        }
        password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
        return password.slice(0, len);
    },
    titleCase(str) {
        if (!str || str == undefined) return ""
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    },
    
};

module.exports = StringLib;