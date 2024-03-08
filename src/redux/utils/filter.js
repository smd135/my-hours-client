export const filter = (items, currentM) => {
   const filteredObj = items.filter((obj) => {
      const month = new Date(obj.start_at).getMonth() + 1;
      if (currentM === month) {
         return true;
      }
   })
   return filteredObj
}
