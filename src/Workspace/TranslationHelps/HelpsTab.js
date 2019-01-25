import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
} from '@material-ui/core';

import TextComponentWithRCLinks from './TextComponentWithRCLinks';
import TranslationNotes from './TranslationNotes';
import AlignedWord from '../Scripture/ScriptureView/VerseObject/AlignedWords/AlignedWord';

import styles from './styles';

export const Component = ({
  tab,
  addTab,
  open,
  context,
  setContext,
}) => {

  let content = <div/>;
  if (open) {
    if (tab.text) {
      content = <TextComponentWithRCLinks
        text={tab.text}
        addTab={addTab}
        context={context}
        setContext={setContext}
      />;
    } else if (tab.notes) {
      content = tab.notes.map((note, index) =>
        <TranslationNotes
          key={index}
          note={note}
          addTab={addTab}
          context={context}
          setContext={setContext}
        />
      );
    } else if (tab.original) {
      const wordObjects = tab.original;
      content = wordObjects.map((wordObject, index) => {
        const link = wordObject.link.replace('rc://*/', `http://${context.languageId}/`);
        const originalWords = wordObject.originalWords.map((verseObject, index) =>
          <AlignedWord key={index} verseObject={verseObject} />
        );
        const text = `${link}`;
        return (
          <div key={index}>
            <Divider />
            <TextComponentWithRCLinks
              text={text}
              addTab={addTab}
              context={context}
              setContext={setContext}
            />
            {originalWords}
          </div>
        );
      });
    } else if (tab.words) {
      content = tab.words.map((word, index) => {
        return (
          <div key={index}>
            <Divider />
            <TextComponentWithRCLinks
              text={word}
              addTab={addTab}
              context={context}
              setContext={setContext}
            />
          </div>
        );
      });
    } else if (tab.content) {
      content = tab.content;
    }
  }
  return content;
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  setContext: PropTypes.func.isRequired,
  tab: PropTypes.object.isRequired,
  addTab: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(Component);