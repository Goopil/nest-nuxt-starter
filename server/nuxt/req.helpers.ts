function acceptJson(headers) {
  return ['/json', '+json'].some((segment) => headers.accept.includes(segment));
}

function isXmlHttpRequest(headers) {
  return headers['X-Requested-With'] === 'XMLHttpRequest';
}

function isPjax(headers) {
  return !!headers['X-PJAX'];
}

export function jsonRequest(headers) {
  return [acceptJson, isXmlHttpRequest, isPjax].some((test) => test(headers));
}
