import { combineReducers } from 'redux';
import footer from './footerReducer'
import createGmailTab from './createGmailTabReducer'
import dashboardTab from './dashboardReducer'
export default combineReducers({
    footer, createGmailTab, dashboardTab
});