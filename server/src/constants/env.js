export const ENV_LOCAL = 'local';
export const ENV_PROD = 'prod';

export function isEnv(envStr) {
  return [ENV_LOCAL, ENV_PROD].includes(envStr);
}