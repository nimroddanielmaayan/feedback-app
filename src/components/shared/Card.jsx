import PropTypes from 'prop-types'

function Card({ children, reverse }) {
  // The "reverse" prop is used to change the CSS class to dark
  return <div className={`card ${reverse && 'reverse'}`}>{children}</div>
}

Card.defautProps = {
  reverse: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}

export default Card
