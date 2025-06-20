import axios from "axios";
import { AuthorizationResponse } from "../interfaces/authorization";

const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

export async function getAccessToken() {
  try {
    const response = await axios.post<AuthorizationResponse>(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) {
      const token = response.data.access_token;
    //   console.log('Access Token:', token);
      return token;
    } else {
      console.error('Authentication failed with status:', response.status);
      console.error('Response data:', response.data);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
    } else {
      console.error('Unexpected Error:', error);
    }
    return null;
  }
}
