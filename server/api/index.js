const sweeperData = {
    method: 'GET',
    url: 'https://data.cityofchicago.org/resource/wvjp-8m67.json',
    data: {
        '$limit': 5000,
        '$$app_token': process.env.SWEEPER
    }
}