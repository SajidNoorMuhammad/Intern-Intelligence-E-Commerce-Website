const devUrl = 'https://electric-app-backend.vercel.app/'
export const BASE_URL = devUrl;

export const AppRoutes = {
    login: BASE_URL + 'authlogin/login',
    getinfo: BASE_URL + 'authlogin/getInfo',
    registers: BASE_URL + 'auth/register',
    getproducts: BASE_URL + 'admin/electronics',
    addproducts: BASE_URL + 'admin/additems',
    addtocart: BASE_URL + 'user/cart',
    usercart: BASE_URL + 'user/carting',
    addorder: BASE_URL + 'cart/place-order',
    eachorder: BASE_URL + 'cart/ordering',
    oneorder: BASE_URL + 'cart/eachorder',
    deletecart: BASE_URL + 'user/deleteitem',
    trackorder: BASE_URL + 'cart/track',

    //Admin Link Start Here;
    adminproducts: BASE_URL + 'admin/electronics',
    updateproduct: BASE_URL + 'admin/updateitems',
    deleteproduct: BASE_URL + 'admin/deleteitem',
    allusers: BASE_URL + 'auth/register',
    updateuser: BASE_URL + 'auth/updateuser',
    allorders: BASE_URL + 'cart/order'
}