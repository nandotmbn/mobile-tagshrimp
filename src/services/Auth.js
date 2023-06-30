import MainApi from './AxiosInstance';

class service {
  async login(cred) {
    const data = await MainApi.post('/auth/login', cred);
    return data.data;
  }
  async register(cred) {
    const data = await MainApi.post('/auth/register', cred);
    console.log(data)
    return data.data;
  }
}

export const AuthService = new service();
