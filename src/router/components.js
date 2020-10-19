/* Layout */
export const LayoutDefaultWrapper = () => import('$layouts/DefaultWrapper');
export const LayoutDefault = () => import('$layouts/Default');
export const LayoutLogin = () => import('$layouts/Auth');

/* Auth */
export const Login = () => import('$pages/auth/login/Login');

/* Home */
export const Home = () => import('$pages/home/Home');

/* Contas */
export const ContaSaldo = () => import('$pages/conta/Saldo');
export const ContaSaque = () => import('$pages/conta/Saque');
export const ContaDeposito = () => import('$pages/conta/Deposito');

/* Erros */
export const NotFound = () => import('$pages/errors/404');
