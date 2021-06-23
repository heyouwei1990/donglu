import { request } from './request'
export function getNovelCategory(params) {
    return request('get', '/api/novel/category', params);
}
export function getNovelList(params) {
    return request('post', '/api/novel/list', params);
}
export function getNovelDetail(params) {
    return request('get', '/api/novel/detail', params);
}
export function getNovelChapter(params) {
    return request('get', '/api/novel/chapter', params);
}
export function getNovelChapterDetail(params) {
    return request('get', '/api/novel/chapter/detail', params);
}
export function register(params) {
    return request('post', '/api/register', params);
}
export function login(params) {
    return request('post', '/api/login', params);
}