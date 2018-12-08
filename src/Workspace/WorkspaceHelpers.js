import usfmjs from 'usfm-js';

// Purpose: application wide
// Scope: limited to resource files and parsing
// Notes: pass in manifests don't fetch them

import * as ApplicationHelpers from '../ApplicationHelpers';

export const fetchBook = (username, languageId, bookId, manifest) => new Promise((resolve, reject) => {
  if (!projectByBookId(manifest.projects, bookId)) {
    const error = 'book not found in ult';
    console.warn(error);
    reject(error);
  }
  const repository = ApplicationHelpers.resourceRepositories(languageId).ult;
  fetchFileByBookId(username, repository, bookId, manifest)
  .then(usfm => {
    const json = usfmjs.toJSON(usfm);
    resolve(json);
  }).catch(reject);
});

export const fetchOriginalBook = (username, languageId, bookId, uhbManifest, ugntManifest) => new Promise((resolve, reject) => {
  let manifest, repository;
  const uhbProject = projectByBookId(uhbManifest.projects, bookId);
  const ugntProject = projectByBookId(ugntManifest.projects, bookId);
  const repositories = ApplicationHelpers.resourceRepositories(languageId);
  if (uhbProject) {
    manifest = uhbManifest;
    repository = repositories.uhb;
  };
  if (ugntProject) {
    manifest = ugntManifest;
    repository = repositories.ugnt;
  };
  fetchFileByBookId(username, repository, bookId, manifest)
  .then(usfm => {
    const json = usfmjs.toJSON(usfm);
    resolve(json);
  }).catch(reject);
});

export const fetchUGNTBook = (username, languageId, bookId, manifest) => new Promise((resolve, reject) => {
  if (!projectByBookId(manifest.projects, bookId)) {
    const error = 'book not found in ugnt';
    console.warn(error);
    reject(error);
  }
  const repository = ApplicationHelpers.resourceRepositories(languageId).ugnt;
  fetchFileByBookId(username, repository, bookId, manifest)
  .then(usfm => {
    const json = usfmjs.toJSON(usfm);
    resolve(json);
  }).catch(reject);
});

export const fetchUHBBook = (username, languageId, bookId, manifest) => new Promise((resolve, reject) => {
  if (!projectByBookId(manifest.projects, bookId)) {
    const error = 'book not found in uhb';
    console.warn(error);
    reject(error);
  }
  const repository = ApplicationHelpers.resourceRepositories(languageId).uhb;
  fetchFileByBookId(username, repository, bookId, manifest)
  .then(usfm => {
    const json = usfmjs.toJSON(usfm);
    resolve(json);
  }).catch(reject);
});

export const translationNotes = (username, languageId, bookId, manifest) => new Promise((resolve, reject) => {
  fetchNotes(username, languageId, bookId, manifest)
  .then(array => {
    let translationNotesObject = {};
    array.shift();
    array.forEach(item => {
      let [book, chapter, verse, id, support_reference, original_quote, occurrence, gl_quote, occurrence_note] = item;
      if (book && chapter && verse) {
        if (!translationNotesObject[chapter]) translationNotesObject[chapter] = {};
        if (!translationNotesObject[chapter][verse]) translationNotesObject[chapter][verse] = [];
        let object = {
          id: id,
          support_reference: support_reference,
          original_quote: original_quote,
          occurrence: occurrence,
          gl_quote: gl_quote,
          occurrence_note: occurrence_note.replace(/<br>/g,'\n'),
        };
        translationNotesObject[chapter][verse].push(object);
      }
    });
    resolve(translationNotesObject);
  }).catch(reject);
})

export const fetchNotes = (username, languageId, bookId, manifest) => new Promise((resolve, reject) => {
  const repository = ApplicationHelpers.resourceRepositories(languageId).tn;
  fetchFileByBookId(username, repository, bookId, manifest)
  .then(tsv => {
    const data = tsvParse(tsv);
    resolve(data);
  }).catch(reject);
});

export const fetchFileByBookId = (username, repository, bookId, manifest) => new Promise((resolve, reject) => {
  let {path} = projectByBookId(manifest.projects, bookId);
  path = path.replace(/^\.\//, '');
  ApplicationHelpers.fetchFileFromServer(username, repository, path)
  .then(resolve).catch(reject);
});

export const projectByBookId = (projects, bookId) => {
  const _projects = projects.filter(item => item.identifier === bookId);
  let project;
  if (_projects.length > 0) {
    project = _projects[0];
  }
  return project;
}

export const tsvParse = (tsv) =>
  tsv.split('\n').map(row => row.trim().split('\t'));
