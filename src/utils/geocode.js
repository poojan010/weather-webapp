const request = require('request')

const geocode = (address,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicG9vMTIzNCIsImEiOiJja3M0anBuOGwyb2k2Mm5xanJhNXg1YnJrIn0.ZuTi4YtxSVDlSF6rm8S2ng"

    const requestConfig = { url , json : true }

    request(requestConfig, (error,response) => {
        if(error) callback("unable to connect",undefined)
        else if(response.body.features.length === 0 ) callback("no loction found,try another",undefined)
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode