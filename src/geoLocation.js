function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve([ longitude, latitude  ]);
          },
          (error) => {
            reject(error.message || 'Unable to retrieve your location');
          }
        );
      } else {
        reject('Geolocation is not supported by your browser.');
      }
    });
  }
  
  export default getLocation;
  