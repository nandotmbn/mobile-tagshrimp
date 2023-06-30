import MainApi from './AxiosInstance';
import {dnnURL} from '../static/urls';
import * as axios from 'axios';
import UploadApi from './UploadInstance';

// class service {
//   async onlyNumber(file) {
//     // await axios.post(`${dnnURL}/only-number`, file, {
//     //         headers: { 'Content-Type': 'multipart/form-data' },
//     //     }).then(res => {
//     //       console.log(res)
//     //         // setPhoto(res.data.photo.photo);
//     //     }).catch(err => {
//     //         console.log(err.response);
//     //     });
//     const config = {
//       method: 'post',
//       url: `${dnnURL}/only-number`,
//       data: file,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     };

//     console.log(config);

//     // console.log("KONTOL")

//     // return axios(config);
//   }
// }

class service {
  async onlyNumber(cred) {
    const data = await UploadApi.post('/only-number', cred, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }
}

export const UploadService = new service();
