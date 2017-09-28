import React from 'react';
import './_modal.scss';

class Modal extends React.Component {

  render() {
    return(
      <section className='modal'>
        <button onClick={this.props.close}>X</button>
        {this.props.children}
      </section>
    )
  }
}

export default Modal;
