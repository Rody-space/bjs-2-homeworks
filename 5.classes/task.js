class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100; // начальное состояние
    this.type = null;
  }

  // Геттер для свойства state
  get state() {
    return this._state;
  }

  // Сеттер для свойства state с валидацией
  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  // Метод для улучшения состояния издания
  fix() {
    this.state = this.state * 1.5;
  }
}

// Класс Magazine, наследуется от PrintEditionItem
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

// Класс Book, наследуется от PrintEditionItem
class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

// Классы-наследники от Book
class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}


class Library {
  constructor(name) {
    this.name = name;
    this.books = []; // массив для хранения книг
  }

  // Метод для добавления книги в библиотеку
  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  // Метод поиска книги по заданному ключу и значению
  findBookBy(type, value) {
    const foundBook = this.books.find(book => book[type] === value);
    return foundBook || null;
  }

  // Метод выдачи книги по названию
  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(book => book.name === bookName);
    if (bookIndex !== -1) {
      const book = this.books[bookIndex];
      this.books.splice(bookIndex, 1); // удаляем книгу из массива
      return book;
    }
    return null;
  }
}


// Создаём библиотеку
const library = new Library("Библиотека имени Ленина");

// Добавляем печатные издания разных типов
library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));


// Находим книгу, изданную в 1919 году (если нет — создаём)
let book1919 = library.findBookBy("releaseDate", 1919);
if (!book1919) {
  book1919 = new Book("Неизвестный автор", "Книга 1919 года", 1919, 200);
  library.addBook(book1919);
  console.log("Книга 1919 года создана и добавлена в библиотеку.");
} else {
  console.log("Книга 1919 года найдена:", book1919.name);
}


// Выдаём любую книгу (например, «Машина времени»)
const takenBook = library.giveBookByName("Машина времени");
if (takenBook) {
  console.log(`Выдана книга: ${takenBook.name}`);
} else {
  console.log("Книга не найдена.");
}

// Повреждаем выданную книгу (снижаем состояние)
takenBook.state = 20;
console.log(`Состояние выданной книги после повреждения: ${takenBook.state}`);


// Восстанавливаем выданную книгу
takenBook.fix();
console.log(`Состояние выданной книги после восстановления: ${takenBook.state}`);


// Пытаемся добавить восстановленную книгу обратно в библиотеку
library.addBook(takenBook);
if (library.findBookBy("name", takenBook.name)) {
  console.log("Восстановленная книга успешно добавлена обратно в библиотеку.");
} else {
  console.log("Восстановленную книгу не удалось добавить обратно в библиотеку (состояние <= 30).");
}

// Проверяем количество книг в библиотеке
console.log("Количество книг в библиотеке:", library.books.length);
