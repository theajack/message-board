
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
            host: 'localhost:8080', // View https://github.com/theajack/comment for details
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
    title.setAttribute('style', `font-size: 30px; font-weight: bold; text-align: center;margin: 15px 0;`);
    title.innerText = 'Message Board';

    const subTitle = doc.createElement('div');
    subTitle.innerText = `app:${app}`;
    subTitle.setAttribute('style', `font-size: 16px;font-weight: normal;color: #666;`);

    title.appendChild(subTitle);
    doc.body.appendChild(title);

}

main();