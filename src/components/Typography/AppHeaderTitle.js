import React from 'react';
import PropTypes from 'prop-types';
import AppText from './AppText';

const AppHeaderTitle = ({ children, style = {}, ...props }) => {
  return (
    <AppText style={style} variant="headerTitle" {...props}>
      {children}
    </AppText>
  );
};

AppHeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AppHeaderTitle;
