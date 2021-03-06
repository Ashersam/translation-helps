import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import {
  LibraryBooks,
  Book,
  Bookmark,
  History,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';

import {chaptersInBook} from './components/Viewer/chaptersAndVerses';

class BottomNavContainer extends React.Component {
  handleChange = (event, value) => {
    let context = {...this.props.context};
    let {
      organization,
      languageId,
      reference,
    } = context;
    switch (value) {
      case 0:
        context = this.previousChapter();
        break;
      case 1:
        context = {organization, languageId, view: 'history', reference: {}};
        break;
      case 2:
        context = {organization, languageId, reference: {}};
        break;
      case 3:
        context.reference = {};
        break;
      case 4:
        if (reference) context.reference = {bookId: reference.bookId};
        break;
      case 5:
        context = this.nextChapter();
        break;
      default:
        break;
    };
    this.props.setContext(context);
  };

  previousChapter = () => {
    let reference = {...this.props.context.reference}
    let {chapter} = reference;
    if (chapter > 1) {
      reference.chapter = chapter - 1;
      reference.verse = undefined;
    }
    const context = {...this.props.context, reference};
    return context;
  };

  nextChapter = () => {
    let reference = {...this.props.context.reference}
    let {bookId, chapter} = reference;
    const bookChapters = chaptersInBook({bookId}).length
    if (chapter < bookChapters) {
      reference.chapter = chapter + 1
      reference.verse = undefined;
    }
    const context = {...this.props.context, reference};
    return context;
  };

  render() {
    const { classes, context } = this.props;

    const shouldShowHistory = (context.view === 'history');
    const couldShowReference = (!context.resourceId);
    const couldShowBook = (!(context.resourceId === 'obs') && !(context.reference && context.reference.bookId));
    const couldShowChapter = (!(context.reference && context.reference.chapter));

    let value;
    if (shouldShowHistory) { value = 1; }
    else if (couldShowReference) { value = 2; }
    else if (couldShowBook) { value = 3; }
    else if (couldShowChapter) { value = 4; }

    return (
      <Paper className={classes.root}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels={true}
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction
            className={classes.button}
            icon={<KeyboardArrowLeft />}
          />
          <BottomNavigationAction
            className={classes.button}
            label="History"
            icon={<History />}
          />
          <BottomNavigationAction
            className={classes.button}
            label="Resources"
            icon={<LibraryBooks />}
          />
          <BottomNavigationAction
            className={classes.button}
            label="Books"
            icon={<Book />}
          />
          <BottomNavigationAction
            className={classes.button}
            label="Chapters"
            icon={<Bookmark />}
          />
          <BottomNavigationAction
            className={classes.button}
            icon={<KeyboardArrowRight />}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

BottomNavContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  setContext: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  bottomNavigation: {
    margin: '0 auto',
    maxWidth: '40em',
  },
  button: {
    paddingLeft: '0',
    paddingRight: '0',
    minWidth: '60px',
  },
});

export default withStyles(styles, { withTheme: true })(BottomNavContainer);
