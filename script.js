const SEARCH_API = 'https://openlibrary.org/search.json?q=';
const IMG_PATH = 'http://covers.openlibrary.org/b/isbn/';
const PLACEHOLDER_IMG = 'placeholder.png';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

function returnReviews(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.docs.forEach(book => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        // Check if the book has an ISBN to determine the image source
        if (book.isbn && book.isbn[0]) {
          image.src = IMG_PATH + book.isbn[0] + '.jpg';
        } else {
          // Placeholder image for books without ISBN
          image.src = PLACEHOLDER_IMG;
        }

        const author = document.createElement('p');
        author.setAttribute('id', 'author');
        author.innerHTML = book.author_name ? (!hasNumbers(book.author_name[0]) ? book.author_name[0] : 'Author Unknown') : 'Author Unknown'; // Display author's name or 'Author Unknown' if not available

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        title.innerHTML = `${book.title}<br><a href="book.html?id=${book.id}&title=${book.title}">reviews</a>`;

        const center = document.createElement('center');
        center.appendChild(image);

        div_card.appendChild(center);
        div_card.appendChild(title);
        div_card.appendChild(author);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnReviews(SEARCH_API + searchItem);
    search.value = '';
  }
});

function hasNumbers(text) {
  // Check if the text includes any numbers
  return /\d/.test(text);
}
