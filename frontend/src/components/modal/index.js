import React, { useEffect, useRef, useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { clearModal } from '../../redux/actions/modal'
import CommentModal from './comment'

export default function Modal() {

    const modalState = useSelector(state => state.modal )
    const bottomSheetRef = useRef(null)


    const dispatch = useDispatch()

    useEffect(()=>{
        if(modalState.open && bottomSheetRef.current){
            bottomSheetRef.current.expand()
        }
    },[modalState])

    const renderContent = () => {
        switch(modalState.modalType){
            case 0:
                return (<CommentModal post={modalState.data}/>)
            default: return (<></>)
        }
    }

    const onClose = () => {
        dispatch(clearModal())
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["70%"]}
            index={-1}
            onClose={onClose}
            handleHeight={40}
            enablePanDownToClose
        >
            {renderContent()}

        </BottomSheet>
    )
}
