// 입력 필드와 버튼, TODO 목록을 표시할 ul 요소를 선택합니다.
const todoInput = document.querySelector('input'); // TODO 항목 입력 필드
const createButton = document.querySelector('button'); // TODO 항목 추가 버튼
const ul = document.querySelector('#todo-list'); // TODO 항목을 표시할 ul 요소

// TODO 항목을 서버에 추가하는 함수
const createTodo = () => { // Create - 서버에 Todo 추가할 때
  const newTodo = todoInput.value; // 입력 필드에서 TODO 내용 가져오기

  // 서버에 POST 요청을 보내어 새로운 TODO 항목을 추가합니다.
  return axios.post('http://localhost:3001', newTodo, {
    headers: { 'Content-Type': 'text/plain' } // 요청 본문이 텍스트 형식임을 명시합니다.
  })
    .then(res => console.log(res.data)); // 서버 응답을 콘솔에 출력합니다.
}

// 서버에서 TODO 목록을 가져오는 함수
const readTodo = async () => { // Read - 서버에서 Todo정보 가져올 때
  const res = await axios.get('http://localhost:3001'); // 서버에 GET 요청을 보내어 TODO 목록을 가져옵니다.
  return res.data; // 서버로부터 받은 TODO 목록을 반환합니다.
}

// 서버에서 TODO 항목을 업데이트하는 함수
const updateTodo = (newTodo) => { // Update - 서버의 Todo 정보를 수정할 때
  // 서버에 PUT 요청을 보내어 TODO 항목을 업데이트합니다.
  return axios.put('http://localhost:3001', newTodo)
    .then(res => console.log(res.data)); // 서버 응답을 콘솔에 출력합니다.
}

// 서버에서 TODO 항목을 삭제하는 함수
const deleteTodo = (id) => { // Delete - 서버의 Todo 정보를 삭제할 때
  // 서버에 DELETE 요청을 보내어 지정된 ID의 TODO 항목을 삭제합니다.
  return axios.delete('http://localhost:3001', {data: id})
    .then(res => console.log(res)); // 서버 응답을 콘솔에 출력합니다.
}

// TODO 목록을 화면에 표시하는 함수
const renderDisplay = (data) => { // 화면을 그리는 것
  // 데이터를 기반으로 TODO 항목을 생성하고 화면에 표시합니다.
  for (let el of data) { // TODO 목록을 순회합니다.
    const list = document.createElement('li'); // 새로운 리스트 항목 생성
    list.textContent = el.content; // TODO 항목의 내용을 리스트 항목에 추가

    const updateInput = document.createElement('input'); // 수정할 내용을 입력할 텍스트 필드 생성
    
    // TODO 항목을 수정하는 버튼 생성
    const updateButton = document.createElement('button');
    updateButton.textContent = '수정'; // 버튼 텍스트 설정
    updateButton.onclick = () => { // 버튼 클릭 시 처리할 함수 설정
      updateTodo({
        id: el.id, // 기존 TODO 항목의 ID
        content: updateInput.value // 수정된 TODO 항목의 내용
      })
        .then(() => readTodo()) // TODO 항목이 업데이트된 후 새로운 TODO 목록을 가져옵니다.
        .then((res) => {
          removeDisplay(); // 화면에 표시된 TODO 목록을 지웁니다.
          renderDisplay(res); // 새 TODO 목록을 화면에 표시합니다.
        });
    };

    // TODO 항목을 삭제하는 버튼 생성
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제'; // 버튼 텍스트 설정
    deleteButton.onclick = () => { // 버튼 클릭 시 처리할 함수 설정
      deleteTodo(el.id) // TODO 항목을 삭제합니다.
        .then(() => readTodo()) // TODO 항목이 삭제된 후 새로운 TODO 목록을 가져옵니다.
        .then((res) => {
          removeDisplay(); // 화면에 표시된 TODO 목록을 지웁니다.
          renderDisplay(res); // 새 TODO 목록을 화면에 표시합니다.
        });
    };

    list.append(updateInput, updateButton, deleteButton); // 리스트 항목에 수정 입력 필드와 버튼을 추가
    ul.append(list); // 생성된 리스트 항목을 ul 요소에 추가
  }
}

// 화면에 표시된 TODO 목록을 지우는 함수
const removeDisplay = () => { // 화면을 지우는 것
  while (ul.children.length) { // ul 요소의 자식 요소가 있는 동안 반복
    ul.removeChild(ul.children[0]); // 첫 번째 자식 요소를 제거
  }
}

// "추가" 버튼 클릭 시 TODO 항목을 추가하고 화면을 업데이트하는 이벤트 리스너
createButton.addEventListener('click', () => {
  createTodo() // 새로운 TODO 항목을 서버에 추가합니다.
    .then(() => readTodo()) // TODO 항목이 추가된 후 새로운 TODO 목록을 가져옵니다.
    .then((res) => {
      removeDisplay(); // 화면에 표시된 TODO 목록을 지웁니다.
      renderDisplay(res); // 새 TODO 목록을 화면에 표시합니다.
    });
});

// 페이지가 로드되면 서버에서 TODO 목록을 가져와 화면에 표시합니다.
readTodo().then(res => renderDisplay(res));

/**
 * createTodo: 입력 필드의 값을 서버에 POST 요청으로 보내 TODO 항목을 추가합니다.
 * readTodo: 서버에 GET 요청을 보내 TODO 목록을 가져옵니다.
 * updateTodo: 서버에 PUT 요청을 보내 TODO 항목을 수정합니다.
 * deleteTodo: 서버에 DELETE 요청을 보내 TODO 항목을 삭제합니다.
 * renderDisplay: TODO 목록을 받아 화면에 표시합니다. 각 TODO 항목에 대해 수정 및 삭제 버튼을 추가합니다.
 * removeDisplay: 현재 화면의 TODO 항목을 모두 제거합니다.
 * 이벤트 리스너: "추가" 버튼 클릭 시 새로운 TODO 항목을 서버에 추가하고 화면을 업데이트합니다.
 * 초기 데이터 로딩: 페이지가 로드될 때 서버에서 TODO 목록을 가져와 화면에 표시합니다.
 */
