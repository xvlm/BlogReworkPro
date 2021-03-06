/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/21
 * Description:
 */

import ArticleList from './articleList';
import actionTypes from '../actions';


export default class Category extends ArticleList {
    static type = 'category';
    static headInfo = {
        keywords: 'dtysky',
        author: 'dtysky,命月天宇'
    };

    setTheme() {
        const {dispatch, params} = this.props;
        dispatch({type: actionTypes.init.theme, theme: params.name});
        dispatch({type: actionTypes.change.theme.default});
    }
}
