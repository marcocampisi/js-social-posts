const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const likedPosts = [];

//Creo una funzione che genera dinamicamente la card corrispondente al post con al suo interno le informazioni contenute nell'array
function generateCard(post) {
    const postCard = document.createElement('div');
    postCard.classList.add('post')

    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');

    const postMeta = document.createElement('div');
    postMeta.classList.add('post-meta');

    const postMetaIcon = document.createElement('div');
    postMetaIcon.classList.add('post-meta__icon');

    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');
    if (post.author.image) {
        const img = document.createElement('img');
        img.src = post.author.image;
        img.alt = post.author.name;
        profilePic.appendChild(img);
    } else {
        profilePic.classList.add('profile-pic-default');
        const initials = document.createElement('span');
        initials.textContent = getInitials(post.author.name);
        profilePic.appendChild(initials);
    }

    postMetaIcon.appendChild(profilePic);

    const postMetaData = document.createElement('div');
    postMetaData.classList.add('post-meta__data');

    const postMetaAuthor = document.createElement('span');
    postMetaAuthor.classList.add('post-meta__author');
    postMetaAuthor.textContent = post.author.name;

    const postMetaTime = document.createElement('span');
    postMetaTime.classList.add('post-meta__time');
    postMetaTime.textContent = post.created;

    postMetaData.appendChild(postMetaAuthor);
    postMetaData.appendChild(postMetaTime);
    postHeader.appendChild(postMeta);
    postMeta.appendChild(postMetaIcon);
    postMeta.appendChild(postMetaData);
    postCard.appendChild(postHeader);

    const postText = document.createElement('div');
    postText.classList.add('post__text');
    postText.textContent = post.content;
    postCard.appendChild(postText);

    const postImage = document.createElement('div');
    postImage.classList.add('post__image');
    const postImageImg = document.createElement('img');
    postImageImg.src = post.media;
    postImage.appendChild(postImageImg);
    postCard.appendChild(postImage);

    const postFooter = document.createElement('div');
    postFooter.classList.add('post__footer');

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes');
    likesContainer.classList.add('js-likes');

    const likesElement = document.createElement('div');
    likesElement.classList.add('likes__ele');

    const likeButton = document.createElement('a');
    likeButton.classList.add('like-button');
    likeButton.classList.add('js-like-button');
    likeButton.href = '#';
    likeButton.setAttribute('data-postid', post.id);

    const likeButtonIcon = document.createElement('i');
    likeButtonIcon.classList.add('like-button__icon');
    likeButtonIcon.classList.add('fas');
    likeButtonIcon.classList.add('fa-thumbs-up');

    const likeButtonLabel = document.createElement('span');
    likeButtonLabel.classList.add('like-button__label');
    likeButtonLabel.textContent = 'Mi Piace';

    likeButton.appendChild(likeButtonIcon);
    likeButton.appendChild(likeButtonLabel);
    likesElement.appendChild(likeButton);

    const likesCounter = document.createElement('div');
    likesCounter.classList.add('likes__counter');
    const likeCounter = document.createElement('b');
    likeCounter.id = `like-counter-${post.id}`;
    likeCounter.classList.add('js-likes-counter');
    likeCounter.textContent = post.likes;
    likesCounter.innerHTML = `Piace a ${likeCounter.outerHTML} persone`;

    likesContainer.appendChild(likesElement);
    likesContainer.appendChild(likesCounter);

    postFooter.appendChild(likesContainer);

    postCard.appendChild(postHeader);
    postCard.appendChild(postText);
    postCard.appendChild(postImage);
    postCard.appendChild(postFooter);


    likeButton.addEventListener('click', function(e) {
        e.preventDefault();

        const likeCounter = postCard.querySelector('.js-likes-counter');
        const postId = post.id;

        if (!likeButton.classList.contains('liked')) {
            likeButton.classList.add('liked');
            likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
            likedPosts.push(postId);
        } else {
            likeButton.classList.remove('liked');
            likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
            const index = likedPosts.indexOf(postId);
            if (index > -1 ) {
                likedPosts.splice(index, 1);
            }
        }

    });

    return postCard;
}

//Genero le iniziali dell'utente da usare nel placeholder
function getInitials(name) {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0);
    } else {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
}

//Genero la lista dei post dinamicamente usando la funzione creata sopra
const postsList = document.createElement('div');
postsList.classList.add('posts-list');

posts.forEach(post => {
    const postCard = generateCard(post);
    postsList.appendChild(postCard);
});
//Aggiungo la lista al body
document.body.appendChild(postsList);