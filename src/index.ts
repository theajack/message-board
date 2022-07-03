
import initComment from 'tc-comment';
import {getUrlParam} from './util';

const app = decodeURIComponent(getUrlParam('app', 'message-board') as string);

const dataHandler = (data: Record<string, any>) => {
    data.app = app;
    return data;
};

function main () {
    initUI();
    const el = window.document.createElement('div');
    window.document.body.appendChild(el);
    initComment({
        el,
        urlConfig: {
            host: 'www.shiyix.cn',
            // host: 'localhost:8080', // View https://github.com/theajack/comment for details
            get: '/api/message',
            insert: '/api/message',
            reply: '/api/message/reply',
        },
        dataHandler: {
            get: dataHandler,
            insert: dataHandler,
            reply: dataHandler,
        }
    });
};

function initUI () {
    const doc = window.document;
    doc.body.setAttribute('style', 'max-width: 1000px;margin: 0 auto;');

    const title = doc.createElement('div');

    const mainTitle = doc.createElement('div');
    mainTitle.setAttribute('style', `text-align: center;margin-top: 15px;`);

    const mainTitleText = doc.createElement('span');

    mainTitleText.setAttribute('style', `font-size: 30px; font-weight: bold; text-decoration: underline;cursor: pointer;`);
    mainTitleText.addEventListener('click', () => {
        window.open('https://github.com/theajack/message-board/');
    });
    mainTitleText.innerText = 'Message Board';
    mainTitle.appendChild(mainTitleText);
    title.appendChild(mainTitle);

    const subTitle = doc.createElement('div');
    subTitle.innerText = `app:${app}`;
    subTitle.setAttribute('style', `font-size: 16px;text-align: center;margin-bottom: 15px; color: #666;`);

    title.appendChild(subTitle);
    doc.body.appendChild(title);

}

main();