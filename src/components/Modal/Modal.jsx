import  { Component } from "react";
import PropTypes from "prop-types";
import style from "components/Modal/Modal.module.css"

    // const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {

 componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown )
  }

  handleKeyDown = e => {     
      if (e.code === 'Escape') {
        this.props.onClick();
      }
    }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  }

  render() {
      const { handleBackdropClick } = this;
        return (
            <div className={style.Overlay} onClick={handleBackdropClick}>
  <div className={style.Modal}>
{this.props.children}
  </div>
          </div>
    )

}

}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired,
};

export default Modal;