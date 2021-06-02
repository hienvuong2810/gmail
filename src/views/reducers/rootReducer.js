import { combineReducers } from 'redux';
import footer from './footerReducer'
import createGmailTab from './createGmailTabReducer'

export default combineReducers({
    footer, createGmailTab
});