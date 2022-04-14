let testHTML = document.getElementById("test");
let answersArr = [];
let trueAnswers = [
  [1],
  [2],
  [0],
  [1],
  [3],
  [1],
  [3],
  [2],
  [2],
  [0],
];

let test = [
  {
    order: 1,
    title: "1. Как функционировала древняя экономика до изобретения денег?",
    type: "radio",
    answers: [
      "на основе дарения",
      "на основе бартера",
      "на основе самообеспечения",
      "экономика не существовала до появления денег",
    ]
  }, 
  {
    order: 2,
    title: "2. Когда были отчеканены первые монеты?",
    type: "radio",
    answers: [
      "в IX веке до нашей эры",
      "в IV веке до нашей эры",
      "в VII веке до нашей эры",
      "в X веке до нашей эры",
    ]
  },
  {
    order: 3,
    title: "3. В каком государстве были отчеканены первые монеты?",
    type: "radio",
    answers: [
      "Лидия",
      "Занкла",
      "Коринф",
      "Македония",
    ]
  },
  {
    order: 4,
    title: "4. В каком городе Руси отчеканили первый серебряный слиток, названный рублем?",
    type: "radio",
    answers: [
      "Киев",
      "Великий Новгород",
      "Нижний Новгород",
      "Полоцк",
    ]
  },
  {
    order: 5,
    title: "5. В какой стране зародились бумажные деньги?",
    type: "radio",
    answers: [
      "Англия",
      "Франция",
      "Священная Римская империя",
      "Китай",
    ]
  },
  {
    order: 6,
    title: "6. Какая валюта по Бреттон-Вудскому соглашению была привязана к золоту?",
    type: "radio",
    answers: [
      "Рубль",
      "Доллар",
      "Евро",
      "Фунт стерлингов",
    ]
  },
  {
    order: 7,
    title: "7. Как был совершен первый денежный перевод?",
    type: "radio",
    answers: [
      "Посредством ЭВМ",
      "Посредством мобильной платежной системы",
      "Посредство передачи носителя информации",
      "Посредством телеграфа",
    ]
  },
  {
    order: 8,
    title: "8. Какая платежная система была первой в России?",
    type: "radio",
    answers: [
      "Qiwi",
      "PayPal",
      "PayCash",
      "Visa",
    ]
  },
  {
    order: 9,
    title: "9. Что такое криптовалюта?",
    type: "radio",
    answers: [
      "Любая защищенная валюта",
      "Электронные деньги",
      "Сложный математический код",
      "Цифровая валюта, которая всегда растет в цене",
    ]
  },
  {
    order: 10,
    title: "10. Какая из известных криптовалют появилась первой?",
    type: "radio",
    answers: [
      "Bitcoin",
      "Ethereum",
      "Dogecoin",
      "BNB",
    ]
  },
];


let inputId = 0;
let getInputId = () => ++inputId;

let getTestCard = (testItem) => {
  let res = document.createElement("div");
  res.className = "test__card";
  res.innerHTML = `
    <div class="test__title">${testItem.title}</div>
    <ul class="test__answers-list">
    </ul>
    <button class="test__btn test__btn_prev">предыдущий</button>
    <button class="test__btn test__btn_next">следующий</button>
  `;

  for(let i = 0; i < testItem.answers.length; ++i) {
    let answer = document.createElement("li");
    answer.className = "test-list-item";
    let currentInputId = getInputId();

    answer.innerHTML = `
      <input type="${testItem.type}" name="${testItem.order}" value="${i}" class="test__list-input" id=${currentInputId}>
      <label for="${currentInputId}">
        <span class="test__list-answer">${testItem.answers[i]}</span>
      </label>
    `;

    res.children[1].append(answer);
  }

  res.style.zIndex = testItem.order;
  res.style.top = testItem.order * 5 + "px";
  res.style.left = testItem.order * 5 + "px";
  if(testItem.order > 1) res.classList.add("disabled");
  if(testItem.order == 1) res.classList.add("active")
  return res;
}


let getSubmitCard = () => {
  let res = document.createElement("div");
  res.className = "test__card";
  res.innerHTML = `
    <div class="test__title">Тест пройден!!!</div>
    <button class="test__btn test__btn_prev">предыдущий</button>
    <button class="test__btn test__btn_submit" id="submitBtn">Отправить</button>
  `;

  res.style.zIndex = 10000;
  res.style.top = (test.length + 1) * 5 + "px";
  res.style.left = (test.length + 1) * 5 + "px";
  res.classList.add("disabled");
  return res;
}

let checkAnswerCard = (count) => {
  let res = document.createElement("div");
  res.className = "test__card";
  res.innerHTML = `
    <div class="test__title">Правильных ответов: ${count} из ${test.length}</div>
    <button class="test__btn test__btn_submit" id="reset">Пройти еще раз</button>
  `;

  res.classList.add("active");

  return res;
}


let cards = document.getElementsByClassName("test__card");
let currentCard = 0;

let prevQuestion = () => {
  if(currentCard == 0) return;
  testHTML.children[currentCard].classList.remove("active");

  let copy = currentCard;

  setTimeout(() => {
    testHTML.children[copy].classList.add("disabled");
  }, 500);

  currentCard--;
}

let nextQuestion = () => {
  if(currentCard == test.length) return;
  currentCard++;
  testHTML.children[currentCard].classList.remove("disabled");
  setTimeout(() => {
    testHTML.children[currentCard].classList.add("active");
  }, 20);
}


let addAnswer = (id, value) => {
  answersArr[id - 1].push(value);
  answersArr[id - 1].sort();
}

let removeAnswer = (id, value) => {
  let current = answersArr[id - 1];

  for(let i = 0; i < current.length; ++i) {
    if(current[i] == value) current[i] = null;
  }

  answersArr[id - 1] = current.filter(elem => elem != null);
}

let checkAnswers = () => {
  let count = 0;
  for(let i = 0; i < trueAnswers.length; ++i) {
    let check = true;
    if(trueAnswers[i].length > answersArr[i].length) continue;
    for(let j = 0; j < trueAnswers[i].length; ++j) {
      if(trueAnswers[i][j] != answersArr[i][j]) check = false;
    }

    if(check) count++;
  }

  return count;
}


let onSubmit = () => {
  countTrueAnswers = checkAnswers();
  for(let i = 0; i < testHTML.children.length;) {
    testHTML.children[0].remove();
  }

  testHTML.append(checkAnswerCard(countTrueAnswers));

  document.getElementById("reset").onclick = () => {
    location.reload();
  };
}

for(let i = 0; i < test.length; ++i) {
  testHTML.append(getTestCard(test[i]));
}

testHTML.append(getSubmitCard());


for(let i = 0; i < test.length; ++i) {
  answersArr.push([]);
}


for(let i = 0; i < cards.length; ++i) {
  cards[i].onclick = (e) => {
    if(e.target.classList.contains("test__btn")) {
      if(e.target.classList.contains("test__btn_prev")) prevQuestion();
      if(e.target.classList.contains("test__btn_next")) nextQuestion();
    }
    if(e.target.classList.contains("test__list-input") && e.target.type == "checkbox") {
      if(e.target.checked) addAnswer(e.target.name, e.target.value);
      else removeAnswer(e.target.name, e.target.value);
    }

    if(e.target.classList.contains("test__list-input") && e.target.type == "radio") {
      let id = e.target.name;
      if(answersArr[id - 1].length) removeAnswer(id, answersArr[id - 1][0]);
      addAnswer(e.target.name, e.target.value);
    }
  }
}

let submit = document.getElementById("submitBtn");
submit.onclick = onSubmit;