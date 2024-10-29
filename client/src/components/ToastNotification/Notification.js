import { toast,Zoom } from 'react-toastify';



export const successNotification = (message)=>{
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",       
        transition: Zoom,
        });
}
 export const errorNotification = (message)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",        
        transition: Zoom,
        });
}
