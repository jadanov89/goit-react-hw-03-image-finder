import style from 'components/Loader/Loader.module.css'
import PropTypes from "prop-types";
const Loader = ({ click }) => {
  return (
   
 <button type="button" className={style.btnn} onClick={click}>load more</button>

  )
}
export default Loader
 //bb
Loader.propTypes = {
  click:PropTypes.func,
}