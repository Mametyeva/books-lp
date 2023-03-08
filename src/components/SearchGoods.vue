<script setup>
import { looseIndexOf } from "@vue/shared";
import { ref, computed } from "vue";
import USelectItem from "./global/USelectItem.vue";

const books = ref([
  {
    id: 1,
    name: "Портрет Дориана Грея",
    author: "Оскар Уаильд",
    img: "content/Dorian-Gray 1.jpg",
    cost: 380,
    sale: 20,
    russian: false,
  },

  {
    id: 2,
    name: "Айвенго",
    author: "Вальтер Скотт",
    img: "content/Ayvengo 1.jpg",
    cost: 320,
    sale: 20,
    russian: false,
  },

  {
    id: 3,
    name: "Мастер и Маргарита",
    author: "Булгаков М.А.",
    img: "content/Master-i-Margarita 1.jpg",
    cost: 420,
    sale: 20,
    russian: true,
  },

  {
    id: 4,
    name: "Маленький принц",
    author: "Антуан де-Сент Экзюпери",
    img: "content/Little-Prince 1.jpg",
    cost: 280,
    sale: 20,
    russian: false,
  },

  {
    id: 5,
    name: "Книжный вор",
    author: "Маркус Зусак",
    img: "content/Knizhniy-vor.jpg",
    cost: 290,
    sale: 20,
    russian: false,
  },

  {
    id: 6,
    name: "Список Шиндлера",
    author: "Томас Кенилли",
    img: "content/Spisok-Shindlera 1.jpg",
    cost: 370,
    sale: 20,
    russian: false,
  },

  {
    id: 7,
    name: "Человек, который смеется",
    author: "Виктор Гюго",
    img: "content/Chelovek-kotoriy-smeetsa.jpg",
    cost: 350,
    sale: 20,
    russian: false,
  },
])

const price = (book) => {
    return Math.trunc(book.cost - (book.cost * book.sale / 100));
}

const defaultValue = ref("")

const filteredList = computed(() => {
  if (defaultValue.value) {
    return books.value.filter(
    (book) => book.name.toLowerCase().startsWith(defaultValue.value) || book.author.toLowerCase().startsWith(defaultValue.value))
  };
  return books.value
})

let arrBooks = ref(books.value);

const changeArrForSearch = ref(function (arr) {
  arrBooks.value = arr;
  defaultValue.value = null;
});

const sortByName = (a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
const sortByAuthor = (a, b) => (a.author.toLowerCase() > b.author.toLowerCase()) ? 1 : -1;
const sortByCost = (a, b) =>(a.cost > b.cost) ? 1 : -1;
const sortById = (a, b) =>(a.id > b.id) ? 1 : -1;

const sortBy = ref(function(value) {
  value === 'clear' ? arrBooks.value.sort(sortById) :
  value === 'name' ? arrBooks.value.sort(sortByName) :
  value === 'name-reverse' ? arrBooks.value.sort(sortByName).reverse() :
  value === 'author' ? arrBooks.value.sort(sortByAuthor) :
  value === 'author-reverse' ? arrBooks.value.sort(sortByAuthor).reverse() :
  value === 'cost' ? arrBooks.value.sort(sortByCost) :
  value === 'cost-reverse' ? arrBooks.value.sort(sortByCost).reverse() :
  arrBooks.value
});

</script>

<template>
  <form
  class="search line"
  @submit.prevent.stop="changeArrForSearch(filteredList)"
  >
  <div class="search-input">
    <UInput
    class="caption"
    v-model="defaultValue"
    :value="defaultValue"
    type="search"
    placeholder="Введите название или имя автора"
     />
    <button class="search-btn" type="submit"></button>

   <USelect
   :class="{ visible: defaultValue }">
        <USelectItem
        v-for="item in filteredList"
        @click="changeArrForSearch([item])"
        :a="item.name"/>
    </USelect>
  </div>

  <ul class="select">
            <button>Сортировка</button>
            <ul class="select-content">
              <li @click.prevent.stop="sortBy('clear')"><a>Сбросить</a></li>
              <li @click.prevent.stop="sortBy('name')"><a>Название А-Я</a></li>
              <li @click.prevent.stop="sortBy('name-reverse')"><a>Название Я-А</a></li>
              <li @click.prevent.stop="sortBy('author')"><a>Автор А-Я</a></li>
              <li @click.prevent.stop="sortBy('author-reverse')"><a>Автор Я-А</a></li>
              <li @click.prevent.stop="sortBy('cost')"><a>Цена по возрастанию</a></li>
              <li @click.prevent.stop="sortBy('cost-reverse')"><a>Цена по убыванию</a></li>
            </ul>
          </ul>
</form>

  <div class="cards" :class="{ small: arrBooks.length < 4 }">
    <UGoods
    v-for="book in arrBooks"
    :key="book.name"
    :src="book.img"
    :alt="book.name"
    :title="book.name"
    :description="book.author"
    :price="price(book)"
    :cost="book.cost"
    />
      <!-- <div class="card col-between" v-for="book in arrBooks" :key="book.name">
        <div class="card-img">
          <img
            :src="book.img"
            alt="Мастер и Маргарита"
          />
        </div>
        <p class="card-name subtitle">{{ book.name }}</p>
        <p class="card-autor caption">{{ book.author }}</p>
        <div class="price line">
          <p class="old-price caption">350p</p>
          <p class="value-price">300p</p>
        </div>
        <button class="card-btn">Купить</button>
      </div> -->
    </div>
</template>

