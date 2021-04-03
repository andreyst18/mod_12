// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let minInput = document.getElementById('min_value');
let maxInput = document.getElementById('max_value');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const li = document.createElement('li');
    const div = document.createElement('div');
    let blockClass;

    switch (fruits[i]['kind']) {
      case 'Мангустин': blockClass = 'fruit_violet';
        break;
      case 'Дуриан': blockClass = 'fruit_green';
        break;
      case 'Личи': blockClass = 'fruit_carmazin';
        break;
      case 'Карамбола': blockClass = 'fruit_yellow';
        break;
      case 'Тамаринд': blockClass = 'fruit_lightbrown';
        break;
    }
         
    fruitsList.appendChild(li);
    li.appendChild(div);

    li.className = `fruit__item ${blockClass}`;
    div.className = 'fruit__info';
    div.innerHTML = `index: ${i}<br>kind: ${fruits[i]['kind']}<br>color: ${fruits[i]['color']}<br>weight (кг): ${fruits[i]['weight']}`;
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let previousFruits = fruits.slice();
  
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt(0, fruits.length - 1);
    let removed = fruits.splice(i, 1);
    result.unshift(removed[0]);
  }

  if (compare(previousFruits, result)) {
    alert('Порядок не изменился!')
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

//Сравнение массивов
function compare(arg_1, arg_2) {
  if (arg_1.length != arg_2.length) {
      return false;
  } else {
      for (let i = 0; i < arg_1.length; i++) {
          if (arg_1[i] != arg_2[i]) {
              return false
          }
      }
  }
  return true;
}

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = JSON.parse(fruitsJSON);
  fruits = fruits.filter((item) => {
    // TODO: допишите функцию
    return item['weight'] >= minValue && item['weight'] <= maxValue;
  });

  return fruits;
};

filterButton.addEventListener('click', () => {
  minValue = minInput.value ? minInput.value : 0;
  maxValue = maxInput.value ? maxInput.value : 999; //значение по умолчанию
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let color_a = a['color']; //вначале получаем текстовое значение цвета
  let color_b = b['color'];
  return getHexColorNumber(color_a) > getHexColorNumber(color_b);
};

//Преобразование значения цвета в 16-разр. число
function getHexColorNumber(arg) {
  switch (arg) {
    case 'фиолетовый': return parseInt('8b00ff', 16); // 9 109 759
    case 'зеленый': return parseInt('84cd1b', 16); // 8 703 259
    case 'розово-красный': return parseInt('dc143c', 16); // 14 423 100
    case 'желтый': return parseInt('ffd800', 16); // 16 766 976
    case 'светло-коричневый': return parseInt('cd853f', 16); // 13 468 991
  }
}

const sortAPI = {
  bubbleSort(arr) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (comparationColor(arr[j], arr[j + 1])) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
/*
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;
*/

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortKindLabel.textContent = sortKind;
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
