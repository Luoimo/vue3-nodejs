/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-18 20:29:18
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-18 20:31:06
 */
import axios from "axios"
function upload(path, userForm) {
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    return axios
        .post(path, params, {
            headers: {
                'Content-Type': 'mutipart/form-data',
            },
        })
        .then((res) => res.data)
}
export default upload
