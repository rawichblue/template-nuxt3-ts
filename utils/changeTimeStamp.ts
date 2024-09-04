export function timeStampToDate(timestamp: any): string {
    const date = new Date(timestamp * 1000);
  
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
    return formattedDate;
  }
  