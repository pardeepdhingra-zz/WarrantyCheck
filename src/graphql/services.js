import config from '../config';

function fetchResponseByURL(relativeURL) {
  return fetch(`${config.api}/${relativeURL}`).then(res => res.json());
}

export function getListOfObjects(token, objectType) {
  return fetchResponseByURL(objectType).then(objectType => objectType);
}

export function getObject(token, objectType, objectID) {
  if (!objectID) {
    return false;
  }
  return fetchResponseByURL(`${objectType}/${objectID}.json`).then(objectType => objectType);
}
