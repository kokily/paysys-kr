import client from './client';

/**
 * Login with Credentials
 * @param payload { username, password }
 * @returns SerializedUser
 */
export async function loginAPI(payload: AuthPayload) {
  const response = await client.post<SerializedUser>('/auth/login', payload);
  return response.data;
}
