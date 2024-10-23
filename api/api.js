// --host=192.168.0.107

//const BASE_API = 'http://192.168.0.104:8000/api';
const BASE_API = 'https://taxibraz.onrender.com';
//const BASE_API = 'http://192.168.0.105:3000';




export default {
   
   // base_storage: 'https://rmrparttime.com/storage',
   // base_storage: 'http://192.168.0.107:8000/storage',
    
    

    validateToken: async (token) => {
        const response = await fetch(`${BASE_API}/drivers/auth/token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

    login: async (email, password) => {
        const response = await fetch(`${BASE_API}/drivers/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       return response;
    },

    logout: async (token) => {
        const response = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    requestPasswordEmail: async (email) => {
        const response = await fetch(`${BASE_API}/drivers/auth/password/request`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        return response;
    },
    resetPassword: async (email,code, password) => {
        const response = await fetch(`${BASE_API}/drivers/auth/password/reset`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,code,password})
        });
        return response;
    },
    storePushToken: async (token,pushToken) => {
        const response = await fetch(`${BASE_API}/drivers/pushtoken`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({pushToken})
        });
        return response;
    },
    sendLocation: async (token,latitude,longitude) => {
        const position = {latitude,longitude};
        const response = await fetch(`${BASE_API}/drivers/location`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({position})
        });
        return response;
    },
    updateStatus: async (token,isOnline) => {
        const response = await fetch(`${BASE_API}/drivers/status`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({online:isOnline})
        });
        return response;
    },
    updateDriver: async (token,fd) => {
        const response = await fetch(`${BASE_API}/drivers/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    updatePix: async (token,pix) => {
        const response = await fetch(`${BASE_API}/drivers/update/pix`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(pix)
        });
        return response;
    },
    updateVeiculo: async (token,veiculo) => {
        const response = await fetch(`${BASE_API}/drivers/update/veiculo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(veiculo)
        });
        return response;
    },
    getRides: async (token) => {
        const response = await fetch(`${BASE_API}/rides`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify(veiculo)
        });
        return response;
    },
    acceptRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/accept`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify(veiculo)
        });
        return response;
    },
    onWayRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/onway`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify(veiculo)
        });
        return response;
    },
    arrivedRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/arrived`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify(veiculo)
        });
        return response;
    },
    startRide: async (token,id,latitude,longitude) => {
        const response = await fetch(`${BASE_API}/rides/${id}/started`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           body: JSON.stringify({latitude,longitude})
        });
        return response;
    },
    finishRide: async (token,id,latitude,longitude) => {
        const response = await fetch(`${BASE_API}/rides/${id}/finished`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({latitude,longitude})
        });
        return response;
    },
    ratePassenger: async (token,id,rating) => {
        const response = await fetch(`${BASE_API}/rides/${id}/rate/passenger`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({rating})
        });
        return response;
    },
    cancelRide: async (token,id,motivo) => {
        const response = await fetch(`${BASE_API}/rides/${id}/cancel/driver`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           body: JSON.stringify({motivo})
        });
        return response;
    },
    getMyRides: async (token) => {
        const response = await fetch(`${BASE_API}/drivers/rides`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    rideDetails: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/detail/driver`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    restoreRide: async (token,id) => {
        const response = await fetch(`${BASE_API}/rides/${id}/restore/driver`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           // body: JSON.stringify({rating})
        });
        return response;
    },
    getGanhos: async (token,data) => {
        const response = await fetch(`${BASE_API}/drivers/ganhos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           body: JSON.stringify({data})
        });
        return response;
    },
   

   



  
   
};