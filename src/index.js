import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import rootStore from './store';
import './index.less';

console.log('ReactDOM', ReactDOM)
function render() {
    ReactDOM.render( 
        <AppContainer>
            <Provider {...rootStore}>
                <App />
            </Provider>
        </AppContainer>
        ,
        document.getElementById('ROOT')
    )
} 
render();

if (module.hot) {
    module.hot.accept(() => {
        render()
    })
}    
