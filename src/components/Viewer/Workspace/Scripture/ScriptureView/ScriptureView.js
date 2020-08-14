import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles';

import ExpansionPanel from './ExpansionPanel';
import Chapter from './Chapter';
import TranslationHelps from '../../TranslationHelps';
import AlignmentsTable from './AlignmentsTable';
import TranslationNotesTable from './TranslationNotesTable.js';
import VerseCountTable from './VerseCountTable';

import * as ScriptureHelpers from '../helpers';

import {ResourcesContext} from '../Resources.context';
import {LemmaIndexContextProvider} from './AlignmentsTable/LemmaIndex.context';
import swal from 'sweetalert';

export const ScriptureView = ({
  classes,
  context,
  setContext,
  context: {
    resourceId,
    reference: {
      bookId,
      chapter,
    },
  },
}) => {
  const {
    resources,
  } = useContext(ResourcesContext);

  let tabs = [];
  let intro;

  if (resources && resources.tn && resources.tn.data && resources.tn.data.front) {
    intro = resources.tn.data.front.intro[0]['occurrence_note'];
    const introDetails = intro.split('\n').splice(1).join('\n')
    .replace(/\[\[rc:\/\//g, 'http://').replace(/\]\]?/g, '');
    tabs.push({
      title: resources.tn.manifest.dublin_core.title,
      text: introDetails
    });
  }

  const translationNotesTable = (
    <TranslationNotesTable />
  );
  tabs.push({ title: 'Search Notes', content: translationNotesTable });

  const verseCountTable = (
    <VerseCountTable />
  );
  tabs.push({ title: "Verse Counts", content: verseCountTable });

  const alignmentsTable = (
    <LemmaIndexContextProvider>
      <AlignmentsTable />
    </LemmaIndexContextProvider>
  );
  tabs.push({ title: "Search Words", content: alignmentsTable });

  const chapterComponent = (
    <Chapter
      context={context}
      setContext={setContext}
    />
  );
  const resource = resources[resourceId];
  if((resource.manifest)===null) {
    swal({
      title: "Sorry :(",
      text: "The book is not available yet!",
      icon: "warning",
      buttons: false
    })
    const timer = window.setInterval(() => {
      window.location.reload()
    }, 2000);
    return () => { // Return callback to run on unmount.
      window.clearInterval(timer);
    };
  } 
  const {projects} = resource.manifest;
  const project = ScriptureHelpers.projectByBookId({projects, bookId});
  const bookName = project ? project.title : '';
  return (
    <div className={classes.root}>
      <ExpansionPanel
        key={''+context.reference.bookId+'intro'}
        summary={
          <ReactMarkdown
            source={`# ${bookName}`}
            escapeHtml={false}
          />
        }
        details={
          <TranslationHelps
            context={context}
            setContext={setContext}
            tabs={tabs}
          />
        }
      />
      {chapterComponent}
    </div>
  );
};

ScriptureView.propTypes = {
  classes: PropTypes.object.isRequired,
  setContext: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScriptureView);
