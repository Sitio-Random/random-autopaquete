import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ children }) => (
    <>
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    </>
);

export default Layout;

Layout.propTypes = {};

Layout.defaultProps = {};
