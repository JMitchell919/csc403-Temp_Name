import { handleButtonClick } from './index.js';

document.addEventListener('DOMContentLoaded', async function() {
    // Grab postId from url
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');


    // Get user's interactions
    const userInteractions = {
        likes: [],
        dislikes: []
    };
    const storedInteractions = localStorage.getItem('userInteractions');

    // Check if there are stored interactions, if not initialize them
    if (storedInteractions) {
        try {
            // Attempt to parse stored interactions
            const parsedInteractions = JSON.parse(storedInteractions);
            // Ensure the parsed object has the expected structure
            userInteractions.likes = parsedInteractions.likes || [];
            userInteractions.dislikes = parsedInteractions.dislikes || [];
        } catch (error) {
            console.error('Error parsing user interactions from localStorage:', error);
            // Reset if parsing fails
            localStorage.removeItem('userInteractions');
        }
    } else {
        // Initialize empty interactions in localStorage
        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
    }

    // Fetch config
    let apiDomain = window.location.hostname === "localhost" ? "http://localhost" : `http://${window.location.hostname}`;
    let apiPort = '';

    await fetch('/config')
        .then(response => response.json())
        .then(config => {
            apiPort = config.apiPort;
        })
        .catch(error => {
            console.error('Error fetching config:', error);
        });

    // Fetch post from api
    fetch(`${apiDomain}:${apiPort}/post?id=${postId}`)
        .then(response => response.json())
        .then(postData => {
            // Populate post details
            const postContainer = document.getElementById('post');
            postContainer.setAttribute('post-id', postData.id);
            
            // Format the date
            const dateObject = new Date(postData.date);
            const printDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })

            // Check if the user liked or disliked the post
            const isLiked = userInteractions.likes.includes(String(postData.id));
            const isDisliked = userInteractions.dislikes.includes(String(postData.id));
            
            // HTML template
            postContainer.innerHTML = `
                <div class="post-header">
                    <div class="post-author">
                        <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic">
                        <p class="post-author">${postData.username}</p>
                    </div>
                    <div class="post-info">
                        <p class="post-location">${postData.location}</p>
                        <p class="post-date">${printDate}</p>
                    </div>
                </div>
                
                <p class="post-text" id="post-text">${postData.text}</p>
                <textarea class="post-text" id="post-text-edit"></textarea>
        
                <div class="picture-container">
                    ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="../assets/postImages/${pic}" alt="Picture" class="pic">`).join('') : ''}
                </div>
        
                <div class="post-footer">
                    <button class="like-button ${isLiked ? 'liked' : ''}">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                    </button>
                    
                    <button class="dislike-button ${isDisliked ? 'disliked' : ''}">
                        <i class="fa-solid fa-thumbs-down"></i>
                        <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                    </button>
                    
                    <button class="comment-button">
                        <i class="fa-solid fa-comment"></i>
                        <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
                    </button>
                </div>
            `;

            if (postData.username == localStorage.getItem("username")) {
                document.getElementById('actions').style.display = 'flex';
            }

            // Modal and image enlargement logic
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('enlarged-image');
            const closeBtn = document.querySelector('.close');

            // Close the modal when clicking close button or outside modal
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            });

            modal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            });

            // Prevent closing modal when clicking on the image itself
            modalImg.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            // Add event listener for enlarging images on click
            postContainer.querySelectorAll('.pic').forEach(image => {
                image.addEventListener('click', function() {
                    modal.style.display = 'flex';  // Use flex to center the modal content
                    modalImg.src = this.src;  // Set modal image src to clicked image src
                    document.body.classList.add('no-scroll');  // Disable page scroll
                });
            });

            // Add click event listener to like and dislike buttons
            postContainer.addEventListener('click', handleButtonClick);

        })
        .catch(error => console.error('Error fetching post:', error));

    // Edit post
    document.getElementById('edit-post-btn').addEventListener('click', function() {
        document.getElementById('post-actions').style.display = 'none';
        document.getElementById('edit-actions').style.display = 'flex';

        const postText = document.getElementById('post-text');
        const postTextEdit = document.getElementById('post-text-edit');

        postTextEdit.innerHTML = postText.textContent;
        postTextEdit.focus();

        postText.style.display = 'none';
        postTextEdit.style.display = 'block';
        
    });

    // Delete post
    document.getElementById('delete-post-btn').addEventListener('click', function() {
        // api thing
    });

    // Submit edit
    document.getElementById('submit-edit-btn').addEventListener('click', function() {
        // api thing
    });

    // Cancel edit
    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        document.getElementById('post-actions').style.display = 'flex';
        document.getElementById('edit-actions').style.display = 'none';

        document.getElementById('post-text-edit').innerHTML = '';
    
        document.getElementById('post-text').style.display = 'block';
        document.getElementById('post-text-edit').style.display = 'none';
    });

    // Submit comment
    document.getElementById('submit-comment').addEventListener('click', function() {
        const text = document.getElementById('comment-input').value;
        if (text == '') {
            alert('Cannot submit an empty comment!');
            return;
        }

        fetch(`${apiDomain}:${apiPort}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: parseInt(document.getElementById('post').getAttribute('post-id')),
                parentId: null,
                username: localStorage.getItem('username'),
                text: text
            })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = window.location;
            } else {
                alert('Failed to submit comment.');
                console.log(response)
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error while submitting comment.');
        });
    })

    document.getElementById('comment-input').addEventListener('input', function() {
        // Reset height
        this.style.minHeight = 'auto';

        // Set height based on content
        this.style.minHeight = this.scrollHeight + 'px';
    })

    let activeDropdown = null;

    // Comment section! Yay yippee woohoo!
    fetch(`${apiDomain}:${apiPort}/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            createComments(comments);
        })
        .catch(error => console.error('Error fetching comments:', error));

    async function createComments(comments, level = 0, isLast = []) {
        const commentsContainer = document.getElementById('comments-container')

        for (const [index, comment] of comments.entries()) {
            const isCurrentLast = index === comments.length - 1;
            const commentwrapperDiv = document.createElement('div');
            commentwrapperDiv.className = 'comment-wrapper';
            // commentwrapperDiv.style.paddingLeft = `${level * 4}rem`;
            
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-div';
            commentDiv.setAttribute('comment-id', comment.id)
            
            let treeSymbols = '';
            for (let i = 0; i < level; i++) {
                treeSymbols += isLast[i] ? "&nbsp;" : "│";
            }
            treeSymbols += isCurrentLast ? "└" : "├";

            // Format the date
            const dateObject = new Date(comment.date);
            const printDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })

            //get user by id (comment.userId) from api (pfp, username)
            let user;
            try {
                const response = await fetch(`${localStorage.getItem("apiDomain")}:${localStorage.getItem("apiPort")}/getUser?username=${comment.username}`);
                if (!response.ok) throw new Error('Network response was not ok');
                user = await response.json();
            } catch (error) {
                console.error('Error fetching user:', error);
                user = { profilePic: 'default-profile-pic.png' };  // Default profile pic if user data fails
            }

            commentDiv.innerHTML = `
                <div class="tree">
                    <p>${treeSymbols}</p>
                </div>
                
                <div class="comment">
                    <img src="${user.profilePic}" alt="" class="comment-pfp">
                    <div class="comment-right">
                        <div class="comment-right-top">
                            <span class="comment-username">${comment.username}</span>
                            <span class="comment-date">${printDate}</span>
                        </div>
                        <div class="comment-right-bottom">
                            <div class="comment-text">${comment.text}</div>
                            <button class="reply-button">
                                <i class="fa-solid fa-comment"></i>
                            </button>
                        </div>
                    </div>

                    <div class="comment-reply-section" style="display: none;">
                        <textarea class="reply-input" placeholder="Write a reply..."></textarea>
                        <button class="submit-reply-button">Submit</button>
                    </div>
                </div>
            `;

            commentDiv.querySelector('.reply-button').addEventListener('click', function () {
                const replySection = commentDiv.querySelector('.comment-reply-section');

                if (activeDropdown && activeDropdown !== replySection) {
                    activeDropdown.style.display = 'none';
                }
                
                if (replySection.style.display === 'none' || replySection.style.display === '') {
                    replySection.style.display = 'flex';
                    activeDropdown = replySection;
                    commentDiv.querySelector('.reply-input').focus();
                } else {
                    replySection.style.display = 'none';
                    activeDropdown = null;
                }
            });

            commentDiv.querySelector('.reply-input').addEventListener('input', function() {
                this.style.minHeight = 'auto';
                this.style.minHeight = this.scrollHeight + 'px';
            });

            commentDiv.querySelector('.submit-reply-button').addEventListener('click', async function () {
                const text = commentDiv.querySelector('.reply-input').value;
                if (text == '') {
                    alert('Cannot submit an empty reply!');
                    return;
                }

                fetch(`${apiDomain}:${apiPort}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postId: parseInt(document.getElementById('post').getAttribute('post-id')),
                        parentId: parseInt(commentDiv.getAttribute('comment-id')),
                        username: localStorage.getItem('username'),
                        text: text
                    })
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = window.location;
                    } else {
                        alert('Failed to submit reply.');
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Error while submitting reply.');
                });
            });

            commentwrapperDiv.appendChild(commentDiv);
            commentsContainer.appendChild(commentwrapperDiv);

            if (comment.replies && comment.replies.length > 0) {
                await createComments(comment.replies, level + 1, [...isLast, isCurrentLast]);
            }
        }
    } 
});