


const _config = {
    BASE_URL: process.env.BASE_URL

}




export const config = {
    get(key) {
        const value = _config[key]
        if (!value) {
            console.log(`variable is not defined make sure you have set it in your .env file`, key);
            // process.exit()
        }
        return value
    }
}



