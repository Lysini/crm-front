import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import stores from '@stores/stores.factory';
import createHashHistory from 'history/createHashHistory'
import Root from './Root';


import '@styles/styles.scss'



render(
    <AppContainer>
        <Root stores={stores} history={createHashHistory()} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        const newStores = stores;
        const newHistory = createHashHistory();
        const NewRoot = require('./Root').default;
        render(
            <AppContainer>
                <NewRoot stores={newStores} history={newHistory} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
