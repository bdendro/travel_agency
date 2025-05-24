export const ENV_DEV = 'development';
export const ENV_PROD = 'production';

export function isEnv(envStr) {
  return [ENV_DEV, ENV_PROD].includes(envStr);
}
