import react from 'react';
import './LoginButton.scss';

export function LoginButton (props) {

    
    function setLoginUser (e, loginType) {
            let params={};
            alert (loginType);

            switch (loginType) {
                case 'GUEST':
                case 'ADMIN':
                case 'TECH':
                    params = { loginName: loginType, userType: loginType };
                    break;
                case 'SignIn'.toUpperCase():
                    break;
                case 'SignUp'.toUpperCase():
                    break;
                default:
                    alert(`invalid value ${loginType} passed to setLoginUser`);
            // visitorAsGuest#909

            // visitorAsAdmi#808

            // visitorAsTech#707
            }
 
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


