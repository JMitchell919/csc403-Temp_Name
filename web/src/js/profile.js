document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('display-name').textContent = localStorage.getItem('username');
    document.getElementById('username').textContent = localStorage.getItem('username');
    document.getElementById('email').textContent = 'dummy@email.com';

    // dummy data, likly accumulated from posts from the next section (not followers or following)
    document.getElementById('followers-count').textContent = '420';
    document.getElementById('following-count').textContent = '69';
    document.getElementById('total-post-count').textContent = '42';
    document.getElementById('total-likes-count').textContent = '1337';
    document.getElementById('total-dislikes-count').textContent = '7';

    // get all posts of user and populate posts-section

    // dummy data
    const postData = {
        id : 1,
        profilePic : '',
        username : localStorage.getItem('username'),
        location : 'yuh',
        text : 'this is the post text',
        postPics : '',
        likeCount : 69,
        dislikeCount : 420,
        commentCount : 1337
    } 

    let printDate
    let isLiked
    let isDisliked

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('post-id', postData.id);

    postDiv.innerHTML = `
        <div class="highlight">
            <a href="view?postId=${postData.id}" class="post-anchor">
                <div class="post-header">
                    <div class="post-author no-redirect">
                        <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic">
                        <p class="post-author">${postData.username}</p>
                    </div>
                    <div class="post-info">
                        <p class="post-location">${postData.location}</p>
                        <p class="post-date">${printDate}</p>
                    </div>
                </div>
                
                <p class="post-text no-redirect">${postData.text}</p>
        
                <div class="picture-container">
                    ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="../assets/postImages/${pic}" alt="Picture" class="pic">`).join('') : ''}
                </div>
        
                <div class="post-footer">
                    <button class="like-button no-redirect ${isLiked ? 'liked' : ''}">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                    </button>
                    
                    <button class="dislike-button no-redirect ${isDisliked ? 'disliked' : ''}">
                        <i class="fa-solid fa-thumbs-down"></i>
                        <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                    </button>
                    
                    <button class="comment-button">
                        <i class="fa-solid fa-comment"></i>
                        <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
                    </button>
                </div>
            </a>
        </div>
    `;

    const postsSection = document.getElementById('posts-section');
    postsSection.appendChild(postDiv);
});