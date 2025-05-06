function getErrorInfo(err) {
  if (err instanceof Error && err.stack) {
    const root = process.env.APP_NAME;

    const stackLines = err.stack.split('\n');
    const line = stackLines[1] || '';
    const index = line.indexOf(root);
    return index !== -1 ? line.slice(index) : '';
  } else {
    return '';
  }
}

export default getErrorInfo;