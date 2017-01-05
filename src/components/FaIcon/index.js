import React from 'react'

const FaIcon = ({ icon, children, className, click }) => {
  return <i className={`fa fa-${icon} ${className}`}
            onClick={click}>{ children }</i>
}

export default FaIcon
