
export const timeToTimeStamp = (time) =>{
    
    const str = (time).toString();

    const [dateComponents, timeComponents] = str.split(' ');
    const [year, month, day] = dateComponents.split('-');
    const [hours, minutes, seconds] = timeComponents.split(':');

    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);

    // ✅ Get timestamp
    const timestamp = date.getTime();
    return timestamp/1000;
}

export const timestampToDate = (timestamp)=>{
    const dateFormat= new Date(timestamp);
    const fulldate =(dateFormat.getMonth()+1)+
    "/"+dateFormat.getDate()+
    "/"+dateFormat.getFullYear();
    return fulldate;
}