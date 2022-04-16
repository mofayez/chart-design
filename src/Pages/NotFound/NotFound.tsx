import React, { ReactElement } from 'react';

interface Props {

}

/**
 * render 404 page error
 * 
 * @param props 
 * @returns ReactElement
 */
const NotFound: React.FC<Props> = (props: Props): ReactElement => {

    return (
        <h1>404 Not Found!</h1>
    );
}

export default NotFound;