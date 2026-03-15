import React from 'react';

const Layout = ({ children }) => {
    return (
        <>
            <head>
                <script async src="https://cdn.adstera.com/your-script.js"></script>
            </head>
            <body>
                <script async src="https://cdn.adstera.com/your-body-script.js"></script>
                {children}
            </body>
        </>
    );
};

export default Layout;