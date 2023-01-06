import { CLEAR_MODAL, MODAL_OPEN_COMMENT_SECTION } from "../constants"

export const openCommentModal = (open, data) => (dispatch) =>{
    return dispatch({
        data,
        open,
        modalType: 0,
        type: MODAL_OPEN_COMMENT_SECTION
    })
}

export const clearModal = (open, data) => (dispatch) =>{
    return dispatch({
        
        type: CLEAR_MODAL
    })
}