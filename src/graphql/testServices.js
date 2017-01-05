import request from 'request';
import emoji from 'node-emoji';
import config from '../config';

export function login(email, password) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: `${config.api}/user/sign_in.json`,
        body: {email, password},
        json: true
      },

      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          return resolve(body);
        }
        return reject(body);
      }
    );
  });
}

function debugEmoji(time) {
  if (time < 100) {
    return emoji.get('rocket');
  }
  if (time < 400) {
    return emoji.get('dog');
  }
  if (time < 800) {
    return emoji.get('rabbit');
  }
  if (time < 1500) {
    return emoji.get('turtle');
  }
  return emoji.get('whale');
}
/**
 * Service Call
 *
 * Almost all calls to the external services will go through this call. This
 * function returns a promise which makes a request of type 'method' to 'url'.
 * You must pass in an authorization token
 *
 * Example:
 *
 *     let userRequest = serviceCall(token, 'GET', '..../users/3.json');
 *
 *     userRequest.then((user) => {...}, (error) => {..handle error...});
 *
 */
export function serviceCall(token, method, url, body) {
  return new Promise((resolve, reject) => {
    let start = new Date();
    let reqObj = {
      method,
      url: `${config.api}/${url}`,
      headers: {
        Authorization: token
      }
    };
    if (body) {
      reqObj.body = body;
      reqObj.json = true;
    }
    request(
      reqObj,
      function (error, response, body) {
        let time = new Date() - start;
        try {
          console.log(`${method} ${url} ${response.statusCode} ${time}ms ${debugEmoji(time)}`);
          if (!error && (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 204)) {
            // If this call returns a list put the list on edges and return the count
            if (response.headers['x-total-count']) {
              return resolve({
                edges: JSON.parse(body),
                count: response.headers['x-total-count'] || 0
              });
            }
            // Else just return the object
            if (typeof body === 'object') {
              return resolve(body);
            }
            if (method === 'DELETE') {
              return resolve('deleted');
            }
            return resolve(JSON.parse(body));
          }
          // The error messages are actually getting sent in the body
          return reject(JSON.stringify(body));
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Get Object serviceCall wrapper
 *
 * Use when you need to GET something based only on it's endpoint.
 *
 * Example:
 *
 *     let userRequest = getObject(token, 'users', 3);
 *
 *     userRequest.then((user) => {...}, (error) => {..handle error...});
 *
 */

export function getObject(token, objectType, objectID) {
  if (!objectID) {
    return false;
  }
  return serviceCall(token, 'GET', `${objectType}/${objectID}.json`);
}

/**
 * Get List Of Objects serviceCall Wrapper
 *
 * GETs an array of objects.
 */
export function getListOfObjects(token, objectType, params = {}, options = {}) {
  let url = `${objectType}.json?`;

  Object.keys(params).forEach(key => {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  });

  Object.keys(options).forEach(key => {
    if (options[key]) {
      url += `${key}=${options[key]}&`;
    }
  });
  return serviceCall(token, 'GET', url);
}

export function getListOfObjectsFromAnObject(token, objectType, parentObjectType, parentID, params = {}, options = {}) {
  let url = `${parentObjectType}/${parentID}/${objectType}.json?`;

  Object.keys(params).forEach(key => {
    if (params[key]) {
      url += `${key}=${params[key]}&`;
    }
  });
  Object.keys(options).forEach(key => {
    if (options[key]) {
      url += `${key}=${options[key]}&`;
    }
  });

  return serviceCall(token, 'GET', url);
}

export function createObject(token, objectType, initialObject) {
  let url = `${objectType}.json`;
  return serviceCall(token, 'POST', url, initialObject);
}

export function createObjectUnderObject(token, objectType, parentObjectType, parentID, initialObject) {
  let url = `${parentObjectType}/${parentID}/${objectType}.json`;
  return serviceCall(token, 'POST', url, initialObject);
}

export function updateObject(token, objectType, objectID, updateObject) {
  let url = `${objectType}/${objectID}.json`;
  return serviceCall(token, 'PUT', url, updateObject);
}

export function removeObject(token, objectType, objectID) {
  let url = `${objectType}/${objectID}.json`;
  return serviceCall(token, 'DELETE', url);
}
