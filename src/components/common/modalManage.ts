
const modal = {
    Open(id:string){
        const modal = document.getElementById(id);
        if(modal){
            modal.classList.add("show");
            modal.style.display="block";
        }
    },
    Close(id:string){
        const modal = document.getElementById(id);
        if(modal){
            modal.classList.remove("show");
            modal.style.display="none";
        }
    }
}

export default modal;