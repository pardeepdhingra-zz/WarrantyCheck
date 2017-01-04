import React from 'react'
import { FormattedMessage } from 'react-intl'

const FaIcon = ({ icon, children, className, click }) => {
  return <i className={`fa fa-${icon} ${className}`}
            onClick={click}>{ children }</i>
};

export default FaIcon;
