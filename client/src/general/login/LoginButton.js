import {useContext} from 'react';
import {AppContextTodo} from '../../AppContext';
import './LoginButton.scss';

export function LoginButton (props) {

    let appContext = useContext(AppContextTodo);

    async function validateLoginUser (params) {
        
        let userInfo={};
        // fetch ('/api/users/getDataByParams') -->> using post
        userInfo = await fetch (`/api/users/getDataByParams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(params)
        });
        let result = await userInfo.json();

        // console.log( `Debug client after calling validateLoginUser: returned record is: `,temp);

        return result;
    }
    
    async function setLoginUser (e, loginType) {
            let params={};
            
            let data={};

            switch (loginType.toUpperCase()) {
                case 'GUEST':
                case 'ADMIN':
                case 'TECH':
                    // 3 generic users that do not require a username + password. User can use a common "pool"
                    params = { loginName: loginType, userType: loginType }; // no need to pass the password from client
                    
                    data = await validateLoginUser(params);
                    console.log(`Client. After calling Server.fetch(/api/users/getDataByParams).  data ==>>  ${JSON.stringify(data)}`);
                    break;

                case 'SignIn'.toUpperCase():
                    // if user will write here "GUEST" / "ADMIN" / "TECH" it will fail as in 
                    alert (`${loginType} not yet supported`);
                    break;

                case 'SignUp'.toUpperCase():
                    alert (`${loginType} not yet supported`);
                    break;

                default:
                    alert(`invalid value ${loginType} passed to setLoginUser`);
            }
        
            console.log ('setLoginUser: after call to validateLoginUser. data: ', data);
            /*
            return object
                data.userInfo: []
                data.validUser: boolean
            */    
            if (data.validUser && data.userInfo.length>0) {
                alert (`\n\n${data.userInfo[0].firstName} ${data.userInfo[0].lastName}, thanks for choosing to use "M.B. Todo App"`);
                appContext.setUserInfo ( {
                    loginName:  data.userInfo[0].loginName,
                    userType:   data.userInfo[0].userType,
                    fullName:   data.userInfo[0].firstName + ' ' + data.userInfo[0].lastName,
                    validUser:  data.validUser,
                })
            } else {
                appContext.setUserInfo ( {validUser: data.validUser });
                alert (`Invalid login name "${loginType}". \n\n Please verify user & password.`);
            }
            
            console.log (`setLoginUser: appContext.userInfo =` , appContext.userInfo);
        }   // end setLoginUser

    
        return <div className="loginButtonOptions">

            {/* I disabled the button as to have only the hover effect, not the button  */}
            <button className="dddwBtnSelection" disabled>login  ..... </button>

            <div className="loginMenuItemsContainer">
                <div className="loginMenuItem" title="login to site as anonymous user type 'Guest' "
                    onClick={(e) => setLoginUser(e, 'GUEST') }>Visit as Guest</div> <hr></hr>

                <div className="loginMenuItem" title="login to site as anonymous user type 'Administrator' "
                    onClick={(e) => {setLoginUser(e,'ADMIN')}}>Visit as Admin</div> <hr></hr>

                <div className="loginMenuItem" title="login to site as anonymous user type 'Technical Developer' "
                    onClick={(e) => {setLoginUser(e, 'TECH')}}>Visit as Tech Advisor</div> <hr></hr>

                <div className="loginMenuItem" title="login with your personal username and password"
                    onClick={(e) => {setLoginUser(e, 'SignIn')}}>Sign In</div> <hr></hr>

                <div className="loginMenuItem" title="register to site (first time)"
                    onClick={(e) => {setLoginUser(e, 'SignUp')}}>Sign Up</div> {/* <hr></hr> */}

            </div>
        </div>
}


