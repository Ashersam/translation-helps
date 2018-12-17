import React from 'react';
import PropTypes from 'prop-types';

import Component from './Component';

import * as translationHelps from '../../translationHelps/helpers';

class FrameContainer extends React.Component {
  state = {
    open: false,
    id: Math.random(),
    helps: null,
  };

  handleToggleOpen = () => {
    this.setState({open: !this.state.open});
    this.scrollToId();
  };

  scrollToId = () => {
    const element = document.getElementById(this.state.id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  fetchStudyQuestions(props) {
    const {
      storyKey,
      context: {
        username,
        languageId,
      },
    } = props;
    translationHelps.fetchStudyQuestions(username, languageId, 0)
    .then(guide => {
      translationHelps.fetchStudyQuestions(username, languageId, storyKey)
      .then(studyQuestions => {
        const helps = { studyQuestions: studyQuestions };
        this.setState({
          helps,
          guide,
        });
      });
    });
  }

  componentWillReceiveProps(newProps) {
    this.fetchStudyQuestions(newProps);
  }

  componentDidMount() {
    this.fetchStudyQuestions(this.props);
  };

  render() {
    const {helps, guide, open, id} = this.state;
    const {props} = this;
    return (
      <div id={id}>
        <Component
          {...props}
          helps={helps}
          guide={guide}
          open={open}
          handleToggleOpen={this.handleToggleOpen.bind(this)}
        />
      </div>
    );
  }
};

FrameContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  storyKey: PropTypes.number.isRequired,
  context: PropTypes.object.isRequired,
  setContext: PropTypes.func.isRequired,
};

export default FrameContainer;
