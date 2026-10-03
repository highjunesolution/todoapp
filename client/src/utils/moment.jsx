import moment from "moment"

export const formatDateTime = (dt = new Date())=>{
   return moment(dt).format('LLL')
}

export const formatDateTimeFromNow = (dt= new Date())=>{
   return moment(dt).fromNow()
}