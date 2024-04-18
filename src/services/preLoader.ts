const preLoader = {
    show(){
        try{
            const page_loader = document.getElementById("page_loader")!;
            const spinner = document.getElementById("page_loader_spinner")!;
            page_loader.style.display="block";
            spinner.style.display="block";
        }catch(e){
            console.log(e);
        }
    },
    hide(){
        try{
            const page_loader = document.getElementById("page_loader")!;
            const spinner = document.getElementById("page_loader_spinner")!;
            if(page_loader) page_loader.style.display="none";
            if(spinner) spinner.style.display="none";
        }catch(e){
            console.log(e);
        }
    }
}

export default preLoader;