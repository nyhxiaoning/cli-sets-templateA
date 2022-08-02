// 用户账号家里
import crypto from 'crypto';
import _ from 'lodash';
// aes加密解密参数
const key = '643433663263326136373033';
const iv = '373833333630663332323062';
class Cryptojs {
  // md5加密不可逆操作
  md5(value) {
    let time = new Date().getTime();
    let rand = _.random().toString();
    rand = rand.replace('0.', '');
    let md = `${time}${rand}`;
    if (value) {
      md = value;
    }
    return crypto.createHash('md5').update(md).digest('hex');
  }
  async cipher(val) {
    // aes 加密
    const cipher = crypto.createCipheriv('aes-192-gcm', key, iv, {
      encoding: 'utf-8',
    });
    const hex = cipher.update(val, 'utf-8', 'hex');
    cipher.final('hex');
    return hex;
  }
  async decipher(val) {
    // aes 解密
    const decipher = crypto.createDecipheriv('aes-192-gcm', key, iv);
    let hex = decipher.update(val, 'hex', 'utf-8');
    try {
      hex += decipher.final('utf-8');
      return hex;
    } catch (e) {
      return hex;
    }
  }
}

const cryptojs = new Cryptojs();

export default cryptojs;
