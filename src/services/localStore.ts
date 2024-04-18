const localStore = {
    setItem:(key:string,val:any)=>localStorage.setItem(key,JSON.stringify(val)),
    getItem:(key:string)=>JSON.parse(localStorage.getItem(key)!),
    removeItem:(key:string)=>localStorage.removeItem(key)
}

export default localStore;
