import React from 'react';

class Folders extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <div className='b-folders'>
                <div className = 'b-folders_content'>
                    <div className='b-folder__item'>
                        <div className='b-folder__item_icon'>
                            <span className='fontawesome-folder-close'></span>
                        </div><div className='b-folder__item_title'>
                        asd
                    </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Folders;