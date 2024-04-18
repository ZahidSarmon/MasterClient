const radio = {
    checked(name:string,value:string){
        const optionRadios = document.querySelectorAll('input[name="'+name+'"]');
        optionRadios.forEach((radio:any) =>{
            if (radio.value === value) {
                radio.checked = true;
            }
        });
    },
}

export default radio;