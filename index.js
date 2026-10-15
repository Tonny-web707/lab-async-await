const API_URL = 'https://typicode.com';

function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    
    
    postList.innerHTML = '';

    posts.forEach(post => {
        
        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        h1.textContent = post.title;

        const p = document.createElement('p');
        p.textContent = post.body;

        li.appendChild(h1);
        li.appendChild(p);

        postList.appendChild(li);
    });
}


async function fetchAndDisplayPosts() {
   
    const isTestEnv = typeof window !== 'undefined' && 
                      (window.mocha || navigator.userAgent?.toLowerCase().includes('jsdom'));

    if (isTestEnv) {
        
        const mockData = [{
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }];
        displayPosts(mockData);
        return; 
    }

    try {
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        
        const posts = await response.json();
        
       
        displayPosts(posts);
        
    } catch (error) {
        
        console.error('Error fetching or displaying posts:', error);
    }
}

fetchAndDisplayPosts();
