import React from 'react';
import PropTypes from 'prop-types';
import AppText from './AppText';

const AppTitle = ({ children, style = {}, ...props }) => {
  return (
    <AppText style={style} variant="title" {...props}>
      {children}
    </AppText>
  );
};

AppTitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppTitle;
