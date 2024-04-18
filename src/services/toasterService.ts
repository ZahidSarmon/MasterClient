import { ToastUtility } from "@syncfusion/ej2-vue-notifications";

const toasterService = {
    success(msg:string){
        ToastUtility.show({
                content:msg,
                cssClass:"e-toast-success",
                timeOut:2500,
                icon:"fas fa-check-circle",
                position:{X:"Right",Y:"Top"},
                animation: {
                    show: { effect: "SlideRightIn" },
                    hide: { effect: "SlideRightOut" },
                },
            });
    },
    error(msg:string){
        ToastUtility.show({
            content:msg,
            cssClass:"e-toast-danger",
            timeOut:3000,
            icon:"fas fa-bug",
            position:{X:"Right",Y:"Top"},
            animation: {
                show: { effect: "SlideRightIn" },
                hide: { effect: "SlideRightOut" },
            },
        });
    },
    warn(msg:string){
        ToastUtility.show({
            content:msg,
            cssClass:"e-toast-warning",
            timeOut:3000,
            icon:"fas fa-exclamation",
            position:{X:"Right",Y:"Top"},
            animation: {
                show: { effect: "SlideRightIn" },
                hide: { effect: "SlideRightOut" },
            },
        });
    },
    info(msg:string){
        ToastUtility.show({
            content:msg,
            cssClass:"e-toast-info",
            icon:"fas fa-exclamation",
            timeOut:3000,
            position:{X:"Right",Y:"Top"},
            animation: {
                show: { effect: "SlideRightIn" },
                hide: { effect: "SlideRightOut" },
            },
        });
    },
    
}

export default toasterService;