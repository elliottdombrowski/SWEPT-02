const axios = require("axios");
require('dotenv').config({ path: '../../.env' });

const sweeperURL = `https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=46`;

class Sweeper {
    getSweeperData = async () => {
        // not sure if OK to leave with REACT_APP in .env?
        let url = `${sweeperURL},us&appid=${process.env.REACT_APP_SWEEPER}`;
        console.log(url)
        return (await axios(url)).data;
    }
}

// export const findWardSchedule = (wardQuery) => {
//   Axios.get(`https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=${wardQuery}`).then((res) => {
//     console.log(JSON.stringify(res));
//   });
// };

module.exports = Sweeper;