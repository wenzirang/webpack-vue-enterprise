import { getParseData, postParseData } from '../common/utiles/httpRequest';
import config from "../../config/webconfig"

const ACCOUNTAPI = `api/Account`;

/**
 * 发送验证码
 * @param {number} msgType 发送验证码类型
 */
export const ValidationSMSCode = (msgType, phoneNumber) => {
    return getParseData({
        url: `${config.webapi}${ACCOUNTAPI}/SendVerification`,
        data: {
            msgType: msgType,
            telePhone: phoneNumber
        }
    })
}


/**
 * 修改密码
 * @param {number} NewPassword 新密码
 * @param {number} OldPassword 旧密码 
 */
export const ReviseAuth = (NewPassword, OldPassword) => {
    return postParseData({
        url: `${config.webapi}${ACCOUNTAPI}/ReviseAuth`,
        data: {
            NewPassword: NewPassword,
            OldPassword: OldPassword
        }
    })
}
