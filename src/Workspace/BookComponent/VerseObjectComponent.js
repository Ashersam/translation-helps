import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
} from '@material-ui/core';
import {
} from '@material-ui/icons';

import MilestoneComponent from './MilestoneComponent';
import TextComponent from './TextComponent';

export const VerseObjectComponent = ({classes, verseObject}) => {
  const component = verseObject.type === 'milestone' ?
    <MilestoneComponent verseObject={verseObject} /> : <TextComponent verseObject={verseObject} />;
  return component;
};

VerseObjectComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  verseObject: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
});

export default withStyles(styles)(VerseObjectComponent);