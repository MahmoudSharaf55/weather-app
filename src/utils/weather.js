const request = require('request');
const weather = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/99d5931e5851d6850f2a353a9e30b5d7/'+lat+','+long+'?units=si';
    request({url: url, json: true}, (error,response) => {
        if (error){
            callback('Unable to connect to weather service',undefined)
        } else if (response.body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                temperature: response.body.currently.temperature,
                rain: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary,
            });
        }
    });
};

module.exports = weather;