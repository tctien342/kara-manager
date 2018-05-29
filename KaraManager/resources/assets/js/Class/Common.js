'use strict';
export default class Common {
    static upCaseWord(word) {
        if (!word) 
            return " ";
        return word
            .charAt(0)
            .toUpperCase() + word.slice(1);
    }

    static getObjectWithId(array, id) {
        let result = {};
        array.forEach(element => {
            if (element.id == id) 
                result = element;
            }
        );
        return result;
    }

    static getData(link, callback, apiKey = window.token) {
        let myRequest = new Request(link);
        // console.log(myRequest);
        fetch(myRequest, {
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": "Bearer " + apiKey
            }
        }).then((response) => {
            response
                .json()
                .then((data) => {
                    callback(data.data);
                });
        })
    }

    static postData(link, data, callback, apiKey = window.token) {
        let myRequest = new Request(link);
        fetch(myRequest, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify(data)
        }).then((response) => {
            // console.log(response);
            response
                .json()
                .then(function (data) {
                    callback(data);
                });
        })
    }

    static arrayAdd(array = [], value) {
        array.push(value);
        return array
    }

    static arraySub(array = [], value) {
        let index = array.findIndex((val) => {
            return val === value
        });
        if (index !== -1) 
            array.splice(index, 1);
        return array
    }

    static blink(posColor = 'black', desColor = '#80CBC4', name = '', time = 500) {
        document
            .getElementsByClassName(name)[0]
            .style
            .color = posColor;
        setTimeout(() => {
            document
                .getElementsByClassName(name)[0]
                .style
                .color = desColor;
            setTimeout(() => {
                this.blink(posColor, desColor, name, time);
            }, 500)
        }, time)
    }

    static setLoad(state){
        if (state){
            document.getElementById('loading-screen').style.display = 'flex';
        }else{
            document.getElementById('loading-screen').style.display = 'none';
        }
    }
}