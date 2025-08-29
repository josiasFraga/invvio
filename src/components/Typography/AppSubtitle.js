import React from 'react';
import PropTypes from 'prop-types';
import AppText from './AppText';

const AppSubtitle = ({ children, style = {}, ...props }) => {
  return (
    <AppText style={style} variant="subtitle" {...props}>
      {children}
    </AppText>
  );
};

AppSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppSubtitle;
