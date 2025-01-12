/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2024-10-14 20:04:35
 * @LastEditors: GaoMingze
 * @LastEditTime: 2024-10-20 21:47:42
 */
import Center from '@/views/center/Center.vue'
import Home from '@/views/home/Home.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
import ProductEdit from '@/views/product-manage/ProductEdit.vue'

const routes = [
    {
        path: '/index',
        component: Home,
    },
    {
        path: '/center',
        component: Center,
    },
    {
        path: '/user-manage/adduser',
        component: UserAdd,
        requireAdmin: true,
    },
    {
        path: '/user-manage/userlist',
        component: UserList,
        requireAdmin: true,
    },
    {
        path: '/news-manage/addnews',
        component: NewsAdd,
    },
    {
        path: '/news-manage/newslist',
        component: NewsList,
    },
    {
        path:'/news-manage/editnews/:id',
        component:NewsEdit
    },
    {
        path: '/product-manage/addproduct',
        component: ProductAdd,
    },
    {
        path: '/product-manage/productlist',
        component: ProductList,
    },
    {
        path:'/product-manage/editproduct/:id',
        component:ProductEdit
    },
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Notfound',
        component: NotFound,
    },
]

export default routes
