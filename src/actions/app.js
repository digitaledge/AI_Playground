/* eslint-disable import/prefer-default-export */
import { SET_APP_PROPERTY } from '../constants';

export function setProperty({ name, value }) {
    return {
        type: SET_APP_PROPERTY,
        payload: { name, value },
    };
}

export function scoreImage({ file, dataURL }) {
    return async (dispatch, getState) => {
        const formData = new FormData();
        formData.append('file', file);

        const options = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        try {
            const score = await (await fetch('/api/score', options)).json();
            const state = getState();
            const currentImages = state.app.images || [];
            const images = [
                {
                    score,
                    src: dataURL,
                },
                ...currentImages,
            ];

            dispatch(setProperty({ name: 'images', value: images }));
        } catch (err) {
            console.log(err);
        }
    };
}
