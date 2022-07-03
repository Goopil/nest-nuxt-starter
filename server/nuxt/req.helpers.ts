function acceptJson(headers: Record<string, string>): boolean {
  return ['/json', '+json'].some((segment) =>
    (headers.accept || '').includes(segment),
  );
}

function isXmlHttpRequest(headers: Record<string, string>): boolean {
  return headers['X-Requested-With'] === 'XMLHttpRequest';
}

function isPjax(headers: Record<string, string>): boolean {
  return !!headers['X-PJAX'];
}

export function jsonRequest(headers: Record<string, string>): boolean {
  return [acceptJson, isXmlHttpRequest, isPjax].some((test) => test(headers));
}
