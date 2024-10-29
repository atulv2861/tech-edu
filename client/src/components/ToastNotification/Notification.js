import { toast,Zoom } from 'react-toastify';



export const successNotification = (message)=>{
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // eslint-disable-next-line no-undef
        transition: Zoom,
        });
}
 export const errorNotification = (message)=>{
    toast.error(message, {
        position: "top-right",
        autoClose: 12,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
         // eslint-disable-next-line no-undef
        transition: Zoom,
        });
}
