function getErrorInfo(err) {
  if (err instanceof Error && err.stack) {
    const rootPoints = process.cwd().split('\\');
    const rootName = rootPoints[rootPoints.length - 1];

    const stackLines = err.stack.split('\n');
    const line = stackLines[1].trim() || '';
    const index = line.indexOf(rootName);
    return index !== -1 ? line.slice(index) : '';
  } else {
    return '';
  }
}

export default getErrorInfo;
