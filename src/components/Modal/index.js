import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import './modal.scss';
import {modalActions} from "../../redux/actions";
import logo from "../../assets/img/Group 7108.png";

function Modal() {
    const { isOpen, text } = useSelector(({ modal }) => ({
        isOpen: modal.isOpen,
        text: modal.text,
    }))

    const dispatch = useDispatch();

    const ref = React.useRef();

    const handleClickOutside = (e) => {
        if (e.target===ref.current)
        dispatch(modalActions.toggleModal({isOpen:false,text:''}))
    }

    React.useEffect(() => {
        document.addEventListener('click',handleClickOutside)
        return () => document.removeEventListener('click',handleClickOutside)
    },[])

    return (
    <div className={isOpen ? "modal-open" : "modal-closed"} ref={ref}>
        <div className="modal-container">
            <img src={logo} alt="" className="modal-image"/>
            {text}
        </div>
    </div>
    );
}

export default Modal;
