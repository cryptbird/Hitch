const form = document.getElementById('post-form');
const feedList = document.getElementById('feed-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const postContent = formData.get('content');

  if (postContent.trim() === '') {
    alert('Post content cannot be empty!');
    return;
  }

  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: postContent })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const postItem = createPostItem(data);
      feedList.insertBefore(postItem, feedList.firstChild);
      form.reset();
    })
    .catch(error => console.error(error));
});

function createPostItem(post) {
  const postItem = document.createElement('li');
  postItem.classList.add('feed-item');

  const postContent = document.createElement('p');
  postContent.classList.add('feed-item-content');
  postContent.textContent = post.content;
  postItem.appendChild(postContent);

  const postTimestamp = document.createElement('p');
  postTimestamp.classList.add('feed-item-timestamp');
  postTimestamp.textContent = new Date(post.timestamp).toLocaleString();
  postItem.appendChild(postTimestamp);

  return postItem;
}

function loadPosts() {
  fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(post => {
        const postItem = createPostItem(post);
        feedList.appendChild(postItem);
      });
    })
    .catch(error => console.error(error));
}

loadPosts();
