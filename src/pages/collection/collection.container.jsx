import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {  selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import collectionPage from './collection.component';
import withSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const collectionPageContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(collectionPage);

export default  collectionPageContainer;