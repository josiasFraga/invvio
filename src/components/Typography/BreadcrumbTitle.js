import React from 'react';
import PropTypes from 'prop-types';
import AppText from './AppText';

const BreadcrumbTitle = ({ children, style = {}, ...props }) => {
  return (
    <AppText style={style} variant="breadcrumbTitle" {...props}>
      {children}
    </AppText>
  );
};

BreadcrumbTitle.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default BreadcrumbTitle;
