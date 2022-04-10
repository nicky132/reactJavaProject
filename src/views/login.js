import { Form, Input, Button, Checkbox, Divider } from 'antd';
import axios from 'axios';
import { Router, browserHistory } from 'react-router';
// import history from "../assets/js/history";
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
function FormPage() {
    const history = useHistory();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios.post('http://localhost:8081/login', {
            username: values.username,
            password: values.password,
        },{
            headers: {
                'Access-Control-Allow-Origin':'*',  //解决cors头问题
                'Access-Control-Allow-Credentials':'true', //解决session问题
                'Content-Type': 'application/json; charset=UTF-8', //将表单数据传递转化为form-data类型
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', //将表单数据传递转化为form-data类型
                'Authentication':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NDk1NjkwNDgzNjUsImV4cCI6MTY1MDE3Mzg0OH0.Fwf1gZtm7aCmui12Zdxzzd5fpFQan0qFnVSWGB6xaIiqm-zRsAA4gmjpzGNHXOAQ4kpHVTuNz1lLvi2mmlIIBg'
            },
            withCredentials : true
        })
        .then(function (response) {
            alert(8)
            console.log("response",response);
            // browserHistory.push('/s')
            var res = response.data;
            history.push("/record");
            // if(res=="登录成功,3秒后跳转主页") {
            //     var noticeId= JSON.parse(window.sessionStorage.getItem('user'));
            //     alert(noticeId)
            //     alert(response.data);
            //     setTimeout(that.LoginSuccess, 3000)
            // }else if(response.data=="用户名不存在,请注册后重新登录") {
            //     that.message = response.data
            // }
        })
        .catch(function (error) {
            alert(error);
        });
    };
    
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    };
    
    return (
        <div className="formDiv">
            <Form
            className="form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                label="姓名"
                name="username"
                rules={[{ required: true, message: '请输入姓名!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
  
  export default FormPage;