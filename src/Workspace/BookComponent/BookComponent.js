import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import {
  ExpandMore,
} from '@material-ui/icons';

import styles from './styles';

import ExpansionComponent from './ExpansionComponent';
import ChapterComponent from './ChapterComponent';

export const BookComponent = ({classes, reference, bookData, translationNotesData}) => {
  const {book, chapter, verse} = reference;
  const chapterComponent = (
    <ChapterComponent
      chapterKey={reference.chapter}
      chapterData={bookData.chapters[chapter]}
      translationNotesChapterData={translationNotesData[chapter]}
    />
  );
  const intro = translationNotesData['front']['intro'][0]['occurrence_note'];
  return (
    <div className={classes.root}>
      <ExpansionComponent
        key={reference.book+'intro'}
        summary={
          <ReactMarkdown
            source={intro.split('\n')[0]}
            escapeHtml={false}
          />
        }
        details={
          <ReactMarkdown
            source={intro.split('\n').splice(1).join('\n')}
            escapeHtml={false}
          />
        }
      />
      {chapterComponent}
    </div>
  );
};

BookComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  reference: PropTypes.object.isRequired,
  bookData: PropTypes.object.isRequired,
  translationNotesData: PropTypes.object,
};

export default withStyles(styles)(BookComponent);