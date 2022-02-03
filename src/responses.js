const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, 200, css, 'text/css');
};

// Status codes
// 200
const success = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
     <message>${responseObj.message}</message>
     </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 200, responseJSON, 'application/json');
};

// 400
const badRequest = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query param set to true';
    responseObj.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
      </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(responseObj);
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
    <message>${responseObj.message}</message>
    </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 200, responseJSON, 'application/json');
};

// 401
const unauthorized = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'You have accessed this content',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing loggedIn query param set to yes';
    responseObj.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response>
      <message>${responseObj.message}</message>
      <id>${responseObj.id}</id>
      </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(responseObj);
    return respond(request, response, 401, responseJSON, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
    <message>${responseObj.message}</message>
    </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 200, responseJSON, 'application/json');
};

// 403
const forbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
    <message>${responseObj.message}</message>
    <id>${responseObj.id}</id>
    </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 403, responseJSON, 'application/json');
};

// 404
const notFound = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
     <message>${responseObj.message}</message>
     <id>${responseObj.id}</id>
     </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 404, responseJSON, 'application/json');
};

// 500
const internal = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Server Error.  Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
     <message>${responseObj.message}</message>
     <id>${responseObj.id}</id>
     </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 500, responseJSON, 'application/json');
};

// 501
const notImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet.  Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response>
     <message>${responseObj.message}</message>
     <id>${responseObj.id}</id>
     </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(responseObj);
  return respond(request, response, 501, responseJSON, 'application/json');
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
