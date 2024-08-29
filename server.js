const express = require('express'); // express 모듈 불러오기
const cors = require('cors'); // cors 모듈 불러오기

let todo = [
  { id: 1, content: '더미데이터' },
  { id: 2, content: '터미네이터' },
];

const app = express(); // express 실행

// cors 설정
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.text()); // 텍스트 형식의 요청 본문을 파싱

app.options('/', (req, res) => {
  return res.send('요청을 보내세요.');
});

app.get('/', (req, res) => {
  return res.json(todo); // todo 배열을 JSON 형식으로 반환
});

app.post('/', (req, res) => {
  console.log(req.body); // 요청 본문을 콘솔에 출력
  const newTodo = { id: Number(new Date()), content: req.body }; // 새로운 todo 항목 생성
  todo.push(newTodo); // todo 배열에 추가
  return res.send('Todo가 추가됐습니다.');
});

app.put('/', (req, res) => {
  todo = todo.map(el => {
    if (el.id === req.body.id) {
      return req.body; // 요청 본문에 있는 항목으로 수정
    } else {
      return el;
    }
  });
  return res.send('Todo가 수정됐습니다.');
});

app.delete('/', (req, res) => {
  const id = Number(req.body); // 요청 본문에서 ID 추출
  todo = todo.filter(el => el.id !== id); // 해당 ID를 가진 항목 제거
  return res.send('Todo가 삭제됐습니다.');
});

app.listen(3001, () => {
  console.log('3001번 서버가 열림');
});

/** 모듈 불러오기
 * express와 cors 모듈을 불러옵니다.
 * express는 웹 서버를 구축할 수 있도록 해주며,
 * cors는 교차 출처 리소스 공유(CORS) 설정을 도와줍니다.
 */

/** todo 배열
 * 초기 TODO 항목을 담고 있는 배열입니다.
 * 각 항목은 id와 content 속성을 갖습니다.
 */

/** Express 애플리케이션 생성
 * const app = express();는 새로운 Express 애플리케이션을 생성합니다.
 */

/** CORS 설정
 * app.use(cors({...}))로 CORS 설정을 추가합니다.
 * 여기서는 http://127.0.0.1:5500 출처에서 오는 요청만 허용하고,
 * OPTIONS, GET, POST, PUT, DELETE 메서드를 지원합니다.
 */

/** 요청 본문 파싱
 * app.use(express.json());는 JSON 형식의 요청 본문을 자동으로 파싱합니다.
 * app.use(express.text());는 텍스트 형식의 요청 본문을 파싱합니다. 이 설정은 POST와 PUT 메서드에서 주로 사용됩니다.
 */

/** CORS Preflight 요청 처리
 * app.options('/', (req, res) => { ... });는 CORS 프리플라이트 요청을 처리하여
 * 클라이언트가 실제 요청을 보내기 전에 지원되는 메서드와 헤더 정보를 제공하는 데 사용됩니다.
 */

/** HTTP 메서드 핸들링
 * GET: app.get('/', (req, res) => { ... }); 루트 경로에서 TODO 목록을 JSON 형식으로 반환합니다.
 * POST: app.post('/', (req, res) => { ... }); 루트 경로로 새로운 TODO 항목을 추가합니다. 요청 본문을 콘솔에 출력하고, todo 배열에 새 항목을 추가합니다.
 * PUT: app.put('/', (req, res) => { ... }); 루트 경로에서 TODO 항목을 수정합니다. 요청 본문에 있는 id를 통해 기존 항목을 찾아 수정합니다.
 * DELETE: app.delete('/', (req, res) => { ... }); 루트 경로에서 TODO 항목을 삭제합니다. 요청 본문에서 ID를 추출하고, 해당 ID를 가진 항목을 todo 배열에서 제거합니다.
 */

/** 서버 시작
 * app.listen(3001, () => { console.log('3001번 서버가 열림'); });로 서버를 포트 3001에서 실행하고,
 * 서버가 열렸다는 메시지를 콘솔에 출력합니다.
 */

/** 패키지 설치 명령어
 * npm init -y: 기본 package.json 파일을 생성합니다.
 * npm install express: Express.js를 설치합니다.
 * npm install cors: CORS 미들웨어를 설치합니다.
 */

// Axios: HTTP 요청을 쉽게 처리할 수 있도록 도와주는 JavaScript 라이브러리입니다. 이 코드에서는 사용하지 않지만, 클라이언트 측에서 HTTP 요청을 보내는 데 유용합니다.