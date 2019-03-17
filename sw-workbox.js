importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

/**
 * @todo Service Worker 를 업데이트를 하려면, 아래의 버전을 수정하면 된다. 그러면 자동으로 service worker 가 새로 시작된다.
 */
const version = '0.4';

if (workbox) {
    console.log(`workbox is loaded.`);
} else {
    console.log(`Oops! Workbox didn't load.`);
}

// 실제 서버의 값을 먼저 가져와서 보여준다.
// 즉, 필고 홈페이지와 같이 바쁜 사이트의 메인페이지는 동적이며 늘 업데이트된다.
// 따라서 홈페이지의 정보를 가져와서 먼저 보여주고, 인터넷이 안되면, 캐시된 데이터를 보여준다.
const articleHandler = workbox.strategies.networkFirst({
    cacheName: 'frong-page-cache',
    plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 50,
        })
    ]
});

/**
 * @todo 캐시하고자 하는 내용을 변경하면된다.
 * 아래의 코드는 루트 폴더의 index.html 또는 index.php 만 캐시한다.
 */
workbox.routing.registerRoute(/pwa-sw-workbox\/$/, args => {
    return articleHandler.handle(args);
});