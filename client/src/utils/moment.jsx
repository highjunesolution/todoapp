import moment from "moment"

export const formatDateTime = (dt = new Date())=>{
   return moment(dt).calendar()
}