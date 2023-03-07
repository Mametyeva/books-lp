<script setup>
import { ref, computed } from "vue";
import USelectItem from "./global/USelectItem.vue";

const books = ref([
  {
    name: "Портрет Дориана Грея",
    author: "Оскар Уаильд",
    img: "content/Dorian-Gray 1.jpg",
    cost: 380,
    sale: 20,
    russian: false,
  },

  {
    name: "Айвенго",
    author: "Вальтер Скотт",
    img: "content/Ayvengo 1.jpg",
    cost: 320,
    sale: 20,
    russian: false,
  },

  {
    name: "Мастер и Маргарита",
    author: "Булгаков М.А.",
    img: "content/Master-i-Margarita 1.jpg",
    cost: 420,
    sale: 20,
    russian: true,
  },

  {
    name: "Маленький принц",
    author: "Антуан де-Сент Экзюпери",
    img: "content/Little-Prince 1.jpg",
    cost: 280,
    sale: 20,
    russian: false,
  },

  {
    name: "Книжный вор",
    author: "Маркус Зусак",
    img: "content/Knizhniy-vor.jpg",
    cost: 290,
    sale: 20,
    russian: false,
  },

  {
    name: "Список Шиндлера",
    author: "Томас Кенилли",
    img: "content/Spisok-Shindlera 1.jpg",
    cost: 370,
    sale: 20,
    russian: false,
  },

  {
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

const searchBook = computed(() => {
  return books.value.filter(
    (book) => book.name.toLowerCase().startsWith(defaultValue.value) || book.author.toLowerCase().startsWith(defaultValue.value)
  );
})

let arrBooks = ref(books.value);

const changeArrForSearch = ref(function (arr) {
  arrBooks.value = arr;
  defaultValue.value = "";
});

const sortParam = ref("");

const sortByName = (d1, d2) => (d1.name.toLowerCase() > d2.name.toLowerCase()) ? 1 : -1;
const sortByAuthor = (d1, d2) => (d1.author.toLowerCase() > d2.author.toLowerCase()) ? 1 : -1;
const sortByCost = (d1, d2) =>(d1.cost > d2.cost) ? 1 : -1;

const sortedList = computed(() => {
    switch(sortParam.value) {
        case '': return books.value;
        case 'name': return [...books.value].sort(sortByName);
        case 'name-reverse': return [...books.value].sort(sortByName).reverse();
        case 'author': return [...books.value].sort(sortByAuthor);
        case 'author-reverse': return [...books.value].sort(sortByAuthor).reverse();
        case 'cost': return [...books.value].sort(sortByCost);
        case 'cost-reverse': return [...books.value].sort(sortByCost).reverse();
        default: return books.value;
    }
})

</script>

<template>
  <form
  class="search line"
  @submit.prevent.stop="changeArrForSearch(searchBook)"
  >
  <div class="search-input">
    <UInput
    class="caption"
    v-model="defaultValue"
    type="search"
    placeholder="Введите название или имя автора"
     />
    <button class="search-btn" type="submit"></button>

   <USelect
   :class="{ visible: defaultValue }">
        <USelectItem
        v-for="item in searchBook"
        @click="changeArrForSearch([item])"
        :a="item.name"/>
    </USelect>
  </div>

  <ul class="select">
            <button>Сортировка</button>
            <ul class="select-content">
              <li @click.prevent.stop="sortParam=''"><a>Сбросить</a></li>
              <li @click.prevent.stop="sortParam='name'"><a>Название А-Я</a></li>
              <li @click.prevent.stop="sortParam='name-reverse'"><a>Название Я-А</a></li>
              <li @click.prevent.stop="sortParam='author'"><a>Автор А-Я</a></li>
              <li @click.prevent.stop="sortParam='author-reverse'"><a>Автор Я-А</a></li>
              <li @click.prevent.stop="sortParam='cost'"><a>Цена по возрастанию</a></li>
              <li @click.prevent.stop="sortParam='cost-reverse'"><a>Цена по убыванию</a></li>
            </ul>
          </ul>
</form>



<!--    <div class="collaps-search">
      <ul
      class="collaps-search-items"
      :class="{ visible: defaultValue }"
      >
        <li v-for="item in searchBook"><a @click="arrForSearch([item])">{{ item.name }}</a></li>
      </ul>
    </div> -->


  <div class="cards" :class="{ small: arrBooks.length < 4 }">
    <UGoods
    v-for="book in sortedList"
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

