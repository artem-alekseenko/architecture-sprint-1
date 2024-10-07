import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from 'auth/AuthProvider';
import Main from "./Main";

const LazyComponent = (importFunc, componentName) =>
    lazy(() =>
        importFunc().catch((e) => {
            console.error(`Failed to load ${componentName} component:`, e);
            return { default: () => <div className='error'>Component {componentName} is not available!</div> };
        })
    );

const Login = LazyComponent(() => import('auth/Login'), 'Login');
const Register = LazyComponent(() => import('auth/Register'), 'Register');
const Header = LazyComponent(() => import('shared/Header'), 'Header');
const Footer = LazyComponent(() => import('shared/Footer'), 'Footer');

const App = () => {
    return (
        <AuthProvider>
            <div className="page__content">
                <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                    <Switch>
                        <ProtectedRoute exact path="/" component={Main} />
                        <Route path="/signup" component={Register} />
                        <Route path="/signin" component={Login} />
                    </Switch>
                    <Footer />
                </Suspense>
            </div>
        </AuthProvider>
    );
};
export default App;