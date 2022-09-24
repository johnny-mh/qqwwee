# heroku-react-with-jsonserver

vitejs기반 react앱과 json-server기반 api서버를 heroku에 배포하는 환경이 세팅되어 있는 템플릿 리포지토리입니다.

## 시작하기

`fork` 혹은 `Use this template` 를 클릭하여 리포지토리를 생성합니다.

## json-server

서버가 실행되면 vite-plugin-max를 사용하여 리포지토리 루트 경로의 db.json를 기반으로 API들이 제공됩니다.

해당 API들은 `/api/*` 하위에서 사용할 수 있으며. 페이지네이션, 정렬, 필터, 관계(1:1, 1:N) 등의 기능들은 [json-server의 라우팅 기능](https://www.npmjs.com/package/json-server#routes)을 참고하여 파라미터를 바꿔가며 사용할 수 있습니다.

```
GET /api/users?_start=0&_end=9

[{}, {}, {}, ...]

(header) X-Total-Count = 500
```

db.json 에는 임시 사용자 데이터 `users` 가 포함되어 있는데. 프로젝트에 맞게 수정하여 사용하면 됩니다.

## 배포하기

[heroku](https://www.heroku.com) 계정 생성 후 로컬에 [CLI를 설치하고 로그인](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)합니다. 그 다음 아래 명령을 통해 배포할 수 있습니다.

```bash
heroku create
git push heroku main
heroku open
```

이후 heroku 리모트가 생성되니 여기에 push하면 자동으로 수정 내역 배포가 진행된다.

```bash
git push heroku main
```

자세한 사항은 [heroku로 node.js웹사이트 배포하기](https://joyful-development.tistory.com/15)를 참조해주세요.

## 타입스크립트 적용하기

아래 명령을 통해 타입스크립트를 적용할 수 있습니다.

```bash
node scripts/typescript.js
npm install
```
