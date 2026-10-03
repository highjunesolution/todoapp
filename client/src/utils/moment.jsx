import moment from "moment"

export const formatDateTime = (dt = new Date())=>{
   return moment(dt).format('lll')
}

export const formatDateTimeFromNow = (dt= new Date())=>{
   return moment(dt).fromNow()
}