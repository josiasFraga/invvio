import React from 'react'; // Certifique-se de importar React

export const navigationRef = React.createRef();

let pendingNotifications = []; // Armazena notificações pendentes

export const navigate = (name, params) => {
    if (navigationRef.current?.isReady()) {
        navigationRef.current.navigate(name, params);
    } else {
        // Armazena notificações pendentes até o stack estar pronto
        pendingNotifications.push({ name, params });
    }
};

export const goBack = () => {
    if (navigationRef.current?.isReady()) {
        navigationRef.current.goBack();
    }
};

export const processPendingNotifications = () => {
    while (pendingNotifications.length > 0) {
        const notification = pendingNotifications.shift();
        if (notification && navigationRef.current?.isReady()) {
            navigationRef.current.navigate(notification.name, notification.params);
        }
    }
};
