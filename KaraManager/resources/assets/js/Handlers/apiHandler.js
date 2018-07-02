import setting from '../Assert/Js/setting'
export default class ApiHandler {
    constructor(manager) {
        this.manager = manager
        this.api = manager.setting.serverURL
        this.list_get = {
            ds_room: 'api/ds_room',
            ds_bill: 'api/ds_active_bill',
            ds_empty_room: 'api/ds_empty_room',
            ds_time_prod: 'api/get_time_prod',
            ds_prod: 'api/get_all_prod',
            get_bill: 'api/get_bill?',
            get_stat: 'api/statistical',
            logout : 'api/logout',
            room_type: 'api/get_room_types',
            month: 'api/get_month?'
        }
        this.list_post = {
            make_bill: 'api/post_make_bill',
            edit_even: 'api/post_edit_even',
            add_even: 'api/post_add_even',
            paid_bill: 'api/post_paid_bill',
            add_prod: 'api/post_add_prod',
            edit_prod: 'api/post_edit_prod',
            edit_room_type: 'api/post_edit_type_room',
            edit_room: 'api/post_edit_room',
            add_type_room:'api/post_add_type_room',
            add_room: 'api/post_add_room'
        }
        this.manager.update.api = true
    }

    getData(link, callback, apiKey = this.manager.usertoken) {
        let myRequest = new Request(link);
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

    postData(link, data, callback, apiKey = this.manager.usertoken || '') {
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

    loginFunction(email,pass,callback){
        this.postData('api/auth/login',{
            tp_type: 'email',
            email: email,
            password: pass
        },(data)=>{
            if (data.data.token){
                // this.getData('redirect/'+data.data.token,()=>{
                //     this.manager.usertoken = data.data.token;
                //     callback(true)
                // })
                window.location = 'redirect/'+data.data.token
            }
            else{
                callback(false)
            }
        })
    }

    call_get(name,data = {},callback){
        let bindData = ''
        if (data){
            bindData = this.objectToString(data)
        }
        this.getData(this.list_get[name]+bindData,(returnData)=>{
            callback(returnData)
        })
    }

    call_post(name,data = {},callback){
        this.postData(this.list_post[name],data,(returnData)=>{
            callback(returnData)
        })
    }

    objectToString(obj={}){
        let result = ''
        Object.keys(obj).forEach(key=>{
            result += key + '=' + obj[key] + '&'
        })
        return result
    }

    updateAPI(){
        setTimeout(()=>{
            if (this.manager.update.api){
                this.initApi()
                this.updateAPI()
            }
        },5000)
    }

    initApi(callback=()=>{}){
        this.call_get('ds_room',{},(room)=>{
            this.manager.data.room = room
        })
        this.call_get('ds_bill',{},(bill)=>{
            this.manager.data.bill = bill
        })
        this.call_get('ds_time_prod',{},(time)=>{
            this.manager.data.time = time
        })
        this.call_get('ds_prod',{},(prod)=>{
            this.manager.data.prod = prod
            callback()
        })
    }

}