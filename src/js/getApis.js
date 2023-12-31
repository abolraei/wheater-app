class GetApis{
    async findIcon(weather){ 
        // Access to time
        let currentHour = weather.date;
        currentHour = currentHour.split(' ')
        const time = currentHour[1].slice(0, 2);
        
        let currentStatus = '';
        // Gain status
        if(time >= '06' && time <= '19' ){
            currentStatus = 'day'
        }else {
            currentStatus = 'night'
        }

        // Create icon link
        let icon = weather.weather;
        icon = icon.toLowerCase()
        icon = `./src/assets/images/weather/${icon}_${currentStatus}.webp`;

        return icon;
    }

    async getTime(){
        // Access to user city
        const userCity = localStorage.getItem('userCity');

        // base url and api key
        const url = 'https://api.ipgeolocation.io/timezone?apiKey=';
        const key = '05eb684275634618a6ef2f613715aef8';


        // Get Date and time from Api
        const apiResponse = fetch(`${url}${key}&location=${userCity}`,{
            headers: { 'X-Api-Key': key},
            contentType: 'application/json',
        }).then(res => {
            return res.json()
        }).catch(error => {
            console.log(error);
        })

        
        // Extract time from api
        let timeData = await apiResponse;
        timeData = timeData.time_24;

        timeData = timeData.split(':')
        timeData = {
            hour: timeData[0],
            minute: timeData[1],
            second: timeData[2]
        }
        

        //Extract Date data from api
        ///// Day name
        let dayName = await apiResponse;
        dayName = dayNameFinder(dayName);
        function dayNameFinder(dayName){
            let name = dayName;
            name = name.date_time_txt;
            name = name.split(',');
            name = name[0];
            // return name;
            return name
        }
        ///// date 
        let date = await apiResponse;
        date = date.date;




        const completeData = {
            watch : timeData ,
            dayName,
            date
        }



        return completeData ;
    }

    async chackingCoustomCity(city){
        // created url
        const url = `https://quaint-fawn-snaps.cyclic.app/weather?input=${city}`;

        // send request
        const request = await fetch(url).then((res) => res)
        .catch((error) => {
            dom.addClass("#loading", "hidde")
            console.log(error)
        })
        .catch((error) => {
            dom.addClass("#loading", "hidde")
            console.log(error)
        })
        // access response
        const response = await request.json();

         // check response error
        if (request.status === 200) {
            return true
        } else {
            return false
        }
    }

    async getWeather(city){
        // created url
        const url = `https://quaint-fawn-snaps.cyclic.app/weather?input=${city}`;
        // send request
        const request = await fetch(url).then((res) => res)
        .catch((error) => {
            dom.addClass("#loading", "hidde")
            console.log(error)
        })
        
        // access response
        const response = await request.json();

         // check response error
        if (request.status === 200) {
            return response
        } else {
            return false
        }
    }

}

export default GetApis;